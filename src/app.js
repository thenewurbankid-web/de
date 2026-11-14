"use strict";
/* ═══════════ Helpers ═══════════ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// German text with English on hover/tap
const H = (de, en, cls = "") => `<span class="h ${cls}" data-en="${esc(en)}">${esc(de)}</span>`;
const HP = p => H(p[0], p[1]);
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const todayStr = (d = new Date()) => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const fmtDate = d => new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "short", year: "numeric" });
const pct = x => Math.round(Math.max(0, Math.min(1, x)) * 100);
const LV = l => (l === "S" ? "A1" : l);
const LEVEL_ORDER = ["A1", "A2", "B1"];
const lessonById = id => COURSE.find(l => l.id === id);

/* ═══════════ State ═══════════ */
const KEY = "deutsch-kurs-v1";
const SKILLS = [
  ["wortschatz", "Wortschatz", "Vocabulary"], ["grammatik", "Grammatik", "Grammar"], ["verben", "Verben", "Verbs"],
  ["lesen", "Lesen", "Reading"], ["hoeren", "Hören", "Listening"], ["schreiben", "Schreiben", "Writing"], ["sprechen", "Sprechen", "Speaking"]
];
const SKILL = Object.fromEntries(SKILLS.map(s => [s[0], s]));
function fresh() {
  return {
    v: 1, name: "", start: todayStr(), day: 0, daysDone: {}, activity: {}, lessons: {}, cards: {}, stats: {}, errs: {},
    mocks: { A1: [], A2: [], B1: [] }, snaps: {}, manual: {}, today: { date: todayStr() },
    settings: { rate: 0.9, voice: "", model: "Qwen2.5-1.5B-Instruct-q4f16_1-MLC", autoSpeak: true, minutes: 40 }, welcomed: false
  };
}
let S;
try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = fresh(); }
let storageOK = true;
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { storageOK = false; } }
function T() { // today's counters, reset on a new date
  if (S.today.date !== todayStr()) S.today = { date: todayStr() };
  const t = S.today; t.shadow ??= 0; t.tutor ??= 0; t.correct ??= 0; t.trainer ??= {}; t.opened ??= []; t.mix ??= 0; t.reviewed ??= 0; t.mock ??= [];
  return t;
}
function xp(n = 1) { const d = todayStr(); S.activity[d] = (S.activity[d] || 0) + n; }

/* ═══════════ Skill tracking ═══════════ */
function record(skill, level, score, weight = 1) {
  const L = LV(level); S.stats[skill] ??= {}; const st = (S.stats[skill][L] ??= { n: 0, ema: 0 });
  for (let i = 0; i < weight; i++) { st.ema = st.n === 0 ? score : st.ema * 0.85 + score * 0.15; st.n++; }
}
function noteErr(key, wrong) { if (wrong) S.errs[key] = (S.errs[key] || 0) + 1; else if (S.errs[key]) S.errs[key] = Math.max(0, S.errs[key] - 0.5); }
const levelsUpTo = L => LEVEL_ORDER.slice(0, LEVEL_ORDER.indexOf(L) + 1);
const lessonsOf = L => COURSE.filter(l => LV(l.level) === L);
const lessonsUpTo = L => COURSE.filter(l => levelsUpTo(L).includes(LV(l.level)));
function coverage(L) { const ls = lessonsOf(L); return ls.filter(l => (S.lessons[l.id]?.best || 0) >= 80).length / ls.length; }
function vocabReady(L) {
  const words = lessonsUpTo(L).flatMap(l => l.vocab.map(v => v[0]));
  if (!words.length) return 0;
  let s = 0; for (const w of words) { const c = S.cards[w]; if (c) s += Math.min(1, (c.box || 0) / 4); }
  return s / words.length;
}
// readiness of one skill for one level, 0..1
function readiness(skill, L) {
  if (skill === "wortschatz") return vocabReady(L);
  const st = S.stats[skill]?.[L] || { n: 0, ema: 0 };
  const need = { grammatik: 30, verben: 30, lesen: 25, hoeren: 25, schreiben: 20, sprechen: 20 }[skill];
  const cov = (skill === "grammatik" || skill === "verben") ? coverage(L) : (0.4 + 0.6 * coverage(L));
  return cov * st.ema * Math.min(1, st.n / need);
}
function levelReadiness(L) { return SKILLS.reduce((a, s) => a + readiness(s[0], L), 0) / SKILLS.length; }
function currentLevel() { for (const L of LEVEL_ORDER) if (levelReadiness(L) < 0.8) return L; return "B1"; }
// weakest skill for the current target level
function weakest(L = currentLevel()) {
  const rows = SKILLS.map(s => { const st = S.stats[s[0]]?.[L] || { n: 0, ema: 0 }; return { k: s[0], r: readiness(s[0], L), n: st.n, ema: st.ema }; });
  const tried = rows.filter(r => r.k !== "wortschatz" && r.n >= 5);
  if (tried.length >= 3) return tried.sort((a, b) => a.ema - b.ema)[0].k;
  // not enough data yet: the least practised skill (speaking & listening first)
  const order = ["sprechen", "hoeren", "verben", "schreiben", "lesen", "grammatik"];
  return rows.filter(r => r.k !== "wortschatz").sort((a, b) => a.n - b.n || order.indexOf(a.k) - order.indexOf(b.k))[0].k;
}
function strongest(L = currentLevel()) {
  const rows = SKILLS.map(s => ({ k: s[0], n: S.stats[s[0]]?.[L]?.n || 0, ema: S.stats[s[0]]?.[L]?.ema || 0 })).filter(r => r.n >= 5);
  return rows.length ? rows.sort((a, b) => b.ema - a.ema)[0].k : null;
}
function snapshot() {
  const d = todayStr(); S.snaps[d] = {};
  for (const L of LEVEL_ORDER) { S.snaps[d][L] = {}; for (const s of SKILLS) S.snaps[d][L][s[0]] = +readiness(s[0], L).toFixed(3); }
  const keys = Object.keys(S.snaps).sort(); while (keys.length > 120) delete S.snaps[keys.shift()];
}
// estimated date when a skill (or whole level) reaches 80 %
function estimate(L, skill) {
  const now = skill ? readiness(skill, L) : levelReadiness(L);
  if (now >= 0.8) return { done: true };
  const keys = Object.keys(S.snaps).sort(); const today = todayStr();
  const past = keys.filter(k => daysBetween(k, today) >= 3 && daysBetween(k, today) <= 21)[0];
  if (past) {
    const then = skill ? S.snaps[past][L]?.[skill] : SKILLS.reduce((a, s) => a + (S.snaps[past][L]?.[s[0]] || 0), 0) / SKILLS.length;
    const rate = (now - then) / daysBetween(past, today);
    if (rate > 0.002) return { date: addDays(new Date(), Math.ceil((0.8 - now) / rate)), basis: "pace" };
  }
  // fallback: remaining plan days to the level's mock
  const idx = PLAN.findIndex(d => d.type === "mock" && d.level === L);
  const left = Math.max(1, idx - S.day + 1);
  const active = Math.max(1, Object.keys(S.daysDone).length);
  const elapsed = Math.max(1, daysBetween(S.start, today) + 1);
  const perDay = Object.keys(S.daysDone).length >= 3 ? Math.min(2, active / elapsed) : 1;
  return { date: addDays(new Date(), Math.ceil(left / perDay)), basis: "plan" };
}

/* ═══════════ Day-by-day plan ═══════════ */
const PLAN = (() => {
  const days = []; let since = 0;
  const per = { S: ["learn", "practice"], A1: ["learn", "practice"], A2: ["learn", "practice", "apply"], B1: ["learn", "practice", "apply"] };
  COURSE.forEach((l, i) => {
    for (const t of per[l.level]) { days.push({ type: t, lesson: l.id, level: LV(l.level) }); since++; if (since >= 6) { days.push({ type: "review", level: LV(l.level) }); since = 0; } }
    const next = COURSE[i + 1];
    if (!next || LV(next.level) !== LV(l.level)) { if (since) days.push({ type: "review", level: LV(l.level) }); since = 0; days.push({ type: "mock", level: LV(l.level) }); }
    if (l.id === "s8") { days.push({ type: "milestone", level: "A1" }); }
  });
  return days;
})();
function planDay(i) { return PLAN[i] || { type: "consolidate", level: "B1" }; }
const TYPE_NAME = {
  learn: ["Neu lernen", "Learn new"], practice: ["Üben & sprechen", "Practise & speak"], apply: ["Anwenden", "Apply"], review: ["Wiederholungstag", "Review day"],
  mock: ["Probeprüfung", "Mock exam"], milestone: ["Überleben geschafft!", "Survival done!"], consolidate: ["Festigen & erweitern", "Consolidate & expand"]
};
const TRAINER_NAME = {
  hoeren: ["Hörtraining", "Listening practice"], sprechen: ["Sprechtraining", "Speaking practice"], schreiben: ["Schreibtraining", "Writing practice"],
  lesen: ["Lesetraining", "Reading practice"], verben: ["Verbtraining", "Verb practice"], grammatik: ["Grammatik-Drill", "Grammar drill"], wortschatz: ["Wortschatz-Training", "Vocabulary practice"]
};
function goalsFor(i) {
  const d = planDay(i), t = T(), l = d.lesson && lessonById(d.lesson), g = [];
  const due = dueCards().length;
  const focus = weakest(d.level);
  g.push({ k: "srs", de: "Fällige Karten wiederholen", en: "Review due flashcards", done: due === 0, go: "#karten", min: 8, note: due ? `${due}` : "✓" });
  if (d.type === "learn") {
    g.push({ k: "learn", de: `Lektion lesen & anhören: ${l.title[0]}`, en: `Read & listen to lesson: ${l.title[1]}`, done: t.opened.includes(l.id), go: "#l-" + l.id, min: 10 });
    g.push({ k: "cards", de: `Neue Wörter lernen (${l.vocab.length})`, en: `Learn new words (${l.vocab.length})`, done: l.vocab.every(v => S.cards[v[0]]?.reps > 0), go: "#l-" + l.id + "-karten", min: 8 });
    g.push({ k: "shadow", de: "5 Sätze laut nachsprechen", en: "Repeat 5 sentences aloud", done: t.shadow >= 5, go: "#l-" + l.id + "-sprechen", min: 5 });
  }
  if (d.type === "practice") {
    g.push({ k: "quiz", de: `Quiz bestehen (≥ 80 %): ${l.title[0]}`, en: `Pass the quiz (≥ 80%): ${l.title[1]}`, done: (S.lessons[l.id]?.best || 0) >= 80, go: "#l-" + l.id + "-quiz", min: 10 });
    g.push({ k: "talk", de: "Sprechen: Rollenspiel mit dem Tutor (4 Antworten) oder Sprechtraining", en: "Speak: role-play with the tutor (4 replies) or speaking practice", done: t.tutor >= 4 || (t.trainer.sprechen || 0) >= 1, go: "#tutor", min: 10 });
  }
  if (d.type === "apply") {
    g.push({ k: "write", de: "Schreiben: Schreibtraining oder 3 eigene Sätze vom Tutor korrigieren lassen", en: "Write: writing practice or have the tutor correct 3 of your own sentences", done: (t.trainer.schreiben || 0) >= 1 || t.correct >= 3, go: "#ueben-schreiben", min: 10 });
    g.push({ k: "listen", de: "Hörtraining", en: "Listening practice", done: (t.trainer.hoeren || 0) >= 1, go: "#ueben-hoeren", min: 8 });
  }
  if (d.type === "review") g.push({ k: "mix", de: "Gemischtes Quiz: alles bisher", en: "Mixed quiz: everything so far", done: t.mix >= 1, go: "#ueben-mix", min: 12 });
  if (d.type === "mock") g.push({ k: "mock", de: `Probeprüfung ${d.level} machen`, en: `Take the ${d.level} mock exam`, done: t.mock.includes(d.level), go: "#pruefung-" + d.level, min: 75 });
  if (d.type === "milestone") g.push({ k: "talk", de: "Feier: 10 Minuten Rollenspiel in der Bäckerei", en: "Celebrate: 10 minutes of bakery role-play", done: t.tutor >= 6, go: "#tutor", min: 10 });
  if (d.type === "consolidate") g.push({ k: "input", de: "15 Minuten echtes Deutsch hören oder lesen (z. B. nachrichtenleicht.de, DW „Langsam gesprochene Nachrichten“)", en: "15 minutes of real German input (e.g. nachrichtenleicht.de, DW slow news)", manual: true, min: 15 });
  if (d.type !== "mock") g.push({ k: "focus", de: `Fokus auf deinen Schwachpunkt: ${TRAINER_NAME[focus][0]}`, en: `Focus on your weak spot: ${TRAINER_NAME[focus][1]}`, done: (t.trainer[focus] || 0) >= 1, go: "#ueben-" + focus, min: 7, focus });
  const m = l ? l.mission : (d.type === "review" ? ["Benutze heute drei Sätze aus dieser Woche draußen in Berlin.", "Use three sentences from this week out in Berlin today."] : null);
  if (m && d.type !== "mock") g.push({ k: "mission", de: "Mission in Berlin: " + m[0], en: "Berlin mission: " + m[1], manual: true, min: 3 });
  for (const x of g) if (x.manual) x.done = !!S.manual[`${i}:${x.k}`];
  return g;
}

/* ═══════════ Speech ═══════════ */
let voices = [];
function loadVoices() { try { voices = speechSynthesis.getVoices().filter(v => /^de/i.test(v.lang)); } catch (e) { voices = []; } }
if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function speak(text, rate) {
  if (!("speechSynthesis" in window)) { toast(H("Dein Browser kann keine Sprachausgabe.", "Your browser has no speech output.")); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text).replace(/[…_]+/g, " ").replace(/–/g, ","));
  u.lang = "de-DE"; u.rate = rate || S.settings.rate;
  const v = voices.find(v => v.name === S.settings.voice) || voices.find(v => /de-DE/i.test(v.lang)) || voices[0];
  if (v) u.voice = v;
  speechSynthesis.speak(u); return u;
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen() {
  return new Promise((res, rej) => {
    if (!SR) return rej("no");
    const r = new SR(); r.lang = "de-DE"; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = e => res([...e.results[0]].map(a => a.transcript)); r.onerror = e => rej(e.error); r.onend = () => res([]);
    r.start();
  });
}
const norm = s => String(s).toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[.,!?;:„“"'»«()…–\-]/g, " ").replace(/\s+/g, " ").trim();
const stripArt = s => s.replace(/^(der|die|das) /, "");
function sameAnswer(given, want) {
  const a = norm(given), b = norm(want);
  return a === b || stripArt(a) === stripArt(b) || (b.includes("/") && b.split("/").some(p => norm(p) === a));
}
function overlap(said, want) { // word overlap 0..1
  const w = norm(want).split(" ").filter(Boolean), s = new Set(norm(said).split(" "));
  return w.length ? w.filter(x => s.has(x)).length / w.length : 0;
}
const speakBtn = (text, cls = "") => `<button class="spk ${cls}" data-say="${esc(text)}" aria-label="anhören">${cls.includes("slow") ? ICON.slow : ICON.spk}</button>`;
const ICON = {
  spk: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  mic: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  slow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

/* ═══════════ Flashcards (spaced repetition) ═══════════ */
const INTERVALS = [0, 1, 2, 4, 8, 16, 32, 64, 120];
function addCards(lesson) {
  for (const [de, en] of lesson.vocab) if (!S.cards[de]) S.cards[de] = { de, en, lv: lesson.level, box: 0, due: Date.now(), reps: 0, lapses: 0 };
}
function dueCards() { const now = Date.now(); return Object.values(S.cards).filter(c => c.due <= now); }
function rate(card, r) { // r: 0 again, 1 good, 2 easy
  card.reps++;
  if (r === 0) { card.lapses++; card.box = Math.max(1, Math.min(card.box, 1)); card.due = Date.now() + 60 * 1000; }
  else { card.box = Math.min(INTERVALS.length - 1, card.box + r); card.due = Date.now() + INTERVALS[card.box] * 86400000 - 3600000; }
  record("wortschatz", card.lv === "X" ? currentLevel() : card.lv, r ? 1 : 0); noteErr("v:" + card.de, r === 0);
  T().reviewed++; xp(1); save();
}

/* ═══════════ Questions ═══════════ */
function studied() { // lessons the learner has opened, or the first one
  const o = COURSE.filter(l => S.lessons[l.id]?.opened);
  return o.length ? o : [COURSE[0]];
}
const allVocab = ls => ls.flatMap(l => l.vocab.map(v => ({ de: v[0], en: v[1], l })));
const allEx = ls => ls.flatMap(l => l.ex.map(v => ({ de: v[0], en: v[1], l })));
function weightPick(items, keyFn, n) { // prefer items with past errors
  const sc = items.map(it => ({ it, w: 1 + 3 * (S.errs[keyFn(it)] || 0) + Math.random() }));
  return sc.sort((a, b) => b.w - a.w).slice(0, n).map(x => x.it);
}
function distract(pool, right, field, n = 3) {
  const others = shuffle(pool.filter(p => p[field] !== right[field]).map(p => p[field]));
  return shuffle([right[field], ...[...new Set(others)].slice(0, n - 1)]);
}
const Q = {
  deEn: (v, pool) => ({ t: "mc", skill: "lesen", also: "wortschatz", lv: v.l.level, key: "v:" + v.de, say: v.de, prompt: `<div class="qbig">${esc(v.de)} ${speakBtn(v.de)}</div><div class="qhint">${H("Was bedeutet das?", "What does it mean?")}</div>`, opts: distract(pool, v, "en"), ans: v.en }),
  enDe: (v, pool) => ({ t: "mc", skill: "wortschatz", lv: v.l.level, key: "v:" + v.de, prompt: `<div class="qbig en">${esc(v.en)}</div><div class="qhint">${H("Wie sagt man das auf Deutsch?", "How do you say this in German?")}</div>`, opts: distract(pool, v, "de"), ans: v.de, sayAns: true }),
  listen: (v, pool) => ({ t: "mc", skill: "hoeren", lv: v.l.level, key: "v:" + v.de, autoSay: v.de, prompt: `<div class="qbig">${speakBtn(v.de, "big")} ${speakBtn(v.de, "slow")}</div><div class="qhint">${H("Hör zu. Was hörst du?", "Listen. What do you hear?")}</div>`, opts: distract(pool, v, "de"), ans: v.de }),
  type: v => ({ t: "type", skill: "schreiben", also: "wortschatz", lv: v.l.level, key: "v:" + v.de, prompt: `<div class="qbig en">${esc(v.en)}</div><div class="qhint">${H("Schreib es auf Deutsch.", "Write it in German.")}</div>`, ans: v.de }),
  dictation: e => ({ t: "type", skill: "hoeren", also: "schreiben", lv: e.l.level, key: "e:" + e.de, autoSay: e.de, loose: true, prompt: `<div class="qbig">${speakBtn(e.de, "big")} ${speakBtn(e.de, "slow")}</div><div class="qhint">${H("Diktat: Schreib, was du hörst.", "Dictation: write what you hear.")}</div>`, ans: e.de }),
  order: e => { const toks = e.de.split(" ").filter(w => w !== "–"); return { t: "order", skill: "grammatik", lv: e.l.level, key: "e:" + e.de, prompt: `<div class="qbig en">${esc(e.en)}</div><div class="qhint">${H("Bau den Satz.", "Build the sentence.")}</div>`, toks: shuffle(toks), ans: toks.join(" ") }; },
  sentence: (e, pool) => ({ t: "mc", skill: "lesen", lv: e.l.level, key: "e:" + e.de, prompt: `<div class="qmid">${esc(e.de)} ${speakBtn(e.de)}</div><div class="qhint">${H("Was bedeutet der Satz?", "What does the sentence mean?")}</div>`, opts: distract(pool, e, "en"), ans: e.en }),
  drill: (d, l, i) => ({ t: "mc", skill: VERB_LESSONS.includes(l.id) ? "verben" : "grammatik", lv: l.level, key: `d:${l.id}:${i}`, prompt: `<div class="qmid">${H(d[0], d[3] || "")}</div><div class="qhint">${H("Was passt in die Lücke?", "What fills the gap?")}</div>`, opts: shuffle(d[2]), ans: d[1], sayFull: d[0].replace("___", d[1]) }),
  shadow: e => ({ t: "shadow", skill: "sprechen", lv: e.l.level, key: "e:" + e.de, prompt: `<div class="qmid">${H(e.de, e.en)} ${speakBtn(e.de)} ${speakBtn(e.de, "slow")}</div><div class="qhint">${H("Hör zu und sprich nach.", "Listen and repeat.")}</div>`, ans: e.de, autoSay: e.de }),
  verb: () => {
    const L = currentLevel(); const pool = VERBS.filter(v => levelsUpTo(L).includes(v[5]));
    const v = pool[Math.floor(Math.random() * pool.length)];
    const mode = L !== "A1" && v[3] && Math.random() < 0.35 ? (L === "B1" && Math.random() < 0.5 ? "prät" : "perf") : "pres";
    if (mode === "pres") { const p = Math.floor(Math.random() * 6); const right = v[2][p]; const opts = shuffle([...new Set([right, ...shuffle(v[2].filter(x => x !== right))])].slice(0, 3)); if (!opts.includes(right)) opts[0] = right;
      return { t: "mc", skill: "verben", lv: v[5], key: "vb:" + v[0], prompt: `<div class="qmid"><b>${PRONOUNS[p]}</b> + ${H(v[0], v[1])}</div><div class="qhint">${H("Welche Form ist richtig?", "Which form is correct?")}</div>`, opts: shuffle(opts), ans: right, sayFull: PRONOUNS[p].split("/")[0] + " " + right }; }
    if (mode === "perf") { const others = shuffle(VERBS.filter(x => x[3] && x !== v)).slice(0, 2).map(x => x[3]); const wrongAux = v[3].startsWith("ist") ? v[3].replace(/^ist/, "hat") : v[3].replace(/^hat/, "ist");
      return { t: "mc", skill: "verben", lv: "A2", key: "vb:" + v[0], prompt: `<div class="qmid">${H("Perfekt", "present perfect")}: er + ${H(v[0], v[1])}</div><div class="qhint">${H("Welche Form ist richtig?", "Which form is correct?")}</div>`, opts: shuffle([v[3], wrongAux, others[0]]), ans: v[3], sayFull: "er " + v[3] }; }
    const others = shuffle(VERBS.filter(x => x[4] && x !== v)).slice(0, 2).map(x => x[4]);
    return { t: "mc", skill: "verben", lv: "B1", key: "vb:" + v[0], prompt: `<div class="qmid">${H("Präteritum", "simple past")}: er + ${H(v[0], v[1])}</div><div class="qhint">${H("Welche Form ist richtig?", "Which form is correct?")}</div>`, opts: shuffle([v[4], ...others]), ans: v[4], sayFull: "er " + v[4] };
  }
};
const okOrder = e => { const n = e.de.split(" ").filter(w => w !== "–").length; return n >= 3 && n <= 10; };
function lessonQuiz(l) {
  const pool = allVocab([l]); const exs = allEx([l]); const qs = [];
  l.drills.forEach((d, i) => qs.push(Q.drill(d, l, i)));
  pick(pool, 2).forEach(v => qs.push(Q.deEn(v, pool)));
  pick(pool, 2).forEach(v => qs.push(Q.enDe(v, pool)));
  pick(pool, 1).forEach(v => qs.push(Q.listen(v, pool)));
  pick(pool.filter(v => v.de.length < 22), 1).forEach(v => qs.push(Q.type(v)));
  pick(exs.filter(okOrder), 1).forEach(e => qs.push(Q.order(e)));
  return shuffle(qs);
}
function trainerQuiz(skill, n = 10) {
  const ls = studied(); const pool = allVocab(ls), exs = allEx(ls), qs = [];
  const vk = v => "v:" + v.de, ek = e => "e:" + e.de;
  if (skill === "hoeren") { weightPick(pool, vk, 6).forEach(v => qs.push(Q.listen(v, pool))); weightPick(exs, ek, 4).forEach(e => qs.push(Q.dictation(e))); }
  if (skill === "sprechen") weightPick(exs, ek, 6).forEach(e => qs.push(Q.shadow(e)));
  if (skill === "schreiben") { weightPick(pool.filter(v => v.de.length < 24), vk, 6).forEach(v => qs.push(Q.type(v))); weightPick(exs.filter(okOrder), ek, 2).forEach(e => qs.push(Q.order(e))); weightPick(exs, ek, 2).forEach(e => qs.push(Q.dictation(e))); }
  if (skill === "lesen") { weightPick(exs, ek, 6).forEach(e => qs.push(Q.sentence(e, exs))); weightPick(pool, vk, 4).forEach(v => qs.push(Q.deEn(v, pool))); }
  if (skill === "verben") { for (let i = 0; i < n; i++) qs.push(Q.verb()); const vls = ls.filter(l => VERB_LESSONS.includes(l.id)); vls.forEach(l => l.drills.forEach((d, i) => Math.random() < 0.4 && qs.push(Q.drill(d, l, i)))); }
  if (skill === "grammatik") { const ds = ls.flatMap(l => l.drills.map((d, i) => ({ d, l, i }))); weightPick(ds, x => `d:${x.l.id}:${x.i}`, 7).forEach(x => qs.push(Q.drill(x.d, x.l, x.i))); weightPick(exs.filter(okOrder), ek, 3).forEach(e => qs.push(Q.order(e))); }
  if (skill === "wortschatz") { weightPick(pool, vk, 5).forEach(v => qs.push(Q.deEn(v, pool))); weightPick(pool, vk, 5).forEach(v => qs.push(Q.enDe(v, pool))); }
  if (skill === "mix") {
    const w = weakest(); const ds = ls.flatMap(l => l.drills.map((d, i) => ({ d, l, i })));
    weightPick(ds, x => `d:${x.l.id}:${x.i}`, 4).forEach(x => qs.push(Q.drill(x.d, x.l, x.i)));
    weightPick(pool, vk, 3).forEach(v => qs.push(Math.random() < .5 ? Q.deEn(v, pool) : Q.enDe(v, pool)));
    pick(pool, 2).forEach(v => qs.push(Q.listen(v, pool))); pick(exs.filter(okOrder), 1).forEach(e => qs.push(Q.order(e)));
    trainerQuiz(w, 4).slice(0, 3).forEach(q => qs.push(q));
  }
  return shuffle(qs).slice(0, skill === "mix" ? 14 : n);
}

/* ═══════════ Quiz runner ═══════════ */
function runQuiz(host, qs, { title, onDone }) {
  let i = 0, right = 0; const res = [];
  const draw = () => {
    if (i >= qs.length) return finish();
    const q = qs[i];
    host.innerHTML = `<div class="quiz">
      <div class="qtop"><span>${esc(title)}</span><span>${i + 1} / ${qs.length}</span></div>
      <div class="bar thin"><i style="width:${pct(i / qs.length)}%"></i></div>
      <div class="qbody">${q.prompt}</div>
      <div class="qans" id="qa"></div>
      <div class="qfb" id="qfb"></div></div>`;
    const qa = $("#qa", host);
    if (q.t === "mc") {
      qa.innerHTML = q.opts.map(o => `<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("");
      $$(".opt", qa).forEach(b => b.onclick = () => judge(b.dataset.o === q.ans ? 1 : 0, b));
    } else if (q.t === "type") {
      qa.innerHTML = `<div class="typerow"><input id="qin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="…"><button class="btn" id="qok">${H("Prüfen", "Check")}</button></div>
        <div class="umlauts">${["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map(c => `<button class="um">${c}</button>`).join("")}</div>`;
      const inp = $("#qin", qa); inp.focus();
      $$(".um", qa).forEach(b => b.onclick = () => { inp.value += b.textContent; inp.focus(); });
      const go = () => { if (!inp.value.trim()) return; const s = q.loose ? overlap(inp.value, q.ans) : (sameAnswer(inp.value, q.ans) ? 1 : 0); judge(q.loose ? (s >= 0.85 ? 1 : s >= 0.5 ? 0.5 : 0) : s, inp); };
      $("#qok", qa).onclick = go; inp.onkeydown = e => e.key === "Enter" && go();
    } else if (q.t === "order") {
      const built = [];
      const paint = () => { qa.innerHTML = `<div class="built">${built.map((t, k) => `<button class="tok on" data-k="${k}">${esc(t.w)}</button>`).join("") || `<span class="muted">${H("Tippe die Wörter in der richtigen Reihenfolge.", "Tap the words in the right order.")}</span>`}</div>
        <div class="toks">${q.toks.map((w, k) => built.some(b => b.k === k) ? `<span class="tok ghost">${esc(w)}</span>` : `<button class="tok" data-t="${k}">${esc(w)}</button>`).join("")}</div>
        <button class="btn" id="qok" ${built.length === q.toks.length ? "" : "disabled"}>${H("Prüfen", "Check")}</button>`;
        $$("[data-t]", qa).forEach(b => b.onclick = () => { built.push({ k: +b.dataset.t, w: q.toks[+b.dataset.t] }); paint(); });
        $$("[data-k]", qa).forEach(b => b.onclick = () => { built.splice(+b.dataset.k, 1); paint(); });
        const ok = $("#qok", qa); if (ok) ok.onclick = () => judge(built.map(b => b.w).join(" ") === q.ans ? 1 : 0, ok);
      }; paint();
    } else if (q.t === "shadow") {
      qa.innerHTML = SR ? `<button class="btn mic" id="qmic">${ICON.mic} ${H("Sprechen", "Speak")}</button>`
        : `<div class="muted">${H("Kein Mikrofon-Erkennen in diesem Browser (Chrome kann es). Sag den Satz laut und bewerte dich selbst:", "No speech recognition in this browser (Chrome has it). Say it aloud and rate yourself:")}</div>
           <div class="row"><button class="btn ghost" data-self="1">${H("Gut gesagt", "Said it well")}</button><button class="btn ghost" data-self="0.5">${H("Schwierig", "Difficult")}</button></div>`;
      const m = $("#qmic", qa);
      if (m) m.onclick = async () => {
        m.disabled = true; m.classList.add("rec"); m.innerHTML = `${ICON.mic} ${H("Ich höre zu …", "Listening …")}`;
        try { const alts = await listen(); const best = Math.max(0, ...alts.map(a => overlap(a, q.ans))); q.heard = alts[0] || "";
          judge(best >= 0.8 ? 1 : best >= 0.5 ? 0.5 : 0, m); }
        catch (e) { m.disabled = false; m.classList.remove("rec"); m.innerHTML = `${ICON.mic} ${H("Nochmal", "Again")}`; toast(H("Mikrofon nicht verfügbar – erlaube den Zugriff oder bewerte dich selbst.", "Microphone unavailable – allow access or rate yourself.")); }
      };
      $$("[data-self]", qa).forEach(b => b.onclick = () => judge(+b.dataset.self, b));
    }
    if (q.autoSay) setTimeout(() => speak(q.autoSay), 250);
  };
  const judge = (score, el) => {
    const q = qs[i]; if (q.judged) return; q.judged = true;
    right += score; res.push({ q, score });
    record(q.skill, q.lv, score); if (q.also) record(q.also, q.lv, score); noteErr(q.key, score < 1); xp(score >= 1 ? 2 : 1);
    if (q.skill === "sprechen") T().shadow++;
    $$("#qa button, #qa input", host).forEach(b => b.disabled = true);
    if (q.t === "mc") $$(".opt", host).forEach(b => { if (b.dataset.o === q.ans) b.classList.add("right"); else if (b === el) b.classList.add("wrong"); });
    const good = score >= 1, half = score > 0 && score < 1;
    $("#qfb", host).innerHTML = `<div class="fb ${good ? "ok" : half ? "half" : "bad"}">
      <b>${good ? H("Richtig!", "Correct!") : half ? H("Fast!", "Almost!") : H("Nicht ganz.", "Not quite.")}</b>
      ${!good ? `<div>${H("Richtig ist:", "The answer is:")} <b>${esc(q.sayFull || q.ans)}</b> ${speakBtn(q.sayFull || q.ans)}</div>` : ""}
      ${q.heard ? `<div class="muted">${H("Gehört:", "Heard:")} „${esc(q.heard)}“</div>` : ""}
      <button class="btn" id="qnext">${H("Weiter", "Next")} →</button></div>`;
    if (good && (q.sayFull || q.sayAns)) speak(q.sayFull || q.ans);
    const nx = $("#qnext", host); nx.focus(); nx.onclick = () => { i++; draw(); };
    save();
  };
  const finish = () => {
    const score = qs.length ? right / qs.length : 0;
    const wrong = res.filter(r => r.score < 1);
    host.innerHTML = `<div class="quiz done"><div class="ring big" style="--p:${pct(score)}"><span>${pct(score)}%</span></div>
      <h3>${score >= 0.8 ? H("Super gemacht!", "Great job!") : score >= 0.5 ? H("Gut! Noch ein bisschen üben.", "Good! A bit more practice.") : H("Weiter üben – du schaffst das!", "Keep practising – you'll get there!")}</h3>
      ${wrong.length ? `<div class="panel inset"><div class="lbl">${H("Diese Fehler übst du später nochmal:", "You'll practise these mistakes again later:")}</div>${wrong.map(r => `<div class="miss">${esc(r.q.sayFull || r.q.ans)} ${speakBtn(r.q.sayFull || r.q.ans)}</div>`).join("")}</div>` : ""}
      <div class="row center"><button class="btn" id="again">${H("Nochmal", "Again")}</button><button class="btn ghost" id="back">${H("Zurück", "Back")}</button></div></div>`;
    $("#again", host).onclick = () => onDone && onDone(score, true);
    $("#back", host).onclick = () => onDone && onDone(score, false);
    onDone && onDone(score, null); save();
  };
  draw();
}

/* ═══════════ Tooltip (English on hover / tap) ═══════════ */
const tip = document.createElement("div"); tip.id = "tip"; document.body.appendChild(tip);
let tipTimer, tipShownAt = 0;
function showTip(el) {
  const en = el.dataset.en || "", de = el.dataset.de || el.textContent.trim(); if (!en && !de) return;
  let note = "";
  if (!en && el.dataset.mi != null && typeof TUTOR !== "undefined" && TUTOR.engine) { const msg = TUTOR.msgs[+el.dataset.mi]; if (msg && msg.en && msg.en !== "…") note = msg.en; else { note = "(Übersetzung kommt … / translating …)"; if (msg && msg.role === "assistant") translateMsg(+el.dataset.mi); } }
  tip.innerHTML = glossHtml(de, en || note); tip.style.display = "block"; tipShownAt = Date.now();
  const r = el.getBoundingClientRect(), tr = tip.getBoundingClientRect();
  let x = r.left + r.width / 2 - tr.width / 2; x = Math.max(8, Math.min(innerWidth - tr.width - 8, x));
  let y = r.top - tr.height - 8; if (y < 8) y = r.bottom + 8; if (y + tr.height > innerHeight - 8) y = Math.max(8, innerHeight - tr.height - 8);
  tip.style.left = x + "px"; tip.style.top = y + "px";
}
const hideTip = () => { tip.style.display = "none"; };
document.addEventListener("mouseover", e => { const h = e.target.closest(".h"); if (h) showTip(h); else hideTip(); });
document.addEventListener("touchstart", e => { const h = e.target.closest(".h"); clearTimeout(tipTimer); if (h) { showTip(h); tipTimer = setTimeout(hideTip, 2600); } else hideTip(); }, { passive: true });
document.addEventListener("scroll", () => { if (Date.now() - tipShownAt > 400) hideTip(); }, true);
document.addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) { e.stopPropagation(); speak(b.dataset.say, b.classList.contains("slow") ? 0.6 : undefined); } }, true);

function toast(html) { const t = document.createElement("div"); t.className = "toast"; t.innerHTML = html; document.body.appendChild(t); setTimeout(() => t.remove(), 3500); }

/* ═══════════ Views ═══════════ */
const NAV = [["heute", "Heute", "Today"], ["kurs", "Kurs", "Course"], ["ueben", "Üben", "Practise"], ["karten", "Karten", "Cards"], ["tutor", "Tutor", "Tutor"], ["pruefung", "Prüfungen", "Mock exams"], ["fortschritt", "Fortschritt", "Progress"]];
function streak() {
  let n = 0, d = new Date(); if (!S.activity[todayStr(d)]) d = addDays(d, -1);
  while (S.activity[todayStr(d)]) { n++; d = addDays(d, -1); } return n;
}
function header(active) {
  return `<header><div class="brand">${H("Deutsch", "German")}<small>${H(S.name ? S.name + "s Kurs" : "Null bis B1", S.name ? S.name + "'s course" : "zero to B1")}</small></div>
    <div class="hstats"><span class="pill">${H("🔥 " + streak(), "day streak")}</span><span class="pill">${H("Tag " + (S.day + 1), "Plan day " + (S.day + 1))}</span><span class="pill">${H((S.activity[todayStr()] || 0) + " XP", "points today")}</span>
    <a class="pill gear" href="#einstellungen">${H("⚙", "Settings")}</a></div></header>
    <nav>${NAV.map(n => `<a href="#${n[0]}" class="${active === n[0] ? "on" : ""}">${H(n[1], n[2])}</a>`).join("")}</nav>`;
}
function render() {
  T(); const h = (location.hash || "#heute").slice(1); const app = $("#app"); hideTip();
  let main = "", act = h.split("-")[0];
  if (h.startsWith("l-")) { act = "kurs"; }
  app.innerHTML = header(act) + `<main id="main"></main>` + (storageOK ? "" : `<div class="warn">${H("Speichern ist hier blockiert – dein Fortschritt geht beim Schließen verloren.", "Saving is blocked here – progress is lost when you close the page.")}</div>`);
  main = $("#main");
  if (h.startsWith("l-")) return viewLesson(main, h.slice(2));
  if (h.startsWith("ueben")) return viewPractice(main, h.split("-")[1]);
  if (h.startsWith("pruefung")) return viewMocks(main, h.split("-")[1]);
  ({ heute: viewToday, kurs: viewCourse, karten: viewCards, tutor: viewTutor, fortschritt: viewProgress, einstellungen: viewSettings }[h] || viewToday)(main);
}
addEventListener("hashchange", render);

function greet() { const h = new Date().getHours(); return h < 11 ? ["Guten Morgen", "Good morning"] : h < 18 ? ["Hallo", "Hello"] : ["Guten Abend", "Good evening"]; }
function viewToday(m) {
  if (!S.welcomed) return viewWelcome(m);
  const i = S.day, d = planDay(i), goals = goalsFor(i), l = d.lesson && lessonById(d.lesson);
  const done = goals.filter(g => g.done).length, mins = goals.reduce((a, g) => a + g.min, 0);
  const g = greet(); const L = currentLevel(); const w = weakest(L), st = strongest(L);
  m.innerHTML = `
  <section class="hero panel">
    <div><div class="eyebrow">${H(`Tag ${i + 1} von ${PLAN.length}`, `Day ${i + 1} of ${PLAN.length}`)} · ${H(TYPE_NAME[d.type][0], TYPE_NAME[d.type][1])} · ≈ ${mins} ${H("Min.", "min")}</div>
    <h1>${H(g[0] + (S.name ? ", " + S.name : "") + "!", g[1] + (S.name ? ", " + S.name : "") + "!")}</h1>
    <p class="lead">${l ? `${H("Heute", "Today")}: <b>${HP(l.title)}</b> – ${HP(l.goal)}` : d.type === "mock" ? H(`Heute testest du dein ${d.level}-Niveau.`, `Today you test your ${d.level} level.`) : d.type === "milestone" ? H("Du kannst jetzt einkaufen, bestellen und nach dem Weg fragen!", "You can now shop, order and ask the way!") : H("Heute festigst du, was du gelernt hast.", "Today you consolidate what you've learned.")}</p></div>
    <div class="ring" style="--p:${pct(done / goals.length)}"><span>${done}/${goals.length}</span></div>
  </section>
  <section class="panel"><h2>${H("Tagesziele", "Daily goals")}</h2>
    <ul class="goals">${goals.map(x => `<li class="${x.done ? "done" : ""}">
      ${x.manual ? `<button class="chk" data-man="${x.k}" aria-label="abhaken">${x.done ? "✓" : ""}</button>` : `<span class="chk">${x.done ? "✓" : ""}</span>`}
      <div class="gtxt">${H(x.de, x.en)}${x.focus ? ` <span class="tag">${H("angepasst", "adapted to you")}</span>` : ""}<small>≈ ${x.min} ${H("Min.", "min")}${x.note && !x.done ? " · " + x.note + " " + H("fällig", "due") : ""}</small></div>
      ${x.go ? `<a class="btn sm ${x.done ? "ghost" : ""}" href="${x.go}">${x.done ? H("Nochmal", "Again") : H("Los", "Go")}</a>` : ""}</li>`).join("")}</ul>
    <div class="row end"><button class="btn ${done === goals.length ? "" : "ghost"}" id="finish">${done === goals.length ? H("Tag abschließen ✓", "Finish the day ✓") : H(`Tag abschließen (${done}/${goals.length})`, `Finish the day (${done}/${goals.length})`)}</button></div>
  </section>
  <section class="grid2">
    <div class="panel"><h2>${H("Dein Stand", "Where you are")}</h2>
      <p>${H(`Ziel jetzt: ${L}`, `Current target: ${L}`)} · ${H(pct(levelReadiness(L)) + " % bereit", pct(levelReadiness(L)) + "% ready")}</p>
      <div class="bar"><i style="width:${pct(levelReadiness(L))}%"></i></div>
      <p class="small">${st ? H(`Stärke: ${SKILL[st][1]}.`, `Strength: ${SKILL[st][2]}.`) + " " : ""}${H(`Schwachpunkt: ${SKILL[w][1]} – dein Plan übt das jeden Tag extra.`, `Weak spot: ${SKILL[w][2]} – your plan adds extra practice for it every day.`)}</p>
      <a class="btn ghost sm" href="#fortschritt">${H("Alle Fähigkeiten", "All skills")}</a></div>
    <div class="panel"><h2>${H("Wochenplan", "This week")}</h2>
      <ol class="week">${[0, 1, 2, 3, 4, 5, 6].map(k => { const dd = planDay(i + k), ll = dd.lesson && lessonById(dd.lesson);
        return `<li class="${k === 0 ? "now" : ""}"><span>${H("Tag " + (i + k + 1), "Day " + (i + k + 1))}</span><div>${H(TYPE_NAME[dd.type][0], TYPE_NAME[dd.type][1])}${ll ? " · " + HP(ll.title) : dd.level && dd.type === "mock" ? " " + dd.level : ""}</div></li>`; }).join("")}</ol></div>
  </section>`;
  $$("[data-man]", m).forEach(b => b.onclick = () => { const k = `${i}:${b.dataset.man}`; S.manual[k] = !S.manual[k]; if (S.manual[k]) { xp(3); if (b.dataset.man === "mission") record("sprechen", d.level, 1); } save(); render(); });
  $("#finish", m).onclick = () => {
    if (done < goals.length && !$("#finish", m).dataset.sure) { $("#finish", m).dataset.sure = 1; $("#finish", m).innerHTML = H("Wirklich? Nochmal klicken zum Überspringen.", "Sure? Click again to skip ahead."); return; }
    S.daysDone[i] = todayStr(); S.day = i + 1; xp(5); snapshot(); save(); toast(H("Tag geschafft! 🎉", "Day done! 🎉")); render(); scrollTo(0, 0);
  };
}
function viewWelcome(m) {
  m.innerHTML = `<section class="panel welcome">
    <h1>${H("Willkommen!", "Welcome!")}</h1>
    <p class="lead">${H("Dein Deutschkurs von null bis B1 – gemacht für das Leben in Berlin.", "Your German course from zero to B1 – made for life in Berlin.")}</p>
    <ul class="bul"><li>${H("Jeden Tag ein Plan mit klaren Zielen (30–45 Minuten).", "A plan with clear goals every day (30–45 minutes).")}</li>
    <li>${H("In 3–4 Wochen sprichst du im Laden und auf der Straße.", "In 3–4 weeks you'll speak in shops and on the street.")}</li>
    <li>${H("Fahr mit der Maus über deutschen Text (oder tippe darauf), um Englisch zu sehen.", "Hover over German text (or tap it) to see English.")}</li>
    <li>${H("Dein Fortschritt bleibt in diesem Browser gespeichert.", "Your progress is saved in this browser.")}</li></ul>
    <label>${H("Wie heißt du?", "What's your name?")}<input id="wname" value="${esc(S.name)}" placeholder="Name"></label>
    <label>${H("Minuten pro Tag", "Minutes per day")}<select id="wmin">${[20, 30, 40, 45, 60].map(x => `<option ${x === S.settings.minutes ? "selected" : ""}>${x}</option>`).join("")}</select></label>
    <div class="row"><button class="btn" id="wgo">${H("Los geht's!", "Let's go!")}</button></div></section>`;
  $("#wgo", m).onclick = () => { S.name = $("#wname", m).value.trim(); S.settings.minutes = +$("#wmin", m).value; S.welcomed = true; S.start = todayStr(); snapshot(); save(); render(); };
}

function lessonState(l) { const s = S.lessons[l.id] || {}; return s.best >= 80 ? "done" : s.opened ? "open" : ""; }
function viewCourse(m) {
  m.innerHTML = LEVELS.map(Lv => { const ls = COURSE.filter(l => l.level === Lv.id); const dn = ls.filter(l => lessonState(l) === "done").length;
    return `<section class="panel"><div class="lvhead"><div><h2>${HP(Lv.name)}</h2><div class="muted">${HP(Lv.sub)}</div></div><div class="muted">${dn}/${ls.length}</div></div>
    <div class="bar thin"><i style="width:${pct(dn / ls.length)}%"></i></div>
    <div class="lessons">${ls.map((l, k) => `<a class="lcard ${lessonState(l)}" href="#l-${l.id}"><span class="num">${Lv.id === "S" ? "Ü" : Lv.id}·${k + 1}</span><b>${HP(l.title)}</b><small>${HP(l.goal)}</small>
      <span class="score">${S.lessons[l.id]?.best != null ? S.lessons[l.id].best + " %" : ""}</span></a>`).join("")}</div></section>`; }).join("")
    + `<section class="panel"><h2>${H("Der ganze Plan", "The whole plan")}</h2><p class="small muted">${H(`${PLAN.length} Tage. Danach geht es mit Festigung weiter: Wiederholen, echtes Deutsch, Tutor.`, `${PLAN.length} days. After that it continues with consolidation: review, real German, tutor.`)}</p>
      <div class="planlist">${PLAN.map((d, k) => { const ll = d.lesson && lessonById(d.lesson); return `<div class="pday ${k < S.day ? "done" : k === S.day ? "now" : ""}"><span>${k + 1}</span>${H(TYPE_NAME[d.type][0], TYPE_NAME[d.type][1])}${ll ? " · " + HP(ll.title) : d.type === "mock" ? " " + d.level : ""}</div>`; }).join("")}</div></section>`;
}

function viewLesson(m, path) {
  const [id0, id1, tab0] = path.split("-"); const id = id1 && !["karten", "quiz", "sprechen"].includes(id1) ? id0 + "-" + id1 : id0;
  const tab = (id === id0 ? id1 : tab0) || "lernen";
  const l = lessonById(id); if (!l) return viewCourse(m);
  const st = (S.lessons[l.id] ??= {}); st.opened = true; addCards(l);
  if (tab === "lernen" && !T().opened.includes(l.id)) { T().opened.push(l.id); xp(2); }
  save();
  const idx = COURSE.indexOf(l), prev = COURSE[idx - 1], next = COURSE[idx + 1];
  const tabs = [["lernen", "Lernen", "Learn"], ["karten", "Karten", "Cards"], ["sprechen", "Sprechen", "Speak"], ["quiz", "Quiz", "Quiz"]];
  m.innerHTML = `<section class="panel"><div class="eyebrow"><a href="#kurs">${H("Kurs", "Course")}</a> · ${l.level === "S" ? H("Überleben", "Survival") : l.level}</div>
    <h1>${HP(l.title)}</h1><p class="lead">${HP(l.goal)}</p>
    <div class="tabs">${tabs.map(t => `<a href="#l-${l.id}${t[0] === "lernen" ? "" : "-" + t[0]}" class="${tab === t[0] ? "on" : ""}">${H(t[1], t[2])}</a>`).join("")}</div></section>
    <div id="lbody"></div>
    <div class="row between">${prev ? `<a class="btn ghost sm" href="#l-${prev.id}">← ${HP(prev.title)}</a>` : "<span></span>"}${next ? `<a class="btn ghost sm" href="#l-${next.id}">${HP(next.title)} →</a>` : ""}</div>`;
  const b = $("#lbody", m);
  if (tab === "lernen") {
    b.innerHTML = `<section class="panel"><h2>${H("So funktioniert's", "How it works")}</h2><ul class="gram">${l.grammar.map(g => `<li>${HP(g)}</li>`).join("")}</ul></section>
      <section class="panel"><div class="row between"><h2>${H("Wörter", "Words")}</h2><button class="btn ghost sm" id="playall">${ICON.spk} ${H("Alle anhören", "Play all")}</button></div>
      <div class="vocab">${l.vocab.map(v => `<div class="vrow">${speakBtn(v[0])}<span class="de h" data-en="${esc(v[1])}">${esc(v[0])}</span><span class="en">${esc(v[1])}</span></div>`).join("")}</div></section>
      <section class="panel"><h2>${H("Beispielsätze", "Example sentences")}</h2>
      <div class="exs">${l.ex.map(e => `<div class="ex">${speakBtn(e[0])} ${speakBtn(e[0], "slow")} ${H(e[0], e[1])}</div>`).join("")}</div></section>
      <section class="panel mission"><h2>${H("Deine Mission in Berlin", "Your Berlin mission")}</h2><p>${HP(l.mission)}</p></section>
      <div class="row center"><a class="btn" href="#l-${l.id}-karten">${H("Weiter: Karten lernen", "Next: learn the cards")} →</a></div>`;
    let stop = false; $("#playall", b).onclick = async () => { stop = false; for (const v of l.vocab) { if (stop) break; await new Promise(r => { const u = speak(v[0]); if (!u) return r(); u.onend = () => setTimeout(r, 500); }); } };
    addEventListener("hashchange", () => { stop = true; }, { once: true });
  }
  if (tab === "karten") cardSession(b, l.vocab.map(v => S.cards[v[0]]), { learn: true, done: () => { location.hash = "#l-" + l.id + "-sprechen"; } });
  if (tab === "sprechen") {
    const exs = allEx([l]);
    runQuiz(b, exs.map(e => Q.shadow(e)), { title: H("Nachsprechen", "Repeat after me"), onDone: (s, again) => { if (again === true) render(); else if (again === false) location.hash = "#l-" + l.id + "-quiz"; } });
  }
  if (tab === "quiz") {
    runQuiz(b, lessonQuiz(l), { title: "Quiz · " + l.title[0], onDone: (s, again) => {
      if (again === null) { const p = pct(s); st.tries = (st.tries || 0) + 1; st.best = Math.max(st.best || 0, p); if (p >= 80 && !st.doneAt) { st.doneAt = todayStr(); xp(10); } save(); }
      else if (again) render(); else location.hash = "#l-" + l.id; } });
  }
}

function cardSession(host, cards, { learn, done } = {}) {
  let queue = learn ? [...cards] : shuffle(cards); let n = 0; const total = queue.length;
  if (!queue.length) { host.innerHTML = `<section class="panel center"><h2>${H("Alles wiederholt! ✓", "All reviewed! ✓")}</h2><p class="muted">${H("Neue Karten kommen mit jeder Lektion dazu.", "New cards come with every lesson.")}</p><a class="btn" href="#heute">${H("Zu den Tageszielen", "To today's goals")}</a></section>`; return; }
  const draw = () => {
    if (!queue.length) { host.innerHTML = `<section class="panel center"><h2>${H("Fertig! ✓", "Done! ✓")}</h2><p>${H(`${n} Karten geübt.`, `${n} cards practised.`)}</p>${done ? `<button class="btn" id="cdone">${H("Weiter", "Continue")} →</button>` : `<a class="btn" href="#heute">${H("Zu den Tageszielen", "To today's goals")}</a>`}</section>`; if (done) $("#cdone", host).onclick = done; return; }
    const c = queue[0]; const rev = !learn && c.box >= 2 && Math.random() < 0.35;
    host.innerHTML = `<section class="panel flash"><div class="qtop"><span>${learn ? H("Neue Wörter", "New words") : H("Wiederholen", "Review")}</span><span>${queue.length} ${H("übrig", "left")}</span></div>
      <div class="bar thin"><i style="width:${pct((total - queue.length) / Math.max(1, total))}%"></i></div>
      <div class="card" id="card"><div class="front">${rev ? `<div class="qbig en">${esc(c.en)}</div>` : `<div class="qbig">${esc(c.de)}</div>`}<div class="muted small">${H("Tippen zum Umdrehen", "Tap to flip")}</div></div>
      <div class="back hidden"><div class="qbig">${H(c.de, c.en)} ${speakBtn(c.de)}</div><div class="en">${esc(c.en)}</div></div></div>
      <div class="row center rates hidden" id="rates"><button class="btn ghost" data-r="0">${H("Nochmal", "Again")}</button><button class="btn" data-r="1">${H("Gewusst", "Knew it")}</button><button class="btn ghost" data-r="2">${H("Leicht", "Easy")}</button></div></section>`;
    if (!rev) speak(c.de);
    const flip = () => { $(".front", host).classList.add("hidden"); $(".back", host).classList.remove("hidden"); $("#rates", host).classList.remove("hidden"); if (rev) speak(c.de); };
    $("#card", host).onclick = e => { if (!e.target.closest("[data-say]")) flip(); };
    $$("[data-r]", host).forEach(b => b.onclick = () => { const r = +b.dataset.r; rate(c, r); n++; queue.shift(); if (r === 0) queue.splice(Math.min(queue.length, 3), 0, c); draw(); });
    document.onkeydown = e => { if (!$("#card")) return (document.onkeydown = null); if (e.key === " ") { e.preventDefault(); flip(); } if (["1", "2", "3"].includes(e.key) && !$("#rates").classList.contains("hidden")) $(`[data-r="${+e.key - 1}"]`, host).click(); };
  };
  draw();
}
function viewCards(m) {
  const due = dueCards().sort((a, b) => a.due - b.due).slice(0, 60); const all = Object.values(S.cards);
  const mature = all.filter(c => c.box >= 4).length;
  m.innerHTML = `<section class="panel"><h1>${H("Karteikarten", "Flashcards")}</h1>
    <p class="lead">${H(`${due.length} fällig · ${all.length} Wörter insgesamt · ${mature} sicher gelernt`, `${due.length} due · ${all.length} words in total · ${mature} well learned`)}</p>
    <p class="small muted">${H("Wiederholung mit Abständen: Was du gut kannst, kommt seltener. Fehler kommen schnell zurück.", "Spaced repetition: what you know well comes back less often; mistakes come back quickly.")}</p>
    <details><summary>${H("Eigenes Wort hinzufügen", "Add your own word")}</summary><div class="row"><input id="cde" placeholder="Deutsch"><input id="cen" placeholder="English"><button class="btn sm" id="cadd">${H("Hinzufügen", "Add")}</button></div></details></section><div id="cb"></div>`;
  $("#cadd", m).onclick = () => { const de = $("#cde", m).value.trim(), en = $("#cen", m).value.trim(); if (!de || !en) return; S.cards[de] ??= { de, en, lv: "X", box: 0, due: Date.now(), reps: 0, lapses: 0 }; save(); render(); };
  cardSession($("#cb", m), due);
}

function viewPractice(m, which) {
  const L = currentLevel(); const w = weakest(L);
  if (which) {
    const name = which === "mix" ? ["Gemischtes Quiz", "Mixed quiz"] : TRAINER_NAME[which];
    m.innerHTML = `<section class="panel"><div class="eyebrow"><a href="#ueben">${H("Üben", "Practise")}</a></div><h1>${HP(name)}</h1></section><div id="pb"></div>`;
    runQuiz($("#pb", m), which === "mix" ? trainerQuiz("mix") : trainerQuiz(which), { title: name[0], onDone: (s, again) => {
      if (again === null) { if (which === "mix") T().mix++; else T().trainer[which] = (T().trainer[which] || 0) + 1; xp(5); save(); }
      else if (again) render(); else location.hash = "#ueben"; } });
    return;
  }
  m.innerHTML = `<section class="panel"><h1>${H("Üben", "Practise")}</h1><p class="lead">${H("Trainiere einzelne Fähigkeiten. Die Übungen nehmen Inhalte aus deinen Lektionen und zeigen deine Fehler öfter.", "Train single skills. Exercises use content from your lessons and show your mistakes more often.")}</p></section>
    <div class="trainers">${SKILLS.map(s => { const r = readiness(s[0], L); return `<a class="panel tcard ${s[0] === w ? "weak" : ""}" href="#ueben-${s[0]}">
      <b>${HP(TRAINER_NAME[s[0]])}</b>${s[0] === w ? `<span class="tag">${H("dein Schwachpunkt", "your weak spot")}</span>` : ""}
      <div class="bar thin"><i style="width:${pct(r)}%"></i></div><small>${L}: ${pct(r)} %</small></a>`; }).join("")}
      <a class="panel tcard" href="#ueben-mix"><b>${H("Gemischtes Quiz", "Mixed quiz")}</b><small>${H("Alles bisher, mit Fokus auf Fehlern", "Everything so far, focused on mistakes")}</small></a></div>
    <section class="panel"><h2>${H("Verbtabelle", "Verb table")}</h2><div class="vtable"><table><thead><tr><th></th>${PRONOUNS.map(p => `<th>${p}</th>`).join("")}<th>${H("Perfekt", "perfect")}</th><th>${H("Präteritum", "simple past")}</th></tr></thead>
    <tbody>${VERBS.map(v => `<tr><td>${speakBtn(v[0])} ${H(v[0], v[1])}</td>${v[2].map(f => `<td>${esc(f)}</td>`).join("")}<td>${esc(v[3] || "–")}</td><td>${esc(v[4] || "–")}</td></tr>`).join("")}</tbody></table></div></section>`;
}

/* ═══════════ Mock exams ═══════════ */
function viewMocks(m, which) {
  if (which && MOCKS[which]) return runMock(m, which);
  m.innerHTML = `<section class="panel"><h1>${H("Probeprüfungen", "Mock exams")}</h1>
    <p class="lead">${H("Nach dem Vorbild von Goethe und telc: Hören, Lesen, Schreiben, Sprechen. Bestanden ab 60 %.", "Modelled on the Goethe and telc exams: listening, reading, writing, speaking. Pass mark 60%.")}</p>
    <p class="small muted">${H("Eigene Übungstexte, keine offiziellen Prüfungen. Schreiben und Sprechen werden nach Inhaltspunkten geschätzt.", "Original practice texts, not official exams. Writing and speaking are estimated from content points.")}</p></section>
  ${LEVEL_ORDER.map(L => { const r = levelReadiness(L), est = estimate(L), hist = S.mocks[L] || [];
    return `<section class="panel"><div class="lvhead"><h2>${L}</h2><div class="big">${pct(r)} %</div></div>
      <div class="bar"><i style="width:${pct(r)}%"></i><b class="mark" style="left:80%"></b></div>
      <p class="small">${est.done ? H("Du bist bereit für die Probeprüfung!", "You're ready for the mock exam!") : H(`Bereit (80 %) etwa am ${fmtDate(est.date)}`, `Ready (80%) around ${fmtDate(est.date)}`) + ` <span class="muted">(${est.basis === "pace" ? H("nach deinem Tempo", "based on your pace") : H("nach dem Plan", "based on the plan")})</span>`}</p>
      <div class="skillgrid">${SKILLS.map(s => { const x = readiness(s[0], L); return `<div class="sk"><span>${H(s[1], s[2])}</span><div class="bar thin"><i style="width:${pct(x)}%"></i></div><small>${pct(x)} %</small></div>`; }).join("")}</div>
      ${hist.length ? `<div class="hist"><div class="lbl">${H("Deine Ergebnisse", "Your results")}</div>${sparkline(hist.map(h => h.total))}${hist.slice(-5).reverse().map(h => `<div class="hrow"><span>${fmtDate(h.date)}</span><span>${["hoeren", "lesen", "schreiben", "sprechen"].map(k => `${SKILL[k][1].slice(0, 1)} ${h.sec[k]}%`).join(" · ")}</span><b class="${h.pass ? "" : "err"}">${h.total} % ${h.pass ? H("bestanden", "passed") : H("nicht bestanden", "not passed")}</b></div>`).join("")}</div>` : ""}
      <div class="row"><a class="btn ${r >= 0.8 ? "" : "ghost"}" href="#pruefung-${L}">${H(`Probeprüfung ${L} starten`, `Start ${L} mock exam`)}</a><span class="small muted">≈ ${Object.values(MOCKS[L].minutes).reduce((a, b) => a + b, 0)} ${H("Min.", "min")}</span></div></section>`; }).join("")}`;
}
function sparkline(vals) {
  if (vals.length < 2) return "";
  const w = 240, h = 48, max = 100, step = w / (vals.length - 1);
  const pts = vals.map((v, i) => `${(i * step).toFixed(1)},${(h - v / max * h).toFixed(1)}`).join(" ");
  return `<svg class="spark" viewBox="-4 -4 ${w + 8} ${h + 8}" width="${w}" height="${h}"><line x1="0" x2="${w}" y1="${h - 0.6 * h}" y2="${h - 0.6 * h}" class="pass"/><polyline points="${pts}"/></svg>`;
}
function keywordScore(text, points, words) {
  const t = " " + text.toLowerCase().replace(/\s+/g, " ") + " ";
  const hit = points.map(p => p[2].some(k => t.includes(k)));
  const n = text.trim().split(/\s+/).filter(Boolean).length;
  const content = hit.filter(Boolean).length / points.length;
  const length = Math.min(1, n / words);
  return { score: 0.75 * content + 0.25 * length, hit, n };
}
function runMock(m, L) {
  const X = MOCKS[L]; const sec = {}; const order = ["hoeren", "lesen", "schreiben", "sprechen"]; let si = 0;
  const shell = (title, inner) => { m.innerHTML = `<section class="panel"><div class="eyebrow"><a href="#pruefung">${H("Prüfungen", "Mock exams")}</a> · ${L}</div>
    <div class="row between"><h1>${title}</h1><span class="pill" id="timer"></span></div>
    <div class="steps">${order.map((k, i) => `<span class="${i < si ? "done" : i === si ? "on" : ""}">${H(SKILL[k][1], SKILL[k][2])}</span>`).join("")}</div></section><div id="mb">${inner}</div>`; startTimer(X.minutes[order[si]]); return $("#mb", m); };
  let tm; const startTimer = min => { clearInterval(tm); const end = Date.now() + min * 60000; const tick = () => { const el = $("#timer"); if (!el) return clearInterval(tm); const s = Math.max(0, Math.round((end - Date.now()) / 1000)); el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; el.classList.toggle("err", s < 60); }; tick(); tm = setInterval(tick, 1000); };
  const next = () => { si++; window.scrollTo(0, 0); si < order.length ? parts[order[si]]() : finish(); };
  const parts = {
    hoeren() {
      const b = shell(H("Hören", "Listening"), `<section class="panel"><p class="small muted">${H("Du kannst jeden Text höchstens zweimal hören.", "You can play each text at most twice.")}</p>
        ${X.hoeren.map((it, k) => `<div class="mq" data-k="${k}"><div class="row"><button class="btn sm play" data-k="${k}">${ICON.spk} ${H("Abspielen", "Play")} <span class="cnt">2</span></button><b>${k + 1}. ${HP(it.q)}</b></div>
        <div class="mopts">${it.o.map((o, j) => `<label><input type="radio" name="h${k}" value="${j}"> ${esc(o)}</label>`).join("")}</div></div>`).join("")}
        <div class="row end"><button class="btn" id="mnext">${H("Weiter zu Lesen", "Continue to reading")} →</button></div></section>`);
      $$(".play", b).forEach(p => { let c = 2; p.onclick = () => { if (!c) return; c--; $(".cnt", p).textContent = c; if (!c) p.disabled = true; speak(X.hoeren[+p.dataset.k].say, L === "A1" ? 0.85 : 0.95); }; });
      $("#mnext", b).onclick = () => { const ok = X.hoeren.map((it, k) => +($(`input[name=h${k}]:checked`, b)?.value ?? -1) === it.a); sec.hoeren = pct(ok.filter(Boolean).length / ok.length); ok.forEach(x => record("hoeren", L, x ? 1 : 0, 2)); next(); };
    },
    lesen() {
      let qn = 0; const answers = [];
      const b = shell(H("Lesen", "Reading"), `<section class="panel">${X.lesen.map((t, ti) => `<div class="mtext">${HP([t.text[0], t.text[1]]).replace(/\n/g, "<br>")}</div>
        ${t.items ? t.items.map(it => { const k = qn++; answers.push(it[1] ? "r" : "f"); return `<div class="mq"><b>${esc(it[0])}</b><div class="mopts"><label><input type="radio" name="r${k}" value="r"> ${H("richtig", "true")}</label><label><input type="radio" name="r${k}" value="f"> ${H("falsch", "false")}</label></div></div>`; }).join("")
        : t.choose.map(it => { const k = qn++; answers.push(String(it[1])); return `<div class="mq"><b>${esc(it[0])}</b><div class="mopts">${t.opts.map((o, j) => `<label><input type="radio" name="r${k}" value="${j}"> ${esc(o)}</label>`).join("")}</div></div>`; }).join("")}`).join("<hr>")}
        <div class="row end"><button class="btn" id="mnext">${H("Weiter zu Schreiben", "Continue to writing")} →</button></div></section>`);
      $("#mnext", b).onclick = () => { const ok = answers.map((a, k) => $(`input[name=r${k}]:checked`, b)?.value === a); sec.lesen = pct(ok.filter(Boolean).length / ok.length); ok.forEach(x => record("lesen", L, x ? 1 : 0, 2)); next(); };
    },
    schreiben() {
      const b = shell(H("Schreiben", "Writing"), `<section class="panel">${X.schreiben.map((t, k) => `<div class="mq"><b>${H("Teil", "Part")} ${k + 1}</b><p>${HP(t.task)}</p>
        ${t.kind === "form" ? `<div class="form">${t.fields.map((f, j) => `<label>${H(f[0], f[1])}<input data-f="${k}-${j}" autocomplete="off"></label>`).join("")}</div>`
        : `<textarea data-t="${k}" rows="6" placeholder="${H("", "")}"></textarea><div class="small muted wc" data-wc="${k}">0 ${H("Wörter", "words")}</div>
          <div class="small muted">${H("Inhaltspunkte:", "Content points:")} ${t.points.map(p => H(p[0], p[1])).join(" · ")}</div>`}</div>`).join("<hr>")}
        <div class="row end"><button class="btn" id="mnext">${H("Weiter zu Sprechen", "Continue to speaking")} →</button></div></section>`);
      $$("textarea", b).forEach(ta => ta.oninput = () => { $(`[data-wc="${ta.dataset.t}"]`, b).innerHTML = `${ta.value.trim().split(/\s+/).filter(Boolean).length} ${H("Wörter", "words")}`; });
      $("#mnext", b).onclick = () => {
        const scores = X.schreiben.map((t, k) => t.kind === "form" ? t.fields.filter((f, j) => sameAnswer($(`[data-f="${k}-${j}"]`, b).value, f[2])).length / t.fields.length
          : keywordScore($(`[data-t="${k}"]`, b).value, t.points, t.words).score);
        sec.schreiben = pct(scores.reduce((a, c) => a + c, 0) / scores.length);
        sec.writing = X.schreiben.map((t, k) => t.kind === "text" ? $(`[data-t="${k}"]`, b).value : "").filter(Boolean);
        scores.forEach(s => record("schreiben", L, s, 3)); next();
      };
    },
    sprechen() {
      const b = shell(H("Sprechen", "Speaking"), `<section class="panel"><p class="small muted">${SR ? H("Klick auf das Mikrofon und sprich. Du kannst den Text danach korrigieren.", "Click the mic and speak. You can fix the transcript afterwards.") : H("Kein Spracherkennen hier: Sprich laut und tippe danach, was du gesagt hast.", "No speech recognition here: speak aloud, then type what you said.")}</p>
        ${X.sprechen.map((t, k) => `<div class="mq"><b>${H("Teil", "Part")} ${k + 1}</b><p>${HP(t.task)}</p>
        <div class="row">${SR ? `<button class="btn sm mic" data-mic="${k}">${ICON.mic} ${H("Sprechen", "Speak")}</button>` : ""}</div>
        <textarea data-s="${k}" rows="3"></textarea><div class="small muted">${H("Inhaltspunkte:", "Content points:")} ${t.points.map(p => H(p[0], p[1])).join(" · ")}</div></div>`).join("<hr>")}
        <div class="row end"><button class="btn" id="mnext">${H("Prüfung beenden", "Finish the exam")} →</button></div></section>`);
      $$("[data-mic]", b).forEach(btn => btn.onclick = async () => { btn.classList.add("rec"); try { const a = await listen(); const ta = $(`[data-s="${btn.dataset.mic}"]`, b); ta.value = (ta.value + " " + (a[0] || "")).trim(); } catch (e) { toast(H("Mikrofon nicht verfügbar.", "Microphone unavailable.")); } btn.classList.remove("rec"); });
      $("#mnext", b).onclick = () => { const scores = X.sprechen.map((t, k) => keywordScore($(`[data-s="${k}"]`, b).value, t.points, t.words).score); sec.sprechen = pct(scores.reduce((a, c) => a + c, 0) / scores.length); scores.forEach(s => record("sprechen", L, s, 3)); next(); };
    }
  };
  const finish = () => {
    clearInterval(tm);
    const total = Math.round(order.reduce((a, k) => a + sec[k], 0) / 4);
    const pass = L === "B1" ? order.every(k => sec[k] >= 60) : total >= 60;
    (S.mocks[L] ??= []).push({ date: todayStr(), sec: Object.fromEntries(order.map(k => [k, sec[k]])), total, pass });
    if (!T().mock.includes(L)) T().mock.push(L); xp(30); snapshot(); save();
    const low = order.filter(k => sec[k] < 60);
    m.innerHTML = `<section class="panel center"><div class="eyebrow">${H("Probeprüfung", "Mock exam")} ${L}</div><div class="ring big" style="--p:${total}"><span>${total}%</span></div>
      <h2 class="${pass ? "" : "err"}">${pass ? H("Bestanden! 🎉", "Passed! 🎉") : H("Noch nicht bestanden", "Not passed yet")}</h2>
      ${L === "B1" ? `<p class="small muted">${H("B1: Jedes Modul braucht 60 %.", "B1: every module needs 60%.")}</p>` : ""}
      <div class="skillgrid">${order.map(k => `<div class="sk"><span>${H(SKILL[k][1], SKILL[k][2])}</span><div class="bar thin"><i style="width:${sec[k]}%"></i></div><small class="${sec[k] < 60 ? "err" : ""}">${sec[k]} %</small></div>`).join("")}</div>
      ${low.length ? `<p>${H("Dein Plan übt jetzt mehr: ", "Your plan now practises more: ")}${low.map(k => H(SKILL[k][1], SKILL[k][2])).join(", ")}</p>` : ""}
      ${sec.writing?.length ? `<p class="small">${H("Tipp: Lass deine Texte im Tutor (Modus „Korrektur“) prüfen.", "Tip: have your texts checked in the tutor ('correction' mode).")}</p>` : ""}
      <div class="row center"><a class="btn" href="#pruefung">${H("Zur Übersicht", "Back to overview")}</a><a class="btn ghost" href="#fortschritt">${H("Fortschritt", "Progress")}</a></div></section>`;
  };
  parts.hoeren();
}

/* ═══════════ Progress ═══════════ */
function viewProgress(m) {
  snapshot(); save();
  const L = currentLevel(), w = weakest(L), st = strongest(L);
  const all = Object.values(S.cards), lessonsDone = COURSE.filter(l => (S.lessons[l.id]?.best || 0) >= 80).length;
  const days = []; for (let k = 83; k >= 0; k--) { const d = todayStr(addDays(new Date(), -k)); days.push([d, S.activity[d] || 0]); }
  const lvl = v => v === 0 ? 0 : v < 15 ? 1 : v < 40 ? 2 : v < 80 ? 3 : 4;
  const sorted = [{ k: w }, ...SKILLS.filter(s => s[0] !== w && s[0] !== st).map(s => ({ k: s[0], r: readiness(s[0], L) })).sort((a, b) => a.r - b.r)];
  m.innerHTML = `<section class="panel"><h1>${H("Dein Fortschritt", "Your progress")}</h1>
    <div class="stats">${[[streak(), "Tage in Folge", "day streak"], [Object.keys(S.daysDone).length, "Plantage geschafft", "plan days done"], [lessonsDone + "/" + COURSE.length, "Lektionen", "lessons"], [all.length, "Wörter", "words"], [all.filter(c => c.box >= 4).length, "sicher gelernt", "well learned"]]
      .map(s => `<div><b>${s[0]}</b>${H(s[1], s[2])}</div>`).join("")}</div>
    <div class="heat">${days.map(([d, v]) => `<i class="l${lvl(v)}" title="${d}: ${v} XP"></i>`).join("")}</div></section>
  <section class="panel"><h2>${H(`Wo du stehst (Ziel ${L})`, `Where you stand (target ${L})`)}</h2>
    <p>${st ? H(`Deine Stärke ist ${SKILL[st][1]}. `, `Your strength is ${SKILL[st][2]}. `) : ""}${H(`Am meisten fehlt dir: ${SKILL[sorted[0].k][1]} und ${SKILL[sorted[1].k][1]}.`, `You're lacking most in: ${SKILL[sorted[0].k][2]} and ${SKILL[sorted[1].k][2]}.`)}
    ${H(`Der Plan gibt dir deshalb jeden Tag ein ${TRAINER_NAME[w][0]}, der Quiz-Mix zeigt deine Fehler öfter, und der Tutor achtet besonders darauf.`, `So the plan gives you ${TRAINER_NAME[w][1].toLowerCase()} every day, the mixed quiz shows your mistakes more often, and the tutor focuses on it.`)}</p></section>
  ${LEVEL_ORDER.map(Lx => `<section class="panel"><div class="lvhead"><h2>${Lx}</h2><div class="big">${pct(levelReadiness(Lx))} %</div></div>
    <div class="skillrows">${SKILLS.map(s => { const r = readiness(s[0], Lx), e = estimate(Lx, s[0]), n = S.stats[s[0]]?.[Lx]?.n || 0, acc = S.stats[s[0]]?.[Lx]?.ema;
      return `<div class="srow ${s[0] === w && Lx === L ? "weak" : ""}"><span class="sname">${H(s[1], s[2])}</span><div class="bar"><i style="width:${pct(r)}%"></i><b class="mark" style="left:80%"></b></div>
      <span class="sval">${pct(r)} %</span><span class="sest small muted">${e.done ? H("bereit ✓", "ready ✓") : H("≈ " + fmtDate(e.date), "ready around " + fmtDate(e.date))}${n && s[0] !== "wortschatz" ? ` · ${H(pct(acc) + " % richtig", pct(acc) + "% accuracy")}` : ""}</span></div>`; }).join("")}</div></section>`).join("")}
  <section class="panel"><h2>${H("Lektionen", "Lessons")}</h2><div class="ltable">${COURSE.map(l => `<a href="#l-${l.id}" class="${lessonState(l)}"><span>${HP(l.title)}</span><b>${S.lessons[l.id]?.best != null ? S.lessons[l.id].best + " %" : "–"}</b></a>`).join("")}</div></section>
  <section class="panel"><h2>${H("Häufigste Fehler", "Most frequent mistakes")}</h2>${topErrors()}</section>`;
}
function topErrors() {
  const e = Object.entries(S.errs).filter(x => x[1] >= 1).sort((a, b) => b[1] - a[1]).slice(0, 10);
  if (!e.length) return `<p class="muted">${H("Noch keine Fehler – mach ein Quiz!", "No mistakes yet – take a quiz!")}</p>`;
  return `<ul class="errs">${e.map(([k, n]) => { let t = k.slice(k.indexOf(":") + 1);
    if (k.startsWith("d:")) { const [, id, i] = k.split(":"); const d = lessonById(id)?.drills[+i]; t = d ? d[0].replace("___", d[1]) : t; }
    if (k.startsWith("vb:")) t = t + " (Verb)";
    return `<li>${speakBtn(t)} ${esc(t)} <span class="muted">×${Math.ceil(n)}</span></li>`; }).join("")}</ul>`;
}

/* ═══════════ Settings ═══════════ */
function viewSettings(m) {
  m.innerHTML = `<section class="panel"><h1>${H("Einstellungen", "Settings")}</h1>
    <label>${H("Name", "Name")}<input id="sname" value="${esc(S.name)}"></label>
    <label>${H("Minuten pro Tag", "Minutes per day")}<select id="smin">${[20, 30, 40, 45, 60].map(x => `<option ${x === S.settings.minutes ? "selected" : ""}>${x}</option>`).join("")}</select></label>
    <label>${H("Stimme", "Voice")}<select id="svoice"><option value="">${H("Standard (de-DE)", "Default (de-DE)")}</option>${voices.map(v => `<option ${v.name === S.settings.voice ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select></label>
    <label>${H("Sprechtempo", "Speech rate")} <span id="rv">${S.settings.rate}</span><input type="range" id="srate" min="0.5" max="1.2" step="0.05" value="${S.settings.rate}"></label>
    <div class="row"><button class="btn" id="ssave">${H("Speichern", "Save")}</button><button class="btn ghost" id="stest">${ICON.spk} ${H("Testen", "Test")}</button></div></section>
  <section class="panel"><h2>${H("Plan-Tag", "Plan day")}</h2><p class="small muted">${H("Du kannst schon Deutsch? Spring zu einem Tag.", "Already know some German? Jump to a day.")}</p>
    <div class="row"><select id="sday">${PLAN.map((d, k) => { const ll = d.lesson && lessonById(d.lesson); return `<option value="${k}" ${k === S.day ? "selected" : ""}>${k + 1} · ${TYPE_NAME[d.type][0]}${ll ? " · " + ll.title[0] : d.type === "mock" ? " " + d.level : ""}</option>`; }).join("")}</select><button class="btn sm" id="sjump">${H("Springen", "Jump")}</button></div></section>
  <section class="panel"><h2>${H("Sichern & umziehen", "Back up & move")}</h2><p class="small muted">${H("Dein Fortschritt liegt nur in diesem Browser. Kopiere ihn, um ihn auf ein anderes Gerät zu bringen.", "Your progress lives only in this browser. Copy it to move it to another device.")}</p>
    <textarea id="sjson" rows="4"></textarea><div class="row"><button class="btn ghost sm" id="sexp">${H("Exportieren & kopieren", "Export & copy")}</button><button class="btn ghost sm" id="simp">${H("Importieren", "Import")}</button><button class="btn ghost sm err" id="sreset">${H("Alles zurücksetzen", "Reset everything")}</button></div></section>`;
  $("#srate", m).oninput = e => $("#rv", m).textContent = e.target.value;
  $("#ssave", m).onclick = () => { S.name = $("#sname", m).value.trim(); S.settings.minutes = +$("#smin", m).value; S.settings.voice = $("#svoice", m).value; S.settings.rate = +$("#srate", m).value; save(); toast(H("Gespeichert ✓", "Saved ✓")); render(); };
  $("#stest", m).onclick = () => { S.settings.voice = $("#svoice", m).value; S.settings.rate = +$("#srate", m).value; speak("Hallo! Ich bin deine deutsche Stimme. Wie geht's?"); };
  $("#sjump", m).onclick = () => { S.day = +$("#sday", m).value; save(); location.hash = "#heute"; };
  $("#sexp", m).onclick = async () => { const j = JSON.stringify(S); $("#sjson", m).value = j; try { await navigator.clipboard.writeText(j); toast(H("Kopiert ✓", "Copied ✓")); } catch (e) { $("#sjson", m).select(); } };
  $("#simp", m).onclick = () => { try { const o = JSON.parse($("#sjson", m).value); if (!o.v) throw 0; S = Object.assign(fresh(), o); save(); toast(H("Importiert ✓", "Imported ✓")); render(); } catch (e) { toast(`<span class="err">${H("Das ist kein gültiger Export.", "That's not a valid export.")}</span>`); } };
  $("#sreset", m).onclick = e => { const b = e.currentTarget; if (!b.dataset.sure) { b.dataset.sure = 1; b.innerHTML = H("Sicher? Nochmal klicken.", "Sure? Click again."); return; } S = fresh(); save(); location.hash = "#heute"; render(); };
}

/* ═══════════ Boot ═══════════ */
render();

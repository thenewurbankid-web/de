/* ═══════════ In-browser tutor (WebLLM, optional) ═══════════ */
const MODELS = [
  ["Qwen2.5-0.5B-Instruct-q4f16_1-MLC", "Klein & schnell (≈ 0,4 GB)", "Small & fast (~0.4 GB)"],
  ["Qwen2.5-1.5B-Instruct-q4f16_1-MLC", "Empfohlen (≈ 1 GB)", "Recommended (~1 GB)"],
  ["Qwen2.5-3B-Instruct-q4f16_1-MLC", "Besser, braucht eine starke GPU (≈ 2 GB)", "Better, needs a strong GPU (~2 GB)"]
];
const TUTOR = { engine: null, loading: false, busy: false, mode: "rolle", scene: null, msgs: [], progress: 0, status: "", model: null, err: "" };
const LEVEL_DESC = { A1: "Anfänger, kennt nur sehr einfache Wörter", A2: "Grundstufe, einfache Alltagssätze", B1: "Mittelstufe, kann über Alltag und Meinungen sprechen" };

async function loadTutor() {
  if (TUTOR.engine || TUTOR.loading) return;
  if (!navigator.gpu) { TUTOR.err = "nogpu"; render(); return; }
  TUTOR.loading = true; TUTOR.err = ""; TUTOR.status = "Lade WebLLM …"; render();
  try {
    const webllm = await import("https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2/+esm");
    TUTOR.engine = await webllm.CreateMLCEngine(S.settings.model, {
      initProgressCallback: r => { TUTOR.progress = r.progress || 0; TUTOR.status = r.text || ""; const p = $("#tprog"); if (p) { p.style.width = pct(TUTOR.progress) + "%"; $("#tstat").textContent = TUTOR.status; } }
    });
    TUTOR.model = S.settings.model; S.settings.tutorOnce = true; save();
  } catch (e) { TUTOR.err = String(e && e.message || e); TUTOR.engine = null; }
  TUTOR.loading = false; render();
}
function knownWords(n = 40) { return Object.values(S.cards).sort((a, b) => b.box - a.box || b.reps - a.reps).slice(0, n).map(c => c.de.replace(/[…?.!]/g, "").trim()).join(", "); }
function systemPrompt() {
  const L = currentLevel(), w = weakest(L);
  let s = `Du bist ein geduldiger, freundlicher Deutschlehrer und Gesprächspartner in Berlin. Der Lerner ist auf Niveau ${L} (${LEVEL_DESC[L]}). Benutze nur einfache Wörter und kurze Sätze, die zu diesem Niveau passen. Antworte immer auf Deutsch, nie auf Englisch. Wörter, die der Lerner schon kennt: ${knownWords() || "Hallo, danke, bitte"}. Der Schwachpunkt des Lerners ist: ${SKILL[w][1]}.`;
  if (TUTOR.mode === "rolle" && TUTOR.scene) s += `\nRollenspiel: ${TUTOR.scene.role}\nBleib immer in deiner Rolle. Antworte mit höchstens zwei kurzen Sätzen und stell oft eine einfache Frage. Wenn der letzte Satz des Lerners einen Fehler hat, schreib zuerst genau eine Zeile "Korrektur: <der richtige Satz>" und danach deine Antwort in der Rolle. Wenn der Satz richtig ist, schreib keine Korrektur.`;
  if (TUTOR.mode === "korrektur") s += `\nAufgabe: Korrigiere den Text des Lerners. Antworte genau so:\nKorrektur: <der korrigierte Text>\nErklärung: <ein kurzer, einfacher Satz auf Deutsch, was falsch war>\nWenn alles richtig ist, antworte nur: Richtig! ✓`;
  if (TUTOR.mode === "geschichte") s += `\nAufgabe: Schreib eine kurze Geschichte (5 bis 7 Sätze) über das Leben in Berlin, auf Niveau ${L}. Benutze vor allem die bekannten Wörter. Stell danach zwei einfache Fragen zur Geschichte. Wenn der Lerner antwortet, sag ob die Antwort stimmt und korrigiere Fehler mit "Korrektur: …".`;
  if (TUTOR.mode === "coach") s += `\nDu bist jetzt Lerncoach. Der Lerner schickt dir Daten über seinen Fortschritt. Gib ihm in höchstens drei kurzen, einfachen Sätzen einen konkreten Tipp, was er heute üben soll und warum. Sei motivierend.`;
  return s;
}
function coachData() {
  const L = currentLevel(), w = weakest(L);
  const errs = Object.entries(S.errs).sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => e[0].split(":").slice(1).join(":")).join("; ");
  return `Ziel: ${L}. Bereitschaft: ${pct(levelReadiness(L))} %. Fähigkeiten: ${SKILLS.map(s => `${s[1]} ${pct(readiness(s[0], L))} %`).join(", ")}. Schwachpunkt: ${SKILL[w][1]}. Häufige Fehler: ${errs || "noch keine"}. Plantag: ${S.day + 1}. Tage in Folge: ${streak()}.`;
}
async function tutorSend(text, { hidden } = {}) {
  if (!TUTOR.engine || TUTOR.busy) return;
  text = text.trim(); if (!text) return;
  TUTOR.msgs.push({ role: "user", content: text, hidden }); TUTOR.busy = true;
  const reply = { role: "assistant", content: "" }; TUTOR.msgs.push(reply); paintChat();
  try {
    const history = TUTOR.msgs.slice(0, -1).slice(-12).map(m => ({ role: m.role, content: m.content }));
    const stream = await TUTOR.engine.chat.completions.create({ messages: [{ role: "system", content: systemPrompt() }, ...history], temperature: 0.6, max_tokens: TUTOR.mode === "geschichte" ? 380 : 180, stream: true });
    for await (const ch of stream) { reply.content += ch.choices[0]?.delta?.content || ""; paintChat(true); }
  } catch (e) { reply.content = "⚠ " + (e.message || e); reply.error = true; }
  TUTOR.busy = false;
  // measure the learner's own sentence
  const words = text.split(/\s+/).length, corrected = /korrektur\s*:/i.test(reply.content), L = currentLevel();
  if (!hidden && !reply.error && words >= 2) {
    if (TUTOR.mode === "rolle") { T().tutor++; record("sprechen", L, corrected ? 0.5 : 1); record("grammatik", L, corrected ? 0.4 : 1); }
    if (TUTOR.mode === "korrektur") { T().correct++; record("schreiben", L, /richtig/i.test(reply.content) && !corrected ? 1 : 0.5); }
    if (TUTOR.mode === "geschichte") { record("lesen", L, corrected ? 0.6 : 1); }
    xp(2); save();
  }
  paintChat();
  if (S.settings.autoSpeak && !reply.error) speak(reply.content.replace(/^korrektur:.*$/gim, "").replace(/^erklärung:/gim, ""));
}
function msgHtml(m, i) {
  if (m.hidden) return "";
  const lines = m.content.split("\n").filter(x => x.trim());
  const body = lines.map(x => {
    if (/^korrektur\s*:/i.test(x)) return `<div class="corr">✏️ ${esc(x.replace(/^korrektur\s*:\s*/i, ""))} ${speakBtn(x.replace(/^korrektur\s*:\s*/i, ""))}</div>`;
    if (/^erklärung\s*:/i.test(x)) return `<div class="expl">${esc(x.replace(/^erklärung\s*:\s*/i, ""))}</div>`;
    return `<div>${esc(x)}</div>`;
  }).join("");
  return `<div class="msg ${m.role}">${m.role === "assistant" ? `<div class="mtools">${speakBtn(m.content.replace(/^korrektur:.*$/gim, ""))}<button class="trbtn h" data-tr="${i}" data-en="${esc(m.en || "Translate to English")}">EN</button></div>` : ""}<div class="mbody">${body || (TUTOR.busy ? '<span class="dots">…</span>' : "")}</div>${m.en ? `<div class="mtrans">${esc(m.en)}</div>` : ""}</div>`;
}
function paintChat(streaming) {
  const c = $("#chat"); if (!c) return;
  c.innerHTML = TUTOR.msgs.map(msgHtml).join("") || `<div class="muted center">${H("Wähl oben eine Situation oder schreib einfach los.", "Pick a situation above or just start writing.")}</div>`;
  c.scrollTop = c.scrollHeight;
  $$("[data-tr]", c).forEach(b => b.onclick = () => translateMsg(+b.dataset.tr));
  const s = $("#tsend"); if (s) s.disabled = TUTOR.busy;
}
async function translateMsg(i) {
  const m = TUTOR.msgs[i]; if (!m || m.en || TUTOR.busy) return;
  TUTOR.busy = true; m.en = "…"; paintChat();
  try {
    const r = await TUTOR.engine.chat.completions.create({ messages: [{ role: "system", content: "Translate the user's German text into natural English. Output only the translation." }, { role: "user", content: m.content }], temperature: 0.2, max_tokens: 300 });
    m.en = r.choices[0].message.content.trim();
  } catch (e) { m.en = ""; }
  TUTOR.busy = false; paintChat();
}
function startScene(sc) {
  TUTOR.mode = "rolle"; TUTOR.scene = sc; TUTOR.msgs = [{ role: "assistant", content: sc.start[0], en: sc.start[1] }];
  render(); speak(sc.start[0]);
}
function viewTutor(m) {
  const L = currentLevel(), w = weakest(L);
  if (!TUTOR.engine && !TUTOR.loading && S.settings.tutorOnce && navigator.gpu && !TUTOR.err) setTimeout(loadTutor, 50);
  const modes = [["rolle", "Rollenspiel", "Role-play"], ["korrektur", "Korrektur", "Correct my German"], ["geschichte", "Geschichte", "Story"], ["coach", "Coach", "Coach"]];
  const scenes = SCENES.filter(s => LEVEL_ORDER.indexOf(LV(s.level)) <= LEVEL_ORDER.indexOf(L) + 1);
  const ready = !!TUTOR.engine;
  m.innerHTML = `<section class="panel"><h1>${H("Dein Tutor", "Your tutor")}</h1>
    <p class="lead">${H("Ein kleines KI-Modell läuft direkt in deinem Browser: Rollenspiele, Korrekturen, Geschichten auf deinem Niveau. Nichts verlässt dein Gerät.", "A small AI model runs right in your browser: role-plays, corrections, stories at your level. Nothing leaves your device.")}</p>
    ${ready ? `<p class="small muted">${H("Bereit", "Ready")}: ${esc(TUTOR.model)} · ${H(`Niveau ${L}, Fokus ${SKILL[w][1]}`, `level ${L}, focus ${SKILL[w][2]}`)} · ${H("Der Tutor kann Fehler machen.", "The tutor can make mistakes.")}</p>`
    : TUTOR.loading ? `<div class="bar"><i id="tprog" style="width:${pct(TUTOR.progress)}%"></i></div><p class="small muted" id="tstat">${esc(TUTOR.status)}</p><p class="small muted">${H("Beim ersten Mal lädt das Modell einmalig herunter. Danach startet es aus dem Cache.", "The first time, the model downloads once. After that it starts from cache.")}</p>`
    : `${TUTOR.err === "nogpu" ? `<p class="err">${H("Dein Browser hat kein WebGPU. Nimm Chrome oder Edge auf einem Computer (oder neues Safari).", "Your browser has no WebGPU. Use Chrome or Edge on a computer (or recent Safari).")}</p>`
      : TUTOR.err ? `<p class="err">${H("Laden fehlgeschlagen.", "Loading failed.")} <span class="small">${esc(TUTOR.err.slice(0, 200))}</span></p><p class="small muted">${H("In der Claude-Vorschau sind Downloads blockiert – öffne die GitHub-Pages-Version.", "Downloads are blocked in the Claude preview – open the GitHub Pages version.")}</p>` : ""}
      <div class="row"><select id="tmodel">${MODELS.map(x => `<option value="${x[0]}" ${x[0] === S.settings.model ? "selected" : ""}>${x[1]}</option>`).join("")}</select>
      <button class="btn" id="tload">${H("Tutor laden", "Load tutor")}</button></div>
      <p class="small muted">${H("Der Kurs funktioniert auch ohne Tutor komplett.", "The course works fully without the tutor too.")}</p>`}
  </section>
  <section class="panel ${ready ? "" : "dim"}">
    <div class="tabs">${modes.map(x => `<a href="#tutor" data-mode="${x[0]}" class="${TUTOR.mode === x[0] ? "on" : ""}">${H(x[1], x[2])}</a>`).join("")}</div>
    ${TUTOR.mode === "rolle" ? `<div class="chips">${scenes.map(s => `<button class="chip ${TUTOR.scene?.id === s.id ? "on" : ""}" data-scene="${s.id}">${HP(s.title)} <small>${LV(s.level)}</small></button>`).join("")}</div>` : ""}
    ${TUTOR.mode === "korrektur" ? `<p class="small muted">${H("Schreib einen oder mehrere Sätze. Der Tutor korrigiert und erklärt.", "Write one or more sentences. The tutor corrects and explains.")}</p>` : ""}
    ${TUTOR.mode === "geschichte" ? `<div class="row"><button class="btn sm" id="tstory">${H("Neue Geschichte", "New story")}</button><span class="small muted">${H("Mit deinen Wörtern, auf deinem Niveau.", "With your words, at your level.")}</span></div>` : ""}
    ${TUTOR.mode === "coach" ? `<div class="row"><button class="btn sm" id="tcoach">${H("Was soll ich heute üben?", "What should I practise today?")}</button><a class="btn ghost sm" href="#ueben-${w}">${HP(TRAINER_NAME[w])}</a><a class="btn ghost sm" href="#ueben-mix">${H("Fehler-Mix", "Mistake mix")}</a></div>` : ""}
    <div id="chat" class="chat"></div>
    <div class="typerow">${SR ? `<button class="btn ghost sm mic" id="tmic" ${ready ? "" : "disabled"}>${ICON.mic}</button>` : ""}<input id="tin" placeholder="${TUTOR.mode === "korrektur" ? "Ich habe gestern nach Hause gegangen." : "…"}" ${ready ? "" : "disabled"}><button class="btn" id="tsend" ${ready ? "" : "disabled"}>${H("Senden", "Send")}</button></div>
    <div class="umlauts">${["ä", "ö", "ü", "ß"].map(c => `<button class="um">${c}</button>`).join("")}<label class="small"><input type="checkbox" id="tauto" ${S.settings.autoSpeak ? "checked" : ""}> ${H("Antworten vorlesen", "Read replies aloud")}</label></div>
  </section>`;
  paintChat();
  const ld = $("#tload", m); if (ld) ld.onclick = () => { S.settings.model = $("#tmodel", m).value; save(); TUTOR.err = ""; loadTutor(); };
  $$("[data-mode]", m).forEach(a => a.onclick = e => { e.preventDefault(); TUTOR.mode = a.dataset.mode; TUTOR.msgs = []; TUTOR.scene = null; render(); });
  $$("[data-scene]", m).forEach(b => b.onclick = () => startScene(SCENES.find(s => s.id === b.dataset.scene)));
  const inp = $("#tin", m);
  const send = () => { const v = inp.value; inp.value = ""; tutorSend(v); };
  $("#tsend", m).onclick = send; inp.onkeydown = e => e.key === "Enter" && send();
  $$(".um", m).forEach(b => b.onclick = () => { inp.value += b.textContent; inp.focus(); });
  $("#tauto", m).onchange = e => { S.settings.autoSpeak = e.target.checked; save(); };
  const mic = $("#tmic", m); if (mic) mic.onclick = async () => { mic.classList.add("rec"); try { const a = await listen(); inp.value = (inp.value + " " + (a[0] || "")).trim(); } catch (e) { toast(H("Mikrofon nicht verfügbar.", "Microphone unavailable.")); } mic.classList.remove("rec"); inp.focus(); };
  const st = $("#tstory", m); if (st) st.onclick = () => { TUTOR.msgs = []; tutorSend("Bitte schreib mir eine neue Geschichte.", { hidden: true }); };
  const co = $("#tcoach", m); if (co) co.onclick = () => { TUTOR.msgs = []; tutorSend(coachData(), { hidden: true }); };
}

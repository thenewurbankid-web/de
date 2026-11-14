// Lists German tokens the word-by-word lexicon does not cover. Usage: node tools/coverage.js
const fs = require("fs"), vm = require("vm"), path = require("path");
const src = f => fs.readFileSync(path.join(__dirname, "..", "src", f), "utf8");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(src("data.js") + src("extra.js") + src("lexicon.js") + "\nthis.COURSE=COURSE;this.MOCKS=MOCKS;this.SCENES=SCENES;this.gloss=gloss;", ctx);
const texts = [];
for (const l of ctx.COURSE) { texts.push(l.title[0], l.goal[0], l.mission[0], ...l.grammar.map(g => g[0]), ...l.ex.map(e => e[0]), ...l.drills.map(d => d[0].replace("___", d[1])), ...l.vocab.map(v => v[0])); }
for (const L of Object.keys(ctx.MOCKS)) { const X = ctx.MOCKS[L]; X.hoeren.forEach(h => texts.push(h.say, h.q[0], ...h.o)); X.lesen.forEach(t => { texts.push(t.text[0]); (t.items || t.choose).forEach(i => texts.push(i[0])); }); X.schreiben.forEach(t => texts.push(t.task[0])); X.sprechen.forEach(t => texts.push(t.task[0])); }
ctx.SCENES.forEach(s => texts.push(s.start[0], s.title[0]));
for (const f of ["app.js", "tutor.js"]) for (const m of src(f).matchAll(/H\(\s*(["`])((?:\\.|(?!\1).)*)\1/g)) texts.push(m[2].replace(/\$\{[^}]*\}/g, " "));
const miss = {}; let total = 0, hit = 0;
for (const t of texts) for (const g of ctx.gloss(t)) { total++; if (g.m) hit++; else miss[g.w] = (miss[g.w] || 0) + 1; }
console.log(`covered ${hit}/${total} tokens (${(100 * hit / total).toFixed(1)}%)`);
console.log(Object.entries(miss).sort((a, b) => b[1] - a[1]).map(e => e[0]).join(" "));

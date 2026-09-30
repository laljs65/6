const CARDS = [
  {id:1,title:"Unser erstes Treffen",rarity:"EPIC",text:"Deine meerblauen Augen werden für immer meine Liebsten sein.",note:"Manchmal weiß man es schon nach dem ersten Blick."},
  {id:2,title:"Strahlender Himmel bei Nacht",rarity:"LEGENDARY",text:"Ein Komet nur für dich und mich.",note:"Manche Nächte vergisst man nie, weil man sie zu zweit gesehen hat."},
  {id:3,title:"Am Bahnhof",rarity:"RARE",text:"Ein simpler Moment war so besonders für mich.",note:"Für andere nur ein Bahnhof, für uns ein Ort zum Ankommen."},
  {id:4,title:"Ich liebe dich",rarity:"SPECIAL",text:"Ich liebe dich, nach ca. 2 Wochen zu sagen ist schon krass hihi.",note:"Ich würde es jederzeit wieder so früh sagen."},
  {id:5,title:"Alles Nass",rarity:"EPIC",text:"Der Kuss im Regen lässt mein Herz schneller schlagen.",note:"Nasse Haare, kalte Hände, warmes Herz."},
  {id:6,title:"Songs",rarity:"LEGENDARY",text:"Rollercoaster Girl — ein Lied, das jetzt zu uns gehört.",note:"Wenn es läuft, sind wir sofort wieder zusammen."},
  {id:7,title:"Marry Me",rarity:"LEGENDARY",text:"Lass mich nicht so lange warten.",note:"Nur ein kleiner Hinweis, aber ein ehrlicher.",image:"images/photo2.jpeg"},
  {id:8,title:"Kiss Me",rarity:"LEGENDARY",text:"Mein erster Kuss überhaupt, wie aus dem Märchenbuch.",note:"Manche Erinnerungen fühlen sich an, als wären sie ausgedacht."},
  {id:9,title:"Gutschein",rarity:"RARE",text:"Ich koche für dich. Einlösbar: einmal.",note:"Dein Wunschgericht, meine Kochschürze."},
  {id:10,title:"Unsere Lieblingsnummer 13",rarity:"SPECIAL",text:"13. Mehr muss man dazu eigentlich nicht sagen.",note:"Egal, wo sie auftaucht: Ich denke an dich."},
  {id:11,title:"Gutschein",rarity:"COMMON",text:"Überraschung. Einlösbar: einmal.",note:"Ich verrate nichts. Nur, dass es dir gefallen wird."},
  {id:12,title:"Insta Moment",rarity:"RARE",text:"Ganz romantisch auf Weg vom Müll zum Wohnwagen.",note:"Perfektes Licht, weniger perfekter Geruch."},
  {id:13,title:"First Massage",rarity:"SPECIAL",text:"Hier is so ein fucking smasher Typ.",note:"Auf einer Skala von 1 bis 10 bekommt er eine 13."},
  {id:14,title:"First Pic",rarity:"EPIC",text:"Da wussten wir noch nicht, was WIR sind.",note:"Ein Foto, aus dem später alles wurde.",image:"images/photo1.jpeg"},
  {id:15,title:"Gutschein",rarity:"COMMON",text:"Baking Wish. Einlösbar: dreimal.",note:"Mehl überall ist inklusive."},
  {id:16,title:"Charakter Karte — Imal",rarity:"LEGENDARY",text:"Humor 10/10 · Fürsorge 10/10 · Snack Geschmack 6/10 · Besonderheit 13/10",note:"Fähigkeit: mich zum Lachen bringen, auch wenn ich nicht will."},
  {id:17,title:"Charakter Karte — Emy",rarity:"LEGENDARY",text:"Fürsorge 10/10 · Ordnung 3/10 · Snack Geschmack 10/10 · Besonderheit 13/10",note:"Ordnung ist nicht meine Stärke. Dafür habe ich dich."},
  {id:18,title:"Team Karte",rarity:"SPECIAL",text:"Zusammenhalt 10/10 · Vertrauen 10/10 · Gemeinsame Energie 5/10 · Snack Kompatibilität 4/10 · Teamlevel 13",note:"Zusammen sind wir stärker als jedes Level."},
  {id:19,title:"Reminder",rarity:"RARE",text:"Du warst schon am Anfang unserer Beziehung so wie jetzt. Du erinnerst mich so an dich selber. Lies mal unsere ersten paar Nachrichten.",note:"Manchmal muss man nur zurückblättern."},
  {id:20,title:"Final Special End",rarity:"LEGENDARY",text:"Danke Emil. Danke für dein Licht, Lachen und Lächeln. Danke für diese wunderschöne Gelbe Welt.",note:"Das Ende dieser Sammlung ist erst der Anfang.",image:"images/photo3.jpeg"}
];
const START_DATE = "2026-09-29", STORAGE_KEY = "ourLittleCollection_v1";
let state = {collected:[]};
try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (s && Array.isArray(s.collected)) state = s; } catch(e) {}
const $ = id => document.getElementById(id), pad = n => String(n).padStart(2,"0");
let currentId = null, lastAdded = null, timers = [];

function dateIndex(){
  const start = new Date(START_DATE + "T00:00:00"), n = new Date();
  return Math.round((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - start) / 86400000) + 1;
}
const availableCount = () => Math.max(0, Math.min(CARDS.length, dateIndex()));
function pendingId(){ for (let i = 1; i <= availableCount(); i++) if (!state.collected.includes(i)) return i; return null; }
function save(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {} }

function cardHTML(c){
  const r = c.rarity.toLowerCase();
  const foil = (r === "legendary" || r === "epic") ? '<div class="foil"></div>' : "";
  const img = c.image ? `<img src="${c.image}" alt="" onerror="this.remove()">` : "";
  const body = c.text.includes(" · ")
    ? `<ul class="stats">${c.text.split(" · ").map(s => { const i = s.lastIndexOf(" "); return `<li><span>${s.slice(0,i)}</span><b>${s.slice(i+1)}</b></li>`; }).join("")}</ul>`
    : `<p class="txt">${c.text}</p>`;
  return `<div class="cw"><div class="card r-${r}">
    <div class="face front">
      <div class="art art-${c.id}${c.image ? " photo" : ""}">${img}<span class="chip rar">${r}</span><span class="chip no">${pad(c.id)}/20</span></div>
      <div class="body"><h3>${c.title}</h3>${body}<p class="note">${c.note}</p></div>${foil}
    </div>
    <div class="face back"><div class="back-inner"><strong>Our Little<br>Collection</strong><small>Im × Knopfprinzessin</small></div></div>
  </div></div>`;
}

function render(){
  const avail = availableCount(), got = state.collected.length, pend = pendingId();
  $("packNumber").textContent = pad(pend || Math.min(Math.max(avail,1),20));
  $("dayLine").textContent = avail ? `Tag ${pad(avail)} von 20` : "Start am 29. September";
  $("todayText").textContent = !avail ? "Die Sammlung beginnt am 29. September 2026."
    : pend ? (pend === avail ? `Heute wartet Karte #${pad(pend)} auf dich.` : `Karte #${pad(pend)} wartet noch auf dich.`)
    : got === 20 ? "Alle 20 Karten gesammelt." : "Für heute hast du alles gesammelt.";
  $("hintText").textContent = got === 20 ? "Danke, Emil." : "Die nächste Karte erscheint morgen.";
  $("packLabel").textContent = got === 20 ? "Komplett" : (avail && !pend) ? "Heute erledigt" : "Eine Karte drin";
  $("openPack").classList.toggle("done", avail > 0 && !pend);
  $("albumCount").textContent = got; $("headerCount").textContent = `${got} / 20`;
  $("progressFill").style.width = `${got / 20 * 100}%`;
  $("lockedMessage").classList.add("hidden");
  $("albumGrid").innerHTML = CARDS.map(c => {
    if (c.id > avail) return `<div class="album-slot"><div class="slot-empty">${pad(c.id)}</div></div>`;
    if (!state.collected.includes(c.id)) return `<div class="album-slot"><div class="slot-empty">?</div></div>`;
    return `<div class="album-slot${c.id === lastAdded ? " fresh" : ""}" data-card="${c.id}"><div class="slot-card">${cardHTML(c)}</div></div>`;
  }).join("");
  $("albumGrid").querySelectorAll("[data-card]").forEach(el => el.addEventListener("click", () => openDetail(+el.dataset.card)));
}
const showAlbum = () => { $("homeView").classList.add("hidden"); $("albumView").classList.remove("hidden"); render(); window.scrollTo(0,0); };
const showHome = () => { $("albumView").classList.add("hidden"); $("homeView").classList.remove("hidden"); };
const flip = e => e.currentTarget.classList.toggle("flipped");

function openPack(){
  if (!availableCount()) { $("lockedMessage").textContent = "Noch ist keine Karte freigeschaltet."; $("lockedMessage").classList.remove("hidden"); return; }
  const next = pendingId();
  if (!next) return showAlbum();
  currentId = next;
  const m = $("cardModal"); m.classList.remove("hidden"); m.setAttribute("aria-hidden","false");
  $("openingStage").className = "opening-stage"; $("revealActions").classList.add("hidden");
  $("cardScene").innerHTML = cardHTML(CARDS[next-1]);
  $("cardScene").querySelector(".card").addEventListener("click", flip);
  timers.push(setTimeout(() => $("openingStage").classList.add("tearing"), 350),
              setTimeout(() => $("openingStage").classList.add("opened"), 1000),
              setTimeout(() => $("revealActions").classList.remove("hidden"), 1600));
}
function closeModal(){ timers.forEach(clearTimeout); timers = []; $("cardModal").classList.add("hidden"); $("cardModal").setAttribute("aria-hidden","true"); }
function openDetail(id){
  const c = CARDS.find(x => x.id === id); if (!c) return;
  $("detailModal").classList.remove("hidden"); $("detailModal").setAttribute("aria-hidden","false");
  $("detailCardWrap").innerHTML = cardHTML(c);
  $("detailCardWrap").querySelector(".card").addEventListener("click", flip);
}
function closeDetail(){ $("detailModal").classList.add("hidden"); $("detailModal").setAttribute("aria-hidden","true"); }

["openPack","openPackBtn"].forEach(i => $(i).addEventListener("click", openPack));
["albumBtn","albumBtn2"].forEach(i => $(i).addEventListener("click", showAlbum));
$("backBtn").addEventListener("click", showHome);
$("closeModal").addEventListener("click", closeModal);
$("closeDetail").addEventListener("click", closeDetail);
document.querySelector("#cardModal .modal-backdrop").addEventListener("click", closeModal);
document.querySelector("#detailModal .modal-backdrop").addEventListener("click", closeDetail);
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); closeDetail(); } });
$("addToAlbum").addEventListener("click", () => {
  if (currentId && !state.collected.includes(currentId)) { state.collected.push(currentId); state.collected.sort((a,b) => a-b); save(); lastAdded = currentId; }
  closeModal(); showAlbum();
});
render();

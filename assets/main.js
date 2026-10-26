/* ===== CONFIGURAÇÃO (trocar quando o cliente enviar os dados) ===== */
const WHATSAPP = "5511994113366"; // DDI + DDD + número, só dígitos
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== util ===== */
let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const $ = (s) => document.querySelector(s);
const el = (cls, css) => { const d = document.createElement("div"); d.className = cls; Object.assign(d.style, css); return d; };

/* ===== animações do site ===== */
function startSite() {
  $("#nav").classList.add("show");
  gsap.to(".w", { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", stagger: 0.09, delay: 0.1 });
  document.querySelectorAll(".h-in").forEach((e) => gsap.to(e, { opacity: 1, y: 0, duration: 0.9, delay: parseFloat(e.style.getPropertyValue("--d")) || 0, ease: "power2.out" }));
  setTimeout(() => $(".sc-face").classList.add("in"), 1200);
}

/* brilho que acompanha o mouse em cada seção */
document.querySelectorAll(".hero, .material, .sec").forEach((s) => s.addEventListener("pointermove", (e) => {
  const r = s.getBoundingClientRect();
  s.style.setProperty("--mx", e.clientX - r.left + "px");
  s.style.setProperty("--my", e.clientY - r.top + "px");
}));

/* revelar ao rolar */
function setupScroll() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.2 });
  document.querySelectorAll(".rv, .steps").forEach((e) => io.observe(e));
}

/* todo link com data-msg abre o WhatsApp com a mensagem pronta */
const waUrl = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
function setWa(a) { a.href = waUrl(a.dataset.msg); a.target = "_blank"; a.rel = "noopener"; }
document.querySelectorAll(".wa-link").forEach(setWa);

/* galeria: um botão por tamanho */
const GAL = [
  { id: "premium", rot: "Premium 40x50", g: "premium", n: [1,2,3,4,5,6,7,8,9], tam: "40x50", nome: "Placa Premium 40x50" },
  { id: "10x30", rot: "10x30", g: "modelos", n: [1], tam: "10x30", nome: "Placa 10x30" },
  { id: "10x35", rot: "10x35 com foto 6x8", g: "modelos", n: [2], tam: "10x35 com foto 6x8", nome: "Placa 10x35 com foto 6x8" },
  { id: "20x30", rot: "20x30", g: "modelos", n: [3,4,5,6,7,8,9,10,11], tam: "20x30, com ou sem foto 6x8", nome: "Placa 20x30" },
  { id: "30x40", rot: "30x40", g: "modelos", n: [3,4,5,6,7,8,9,10,11], tam: "30x40, com ou sem foto 6x8", nome: "Placa 30x40" },
  { id: "projetos", rot: "Outros projetos", g: "projetos", n: [30,29,25,27,26,2,4,19], tam: "", nome: "Projeto realizado" },
];
$("#tabs").innerHTML = GAL.map((t, k) => `<button${k ? "" : ' class="on"'} data-i="${k}" role="tab">${t.rot}</button>`).join("");
function showGallery(k) {
  const t = GAL[k], box = $("#gallery");
  box.innerHTML = "";
  t.n.forEach((i, idx) => {
    const src = `images/${t.g}-${String(i).padStart(2, "0")}.jpg`;
    const b = document.createElement("button");
    b.style.animationDelay = idx * 40 + "ms";
    if (t.tam) b.dataset.tam = t.tam;
    b.innerHTML = `<img src="${src}" alt="${t.nome} modelo ${idx + 1}" loading="lazy">`;
    b.onclick = () => {
      $("#lbImg").src = src; $("#lbImg").alt = `${t.nome} modelo ${idx + 1}`;
      $("#lbBtn").dataset.msg = `Olá! Gostaria de um orçamento semelhante ao modelo ${t.nome} nº ${idx + 1}${t.tam ? ", tamanho " + t.tam : ""}.`;
      setWa($("#lbBtn")); $("#lb").hidden = false;
    };
    box.appendChild(b);
  });
}
$("#tabs").addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t) return;
  document.querySelectorAll("#tabs button").forEach((x) => x.classList.toggle("on", x === t));
  showGallery(+t.dataset.i);
});
$("#lb").addEventListener("click", (e) => { if (e.target.id === "lb" || e.target.classList.contains("lb-x")) $("#lb").hidden = true; });
addEventListener("keydown", (e) => { if (e.key === "Escape") $("#lb").hidden = true; });
showGallery(0);

$("#ano").textContent = new Date().getFullYear();

startSite();
setupScroll();

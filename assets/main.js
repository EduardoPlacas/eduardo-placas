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

/* galeria com abas e ampliação */
const GAL = {
  premium: [[1,2,3,4,5,6,7,8,9], "Placa Premium 40x50"],
  modelos: [[1,2,3,4,5,7,8,9,10,11], "Placa modelo"],
  projetos: [[30,29,25,27,26,2,4,19], "Projeto realizado"],
};
function showGallery(g) {
  const [n, nome] = GAL[g], box = $("#gallery");
  const tam = (i) => g === "premium" ? "40x50" : g === "modelos" ? (i === 1 ? "10x30" : i === 2 ? "10x35 com foto 6x8" : "20x30 e 30x40") : "";
  box.innerHTML = "";
  n.forEach((i, k) => {
    const src = `images/${g}-${String(i).padStart(2, "0")}.jpg`;
    const b = document.createElement("button");
    b.style.animationDelay = k * 40 + "ms"; if (tam(i)) b.dataset.tam = tam(i);
    b.innerHTML = `<img src="${src}" alt="${nome} ${i}" loading="lazy">`;
    b.onclick = () => { $("#lbImg").src = src; $("#lbImg").alt = `${nome} ${i}`; $("#lbBtn").dataset.msg = `Olá! Gostaria de um orçamento semelhante ao modelo ${nome} nº ${i} (${g}-${i})${tam(i) ? ", tamanho " + tam(i) : ""}.`; setWa($("#lbBtn")); $("#lb").hidden = false; };
    box.appendChild(b);
  });
}
$("#tabs").addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t) return;
  document.querySelectorAll("#tabs button").forEach((x) => x.classList.toggle("on", x === t));
  showGallery(t.dataset.g);
});
$("#lb").addEventListener("click", (e) => { if (e.target.id === "lb" || e.target.classList.contains("lb-x")) $("#lb").hidden = true; });
addEventListener("keydown", (e) => { if (e.key === "Escape") $("#lb").hidden = true; });
showGallery("premium");

$("#ano").textContent = new Date().getFullYear();

startSite();
setupScroll();

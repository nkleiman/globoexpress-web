// Globo Express — interacciones del sitio
const WHATSAPP = "59899491965";
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Menú móvil
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Borde del header al hacer scroll
const header = document.querySelector(".header");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Links de WhatsApp con mensaje: <a data-wa="texto">
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});

// Formulario -> mensaje de WhatsApp armado
const form = document.querySelector("#form-contacto");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const lines = [
    `Hola Globo Express! Soy ${d.nombre}${d.empresa ? ` de ${d.empresa}` : ""}.`,
    d.interes ? `Me interesa: ${d.interes}.` : "",
    d.fecha ? `Fecha del evento: ${d.fecha}.` : "",
    d.mensaje ? `\n${d.mensaje}` : "",
  ].filter(Boolean);
  window.open(waLink(lines.join("\n")), "_blank", "noopener");
});

// Galería con lightbox
const box = document.querySelector(".lightbox");
if (box) {
  const img = box.querySelector("img");
  const cap = box.querySelector("p");
  document.querySelectorAll(".gallery figure").forEach((fig) => {
    fig.tabIndex = 0;
    const open = () => {
      const src = fig.querySelector("img");
      img.src = src.src;
      img.alt = src.alt;
      cap.textContent = fig.querySelector("figcaption")?.innerText.replace("\n", " · ") ?? "";
      box.showModal();
    };
    fig.addEventListener("click", open);
    fig.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open()));
  });
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target.closest("button")) box.close();
  });
}

// Filtros de packs
const filters = document.querySelectorAll(".filters button");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const f = btn.dataset.filter;
    document.querySelectorAll(".pack").forEach((p) => {
      p.hidden = f !== "todos" && !p.dataset.tags.split(" ").includes(f);
    });
  })
);

// Año del copyright
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

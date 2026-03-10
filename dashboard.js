// ─────────────────────────────────────────────
//  dashboard.js  —  Gallery Dashboard
//  Edita el array IMAGES para usar tus propias
//  imágenes, títulos, autores y estadísticas.
// ─────────────────────────────────────────────

const IMAGES = [
  {
    id: 1,
    title: "Luz de tarde",
    author: "Elena Ruiz",
    category: "Naturaleza",
    date: "2024-11-12",
    views: 4820,
    likes: 312,
    downloads: 98,
    score: 94,
    // Cambia esta URL por la ruta de tu imagen: "./images/foto1.jpg"
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70"
  },
  {
    id: 2,
    title: "Arquitectura urbana",
    author: "Marco Díaz",
    category: "Urbano",
    date: "2024-11-20",
    views: 3201,
    likes: 198,
    downloads: 67,
    score: 82,
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=70"
  },
  {
    id: 3,
    title: "Retrato silencioso",
    author: "Ana Morales",
    category: "Retrato",
    date: "2024-12-01",
    views: 6540,
    likes: 481,
    downloads: 134,
    score: 97,
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=70"
  },
  {
    id: 4,
    title: "Mar abierto",
    author: "Luis Vega",
    category: "Naturaleza",
    date: "2024-10-30",
    views: 2980,
    likes: 175,
    downloads: 54,
    score: 78,
    src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70"
  },
  {
    id: 5,
    title: "Geometría mínima",
    author: "Sara Font",
    category: "Abstracto",
    date: "2024-12-10",
    views: 1870,
    likes: 134,
    downloads: 41,
    score: 71,
    src: "https://images.unsplash.com/photo-1557683304-673a23048d34?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1557683304-673a23048d34?w=400&q=70"
  },
  {
    id: 6,
    title: "Mercado central",
    author: "Pedro Lara",
    category: "Urbano",
    date: "2024-11-05",
    views: 3710,
    likes: 229,
    downloads: 78,
    score: 86,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70"
  },
  {
    id: 7,
    title: "Bosque de niebla",
    author: "Isabel Cruz",
    category: "Naturaleza",
    date: "2024-09-18",
    views: 5120,
    likes: 367,
    downloads: 112,
    score: 92,
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=70"
  },
  {
    id: 8,
    title: "Close-up flores",
    author: "Carla Pinto",
    category: "Macro",
    date: "2024-12-15",
    views: 2340,
    likes: 201,
    downloads: 63,
    score: 80,
    src: "https://images.unsplash.com/photo-1490750967868-88df5691cc56?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1490750967868-88df5691cc56?w=400&q=70"
  },
  {
    id: 9,
    title: "Noche estrellada",
    author: "Jorge Salas",
    category: "Abstracto",
    date: "2024-10-07",
    views: 4430,
    likes: 298,
    downloads: 89,
    score: 90,
    src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=70"
  }
];

// ─────────────────────────────────────────────
//  Estado de la app
// ─────────────────────────────────────────────

let activeFilter = "all";
let activeSort   = "views";

// ─────────────────────────────────────────────
//  Utilidades
// ─────────────────────────────────────────────

const fmt = n => n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString();

function getCategories() {
  return ["all", ...new Set(IMAGES.map(i => i.category))];
}

function getMaxViews() {
  return Math.max(...IMAGES.map(i => i.views));
}

function filterAndSort() {
  let list = activeFilter === "all"
    ? [...IMAGES]
    : IMAGES.filter(i => i.category === activeFilter);

  list.sort((a, b) => {
    if (activeSort === "title") return a.title.localeCompare(b.title);
    if (activeSort === "date")  return new Date(b.date) - new Date(a.date);
    return b[activeSort] - a[activeSort];
  });

  return list;
}

// ─────────────────────────────────────────────
//  Resumen global
// ─────────────────────────────────────────────

function renderSummary() {
  const totalViews  = IMAGES.reduce((s, i) => s + i.views, 0);
  const totalLikes  = IMAGES.reduce((s, i) => s + i.likes, 0);
  const avgLikes    = Math.round(totalLikes / IMAGES.length);
  const cats        = new Set(IMAGES.map(i => i.category)).size;
  const top         = [...IMAGES].sort((a, b) => b.views - a.views)[0];

  document.getElementById("total-images").textContent  = IMAGES.length;
  document.getElementById("stat-categories").textContent = cats + " categorías";
  document.getElementById("total-views").textContent   = fmt(totalViews);
  document.getElementById("total-likes").textContent   = avgLikes;
  document.getElementById("top-image").textContent     = top.title.split(" ")[0] + "…";
  document.getElementById("top-views").textContent     = fmt(top.views) + " vistas";

  const now = new Date();
  document.getElementById("last-updated").textContent =
    "Actualizado " + now.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
}

// ─────────────────────────────────────────────
//  Filtros
// ─────────────────────────────────────────────

function renderFilters() {
  const group = document.getElementById("filter-group");
  group.innerHTML = "";
  getCategories().forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === activeFilter ? " active" : "");
    btn.dataset.filter = cat;
    btn.textContent = cat === "all" ? "Todas" : cat;
    btn.addEventListener("click", () => {
      activeFilter = cat;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGallery();
    });
    group.appendChild(btn);
  });
}

// ─────────────────────────────────────────────
//  Galería
// ─────────────────────────────────────────────

function renderGallery() {
  const gallery = document.getElementById("gallery");
  const list    = filterAndSort();
  const maxV    = getMaxViews();

  gallery.innerHTML = "";

  if (list.length === 0) {
    gallery.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🖼️</div>
        <p>No hay imágenes en esta categoría.</p>
      </div>`;
    return;
  }

  list.forEach((img, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = (idx * 0.06) + "s";

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${img.thumb}" alt="${img.title}" loading="lazy"/>
        <span class="card-badge">${img.category}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${img.title}</h3>
        <p class="card-author">por ${img.author} · ${new Date(img.date).toLocaleDateString("es-ES", {day:"numeric", month:"short", year:"numeric"})}</p>
        <div class="card-stats">
          <div class="card-stat">
            <span class="card-stat-val">${fmt(img.views)}</span>
            <span class="card-stat-lbl">Vistas</span>
          </div>
          <div class="card-stat">
            <span class="card-stat-val">${fmt(img.likes)}</span>
            <span class="card-stat-lbl">Likes</span>
          </div>
          <div class="card-stat">
            <span class="card-stat-val">${img.downloads}</span>
            <span class="card-stat-lbl">Descargas</span>
          </div>
          <div class="card-stat">
            <span class="card-stat-val">${img.score}</span>
            <span class="card-stat-lbl">Score</span>
          </div>
        </div>
        <div class="card-bar">
          <div class="card-bar-fill" data-pct="${Math.round((img.views / maxV) * 100)}"></div>
        </div>
      </div>`;

    card.addEventListener("click", () => openLightbox(img));
    gallery.appendChild(card);
  });

  // Animate bars after paint
  requestAnimationFrame(() => {
    document.querySelectorAll(".card-bar-fill").forEach(el => {
      el.style.width = el.dataset.pct + "%";
    });
  });
}

// ─────────────────────────────────────────────
//  Lightbox
// ─────────────────────────────────────────────

function openLightbox(img) {
  document.getElementById("lb-img").src    = img.src;
  document.getElementById("lb-img").alt    = img.title;
  document.getElementById("lb-title").textContent  = img.title;
  document.getElementById("lb-author").textContent = "por " + img.author;
  document.getElementById("lb-tag").textContent    = img.category;

  const stats = [
    { label: "Vistas",     value: fmt(img.views) },
    { label: "Me gusta",   value: fmt(img.likes) },
    { label: "Descargas",  value: img.downloads },
    { label: "Score",      value: img.score + " / 100" },
    { label: "Publicado",  value: new Date(img.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) }
  ];

  document.getElementById("lb-stats").innerHTML = stats.map(s => `
    <div class="lb-row">
      <span class="lb-row-lbl">${s.label}</span>
      <span class="lb-row-val">${s.value}</span>
    </div>`).join("");

  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

// ─────────────────────────────────────────────
//  Eventos
// ─────────────────────────────────────────────

document.getElementById("lb-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox").addEventListener("click", e => {
  if (e.target === document.getElementById("lightbox")) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

document.getElementById("sort-select").addEventListener("change", e => {
  activeSort = e.target.value;
  renderGallery();
});

// ─────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────

renderSummary();
renderFilters();
renderGallery();

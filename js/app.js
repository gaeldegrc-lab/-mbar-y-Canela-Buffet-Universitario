// ============================================================
// 0. APERTURA DEL SOBRE
// ============================================================
const opening=document.getElementById("opening"), envelope=document.getElementById("envelope"), openInvitation=document.getElementById("openInvitation");
document.body.classList.add("locked");
openInvitation.addEventListener("click",()=>{envelope.classList.add("open");setTimeout(()=>{opening.classList.add("opened");document.body.classList.remove("locked")},850)});

// ============================================================
// 0.5 MÚSICA AMBIENTAL
// ============================================================
const music=document.getElementById("backgroundMusic"), musicButton=document.getElementById("musicButton"), musicText=document.getElementById("musicText");
musicButton.addEventListener("click",async()=>{try{if(music.paused){await music.play();musicButton.classList.add("playing");musicText.textContent="Pausar"}else{music.pause();musicButton.classList.remove("playing");musicText.textContent="Música"}}catch{musicText.textContent="Añade MP3"}});

// ============================================================
// 0.6 HOJAS OTOÑALES
// ============================================================
const leafContainer=document.getElementById("fallingLeaves");
function createLeaf(){const leaf=document.createElement("span");leaf.className="leaf";leaf.style.left=Math.random()*100+"%";leaf.style.animationDuration=7+Math.random()*7+"s";leaf.style.animationDelay=Math.random()*2+"s";leafContainer.appendChild(leaf);setTimeout(()=>leaf.remove(),16000)}
setInterval(createLeaf,900);

// ============================================================
// 1. FECHA DEL EVENTO
// Cambia esta fecha/hora para que el contador corresponda
// exactamente al día del buffet.
// Formato recomendado: YYYY-MM-DDTHH:MM:SS-06:00
// ============================================================
const EVENT_DATE = new Date("2026-11-10T09:00:00-11:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = EVENT_DATE - now;

  const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  if (distance <= 0) {
    Object.values(elements).forEach(el => el.textContent = "00");
    return;
  }

  elements.days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24))
    .toString().padStart(2, "0");

  elements.hours.textContent = Math.floor((distance / (1000 * 60 * 60)) % 24)
    .toString().padStart(2, "0");

  elements.minutes.textContent = Math.floor((distance / (1000 * 60)) % 60)
    .toString().padStart(2, "0");

  elements.seconds.textContent = Math.floor((distance / 1000) % 60)
    .toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// 2. ANIMACIONES DE APARICIÓN AL HACER SCROLL
// IntersectionObserver detecta cuando cada elemento entra
// en pantalla y agrega la clase .visible.
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// ============================================================
// 3. CONFIRMACIÓN DE ASISTENCIA
// Envía los datos al backend PHP.
// ============================================================
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  rsvpMessage.textContent = "Guardando tu confirmación...";

  try {
    const response = await fetch("api/rsvp.php", {
      method: "POST",
      body: new FormData(rsvpForm)
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Error");

    rsvpMessage.textContent = result.message;
    rsvpForm.reset();
  } catch (error) {
    rsvpMessage.textContent =
      "No pudimos guardar tu confirmación. Inténtalo nuevamente.";
  }
});

// ============================================================
// 4. GALERÍA
// Carga fotografías existentes y permite subir nuevas.
// ============================================================
const galleryGrid = document.getElementById("galleryGrid");
const galleryForm = document.getElementById("galleryForm");
const galleryMessage = document.getElementById("galleryMessage");

async function loadGallery() {
  try {
    const response = await fetch("api/gallery.php");
    const images = await response.json();

    galleryGrid.innerHTML = "";

    images.forEach(image => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = image.url;
      img.alt = `Recuerdo de ${image.nombre || "Ámbar y Canela"}`;
      img.loading = "lazy";

      const caption = document.createElement("figcaption");
      caption.textContent = image.nombre || "Recuerdo";

      figure.appendChild(img);
      figure.appendChild(caption);
      galleryGrid.appendChild(figure);
    });
  } catch {
    galleryGrid.innerHTML =
      "<p>No se pudo cargar la galería por el momento.</p>";
  }
}

galleryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  galleryMessage.textContent = "Subiendo fotografía...";

  try {
    const response = await fetch("api/upload.php", {
      method: "POST",
      body: new FormData(galleryForm)
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Error");

    galleryMessage.textContent = result.message;
    galleryForm.reset();
    loadGallery();
  } catch {
    galleryMessage.textContent =
      "No se pudo subir la fotografía.";
  }
});

loadGallery();

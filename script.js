// 🪄 had l-code kaytsenna l page kamla tload bach ybda l scripts
document.addEventListener("DOMContentLoaded", () => {

  /* MENU BURGER (téléphone)
     kay7ell / ysedd menu f mobile, mais f PC kayb9a horizontal normal */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("open");

  if (burger && nav) {
    // menni user yclick 3la burger
    burger.addEventListener("click", () => {
      nav.classList.toggle("open"); // ybaddel classe .open
    });

    // menni user yclick 3la lien men menu (About / Skills / ...)
    // menu ysedd automatiquement f mobile
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  /* 👀 Intersection Observer
     kaydir animation dyal fadeUp f sections kifach tban b douceur */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible"); // yban
        io.unobserve(e.target); // ma y3awdch observer
      }
    });
  }, { threshold: 0.12 }); // 12% men section khasha tbane f screen

  // kol element 3ndo .reveal kaykhdem 3lih animation
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* 💌 FORM DIAL CONTACT
     menni user yclick 3la Send kaybda had event */
  const form = document.querySelector(".contact-form");
  const notice = document.getElementById("contact-notice");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // ma y3awdch reload l page
      if (notice) notice.classList.add("show"); // yban message success
      form.reset(); // yssefri l inputs
    });
  }

  /* ✨ Animation dyal l-ism "Sahar Dellouz"
     juste test f console bach n3rf event */
  const name = document.getElementById("name");
  if (name) {
    name.addEventListener("mouseover", () => {
      console.log("✨ Hovered on Sahar's name");
    });
  }
});


// 🌙 ===== DARK / LIGHT MODE TOGGLE =====
(() => {
  const root = document.documentElement; // <html> li kaymchi fih class "dark"
  const toggleBtn = document.getElementById('theme-toggle');

  // 🔁 ki ychouf wach kayn mode enregistré f localStorage
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.classList.add('dark');

  // 🏷️ fonction katbaddel label f bouton (🌙 ⇄ ☀️)
  const syncLabel = () => {
    const isDark = root.classList.contains('dark');
    if (toggleBtn) toggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  };
  syncLabel();

  // 👇 menni user yclick 3la bouton dyal mode
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      root.classList.toggle('dark'); // ybaddel classe "dark" f <html>
      const isDark = root.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light'); // y7fdd choix user
      syncLabel();

      // 🌠 etoiles ki yfallaw f mode sombre
      if (isDark) startStars(); 
      else stopStars();
    });
  }

  // 🛫 ila kan deja mode sombre, ybda l etoiles automatiquement
  if (root.classList.contains('dark')) startStars();
})();


// 🌠 ===== ANIMATION DIAL LES ÉTOILES =====
let starsRAF = null;
let starsCtx = null;
let stars = [];
let canvasEl = null;

// 💫 fonction li katbda l animation
function startStars(){
  canvasEl = document.getElementById('stars-canvas');
  if (!canvasEl) return;
  starsCtx = canvasEl.getContext('2d');

  // 🌌 taille canvas selon taille dial window
  const resize = () => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  // 🧊 n7ddo nombre dyal etoiles selon surface écran
  const STAR_COUNT = Math.min(180, Math.floor((window.innerWidth*window.innerHeight)/8000));
  stars = Array.from({length: STAR_COUNT}, () => newStar());

  // 🎬 l'animation li katjri kol frame
  const tick = () => {
    drawStars();
    updateStars();
    starsRAF = requestAnimationFrame(tick);
  };
  if (!starsRAF) tick();
}

// 🛑 had fonction katwa9ef animation
function stopStars(){
  if (starsRAF) cancelAnimationFrame(starsRAF);
  starsRAF = null;
  if (starsCtx && canvasEl){
    starsCtx.clearRect(0,0,canvasEl.width,canvasEl.height);
  }
}

// ✨ création d'une étoile jdida
function newStar(){
  const speed = Math.random()*0.8 + 0.3; // vitesse dyal chute
  return {
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    r: Math.random()*1.6 + 0.4, // rayon
    vx: (Math.random()-0.5)*0.3, // dérive horizontal légère
    vy: speed,
    alpha: Math.random()*0.6 + 0.35 // transparence
  };
}

// 🔁 mise à jour dyal positions
function updateStars(){
  const w = window.innerWidth, h = window.innerHeight;
  for (let s of stars){
    s.x += s.vx;
    s.y += s.vy;

    // 💫 scintillement
    s.alpha += (Math.random()-0.5)*0.04;
    if (s.alpha < 0.2) s.alpha = 0.2;
    if (s.alpha > 0.9) s.alpha = 0.9;

    // recycle l étoile ila sb9at t7bat bzzaf
    if (s.y - s.r > h || s.x < -10 || s.x > w+10){
      s.x = Math.random()*w;
      s.y = -5;
      s.vx = (Math.random()-0.5)*0.3;
      s.vy = Math.random()*0.8 + 0.3;
      s.r = Math.random()*1.6 + 0.4;
    }
  }
}

// 🎨 rasm dyal les étoiles
function drawStars(){
  if (!starsCtx || !canvasEl) return;
  const ctx = starsCtx;
  ctx.clearRect(0,0,canvasEl.width,canvasEl.height);

  // 🌌 halo violet doux f l’arrière-plan
  const g = ctx.createRadialGradient(canvasEl.width/2, -100, 0, canvasEl.width/2, -100, canvasEl.height*1.2);
  g.addColorStop(0, 'rgba(202,165,245,0.15)');
  g.addColorStop(1, 'rgba(12,8,20,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvasEl.width,canvasEl.height);

  // 🌟 rasm kol étoile
  for (let s of stars){
    ctx.beginPath();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = '#f5eaff'; // lavande blanc
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
// IntersectionObserver: apparition des éléments .reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));


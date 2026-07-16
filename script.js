function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Le bouton CV reste désactivé tant que assets/cv.pdf n'a pas été déposé,
// pour ne jamais renvoyer un recruteur vers une 404. Le test est ignoré en
// file:// où fetch() échoue sur les fichiers locaux même quand ils existent.
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("cv-btn");
  if (!btn || !location.protocol.startsWith("http")) return;

  fetch("./assets/cv.pdf", { method: "HEAD" })
    .then((res) => {
      if (res.ok) return;
      throw new Error("CV absent");
    })
    .catch(() => {
      btn.disabled = true;
      btn.title = "CV bientôt disponible";
      btn.innerHTML = '<i class="fas fa-download"></i> CV bientôt dispo';
    });
});

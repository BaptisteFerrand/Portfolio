/* =========================================================
   Interactions : langue (FR/EN), thème (clair/sombre),
   menu mobile, année du footer.
   Les préférences sont mémorisées dans le localStorage.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- LANGUE ---------- */
  const langToggle = document.getElementById("langToggle");
  const langLabel = document.getElementById("langLabel");
  const STORAGE_LANG = "portfolio-lang";

  function applyLang(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        // <meta> : on met à jour l'attribut content, sinon le texte
        if (el.tagName === "META") el.setAttribute("content", dict[key]);
        else el.textContent = dict[key];
      }
    });

    // Attribut alt traduisible (images)
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (dict[key] !== undefined) el.setAttribute("alt", dict[key]);
    });

    // Attribut href traduisible (ex. CV selon la langue)
    document.querySelectorAll("[data-i18n-href]").forEach((el) => {
      const key = el.getAttribute("data-i18n-href");
      if (dict[key] !== undefined) el.setAttribute("href", dict[key]);
    });

    document.documentElement.lang = lang;
    // Le bouton affiche la langue vers laquelle on peut basculer
    langLabel.textContent = lang === "fr" ? "EN" : "FR";
    localStorage.setItem(STORAGE_LANG, lang);
  }

  langToggle.addEventListener("click", () => {
    const current = document.documentElement.lang === "fr" ? "fr" : "en";
    applyLang(current === "fr" ? "en" : "fr");
  });

  /* ---------- THÈME ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const STORAGE_THEME = "portfolio-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_THEME, theme);
  }

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  /* ---------- MENU MOBILE ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMenu() {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Ferme le menu quand on clique un lien (navigation interne)
  navMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", closeMenu)
  );

  /* ---------- LIEN « HAUT DE PAGE » ---------- */
  // Le header est en position:sticky : une ancre #top ne défile pas
  // car la cible est toujours visible. On force donc le scroll en haut.
  document.querySelectorAll('a[href="#top"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
  );

  /* ---------- ANNÉE DU FOOTER ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- INITIALISATION (préférences sauvegardées) ---------- */
  // Thème : préférence sauvegardée, sinon réglage système
  const savedTheme = localStorage.getItem(STORAGE_THEME);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  // Langue : préférence sauvegardée, sinon langue du navigateur, sinon FR
  const savedLang = localStorage.getItem(STORAGE_LANG);
  const browserLang = (navigator.language || "fr").slice(0, 2);
  applyLang(savedLang || (browserLang === "en" ? "en" : "fr"));
})();

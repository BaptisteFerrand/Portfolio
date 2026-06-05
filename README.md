# Portfolio — Baptiste Ferrand

Site portfolio personnel **statique**, sans dépendance ni build : du HTML, du CSS et du JavaScript purs. Léger, rapide, hébergeable partout (GitHub Pages, Netlify, Vercel…).

## ✨ Fonctionnalités

- **Bilingue FR / EN** avec bouton de bascule (préférence mémorisée)
- **Thème clair / sombre** (suit le réglage système par défaut)
- **Responsive** (menu mobile compris)
- **Accessible** (skip link, focus visible, `prefers-reduced-motion`)
- Sections : À propos · Compétences · Projets/Labs · Parcours/CV · Contact

## 📁 Structure

```
portfolio/
├── index.html          # Structure de la page (une seule page)
├── css/style.css       # Styles + thèmes + responsive
├── js/i18n.js          # Dictionnaire de traductions FR/EN
├── js/main.js          # Langue, thème, menu mobile
├── assets/             # CV.pdf, images
└── README.md
```

## 🛠️ Personnalisation

Tout le contenu textuel vit à **deux endroits** :

1. **`index.html`** — le texte par défaut (français) et la structure.
2. **`js/i18n.js`** — les traductions. Chaque texte traduit a une clé `data-i18n="…"`
   dans le HTML et une entrée correspondante en `fr` **et** `en` dans `i18n.js`.

> ⚠️ Si tu modifies un texte, pense à le changer **aussi dans `i18n.js`** (sinon la
> bascule de langue réécrira l'ancienne valeur).

À remplacer en priorité :

- [ ] **Projets** : titres, descriptions, technos et liens (`#` → tes vraies URLs GitHub/démo)
- [ ] **Parcours** : entreprise, école, dates, diplômes
- [ ] **Contact** : liens GitHub et LinkedIn (actuellement `https://github.com/` et `https://www.linkedin.com/`)
- [ ] **CV** : dépose ton `cv.pdf` dans `assets/`
- [ ] **Compétences** : ajuste les listes à ton profil réel
- [ ] **Couleur d'accent** : variable `--accent` en haut de `css/style.css`

## 🚀 Lancer en local

Ouvre simplement `index.html` dans ton navigateur. Ou, pour un petit serveur local :

```bash
# Python
python -m http.server 8000
# puis ouvre http://localhost:8000
```

## 🌐 Déployer sur GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<ton-pseudo>/<ton-repo>.git
git push -u origin main
```

Puis dans **Settings → Pages** du dépôt : source = branche `main`, dossier `/ (root)`.
Le site sera en ligne sur `https://<ton-pseudo>.github.io/<ton-repo>/`.

> Astuce : pour un nom plus propre (`https://<ton-pseudo>.github.io/`), nomme le dépôt
> `<ton-pseudo>.github.io`.

## 📦 Autres hébergeurs

- **Netlify / Vercel** : glisse-dépose le dossier, ou connecte le dépôt Git. Aucun
  réglage de build n'est nécessaire (site statique).

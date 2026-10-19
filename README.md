# Vortex — Sitio corporativo

Sitio web corporativo para **Vortex**, una empresa ficticia de ingeniería aeronáutica de alta precisión. Cinco páginas con animaciones al hacer scroll y contenido en dos idiomas.

**Stack:** HTML · CSS · JavaScript · GSAP + ScrollTrigger · Lenis

## Qué tiene

- Páginas: inicio, qué hacemos, empresas, sostenibilidad y contacto.
- **Animaciones** con GSAP y ScrollTrigger: hero, revelado al hacer scroll, parallax y una historia guiada por scroll.
- **Scroll suave** con Lenis.
- **Bilingüe:** un motor de traducción propio en [`assets/js/core/i18n-engine.js`](assets/js/core/i18n-engine.js).
- **CSS modular:** variables, base, componentes, layout y estilos por página.

```
assets/
├── css/   base/ · components/ · layout/ · pages/
└── js/    animations/ · components/ · config/ · core/
```

## Cómo verlo

No necesita build. Abre `index.html` o sírvelo con cualquier servidor estático:

```bash
npx serve .
```

---

Desarrollado por [Bryan Espejo](https://bryanespejo.pages.dev) · Ingeniería de Software, UPC

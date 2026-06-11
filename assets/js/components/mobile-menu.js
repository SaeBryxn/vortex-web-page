// assets/js/components/mobile-menu.js

/**
 * ========================================================
 * Mobile Menu Component
 * Improves Bootstrap collapse behavior on navigation click.
 * ========================================================
 */

import { qs, qsa } from "../core/dom.js";

export const initMobileMenu = () => {
    const menu = qs("#vortexMenu");

    if (!menu || typeof bootstrap === "undefined") return;

    const collapseInstance = bootstrap.Collapse.getOrCreateInstance(menu, {
        toggle: false
    });

    qsa("#vortexMenu .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (menu.classList.contains("show")) {
                collapseInstance.hide();
            }
        });
    });
};
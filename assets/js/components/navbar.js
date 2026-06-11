// assets/js/components/navbar.js

/**
 * ========================================================
 * Navbar Component
 * Handles scroll state and active link behavior.
 * ========================================================
 */

import { qs, qsa } from "../core/dom.js";

const SCROLL_THRESHOLD = 30;

const setNavbarScrollState = (navbar) => {
    if (!navbar || navbar.classList.contains("navbar-static")) return;

    if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add("is-scrolled");
    } else {
        navbar.classList.remove("is-scrolled");
    }
};

const setActiveNavigationLink = () => {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    qsa(".vortex-navbar .nav-link").forEach((link) => {
        const href = link.getAttribute("href");

        if (!href) return;

        const normalizedHref = href.split("#")[0];

        if (normalizedHref === currentPath) {
            link.classList.add("active");
        }
    });
};

export const initNavbar = () => {
    const navbar = qs(".vortex-navbar");

    if (!navbar) return;

    setNavbarScrollState(navbar);
    setActiveNavigationLink();

    window.addEventListener(
        "scroll",
        () => setNavbarScrollState(navbar),
        { passive: true }
    );
};
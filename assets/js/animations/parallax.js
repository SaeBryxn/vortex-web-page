// assets/js/animations/parallax.js

/**
 * ========================================================
 * Parallax
 * Lightweight scroll parallax controlled through data attributes.
 *
 * Usage:
 * data-parallax
 * data-parallax-speed="0.12"
 * data-parallax-axis="y"
 * ========================================================
 */

import { qsa } from "../core/dom.js";

let ticking = false;

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getSpeed = (element) => {
    const speed = Number.parseFloat(element.dataset.parallaxSpeed);
    return Number.isNaN(speed) ? 0.12 : speed;
};

const getAxis = (element) => {
    return element.dataset.parallaxAxis || "y";
};

const updateParallax = (elements) => {
    const viewportHeight = window.innerHeight;

    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        const speed = getSpeed(element);
        const axis = getAxis(element);
        const offset = (rect.top - viewportHeight / 2) * speed;

        if (axis === "x") {
            element.style.transform = `translate3d(${offset}px, 0, 0)`;
        } else {
            element.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
    });
};

const requestUpdate = (elements) => {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(() => {
        updateParallax(elements);
        ticking = false;
    });
};

export const initParallax = () => {
    const elements = qsa("[data-parallax]");

    if (!elements.length || prefersReducedMotion()) return;

    requestUpdate(elements);

    window.addEventListener("scroll", () => requestUpdate(elements), { passive: true });
    window.addEventListener("resize", () => requestUpdate(elements));
};
// assets/js/animations/reveal.js

/**
 * ========================================================
 * Reveal Animations
 * Uses IntersectionObserver for performant scroll reveals.
 * ========================================================
 */

import { qsa } from "../core/dom.js";

const DEFAULT_THRESHOLD = 0.16;

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const initRevealAnimations = () => {
    const revealElements = qsa("[data-reveal]");

    if (!revealElements.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: DEFAULT_THRESHOLD,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });
};
// assets/js/animations/smooth-scroll.js

/**
 * ========================================================
 * Smooth Scroll
 * Lenis integration for premium scroll behavior.
 * ========================================================
 */

let lenisInstance = null;

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const isLenisAvailable = () => {
    return typeof window.Lenis !== "undefined";
};

export const getLenis = () => {
    return lenisInstance;
};

export const initSmoothScroll = () => {
    if (prefersReducedMotion()) return null;

    if (!isLenisAvailable()) {
        console.warn("[VORTEX] Lenis is not available. Smooth scroll disabled.");
        return null;
    }

    lenisInstance = new window.Lenis({
        duration: 1.15,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3)
    });

    return lenisInstance;
};

export const destroySmoothScroll = () => {
    if (!lenisInstance) return;

    lenisInstance.destroy();
    lenisInstance = null;
};
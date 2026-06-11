// assets/js/animations/gsap-config.js

/**
 * ========================================================
 * GSAP Configuration
 * Registers ScrollTrigger and synchronizes it with Lenis.
 * ========================================================
 */

import { getLenis } from "./smooth-scroll.js";

let isConfigured = false;

const isGsapAvailable = () => {
    return typeof window.gsap !== "undefined";
};

const isScrollTriggerAvailable = () => {
    return typeof window.ScrollTrigger !== "undefined";
};

export const getGsap = () => {
    return window.gsap;
};

export const getScrollTrigger = () => {
    return window.ScrollTrigger;
};

export const configureGsap = () => {
    if (isConfigured) return;

    if (!isGsapAvailable() || !isScrollTriggerAvailable()) {
        console.warn("[VORTEX] GSAP or ScrollTrigger is not available. Advanced scroll animations disabled.");
        return;
    }

    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();
    const lenis = getLenis();

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
        markers: false
    });

    if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

    isConfigured = true;
};

export const refreshScrollTrigger = () => {
    const ScrollTrigger = getScrollTrigger();

    if (!ScrollTrigger) return;

    ScrollTrigger.refresh();
};
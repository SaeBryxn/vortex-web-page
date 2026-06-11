// assets/js/animations/hero-motion.js

/**
 * ========================================================
 * Hero Motion
 * Premium GSAP timeline for VORTEX Precision Hero.
 * ========================================================
 */

import { getGsap } from "./gsap-config.js";

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const initHeroMotion = () => {
    const gsap = getGsap();

    if (!gsap || prefersReducedMotion()) return;

    const hero = document.querySelector(".hero-precision");

    if (!hero) return;

    const word = hero.querySelector(".js-hero-word");
    const engine = hero.querySelector(".js-hero-engine");
    const copy = hero.querySelectorAll(".js-hero-copy");
    const techDetails = hero.querySelectorAll(".hero-tech-detail");

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1
        }
    });

    timeline
        .from(word, {
            y: 38,
            opacity: 0,
            scale: 0.98,
            duration: 1.15
        })
        .from(engine, {
            y: 46,
            opacity: 0,
            scale: 0.96,
            duration: 1.25
        }, "-=0.72")
        .from(copy, {
            y: 24,
            opacity: 0,
            stagger: 0.12
        }, "-=0.62")
        .from(techDetails, {
            opacity: 0,
            y: 18,
            stagger: 0.12
        }, "-=0.55");

    gsap.to(engine, {
        y: -10,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
};
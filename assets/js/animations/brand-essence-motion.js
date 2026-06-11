// assets/js/animations/brand-essence-motion.js

/**
 * ========================================================
 * Brand Essence Motion
 * GSAP + ScrollTrigger animation for VORTEX brand narrative.
 * ========================================================
 */

import { getGsap, getScrollTrigger } from "./gsap-config.js";

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const initBrandEssenceMotion = () => {
    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();

    if (!gsap || !ScrollTrigger || prefersReducedMotion()) return;

    const section = document.querySelector(".brand-essence");

    if (!section) return;

    const bg = section.querySelector(".js-essence-bg");
    const content = section.querySelector(".js-essence-content");
    const visual = section.querySelector(".js-essence-visual");
    const principles = [...section.querySelectorAll(".js-essence-principle")];
    const diagram = section.querySelector(".js-vortex-diagram");
    const orbits = [...section.querySelectorAll(".js-vortex-orbit")];
    const labels = [...section.querySelectorAll(".js-vortex-label")];
    const core = section.querySelector(".js-vortex-core");
    const axis = [...section.querySelectorAll(".vortex-axis")];

    gsap.set(content, {
        autoAlpha: 0,
        y: 46
    });

    gsap.set(visual, {
        autoAlpha: 0,
        y: 48,
        scale: 0.965
    });

    gsap.set(principles, {
        autoAlpha: 0,
        y: 28
    });

    gsap.set(orbits, {
        autoAlpha: 0,
        scale: 0.62,
        rotate: -16
    });

    gsap.set(core, {
        autoAlpha: 0,
        scale: 0.72
    });

    gsap.set(labels, {
        autoAlpha: 0,
        y: 18
    });

    gsap.set(axis, {
        scale: 0
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 38%",
            toggleActions: "play none none reverse"
        },
        defaults: {
            ease: "power3.out"
        }
    });

    timeline
        .to(content, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72
        })
        .to(visual, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.76
        }, "-=0.46")
        .to(axis, {
            scale: 1,
            duration: 0.5,
            stagger: 0.08
        }, "-=0.34")
        .to(orbits, {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.68,
            stagger: 0.08
        }, "-=0.38")
        .to(core, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.56,
            ease: "back.out(1.5)"
        }, "-=0.28")
        .to(labels, {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.08
        }, "-=0.26")
        .to(principles, {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            stagger: 0.08
        }, "-=0.46");

    if (diagram) {
        gsap.to(diagram, {
            y: -22,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            }
        });
    }

    if (bg) {
        gsap.to(bg, {
            y: -34,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    if (orbits.length) {
        gsap.to(orbits, {
            rotate: 360,
            duration: 46,
            ease: "none",
            repeat: -1,
            stagger: {
                each: 0.35,
                from: "center"
            }
        });
    }
};
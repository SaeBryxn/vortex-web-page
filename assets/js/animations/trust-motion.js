// assets/js/animations/trust-motion.js

/**
 * ========================================================
 * Trust Motion Pro
 * Premium GSAP animation for corporate metrics strip.
 * Fast reveal + visible counter animation.
 * ========================================================
 */

import { getGsap, getScrollTrigger } from "./gsap-config.js";

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const animateCounter = ({ gsap, element, target, prefix = "", duration = 1 }) => {
    const state = { value: 0 };

    gsap.fromTo(
        state,
        { value: 0 },
        {
            value: target,
            duration,
            ease: "power2.out",
            onUpdate: () => {
                element.textContent = `${prefix}${Math.round(state.value)}`;
            },
            onComplete: () => {
                element.textContent = `${prefix}${target}`;
            }
        }
    );
};

const restartScan = (grid) => {
    if (!grid) return;

    grid.classList.remove("is-scanned");
    void grid.offsetWidth;
    grid.classList.add("is-scanned");
};

export const initTrustMotion = () => {
    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();

    if (!gsap || !ScrollTrigger || prefersReducedMotion()) return;

    const section = document.querySelector(".trust-data-strip");

    if (!section) return;

    const bg = section.querySelector(".js-trust-bg");
    const heading = section.querySelector(".js-trust-heading");
    const grid = section.querySelector(".js-trust-grid");
    const items = [...section.querySelectorAll(".js-trust-item")];
    const values = [...section.querySelectorAll(".trust-data-value")];
    const labels = [...section.querySelectorAll(".trust-data-label")];
    const lines = [...section.querySelectorAll(".trust-data-line")];
    const counters = [...section.querySelectorAll(".js-trust-counter")];
    const masks = [...section.querySelectorAll(".js-trust-mask")];

    gsap.set(heading, {
        autoAlpha: 0,
        y: 34
    });

    gsap.set(grid, {
        autoAlpha: 0,
        y: 24,
        scale: 0.992
    });

    gsap.set(items, {
        autoAlpha: 0,
        y: 24
    });

    gsap.set(lines, {
        scaleX: 0,
        transformOrigin: "left center"
    });

    gsap.set(values, {
        autoAlpha: 0,
        y: 18
    });

    gsap.set(labels, {
        autoAlpha: 0,
        y: 12
    });

    gsap.set(masks, {
        clipPath: "inset(0 100% 0 0)"
    });

    counters.forEach((counter) => {
        const prefix = counter.dataset.prefix || "";
        counter.textContent = `${prefix}0`;
    });

    const timeline = gsap.timeline({
        paused: true,
        defaults: {
            ease: "power3.out"
        },
        onStart: () => {
            restartScan(grid);
        }
    });

    timeline
        .to(heading, {
            autoAlpha: 1,
            y: 0,
            duration: 0.62
        })
        .to(grid, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.58
        }, "-=0.34")
        .to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            stagger: 0.075
        }, "-=0.34")
        .to(lines, {
            scaleX: 1,
            duration: 0.38,
            stagger: 0.055
        }, "-=0.34")
        .to(values, {
            autoAlpha: 1,
            y: 0,
            duration: 0.44,
            stagger: 0.055
        }, "-=0.30")
        .to(masks, {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.48,
            stagger: 0.055
        }, "-=0.44")
        .add(() => {
            counters.forEach((counter) => {
                const target = Number.parseInt(counter.dataset.target || "0", 10);
                const prefix = counter.dataset.prefix || "";

                animateCounter({
                    gsap,
                    element: counter,
                    target,
                    prefix,
                    duration: 1
                });
            });
        }, "-=0.18")
        .to(labels, {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.055
        }, "-=0.18");

    ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
            timeline.play(0);
        }
    });

    if (bg) {
        gsap.to(bg, {
            y: -28,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                y: -6,
                duration: 0.28,
                ease: "power3.out"
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                y: 0,
                duration: 0.28,
                ease: "power3.out"
            });
        });
    });
};
// assets/js/animations/brand-flow-motion.js

/**
 * ========================================================
 * Brand Flow Motion
 * Viewport-safe pinned narrative sequence.
 * ========================================================
 */

import { getGsap, getScrollTrigger } from "./gsap-config.js";

const DESKTOP_BREAKPOINT = 992;

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const setActiveChapter = ({ gsap, chapters, nodes, activeIndex }) => {
    chapters.forEach((chapter, index) => {
        const isActive = index === activeIndex;

        chapter.classList.toggle("is-active", isActive);

        gsap.to(chapter, {
            autoAlpha: isActive ? 1 : 0,
            y: isActive ? 0 : 20,
            duration: 0.28,
            ease: "power3.out",
            overwrite: true
        });
    });

    nodes.forEach((node, index) => {
        node.classList.toggle("is-active", index <= activeIndex);
    });
};

export const initBrandFlowMotion = () => {
    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();

    if (!gsap || !ScrollTrigger || prefersReducedMotion()) return;

    const section = document.querySelector(".brand-flow-narrative");

    if (!section) return;

    const bg = section.querySelector(".js-brand-flow-bg");
    const intro = section.querySelector(".js-brand-flow-intro");
    const statement = section.querySelector(".js-brand-flow-statement");
    const footer = section.querySelector(".js-brand-flow-footer");
    const line = section.querySelector(".js-brand-flow-line");
    const chapters = [...section.querySelectorAll(".js-brand-flow-chapter")];
    const nodes = [...section.querySelectorAll(".js-brand-flow-node")];

    if (!chapters.length) return;

    if (window.innerWidth < DESKTOP_BREAKPOINT) {
        gsap.from([intro, statement, footer], {
            autoAlpha: 0,
            y: 26,
            duration: 0.62,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
                trigger: section,
                start: "top 76%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(chapters, {
            autoAlpha: 0,
            y: 22,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
                trigger: section,
                start: "top 58%",
                toggleActions: "play none none reverse"
            }
        });

        return;
    }

    let activeChapter = 0;

    gsap.set([intro, statement, footer], {
        autoAlpha: 0,
        y: 26
    });

    gsap.set(chapters, {
        autoAlpha: 0,
        y: 20
    });

    gsap.set(line, {
        scaleX: 0,
        transformOrigin: "left center"
    });

    chapters.forEach((chapter, index) => {
        chapter.classList.toggle("is-active", index === 0);
    });

    gsap.set(chapters[0], {
        autoAlpha: 1,
        y: 0
    });

    setActiveChapter({
        gsap,
        chapters,
        nodes,
        activeIndex: 0
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.45}`,
            scrub: 0.75,
            pin: true,
            anticipatePin: 0.35,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress;
                let nextChapter = 0;

                if (progress >= 0.43 && progress < 0.70) {
                    nextChapter = 1;
                } else if (progress >= 0.70) {
                    nextChapter = 2;
                }

                if (nextChapter !== activeChapter) {
                    activeChapter = nextChapter;

                    setActiveChapter({
                        gsap,
                        chapters,
                        nodes,
                        activeIndex: activeChapter
                    });
                }
            }
        },
        defaults: {
            ease: "none"
        }
    });

    timeline
        .to(intro, {
            autoAlpha: 1,
            y: 0,
            duration: 0.12
        })
        .to(statement, {
            autoAlpha: 1,
            y: 0,
            duration: 0.18
        }, 0.04)
        .to(footer, {
            autoAlpha: 1,
            y: 0,
            duration: 0.12
        }, 0.12)
        .to(line, {
            scaleX: 1,
            duration: 0.78
        }, 0.18);

    if (bg) {
        gsap.to(bg, {
            y: -30,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }
};
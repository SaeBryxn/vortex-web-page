// assets/js/animations/scroll-story.js

/**
 * ========================================================
 * Scroll Story
 * GSAP + ScrollTrigger pinned storytelling section.
 * Smooth premium version.
 * ========================================================
 */

import { getGsap, getScrollTrigger, refreshScrollTrigger } from "./gsap-config.js";
import { i18n, STORAGE_LANGUAGE_KEY, DEFAULT_LANGUAGE } from "../config/i18n.js";

const STORY_BREAKPOINT = 992;

const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getCurrentLanguage = () => {
    try {
        return localStorage.getItem(STORAGE_LANGUAGE_KEY) || DEFAULT_LANGUAGE;
    } catch {
        return DEFAULT_LANGUAGE;
    }
};

const getStorySteps = () => {
    const lang = getCurrentLanguage();
    const dictionary = i18n[lang] || i18n[DEFAULT_LANGUAGE];

    return [
        {
            index: "01",
            title: dictionary.sequence_step_1_title,
            text: dictionary.sequence_step_1_text
        },
        {
            index: "02",
            title: dictionary.sequence_step_2_title,
            text: dictionary.sequence_step_2_text
        },
        {
            index: "03",
            title: dictionary.sequence_step_3_title,
            text: dictionary.sequence_step_3_text
        },
        {
            index: "04",
            title: dictionary.sequence_step_4_title,
            text: dictionary.sequence_step_4_text
        }
    ];
};

const setActiveImage = (images, activeIndex) => {
    images.forEach((image, index) => {
        image.classList.toggle("is-active", index === activeIndex);
    });
};

const renderStep = ({ indexNode, titleNode, textNode, progressNode, images, stepIndex }) => {
    const steps = getStorySteps();
    const currentStep = steps[stepIndex];

    if (!currentStep) return;

    if (indexNode) indexNode.textContent = currentStep.index;
    if (titleNode) titleNode.textContent = currentStep.title;
    if (textNode) textNode.textContent = currentStep.text;

    if (progressNode) {
        const progress = ((stepIndex + 1) / steps.length) * 100;
        progressNode.style.height = `${progress}%`;
    }

    setActiveImage(images, stepIndex);
};

export const initScrollStory = () => {
    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();

    if (!gsap || !ScrollTrigger || prefersReducedMotion()) return;

    const section = document.querySelector(".engineering-sequence");
    const stage = document.querySelector("[data-scroll-story]");

    if (!section || !stage) return;

    if (window.innerWidth < STORY_BREAKPOINT) return;

    const indexNode = stage.querySelector(".js-sequence-index");
    const titleNode = stage.querySelector(".js-sequence-title");
    const textNode = stage.querySelector(".js-sequence-text");
    const progressNode = stage.querySelector(".js-sequence-progress");
    const images = [...stage.querySelectorAll(".js-sequence-image")];
    const visualFrame = stage.querySelector(".sequence-visual-frame");
    const content = stage.querySelector(".engineering-sequence-content");

    const steps = getStorySteps();
    let activeStep = 0;
    let isAnimatingText = false;

    renderStep({
        indexNode,
        titleNode,
        textNode,
        progressNode,
        images,
        stepIndex: activeStep
    });

    gsap.set([content, visualFrame], {
        opacity: 0,
        y: 42
    });

    ScrollTrigger.create({
        trigger: stage,
        start: "top 78%",
        once: true,
        onEnter: () => {
            gsap.to([content, visualFrame], {
                opacity: 1,
                y: 0,
                duration: 1.05,
                ease: "power3.out",
                stagger: 0.12
            });
        }
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: stage,

            /*
             * Antes estaba en "top top".
             * Eso hacía que el pin entrara como frenazo.
             * Ahora empieza con un offset más natural.
             */
            start: "top 10%",

            /*
             * Más recorrido = cambios menos violentos.
             */
            end: () => `+=${window.innerHeight * steps.length}`,

            /*
             * Scrub más alto = más suavidad.
             */
            scrub: 1.15,

            pin: true,
            pinSpacing: true,

            /*
             * Bajamos anticipatePin para que no se sienta como salto.
             */
            anticipatePin: 0.35,

            invalidateOnRefresh: true,

            onUpdate: (self) => {
                const nextStep = Math.min(
                    steps.length - 1,
                    Math.floor(self.progress * steps.length)
                );

                if (nextStep === activeStep || isAnimatingText) return;

                activeStep = nextStep;
                isAnimatingText = true;

                gsap.to([titleNode, textNode, indexNode], {
                    opacity: 0,
                    y: 14,
                    duration: 0.18,
                    ease: "power2.out",
                    onComplete: () => {
                        renderStep({
                            indexNode,
                            titleNode,
                            textNode,
                            progressNode,
                            images,
                            stepIndex: activeStep
                        });

                        gsap.fromTo(
                            [indexNode, titleNode, textNode],
                            {
                                opacity: 0,
                                y: 14
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.38,
                                ease: "power3.out",
                                stagger: 0.035,
                                onComplete: () => {
                                    isAnimatingText = false;
                                }
                            }
                        );
                    }
                });
            }
        }
    });

    timeline.fromTo(
        visualFrame,
        {
            scale: 0.985
        },
        {
            scale: 1,
            ease: "none"
        },
        0
    );

    window.addEventListener("languagechange", () => {
        renderStep({
            indexNode,
            titleNode,
            textNode,
            progressNode,
            images,
            stepIndex: activeStep
        });

        refreshScrollTrigger();
    });
};
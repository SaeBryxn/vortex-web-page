// assets/js/core/app.js

/**
 * ========================================================
 * VORTEX App Core
 * Initializes frontend modules.
 * ========================================================
 */

import { initI18n } from "./i18n-engine.js";

import { initNavbar } from "../components/navbar.js";
import { initFooter } from "../components/footer.js";
import { initMobileMenu } from "../components/mobile-menu.js";

import { initSmoothScroll } from "../animations/smooth-scroll.js";
import { configureGsap } from "../animations/gsap-config.js";
import { initHeroMotion } from "../animations/hero-motion.js";
import { initRevealAnimations } from "../animations/reveal.js";
import { initParallax } from "../animations/parallax.js";
import { initScrollStory } from "../animations/scroll-story.js";
import { initTrustMotion } from "../animations/trust-motion.js";
import { initBrandEssenceMotion } from "../animations/brand-essence-motion.js";
import { initBrandFlowMotion } from "../animations/brand-flow-motion.js";

export const initApp = () => {
    document.documentElement.classList.add("is-ready");

    initFooter();

    initSmoothScroll();
    configureGsap();

    initNavbar();
    initI18n();
    initMobileMenu();

    initHeroMotion();
    initRevealAnimations();
    initParallax();
    initScrollStory();
    initTrustMotion();
    initBrandFlowMotion();

};
// assets/js/core/dom.js

/**
 * ========================================================
 * DOM Helpers
 * Small utilities to keep modules clean and readable.
 * ========================================================
 */

export const qs = (selector, scope = document) => {
    return scope.querySelector(selector);
};

export const qsa = (selector, scope = document) => {
    return [...scope.querySelectorAll(selector)];
};

export const on = (target, event, handler, options = {}) => {
    if (!target) return null;

    target.addEventListener(event, handler, options);

    return () => {
        target.removeEventListener(event, handler, options);
    };
};

export const setHTML = (element, html) => {
    if (!element) return;
    element.innerHTML = html;
};

export const setText = (element, text) => {
    if (!element) return;
    element.textContent = text;
};

export const getStoredValue = (key, fallback = null) => {
    try {
        return localStorage.getItem(key) ?? fallback;
    } catch {
        return fallback;
    }
};

export const setStoredValue = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch {
        /* localStorage can fail in restricted contexts */
    }
};

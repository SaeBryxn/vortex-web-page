// assets/js/components/footer.js

/**
 * ========================================================
 * Footer Component
 * Injects corporate footer into [data-component="footer"].
 * ========================================================
 */

import { qs, setHTML } from "../core/dom.js";

const createFooterTemplate = () => {
    return `
        <footer class="vortex-footer">
            <div class="container">
                <div class="row gy-5">
                    <div class="col-lg-5">
                        <a class="footer-brand" href="index.html" aria-label="Vortex Home">
                            <img src="assets/img/logos/VortexLogo.png" alt="Vortex Logo" height="42">
                        </a>

                        <p class="footer-copy mt-4" data-i18n="footer_tagline">
                            Ingeniería aeronáutica de alta precisión para operaciones críticas.
                        </p>
                    </div>

                    <div class="col-6 col-lg-3">
                        <h2 class="footer-title" data-i18n="footer_nav_title">Navegación</h2>

                        <ul class="footer-list">
                            <li><a href="index.html" data-i18n="nav_home">Inicio</a></li>
                            <li><a href="que-hacemos.html" data-i18n="nav_services">Servicios</a></li>
                            <li><a href="empresas.html" data-i18n="nav_companies">Compañías</a></li>
                            <li><a href="sostenibilidad.html" data-i18n="nav_sustainability">Sostenibilidad</a></li>
                            <li><a href="contacto.html" data-i18n="nav_contact">Contacto</a></li>
                        </ul>
                    </div>

                    <div class="col-6 col-lg-4">
                        <h2 class="footer-title" data-i18n="footer_contact_title">Contacto</h2>

                        <ul class="footer-list">
                            <li><a href="mailto:vortex.aero@gmail.com">vortex.aero@gmail.com</a></li>
                            <li><a href="tel:+51989067656">+51 989 067 656</a></li>
                            <li><span data-i18n="footer_location">Lima, Perú</span></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <span>© <span data-current-year></span> VORTEX.</span>
                    <span data-i18n="footer_rights">Todos los derechos reservados.</span>
                </div>
            </div>
        </footer>
    `;
};

export const initFooter = () => {
    const footerMount = qs('[data-component="footer"]');

    if (!footerMount) return;

    setHTML(footerMount, createFooterTemplate());

    const yearNode = qs("[data-current-year]");

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }
};
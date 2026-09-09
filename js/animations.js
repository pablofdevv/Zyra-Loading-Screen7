/**
 * ==========================================================================
 *        MÓDULO DE TRANSICIONES Y REVEALS - ZYRA HUD (PREMIUM)
 * ==========================================================================
 */

class ZyraAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Revelar el escenario central tridimensional con escala
        const stage = document.querySelector('.hud-center-stage');
        if (stage) {
            stage.style.opacity = '0';
            stage.style.transform = 'translate(-50%, -50%) scale(0.8)';
            stage.style.transition = 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                stage.style.opacity = '1';
                stage.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 100);
        }
    }
}
window.ZyraAnimations = ZyraAnimations;

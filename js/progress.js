/**
 * ==========================================================================
 *        MÓDULO DE PROGRESO HOLOGRÁFICO - ZYRA HUD (PREMIUM)
 * ==========================================================================
 */

class ZyraProgress {
    constructor(config) {
        this.config = config || {};
        this.progressValText = document.getElementById('progress-val-text');
    }

    updateProgress(percentage) {
        const val = Math.min(Math.max(percentage, 0), 100);

        // Acelerar dinámicamente la velocidad del prisma 3D (hasta 5 veces más rápido al 100%)
        window.prismSpeedScale = 1.0 + (val / 100) * 4.0;

        // Actualizar porcentaje de carga
        if (this.progressValText) {
            this.progressValText.innerText = `${Math.round(val)}%`;
        }
    }
}
window.ZyraProgress = ZyraProgress;

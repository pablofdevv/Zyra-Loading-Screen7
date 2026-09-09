/**
 * ==========================================================================
 *        MÓDULO DE FASES DE CARGA - ZYRA HUD (PREMIUM)
 * ==========================================================================
 */

class ZyraLoadingManager {
    constructor(config) {
        this.config = config || {};
        this.phases = this.config.phases || [];
        this.logText = document.getElementById('log-text');
    }

    updatePhaseText(percentage) {
        const val = Math.min(Math.max(percentage, 0), 100);
        
        // Cargar texto de fase de forma secuencial
        const activePhase = this.phases.reduce((prev, curr) => {
            return (val >= curr.progress) ? curr : prev;
        }, this.phases[0]);

        if (activePhase && this.logText) {
            this.logText.innerText = activePhase.text;
        }
    }
}
window.ZyraLoadingManager = ZyraLoadingManager;

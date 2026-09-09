/**
 * ==========================================================================
 *                INICIALIZADOR PRINCIPAL - ZYRA HUD (PREMIUM)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar Configuración de Seguridad
    const config = window.ZyraConfig;
    if (!config) {
        console.error("Configuración de Zyra Store no encontrada en js/config.js.");
        return;
    }

    // 2. Inicializar Módulos del Sistema
    const ui = new window.ZyraUI(config);
    const music = new window.ZyraMusicPlayer(config);
    const loading = new window.ZyraLoadingManager(config.loading);
    const progress = new window.ZyraProgress(config.loading);
    const news = new window.ZyraNewsSlider(config);
    const anims = new window.ZyraAnimations();

    // 3. Capturar Eventos de Carga de FiveM NUI
    let currentProgress = 0;
    let isFiveM = false;

    window.addEventListener('message', (event) => {
        const data = event.data;
        if (!data) return;

        isFiveM = true;

        if (data.eventName === 'loadProgress') {
            const p = data.loadFraction * 100;
            currentProgress = p;
            progress.updateProgress(p);
            loading.updatePhaseText(p);
        } else if (data.eventName === 'onProgress') {
            const p = data.progress;
            currentProgress = p;
            progress.updateProgress(p);
            loading.updatePhaseText(p);
        }
    });

    // 4. Simulador de Carga para Desarrollo Local (Fallback de Navegador)
    setTimeout(() => {
        if (!isFiveM) {
            console.log("Starting HUD loading simulation in local browser...");
            let simProgress = 0;
            const simInterval = setInterval(() => {
                simProgress += 1;
                progress.updateProgress(simProgress);
                loading.updatePhaseText(simProgress);

                if (simProgress >= 100) {
                    clearInterval(simInterval);
                    console.log("Loading simulation completed successfully.");
                }
            }, 80); // Carga completa en 8 segundos
        }
    }, 1500);

    // 5. Interacción de Reproducción de Música
    document.body.addEventListener('click', () => {
        if (music && !music.isPlaying && config.components.enableMusic) {
            music.togglePlay();
        }
    }, { once: true });
});

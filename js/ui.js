/**
 * ==========================================================================
 *        MÓDULO DE INTERFAZ Y RENDERIZADO 3D - ZYRA HUD (PREMIUM)
 * ==========================================================================
 */

class ZyraUI {
    constructor(config) {
        this.config = config || {};
        
        // Elementos DOM
        this.logoContainer = document.getElementById('logo-container');
        this.serverClaim = document.getElementById('server-claim');
        this.socialsContainer = document.getElementById('social-links-grid');
        this.bgVideo = document.getElementById('bg-video');
        
        // Canvas del Fondo (Constelación)
        this.constellationCanvas = document.getElementById('constellation-canvas');
        
        // Canvas del Centro (Prisma 3D)
        this.prismCanvas = document.getElementById('prism-canvas');
        
        // Parámetros del Prisma 3D
        this.prismAngleX = 0;
        this.prismAngleY = 0;
        this.prismAngleZ = 0;
        window.prismSpeedScale = 1.0; // Controlado dinámicamente por progress.js
        
        // Ratón para interacción
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
    }

    init() {
        this.applyConfigToggles();
        this.renderBranding();
        this.renderSocials();
        this.renderBackgroundVideo();
        this.applyDynamicStyles();
        
        // Iniciar Renderizadores de Canvas
        this.initConstellation();
        this.initPrism3D();
        this.bindMouseEvents();
    }

    applyConfigToggles() {
        const comps = this.config.components;
        if (!comps) return;

        // Ocultar música si está desactivada
        const musicCard = document.getElementById('music-card-wrapper');
        if (musicCard && !comps.enableMusic) {
            musicCard.classList.add('hidden');
        }

        // Ocultar redes si está desactivado
        const socialsPanel = document.getElementById('socials-panel');
        if (socialsPanel && !comps.enableSocials) {
            socialsPanel.classList.add('hidden');
        }
    }

    renderBranding() {
        if (!this.logoContainer) return;
        const brand = this.config.branding;

        if (brand.logoUrl) {
            this.logoContainer.innerHTML = `<img src="${brand.logoUrl}" alt="${brand.serverName}">`;
        } else {
            this.logoContainer.innerHTML = `<h1>${brand.serverName}</h1>`;
        }

        if (this.serverClaim) {
            this.serverClaim.innerText = brand.claim;
        }
    }

    renderSocials() {
        if (!this.socialsContainer || !this.config.components.enableSocials) return;
        const socialsList = this.config.socials || [];
        
        let html = "";
        socialsList.forEach(social => {
            html += `
                <a href="${social.url}" target="_blank" class="social-btn">
                    <span>${social.name}</span>
                </a>`;
        });
        
        this.socialsContainer.innerHTML = html;
    }

    renderBackgroundVideo() {
        if (!this.bgVideo) return;
        const bg = this.config.background;

        if (this.config.components.enableBackgroundVideo && bg.videoUrl) {
            this.bgVideo.src = bg.videoUrl;
            this.bgVideo.style.opacity = bg.videoOpacity;
            this.bgVideo.classList.remove('hidden');
            this.bgVideo.play().catch(() => {});
        } else {
            this.bgVideo.classList.add('hidden');
        }
    }

    bindMouseEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    /* ==========================================================================
       1. RENDERIZADOR DE CONSTELES (CONSTELLATION CANVAS)
       ========================================================================== */
    initConstellation() {
        if (!this.constellationCanvas) return;
        if (!this.config.components.enableParticles) {
            this.constellationCanvas.classList.add('hidden');
            return;
        }
        
        const canvas = this.constellationCanvas;
        const ctx = canvas.getContext('2d');
        let stars = [];
        const count = this.config.background.particleCount || 80;
        const speed = this.config.background.particleSpeed || 0.4;
        const connectDist = this.config.background.connectionDistance || 110;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Star {
            constructor(width, height) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.2 + 0.3;
                this.speedX = (Math.random() - 0.5) * speed;
                this.speedY = (Math.random() - 0.5) * speed;
            }

            update(width, height) {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            stars = [];
            for (let i = 0; i < count; i++) {
                stars.push(new Star(canvas.width, canvas.height));
            }
        };

        const drawLines = () => {
            for (let a = 0; a < stars.length; a++) {
                for (let b = a; b < stars.length; b++) {
                    const dist = Math.hypot(stars[a].x - stars[b].x, stars[a].y - stars[b].y);
                    if (dist < connectDist) {
                        const alpha = (1 - (dist / connectDist)) * 0.08;
                        ctx.strokeStyle = `rgba(223, 186, 95, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(stars[a].x, stars[a].y);
                        ctx.lineTo(stars[b].x, stars[b].y);
                        ctx.stroke();
                    }
                }
                
                // Conectar al ratón si está cerca
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const mouseDist = Math.hypot(stars[a].x - this.mouse.x, stars[a].y - this.mouse.y);
                    if (mouseDist < this.mouse.radius) {
                        const alpha = (1 - (mouseDist / this.mouse.radius)) * 0.16;
                        ctx.strokeStyle = `rgba(223, 186, 95, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(stars[a].x, stars[a].y);
                        ctx.lineTo(this.mouse.x, this.mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.update(canvas.width, canvas.height);
                star.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        };

        init();
        animate();
    }

    /* ==========================================================================
       2. RENDERIZADOR DEL PRISMA VECTORIAL 3D (PRISM CANVAS)
       ========================================================================== */
    initPrism3D() {
        if (!this.prismCanvas) return;
        const canvas = this.prismCanvas;
        const ctx = canvas.getContext('2d');
        
        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Vértices 3D de un Octaedro (Doble pirámide geométrica)
        const vertices = [
            {x: 0, y: 1.2, z: 0},
            {x: 0, y: -1.2, z: 0},
            {x: 1.2, y: 0, z: 0},
            {x: -1.2, y: 0, z: 0},
            {x: 0, y: 0, z: 1.2},
            {x: 0, y: 0, z: -1.2}
        ];

        // Conexiones de las aristas del Octaedro
        const edges = [
            [0, 2], [0, 3], [0, 4], [0, 5],
            [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 4], [4, 3], [3, 5], [5, 2]
        ];

        const project = (x, y, z, width, height) => {
            const scale = 110; // Tamaño de proyección
            const distance = 3.5;
            const factor = scale / (z + distance);
            return {
                x: width / 2 + x * factor,
                y: height / 2 + y * factor
            };
        };

        const renderLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Acelerar rotación basado en el progreso del sistema
            const baseSpeed = 0.007;
            const currentSpeed = baseSpeed * window.prismSpeedScale;

            this.prismAngleX += currentSpeed * 0.8;
            this.prismAngleY += currentSpeed * 1.2;
            this.prismAngleZ += currentSpeed * 0.5;

            const cosX = Math.cos(this.prismAngleX), sinX = Math.sin(this.prismAngleX);
            const cosY = Math.cos(this.prismAngleY), sinY = Math.sin(this.prismAngleY);
            const cosZ = Math.cos(this.prismAngleZ), sinZ = Math.sin(this.prismAngleZ);

            const transformed = [];

            // 1. Aplicar transformaciones tridimensionales
            vertices.forEach(v => {
                // Rotar en X
                let y1 = v.y * cosX - v.z * sinX;
                let z1 = v.y * sinX + v.z * cosX;

                // Rotar en Y
                let x2 = v.x * cosY + z1 * sinY;
                let z2 = -v.x * sinY + z1 * cosY;

                // Rotar en Z
                let x3 = x2 * cosZ - y1 * sinZ;
                let y3 = x2 * sinZ + y1 * cosZ;

                transformed.push(project(x3, y3, z2, canvas.width, canvas.height));
            });

            // 2. Dibujar Aristas del Prisma
            ctx.strokeStyle = 'rgba(223, 186, 95, 0.3)';
            ctx.lineWidth = 1;
            edges.forEach(edge => {
                const p1 = transformed[edge[0]];
                const p2 = transformed[edge[1]];
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });

            // 3. Dibujar Vértices Luminosos
            transformed.forEach(p => {
                ctx.fillStyle = '#dfba5f';
                ctx.shadowColor = '#dfba5f';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0; // Apagar blur de sombras para rendimiento
            });

            requestAnimationFrame(renderLoop);
        };

        renderLoop();
    }

    applyDynamicStyles() {
        const theme = this.config.theme;
        const typo = this.config.typography;
        const root = document.documentElement;

        if (theme.colorPrimary) root.style.setProperty('--bg-pure-black', theme.colorPrimary);
        if (theme.colorSecondary) root.style.setProperty('--bg-hud-card', theme.colorSecondary);
        if (theme.colorAccent) {
            root.style.setProperty('--accent-pure-white', theme.colorAccent);
            root.style.setProperty('--accent-glow', `rgba(${this.hexToRgb(theme.colorAccent)}, 0.2)`);
        }
        if (theme.colorTextPrimary) root.style.setProperty('--text-primary', theme.colorTextPrimary);
        if (theme.colorTextSecondary) root.style.setProperty('--text-secondary', theme.colorTextSecondary);
        if (theme.colorTextMuted) root.style.setProperty('--text-muted', theme.colorTextMuted);
        if (theme.colorBorder) root.style.setProperty('--border-hud', `1px solid ${theme.colorBorder}`);
        if (theme.colorBorderActive) root.style.setProperty('--border-hud-active', `1px solid ${theme.colorBorderActive}`);
        
        if (typo.fontFamily) root.style.setProperty('--font-body', typo.fontFamily);
        if (typo.fontSizeBase) root.style.setProperty('--font-size-base', typo.fontSizeBase);
    }

    hexToRgb(hex) {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
        }
        return '223,186,95';
    }
}
window.ZyraUI = ZyraUI;

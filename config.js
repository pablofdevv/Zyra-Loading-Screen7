/**
 * ==========================================================================
 *                 ZYRA STORE - CONFIGURACIÓN DE LA PANTALLA DE CARGA
 * ==========================================================================
 * 
 * En este archivo puedes personalizar toda la información, imágenes, 
 * música y videos de fondo de la pantalla de carga para tu servidor.
 * 
 * Diseñado bajo estándares comerciales premium para distribución en Tebex.
 */

window.ZyraConfig = {
    // ----------------------------------------------------------------------
    // 🌐 IDIOMA Y TRADUCCIÓN
    // ----------------------------------------------------------------------
    // Idioma por defecto de la interfaz:
    // "es" (Español), "en" (Inglés), "fr" (Francés), "de" (Alemán), "pt" (Portugués), "it" (Italiano)
    language: "es",

    // ----------------------------------------------------------------------
    // 🔌 INTERRUPTORES DE MÓDULOS (Toggles para ocultar/mostrar elementos)
    // ----------------------------------------------------------------------
    enableParticles: true,       // Activa el fondo dinámico de partículas flotantes
    enableMusic: true,           // Activa el reproductor de música
    enableInfoSlider: true,      // Activa el panel izquierdo de información (Normas, Teclas, etc.)
    enableSocials: true,         // Activa el panel derecho de enlaces de redes sociales
    enableServerNews: true,      // Activa una diapositiva especial con las novedades de tu servidor

    // ----------------------------------------------------------------------
    // 🏢 IDENTIDAD DEL SERVIDOR
    // ----------------------------------------------------------------------
    // Si tienes un logo en imagen (.png / .jpg), pon la ruta o URL aquí.
    // Ejemplo local: "logo.png" (colocando la imagen en la carpeta del recurso).
    // Ejemplo remoto: "https://tudominio.com/logo.png".
    // Si lo dejas vacío (""), se usará el texto configurado abajo en 'serverName'.
    logoUrl: "",

    // Nombre del servidor (se muestra en Futura Bold Italic si 'logoUrl' está vacío)
    serverName: "ZYRA STORE",

    serverSubtitle: "BIENVENIDO A ZYRA STORE",

    // ----------------------------------------------------------------------
    // 🎬 MULTIMEDIA DE FONDO (MÚSICA Y VIDEO)
    // ----------------------------------------------------------------------

    // Video de fondo (.mp4 o .webm). Debe ser un enlace directo al archivo.
    // Deja este campo vacío ("") si prefieres usar el fondo interactivo de partículas.
    // Nota: El video siempre se reproducirá silenciado de forma obligatoria.
    videoUrl: "",

    // Ajusta la velocidad de movimiento de las partículas (Recomendado: 0.5 a 1.8)
    particleSpeed: 0.95,

    // Cantidad de partículas flotando en pantalla (Recomendado: 60 a 120)
    particleCount: 95,

    // Distancia máxima para que las partículas se conecten con líneas finas
    particleLinkDistance: 115,

    // Música de fondo (.mp3). Debe ser un enlace directo.
    // Si no deseas música de fondo, deja este campo vacío ("").
    audioUrl: "https://r2.fivemanage.com/e24cIUHKC6bqJcnDa23aj/Clarent-LOVE(LyricVideo).mp3",

    // Nombre de la canción y artista que aparecerán en el reproductor
    trackTitle: "Midnight Ride (Synthwave)",
    trackArtist: "Zyra Sound Design",

    // Volumen inicial de la música al cargar (valores entre 0.0 y 1.0)
    // Recomendado: 0.15 (15% de volumen)
    audioVolume: 0.15,

    // ----------------------------------------------------------------------
    // 📋 SLIDER DE INFORMACIÓN (REGLAS, COMANDOS, CONTROLES)
    // ----------------------------------------------------------------------
    // Puedes añadir, quitar o modificar diapositivas a continuación.
    slides: [
        {
            title: "Normas Principales",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
            items: [
                "<strong>Valorar tu Vida (DM):</strong> Tu vida en el juego debe ser protegida con coherencia.",
                "<strong>Powergaming (PG):</strong> No realices actos físicamente imposibles.",
                "<strong>Metagaming (MG):</strong> Prohibido transferir datos de Discord/Streams a la ciudad.",
                "<strong>Rol de Entorno:</strong> Valora el entorno de la ciudad simulada en todo momento."
            ]
        },
        {
            title: "Controles Rápidos",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M18 12h.01M7 16h10"/></svg>`,
            items: [
                "<kbd>F1</kbd> - Abrir Teléfono Móvil",
                "<kbd>F2</kbd> - Abrir Inventario",
                "<kbd>F3</kbd> - Menú de Animaciones",
                "<kbd>K</kbd> - Cinturón de Seguridad del Coche",
                "<kbd>M</kbd> - Menú de Gestión del Vehículo",
                "<kbd>X</kbd> - Levantar las manos",
                "<kbd>F11</kbd> - Menú de Reportes / Ayuda"
            ]
        }
    ],

    // ----------------------------------------------------------------------
    // 📰 SECCIÓN DE NOVEDADES (News)
    // ----------------------------------------------------------------------
    // Se añade como una slide especial si 'enableServerNews' está activo.
    serverNewsTitle: "Novedades del Servidor",
    serverNewsIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 4v10a2 2 0 0 1-2 2h-1"/><path d="M12 7H7v4h5V7zm5 0h-2v1m2 3h-2v1m4-7h-2M7 15h10M7 18h10"/></svg>`,
    serverNewsItems: [
        "<strong>Nueva actualización:</strong> Mapeados optimizados en el centro de la ciudad.",
        "<strong>Laboratorios:</strong> Nuevo sistema de drogas escondido en el desierto.",
        "<strong>Coches:</strong> Añadidos 15 vehículos importados premium al concesionario.",
        "<strong>Soporte:</strong> Recuerda abrir ticket en Discord si necesitas ayuda."
    ],

    // ----------------------------------------------------------------------
    // 🌐 ENLACES SOCIALES CONFIGURABLES
    // ----------------------------------------------------------------------
    // Título del panel lateral de redes sociales
    socialLinksTitle: "Enlaces Oficiales",

    // Array de botones de redes. Puedes añadir o quitar todos los que desees.
    // Tipos de iconos ('icon') soportados por defecto:
    // "discord", "youtube", "website" (o "web"), "twitter" (o "x"), "instagram", "tiktok"
    socials: [
        {
            name: "Discord",
            url: "https://discord.gg/zyrastore",
            icon: "discord"
        },
        {
            name: "Youtube",
            url: "https://youtube.com/@zyrastore",
            icon: "youtube"
        },
        {
            name: "Website",
            url: "https://zyrastore.tebex.io",
            icon: "website"
        },
        {
            name: "TikTok",
            url: "https://tiktok.com/@zyrastore",
            icon: "tiktok"
        },
        {
            name: "Twitter / X",
            url: "https://x.com/zyrastore",
            icon: "twitter"
        },
        {
            name: "Instagram",
            url: "https://instagram.com/zyrastore",
            icon: "instagram"
        }
    ]
};

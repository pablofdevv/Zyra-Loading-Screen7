/**
 * ==========================================================================
 *        CENTRAL CONFIGURATION - CONSTELLATION HUD SCREEN
 * ==========================================================================
 * Edit your server identity, official links, audio playlist, changelogs,
 * and component variables.
 */

window.ZyraConfig = {
    // 1. Server Branding Identity
    branding: {
        serverName: "ZYRA CORP",
        logoUrl: "assets/logo.png", // Reroute to your logo path if needed
        serverSubtitle: "HUD EDITION",
        claim: "ZYRA CORPORATION",
        description: "The ultimate destination for premium FiveM roleplay resources. Experience optimized luxury gameplay."
    },

    // 2. Default Enabled / Disabled Components
    components: {
        enableSocials: true,             // Show official socials in corner
        enableMusic: true,               // Show mini player in corner
        enableBackgroundVideo: false,    // Show looping video background
        enableParticles: true            // Enable smooth dynamic constellation web
    },

    // 3. Official Links
    socials: [
        { name: "Discord", url: "https://discord.gg/zyra" },
        { name: "Website", url: "https://zyrastore.com" },
        { name: "YouTube", url: "https://youtube.com/zyra" }
    ],

    // 4. Music Playlist
    music: {
        defaultVolume: 0.15,
        playlist: [
            { 
                title: "Shadows of the City", 
                artist: "Neon Syndicate", 
                url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
            },
            { 
                title: "Whispers of the Street", 
                artist: "Midnight Vibe", 
                url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
            },
            { 
                title: "Echoes of Roleplay", 
                artist: "Retro Wave", 
                url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
            }
        ]
    },

    // 5. Ambient Background Variables
    background: {
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-ink-swirling-background-43093-large.mp4",
        videoOpacity: 0.25,
        particleCount: 85,          // Number of constellation stars
        particleSpeed: 0.4,          // Speed of constellation stars
        connectionDistance: 110      // Max distance to draw connection lines between particles
    },

    // 6. Connection Status Log Phrases
    loading: {
        musicTipText: "PRESS SPACE TO PLAY/PAUSE MUSIC",
        phases: [
            { progress: 0, text: "Initializing database connection sequence..." },
            { progress: 20, text: "Downloading system files and interface assets..." },
            { progress: 50, text: "Compiling custom assets and vehicle handling configurations..." },
            { progress: 80, text: "Synchronizing player environment vectors with server host..." },
            { progress: 100, text: "Ready. Access granted." }
        ]
    },

    // 7. Global Accent Styling Theme (Bronze Gold)
    theme: {
        colorPrimary: "#030303",
        colorSecondary: "#070707",
        colorAccent: "#dfba5f",
        colorTextPrimary: "#f8f8f8",
        colorTextSecondary: "#a1a1aa",
        colorTextMuted: "#4e4e52",
        colorBorder: "rgba(255, 255, 255, 0.02)",
        colorBorderActive: "rgba(223, 186, 95, 0.35)",
        blurIntensity: "14px"
    },

    typography: {
        fontFamily: "'Inter', sans-serif",
        fontSizeBase: "16px"
    }
};

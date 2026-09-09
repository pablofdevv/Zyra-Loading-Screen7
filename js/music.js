/**
 * ==========================================================================
 *            MÓDULO DE MÚSICA - ZYRA HUD AUDIO (PREMIUM)
 * ==========================================================================
 */

class ZyraMusicPlayer {
    constructor(config) {
        this.fullConfig = config || {};
        this.config = this.fullConfig.music || {};
        this.components = this.fullConfig.components || {};
        this.playlist = this.config.playlist || [];
        this.currentIndex = 0;
        this.isPlaying = false;
        
        // Elementos DOM
        this.audio = document.getElementById('bg-audio');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.playIcon = document.getElementById('play-icon');
        this.pauseIcon = document.getElementById('pause-icon');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeMuteBtn = document.getElementById('volume-mute-btn');
        this.playerCard = document.getElementById('music-card-wrapper');
        this.trackTitle = document.getElementById('track-title');
        
        if (this.playlist.length === 0) return;
        
        this.init();
    }

    init() {
        if (this.components && this.components.enableMusic === false) {
            if (this.audio) this.audio.pause();
            return;
        }

        // Cargar canción inicial
        this.loadTrack(this.currentIndex);
        
        // Volumen inicial
        this.audio.volume = this.config.defaultVolume !== undefined ? this.config.defaultVolume : 0.15;
        if (this.volumeSlider) {
            this.volumeSlider.value = this.audio.volume;
        }

        // Listeners
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        }
        
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.audio.volume = e.target.value;
                this.audio.muted = false;
                this.updateVolumeIcon();
            });
        }
        
        if (this.volumeMuteBtn) {
            this.volumeMuteBtn.addEventListener('click', () => this.toggleMute());
        }

        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });

        // Barra espaciadora para silenciar
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.togglePlay();
            }
        });
    }

    loadTrack(index) {
        if (index < 0 || index >= this.playlist.length) return;
        
        const track = this.playlist[index];
        this.audio.src = track.url;
        
        if (this.trackTitle) {
            this.trackTitle.innerText = `${track.title} — ${track.artist}`;
        }
        
        this.audio.load();
        
        if (this.isPlaying) {
            this.audio.play().catch(err => {
                console.log("Error al reproducir audio:", err);
            });
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            if (this.playerCard) this.playerCard.classList.remove('playing');
            this.showPlayIcon();
        } else {
            this.audio.play().then(() => {
                this.isPlaying = true;
                if (this.playerCard) this.playerCard.classList.add('playing');
                this.showPauseIcon();
            }).catch(err => {
                console.log("No se pudo iniciar la música:", err);
            });
        }
    }

    toggleMute() {
        this.audio.muted = !this.audio.muted;
        this.updateVolumeIcon();
    }

    updateVolumeIcon() {
        if (this.audio.muted || this.audio.volume === 0) {
            if (this.volumeMuteBtn) this.volumeMuteBtn.style.opacity = '0.35';
        } else {
            if (this.volumeMuteBtn) this.volumeMuteBtn.style.opacity = '1';
        }
    }

    nextTrack() {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.loadTrack(this.currentIndex);
        if (this.isPlaying) {
            this.audio.play().catch(()=>{});
        }
    }

    showPlayIcon() {
        if (this.playIcon) this.playIcon.classList.remove('hidden');
        if (this.pauseIcon) this.pauseIcon.classList.add('hidden');
    }

    showPauseIcon() {
        if (this.playIcon) this.playIcon.classList.add('hidden');
        if (this.pauseIcon) this.pauseIcon.classList.remove('hidden');
    }
}
window.ZyraMusicPlayer = ZyraMusicPlayer;

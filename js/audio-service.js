// Web Audio API Ambient Synthesizer & Sound Effects
class AudioService {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.melodyIndex = 0;

    // Soothing Lofi / Music Box chord notes (Pentatonic & Warm major 7th in F major / D minor)
    this.chords = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7 (F4, A4, C5, E5)
      [329.63, 392.00, 493.88, 587.33], // Em7 (E4, G4, B4, D5)
      [293.66, 349.23, 440.00, 523.25], // Dm7 (D4, F4, A4, C5)
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
      [293.66, 349.23, 440.00, 587.33]  // Bbmaj7 / G9 warm resolution
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, startTime, duration = 1.8, type = 'sine', gainVal = 0.08) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playChime() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, i) => {
      this.playNote(f, now + i * 0.12, 2.0, 'triangle', 0.15);
    });
  }

  startBGM() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextArpeggio();
  }

  scheduleNextArpeggio() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const currentChord = this.chords[this.melodyIndex % this.chords.length];

    currentChord.forEach((freq, i) => {
      // Arpeggiate notes with subtle delay like a music box
      this.playNote(freq, now + i * 0.45, 2.8, 'sine', 0.05);
      // Gentle higher harmonic sparkle
      if (i === 2) {
        this.playNote(freq * 1.5, now + 1.2, 1.5, 'triangle', 0.02);
      }
    });

    this.melodyIndex++;
    this.timer = setTimeout(() => {
      this.scheduleNextArpeggio();
    }, 2800);
  }

  stopBGM() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle(btnEl) {
    if (this.isPlaying) {
      this.stopBGM();
      if (btnEl) btnEl.classList.remove('playing');
    } else {
      this.startBGM();
      if (btnEl) btnEl.classList.add('playing');
    }
  }
}

export const audioService = new AudioService();

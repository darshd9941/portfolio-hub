let audioCtx: AudioContext | null = null;
let ambientGain: GainNode | null = null;
let isAmbientPlaying = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function initAudio() {
  getCtx();
}

// Soft chime — like a gentle water droplet
export function playTick() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(280, now + 0.15);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);
  filter.Q.setValueAtTime(1, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.03, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

// Soft breath — like a gentle whisper
export function playHover() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(800, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.015, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
}

// Warm pad — barely audible, like a soft room tone
export function startAmbient() {
  if (isAmbientPlaying) return;
  const ctx = getCtx();
  isAmbientPlaying = true;

  ambientGain = ctx.createGain();
  ambientGain.gain.setValueAtTime(0, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 3);
  ambientGain.connect(ctx.destination);

  // Layer 1: warm low hum
  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(55, ctx.currentTime);
  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(0.25, ctx.currentTime);
  osc1.connect(g1);
  g1.connect(ambientGain);
  osc1.start();

  // Layer 2: soft harmonic
  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(82.5, ctx.currentTime);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.1, ctx.currentTime);
  osc2.connect(g2);
  g2.connect(ambientGain);
  osc2.start();

  // Very slow LFO for gentle movement
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(2, ctx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.frequency);
  lfo.start();
}

export function stopAmbient() {
  if (!isAmbientPlaying || !ambientGain) return;
  const ctx = getCtx();
  ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
  isAmbientPlaying = false;
}

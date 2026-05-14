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

export function playTick() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, now);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

export function playHover() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.1);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

export function startAmbient() {
  if (isAmbientPlaying) return;
  const ctx = getCtx();
  isAmbientPlaying = true;

  ambientGain = ctx.createGain();
  ambientGain.gain.setValueAtTime(0, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);
  ambientGain.connect(ctx.destination);

  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(55, ctx.currentTime);
  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(0.4, ctx.currentTime);
  osc1.connect(g1);
  g1.connect(ambientGain);
  osc1.start();

  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(110, ctx.currentTime);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.15, ctx.currentTime);
  osc2.connect(g2);
  g2.connect(ambientGain);
  osc2.start();

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(5, ctx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.frequency);
  lfo.start();
}

export function stopAmbient() {
  if (!isAmbientPlaying || !ambientGain) return;
  const ctx = getCtx();
  ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
  isAmbientPlaying = false;
}

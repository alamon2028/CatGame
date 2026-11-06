'use strict';

/* =========================================================
   Happy Kitty — feed, pet and play with a cat until it's happy
   ========================================================= */

// ---------- Cats ----------
const CATS = [
  {
    id: 'ginger', name: 'Ginger', breed: 'Orange Tabby', pattern: 'tabby',
    body: '#f2994a', dark: '#c96a1f', belly: '#fde3c4', eye: '#7cc242', nose: '#e8737a',
    favorite: 'treat', decay: 1.1,
    bio: 'A bottomless pit with whiskers. Treats are the way to this heart.',
  },
  {
    id: 'luna', name: 'Luna', breed: 'Black Shorthair', pattern: 'solid',
    body: '#2d2a32', dark: '#18161b', belly: '#3b3741', eye: '#f7d038', nose: '#6b5a66',
    favorite: 'toy', decay: 1.3,
    bio: 'Mysterious midnight hunter. Lives for the chase of a yarn ball.',
  },
  {
    id: 'mochi', name: 'Mochi', breed: 'Calico', pattern: 'calico',
    body: '#fbf6ee', dark: '#e08a3c', belly: '#ffffff', eye: '#d8a12a', nose: '#f19aa0', patch2: '#3a3133',
    favorite: 'pet', decay: 0.9,
    bio: 'A soft, sweet cuddle bug. Will purr for chin scratches all day.',
  },
  {
    id: 'pounce', name: 'Sir Pounce', breed: 'Tuxedo', pattern: 'tuxedo',
    body: '#24232a', dark: '#111014', belly: '#ffffff', eye: '#6fcf97', nose: '#f19aa0',
    favorite: 'catnip', decay: 1.45,
    bio: 'Dressed for the gala, acts like a wild animal. Catnip connoisseur.',
  },
  {
    id: 'biscuit', name: 'Biscuit', breed: 'Siamese', pattern: 'siamese',
    body: '#f4e7d3', dark: '#5a4234', belly: '#fbf3e6', eye: '#4aa3e8', nose: '#5a4234',
    favorite: 'treat', decay: 1.2,
    bio: 'Chatty and dramatic. Demands snacks and will tell you so. Loudly.',
  },
  {
    id: 'smokey', name: 'Smokey', breed: 'Russian Blue', pattern: 'solid',
    body: '#8a94a6', dark: '#6a7486', belly: '#a6afbf', eye: '#5fd38d', nose: '#7d6f86',
    favorite: 'pet', decay: 0.8,
    bio: 'A calm, cozy couch potato. Easy to please and slow to grump.',
  },
  {
    id: 'pumpkin', name: 'Pumpkin', breed: 'Maine Coon', pattern: 'tabby', fluffy: true,
    body: '#a8774d', dark: '#6e4a2c', belly: '#ecd9c0', eye: '#e2b13c', nose: '#c9867a',
    favorite: 'toy', decay: 1.1,
    bio: 'A gentle giant with a lion\'s mane. Surprisingly good at fetch.',
  },
  {
    id: 'snowball', name: 'Snowball', breed: 'White Persian', pattern: 'solid', fluffy: true,
    body: '#ffffff', dark: '#e6e2ea', belly: '#ffffff', eye: '#58a8e0', nose: '#f6a5b0',
    favorite: 'catnip', decay: 1.4,
    bio: 'Royalty. Unimpressed by most things. Catnip is the exception.',
  },
];

// ---------- Actions ----------
// Petting and toys give fewer points than treats and catnip.
const ACTIONS = {
  pet:    { points: 2,  cooldown: 500,   emoji: '✋', words: ['Purrr…', 'Mrrr~', '*leans in*', 'Purr purr'] },
  toy:    { points: 3,  cooldown: 1000,  emoji: '🧶', words: ['Pounce!', 'Mrrp!', 'Gotcha!', '*wiggle wiggle*'] },
  treat:  { points: 6,  cooldown: 2500, emoji: '🐟', words: ['Nom nom!', 'Yum!', 'More pls', '*crunch*'] },
  catnip: { points: 9,  cooldown: 5000, emoji: '🌿', words: ['Wheee!!', 'Zoomies!', 'Woooah~', '*rolls around*'] },
};
const FAVORITE_BONUS = 1.5;
const START_HAPPINESS = 10;
// Doing the same thing over and over gets boring: each repeat is worth 25% less (min 25%).
const REPEAT_PENALTY = 0.25;
const MIN_REPEAT_MULT = 0.25;
const BORED_WORDS = ['Again? *yawn*', 'Bored now…', 'Something else?', 'Meh.'];

const MOODS = [
  { min: 0,  key: 'grumpy',   label: 'Grumpy',   words: ['Hmph.', '…', 'Meow?', '*tail flick*'] },
  { min: 25, key: 'meh',      label: 'Okay',     words: ['Mew.', 'Meow?', 'Mrr?'] },
  { min: 50, key: 'happy',    label: 'Happy',    words: ['Meow!', 'Mrrp!', 'Purr~'] },
  { min: 80, key: 'ecstatic', label: 'Overjoyed', words: ['Purrrrr!!', 'Mrrrow~', '♥'] },
];

// ---------- Cat artwork (SVG) ----------
const OUTLINE = 'rgba(60, 35, 50, .28)';
function catSVG(c) {
  const fur = c.body, dark = c.dark;
  let patternBody = '', patternHead = '', tailStroke = fur, tailExtra = '', pawFill = fur, muzzle = '';
  let earFill = fur, chest = c.belly;

  switch (c.pattern) {
    case 'tabby':
      patternHead = `
        <path d="M100 40 L100 58 M86 43 L89 57 M114 43 L111 57" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>
        <path d="M54 82 L66 84 M55 94 L67 93 M146 82 L134 84 M145 94 L133 93" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>`;
      patternBody = `
        <path d="M52 140 Q62 146 60 158 M48 162 Q60 168 58 180 M148 140 Q138 146 140 158 M152 162 Q140 168 142 180" stroke="${dark}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      tailExtra = `<path d="M150 190 Q198 178 186 128 Q180 102 164 106" stroke="${dark}" stroke-width="18" fill="none" stroke-linecap="round" stroke-dasharray="8 12"/>`;
      break;
    case 'tuxedo':
      muzzle = `<ellipse cx="100" cy="104" rx="24" ry="17" fill="${c.belly}"/><path d="M100 60 L92 92 L108 92 Z" fill="${c.belly}"/>`;
      pawFill = c.belly;
      break;
    case 'calico':
      patternHead = `
        <path d="M52 60 Q60 34 92 44 Q96 70 70 76 Q56 76 52 60 Z" fill="${c.dark}"/>
        <path d="M148 64 Q146 40 120 42 Q112 60 128 74 Q144 78 148 64 Z" fill="${c.patch2}"/>`;
      patternBody = `
        <ellipse cx="62" cy="150" rx="18" ry="24" fill="${c.patch2}"/>
        <ellipse cx="140" cy="170" rx="16" ry="22" fill="${c.dark}"/>`;
      earFill = c.dark;
      tailStroke = c.dark;
      tailExtra = `<path d="M175 112 Q181 104 164 106" stroke="${c.patch2}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
      break;
    case 'siamese':
      earFill = dark;
      tailStroke = dark;
      pawFill = dark;
      muzzle = `<ellipse cx="100" cy="98" rx="27" ry="22" fill="${dark}" opacity=".85"/>`;
      break;
  }

  const mane = c.fluffy ? `
    <path d="M52 100 L40 92 L50 84 L38 72 L54 68 L48 56 M148 100 L160 92 L150 84 L162 72 L146 68 L152 56" stroke="${fur}" stroke-width="10" stroke-linejoin="round" fill="none"/>
    <path d="M62 120 Q100 150 138 120 L132 140 L118 132 L110 146 L100 134 L90 146 L82 132 L68 140 Z" fill="${c.belly}"/>` : '';
  const tailWidth = c.fluffy ? 26 : 18;

  return `
  <svg class="cat-svg" viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">
    <ellipse class="shadow" cx="100" cy="220" rx="70" ry="9" fill="#000" opacity=".18"/>
    <g class="tail">
      <path d="M150 190 Q198 178 186 128 Q180 102 164 106" stroke="${OUTLINE}" stroke-width="${tailWidth + 5}" fill="none" stroke-linecap="round"/>
      <path d="M150 190 Q198 178 186 128 Q180 102 164 106" stroke="${tailStroke}" stroke-width="${tailWidth}" fill="none" stroke-linecap="round"/>
      ${tailExtra}
    </g>
    <g class="body">
      <ellipse cx="100" cy="165" rx="56" ry="52" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5"/>
      <ellipse cx="100" cy="172" rx="30" ry="38" fill="${chest}"/>
      ${patternBody}
      <ellipse cx="78" cy="212" rx="17" ry="10" fill="${pawFill}" stroke="${OUTLINE}" stroke-width="2"/>
      <ellipse cx="122" cy="212" rx="17" ry="10" fill="${pawFill}" stroke="${OUTLINE}" stroke-width="2"/>
      <path d="M72 212 L72 218 M78 212 L78 219 M84 212 L84 218 M116 212 L116 218 M122 212 L122 219 M128 212 L128 218" stroke="${dark}" stroke-width="1.5" opacity=".5"/>
    </g>
    <g class="head">
      <polygon points="58,70 54,18 96,46" fill="${earFill}" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="142,70 146,18 104,46" fill="${earFill}" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="64,60 62,30 86,48" fill="${c.nose}" opacity=".55"/>
      <polygon points="136,60 138,30 114,48" fill="${c.nose}" opacity=".55"/>
      ${mane}
      <ellipse cx="100" cy="88" rx="52" ry="47" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5"/>
      ${patternHead}
      ${muzzle}
      <g class="blush">
        <ellipse cx="70" cy="104" rx="10" ry="6" fill="#ff8fa3" opacity=".55"/>
        <ellipse cx="130" cy="104" rx="10" ry="6" fill="#ff8fa3" opacity=".55"/>
      </g>
      <g class="eyes-open">
        <ellipse cx="80" cy="84" rx="10" ry="12" fill="${c.eye}"/>
        <ellipse cx="120" cy="84" rx="10" ry="12" fill="${c.eye}"/>
        <ellipse class="pupil" cx="80" cy="85" rx="4" ry="9" fill="#111"/>
        <ellipse class="pupil" cx="120" cy="85" rx="4" ry="9" fill="#111"/>
        <circle cx="83" cy="80" r="2.6" fill="#fff"/>
        <circle cx="123" cy="80" r="2.6" fill="#fff"/>
        <g class="lids">
          <path d="M68 70 L92 70 L92 87 L68 80 Z" fill="${fur}"/>
          <path d="M108 70 L132 70 L132 80 L108 87 Z" fill="${fur}"/>
          <path d="M68 80 L92 87 M132 80 L108 87" stroke="${isDark(fur) ? '#000' : '#333'}" stroke-width="3" stroke-linecap="round"/>
        </g>
      </g>
      <g class="eyes-happy">
        <path d="M70 87 Q80 75 90 87 M110 87 Q120 75 130 87" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
      <polygon points="94,98 106,98 100,105" fill="${c.nose}"/>
      <g class="mouth-smile">
        <path d="M100 105 Q94 114 86 109 M100 105 Q106 114 114 109" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>
      <g class="mouth-flat">
        <path d="M100 105 L100 110 M92 113 L108 113" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>
      <g class="mouth-open">
        <path d="M88 108 Q100 106 112 108 Q110 124 100 124 Q90 124 88 108 Z" fill="#6b1f2a"/>
        <ellipse cx="100" cy="119" rx="6" ry="4" fill="#ff8fa3"/>
      </g>
      <g stroke="${c.pattern === 'solid' && isDark(fur) ? '#ddd' : '#555'}" stroke-width="1.6" stroke-linecap="round" opacity=".8">
        <line x1="72" y1="104" x2="38" y2="98"/><line x1="72" y1="109" x2="36" y2="111"/>
        <line x1="128" y1="104" x2="162" y2="98"/><line x1="128" y1="109" x2="164" y2="111"/>
      </g>
    </g>
  </svg>`;
}

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 < 90;
}

// ---------- Storage (best times) ----------
function loadBest() {
  try { return JSON.parse(localStorage.getItem('happyKittyBest') || '{}'); } catch { return {}; }
}
function saveBest(map) {
  try { localStorage.setItem('happyKittyBest', JSON.stringify(map)); } catch { /* ignore */ }
}

// ---------- Sound (tiny Web Audio synth) ----------
const Sound = {
  ctx: null,
  on: true,
  init() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { this.on = false; }
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },
  tone(freq, dur = 0.12, type = 'sine', vol = 0.12, slideTo = null, delay = 0) {
    if (!this.on || !this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  },
  play(kind) {
    switch (kind) {
      case 'pet':    this.tone(110, 0.35, 'sawtooth', 0.04, 90); break;
      case 'toy':    this.tone(660, 0.08, 'square', 0.05); this.tone(880, 0.08, 'square', 0.05, null, 0.08); break;
      case 'treat':  this.tone(520, 0.1, 'triangle', 0.12, 780); this.tone(780, 0.12, 'triangle', 0.1, 1040, 0.1); break;
      case 'catnip': [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.14, 'sine', 0.1, null, i * 0.07)); break;
      case 'meow':   this.tone(700, 0.35, 'sine', 0.08, 420); break;
      case 'win':    [523, 659, 784, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.22, 'triangle', 0.12, null, i * 0.13)); break;
      case 'nope':   this.tone(200, 0.1, 'square', 0.04); break;
    }
  },
};

// ---------- DOM ----------
const $ = (sel) => document.querySelector(sel);
const screens = { select: $('#select-screen'), game: $('#game-screen') };
const els = {
  grid: $('#cat-grid'), details: $('#cat-details'), start: $('#start-btn'),
  holder: $('#cat-holder'), bubble: $('#bubble'), fx: $('#fx-layer'),
  meter: $('#meter'), fill: $('#meter-fill'), meterText: $('#meter-text'),
  hudName: $('#hud-name'), hudMood: $('#hud-mood'), timer: $('#timer'),
  actions: [...document.querySelectorAll('.action-btn')],
  win: $('#win-overlay'), winCat: $('#win-cat'), winTitle: $('#win-title'),
  winStats: $('#win-stats'), winBest: $('#win-best'), confetti: $('#confetti'),
  sound: $('#sound-btn'),
};

const ACTION_LABEL = { pet: 'Petting', toy: 'Toys', treat: 'Treats', catnip: 'Catnip' };
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------- Character select ----------
let selectedCat = null;

function difficultyLabel(decay) {
  if (decay <= 0.9) return { text: 'Easy-going', paws: 1 };
  if (decay <= 1.2) return { text: 'Moody', paws: 2 };
  return { text: 'Picky', paws: 3 };
}

function buildSelect() {
  const best = loadBest();
  els.grid.innerHTML = '';
  CATS.forEach((cat) => {
    const diff = difficultyLabel(cat.decay);
    const card = document.createElement('button');
    card.className = 'cat-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = cat.id;
    card.innerHTML = `
      <div class="card-art mood-happy">${catSVG(cat)}</div>
      <div class="card-name">${cat.name}</div>
      <div class="card-breed">${cat.breed}</div>
      <div class="card-tags">
        <span class="tag fav">♥ ${ACTION_LABEL[cat.favorite]}</span>
        <span class="tag diff" title="${diff.text}">${'🐾'.repeat(diff.paws)}</span>
      </div>
      ${best[cat.id] ? `<div class="card-best">Best: ${best[cat.id].toFixed(1)}s</div>` : ''}`;
    card.addEventListener('click', () => selectCat(cat));
    card.addEventListener('dblclick', () => { selectCat(cat); startGame(); });
    els.grid.appendChild(card);
  });
  if (selectedCat) selectCat(selectedCat);
}

function selectCat(cat) {
  selectedCat = cat;
  document.querySelectorAll('.cat-card').forEach((c) => c.classList.toggle('selected', c.dataset.id === cat.id));
  const diff = difficultyLabel(cat.decay);
  els.details.innerHTML = `
    <strong>${cat.name}</strong> — ${cat.bio}
    <span class="detail-line">Loves <b>${ACTION_LABEL[cat.favorite].toLowerCase()}</b> (×${FAVORITE_BONUS} points) · Temperament: <b>${diff.text}</b></span>`;
  els.start.disabled = false;
  els.start.textContent = `Play with ${cat.name}!`;
}

// ---------- Game state ----------
const state = {
  cat: null, happiness: 0, running: false, startTime: 0, elapsed: 0,
  lastTick: 0, cooldownUntil: {}, counts: {}, moodKey: '', bubbleTimer: 0, idleTimer: 0,
};

function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) => el.classList.toggle('active', k === name));
}

function startGame() {
  if (!selectedCat) return;
  Sound.init();
  const cat = selectedCat;
  Object.assign(state, {
    cat, happiness: START_HAPPINESS, running: true, startTime: performance.now(),
    elapsed: 0, lastTick: performance.now(), cooldownUntil: {}, counts: { pet: 0, toy: 0, treat: 0, catnip: 0 },
    moodKey: '', idleTimer: 0, lastAction: null, repeat: 0,
  });
  els.holder.innerHTML = catSVG(cat);
  els.holder.className = 'cat-holder';
  els.hudName.textContent = `${cat.name}'s happiness`;
  els.fx.innerHTML = '';
  els.actions.forEach((btn) => {
    const a = btn.dataset.action;
    const pts = pointsFor(a);
    btn.querySelector('.pts').textContent = `+${pts}`;
    btn.classList.toggle('favorite', a === cat.favorite);
    btn.title = a === cat.favorite ? `${cat.name}'s favorite!` : '';
  });
  els.win.classList.remove('show');
  showScreen('game');
  updateMeter();
  say(`Meow? I'm ${cat.name}.`, 2200);
  requestAnimationFrame(loop);
}

function pointsFor(action, raw = false) {
  const base = ACTIONS[action].points;
  const v = state.cat && state.cat.favorite === action ? base * FAVORITE_BONUS : base;
  return raw ? v : Math.round(v);
}

function currentMood() {
  let m = MOODS[0];
  for (const mood of MOODS) if (state.happiness >= mood.min) m = mood;
  return m;
}

function updateMeter() {
  const h = Math.max(0, Math.min(100, state.happiness));
  els.fill.style.width = `${h}%`;
  els.fill.style.setProperty('--hue', `${Math.round(h * 1.2)}`);
  els.meterText.textContent = `${Math.floor(h)}%`;
  els.meter.setAttribute('aria-valuenow', Math.floor(h));
  const mood = currentMood();
  if (mood.key !== state.moodKey) {
    state.moodKey = mood.key;
    els.hudMood.textContent = mood.label;
    els.hudMood.dataset.mood = mood.key;
    els.holder.classList.remove('mood-grumpy', 'mood-meh', 'mood-happy', 'mood-ecstatic');
    els.holder.classList.add(`mood-${mood.key}`);
  }
}

function say(text, ms = 1400) {
  els.bubble.textContent = text;
  els.bubble.classList.add('show');
  clearTimeout(state.bubbleTimer);
  state.bubbleTimer = setTimeout(() => els.bubble.classList.remove('show'), ms);
}

function loop(now) {
  if (!state.running) return;
  const dt = Math.min(0.1, (now - state.lastTick) / 1000);
  state.lastTick = now;
  state.elapsed = (now - state.startTime) / 1000;
  els.timer.textContent = state.elapsed.toFixed(1);

  // Happiness slowly fades if you ignore the cat — faster the happier it is.
  const hn = state.happiness / 100;
  const decay = state.cat.decay * 2 * (1 + 2 * hn * hn) * dt;
  state.happiness = Math.max(0, state.happiness - decay);
  updateMeter();

  // Cooldown overlays
  els.actions.forEach((btn) => {
    const a = btn.dataset.action;
    const left = (state.cooldownUntil[a] || 0) - now;
    const cd = btn.querySelector('.cd');
    if (left > 0) {
      btn.classList.add('cooling');
      cd.style.height = `${(left / ACTIONS[a].cooldown) * 100}%`;
    } else if (btn.classList.contains('cooling')) {
      btn.classList.remove('cooling');
      cd.style.height = '0%';
    }
  });

  // Occasional idle chatter
  state.idleTimer += dt;
  if (state.idleTimer > 4.5) {
    state.idleTimer = 0;
    say(pickRandom(currentMood().words));
    if (Math.random() < 0.4) Sound.play('meow');
  }

  requestAnimationFrame(loop);
}

function doAction(action, originEl) {
  if (!state.running) return;
  Sound.init();
  const now = performance.now();
  if ((state.cooldownUntil[action] || 0) > now) {
    Sound.play('nope');
    const btn = els.actions.find((b) => b.dataset.action === action);
    btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake');
    return;
  }
  state.cooldownUntil[action] = now + ACTIONS[action].cooldown;
  state.counts[action]++;
  state.idleTimer = 0;
  state.repeat = action === state.lastAction ? state.repeat + 1 : 0;
  state.lastAction = action;
  const mult = Math.max(MIN_REPEAT_MULT, 1 - REPEAT_PENALTY * state.repeat);

  const pts = Math.max(1, Math.round(pointsFor(action, true) * mult));
  state.happiness = Math.min(100, state.happiness + pts);
  updateMeter();
  Sound.play(action);

  // Visuals
  if (originEl) throwItem(action, originEl);
  react(action);
  floatText(`+${pts}${action === state.cat.favorite ? ' ♥' : ''}`, action);
  burstHearts(mult < 0.6 ? 1 : action === 'catnip' ? 8 : action === 'treat' ? 5 : 3);
  say(mult < 0.6 ? pickRandom(BORED_WORDS) : pickRandom(ACTIONS[action].words));

  if (state.happiness >= 100) win();
}

function react(action) {
  const h = els.holder;
  h.classList.remove('react-pet', 'react-toy', 'react-treat', 'react-catnip');
  void h.offsetWidth;
  h.classList.add(`react-${action}`);
}

function stageRect() { return els.fx.getBoundingClientRect(); }

function throwItem(action, originEl) {
  if (action === 'pet') return;
  const s = stageRect();
  const o = originEl.getBoundingClientRect();
  const c = els.holder.getBoundingClientRect();
  const item = document.createElement('div');
  item.className = 'thrown';
  item.textContent = ACTIONS[action].emoji;
  const x0 = o.left + o.width / 2 - s.left, y0 = o.top - s.top;
  const x1 = c.left + c.width / 2 - s.left, y1 = c.top + c.height * 0.55 - s.top;
  item.style.left = `${x0}px`;
  item.style.top = `${y0}px`;
  els.fx.appendChild(item);
  item.animate([
    { transform: 'translate(-50%,-50%) scale(.8) rotate(0deg)' },
    { transform: `translate(calc(-50% + ${(x1 - x0) / 2}px), calc(-50% + ${(y1 - y0) / 2 - 90}px)) scale(1.3) rotate(180deg)`, offset: 0.5 },
    { transform: `translate(calc(-50% + ${x1 - x0}px), calc(-50% + ${y1 - y0}px)) scale(.6) rotate(360deg)`, opacity: 0 },
  ], { duration: 550, easing: 'ease-in-out' }).onfinish = () => item.remove();
}

function floatText(text, action) {
  const s = stageRect();
  const c = els.holder.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = `float-text ft-${action}`;
  el.textContent = text;
  el.style.left = `${c.left + c.width * (0.3 + Math.random() * 0.4) - s.left}px`;
  el.style.top = `${c.top + c.height * 0.15 - s.top}px`;
  els.fx.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function burstHearts(n) {
  const s = stageRect();
  const c = els.holder.getBoundingClientRect();
  const cx = c.left + c.width / 2 - s.left, cy = c.top + c.height * 0.4 - s.top;
  const icons = ['❤️', '💕', '💖', '✨'];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = pickRandom(icons);
    el.style.left = `${cx}px`;
    el.style.top = `${cy}px`;
    els.fx.appendChild(el);
    const ang = Math.random() * Math.PI - Math.PI; // upward half
    const dist = 70 + Math.random() * 90;
    el.animate([
      { transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist}px)) scale(1.1)`, opacity: 0 },
    ], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => el.remove();
  }
}

// ---------- Win ----------
function win() {
  state.running = false;
  const time = state.elapsed;
  const best = loadBest();
  const prev = best[state.cat.id];
  const isRecord = !prev || time < prev;
  if (isRecord) { best[state.cat.id] = time; saveBest(best); }

  Sound.play('win');
  els.holder.className = 'cat-holder mood-ecstatic react-win';
  say('PURRRRRR ♥', 4000);
  els.winCat.innerHTML = catSVG(state.cat);
  els.winCat.className = 'win-cat mood-ecstatic';
  els.winTitle.textContent = `${state.cat.name} is purr-fectly happy!`;
  const c = state.counts;
  els.winStats.innerHTML = `You did it in <b>${time.toFixed(1)}s</b> with
    ${c.pet} pets, ${c.toy} toy throws, ${c.treat} treats and ${c.catnip} catnip sprinkles.`;
  els.winBest.textContent = isRecord
    ? (prev ? `🏆 New best time! (was ${prev.toFixed(1)}s)` : '🏆 First win with this cat!')
    : `Best time: ${prev.toFixed(1)}s`;
  setTimeout(() => {
    els.win.classList.add('show');
    makeConfetti();
    els.win.querySelector('#again-btn').focus();
  }, 700);
}

function makeConfetti() {
  els.confetti.innerHTML = '';
  const colors = ['#ff6b8b', '#ffd166', '#06d6a0', '#4cc9f0', '#b388ff', '#ff9f43'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('i');
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = pickRandom(colors);
    p.style.animationDelay = `${Math.random() * 1.2}s`;
    p.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    els.confetti.appendChild(p);
  }
}

// ---------- Wiring ----------
els.start.addEventListener('click', startGame);
els.actions.forEach((btn) => btn.addEventListener('click', () => doAction(btn.dataset.action, btn)));
els.holder.addEventListener('click', () => doAction('pet', null));
$('#back-btn').addEventListener('click', () => { state.running = false; buildSelect(); showScreen('select'); });
$('#again-btn').addEventListener('click', startGame);
$('#choose-btn').addEventListener('click', () => { els.win.classList.remove('show'); buildSelect(); showScreen('select'); });
els.sound.addEventListener('click', () => {
  Sound.on = !Sound.on;
  els.sound.textContent = Sound.on ? '🔊' : '🔇';
});

// Keyboard shortcuts: 1-4 for actions
document.addEventListener('keydown', (e) => {
  if (!screens.game.classList.contains('active') || !state.running) return;
  const map = { '1': 'pet', '2': 'toy', '3': 'treat', '4': 'catnip' };
  const a = map[e.key];
  if (a) doAction(a, els.actions.find((b) => b.dataset.action === a));
});

buildSelect();

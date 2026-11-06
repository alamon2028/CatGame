'use strict';

/* =========================================================
   Happy Kitty: rooms
   Each room is drawn as one wide SVG (1600 × 1000) that fills
   the game screen. It is anchored to the bottom center, so the
   floor and the middle of the room are always visible.
   ---------------------------------------------------------
   Ambience classes used by style.css:
     .glow   pulses softly (lamps, fairy lights, sun)
     .swing  sways from its hook at (820, 134)
     .drift  slowly drifts sideways (clouds)
   ========================================================= */

const ROOMS = [
  {
    id: 'living',
    name: 'Living Room',
    emoji: '🛋️',
    blurb: 'A sunny, cozy living room with a big comfy rug.',
    bg: '#cf9760',
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    emoji: '🛏️',
    blurb: 'Cat trees, crinkle tunnels, twinkly lights and a feather wand to swat.',
    bg: '#7a6a9a',
    unlock: { hint: 'Win 3 games', progress: (x) => [x.wins, 3] },
  },
  {
    id: 'catio',
    name: 'Sunny Catio',
    emoji: '🌻',
    blurb: 'A screened-in patio full of plants, sunshine and birds to watch.',
    bg: '#9fcf86',
    unlock: { hint: 'Collect 8 stars', progress: (x) => [x.totalStars, 8] },
  },
];

let roomUid = 0;

function renderRoom(room, cls = 'room-svg') {
  const u = `rm${++roomUid}`; // unique ids so thumbnails and the big room can share a page
  const draw = ROOM_ART[room.id] || ROOM_ART.living;
  return `<svg class="${cls}" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${draw(u)}</svg>`;
}

/* ---------- Shared pieces ---------- */

function cloud(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff">
    <ellipse cx="0" cy="0" rx="46" ry="18"/><ellipse cx="26" cy="-12" rx="28" ry="18"/><ellipse cx="-20" cy="-8" rx="22" ry="14"/>
  </g>`;
}

function windowFrame(u, x, y, w, h, curtain) {
  return `<g transform="translate(${x} ${y})">
    <rect x="-14" y="-14" width="${w + 28}" height="${h + 28}" rx="14" fill="#fffaf3" stroke="#d9b48f" stroke-width="4"/>
    <svg x="0" y="0" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect width="${w}" height="${h}" fill="url(#${u}sky)"/>
      <circle cx="${w * 0.78}" cy="${h * 0.26}" r="${h * 0.12}" fill="#ffe27a" class="glow"/>
      <g class="drift">${cloud(w * 0.25, h * 0.25, 1)}${cloud(w * 0.6, h * 0.4, 0.7)}</g>
      <path d="M0 ${h * 0.82} Q${w * 0.25} ${h * 0.64} ${w * 0.45} ${h * 0.78} Q${w * 0.68} ${h * 0.6} ${w} ${h * 0.74} L${w} ${h} L0 ${h}Z" fill="#a8d8a0"/>
    </svg>
    <line x1="${w / 2}" y1="0" x2="${w / 2}" y2="${h}" stroke="#fffaf3" stroke-width="10"/>
    <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" stroke="#fffaf3" stroke-width="10"/>
    <rect x="-40" y="-34" width="${w + 80}" height="10" rx="5" fill="#b88a5e"/>
    <path d="M-34 -26 Q10 ${h * 0.4} -12 ${h + 40} L-46 ${h + 40}Z" fill="${curtain}"/>
    <path d="M${w + 34} -26 Q${w - 10} ${h * 0.4} ${w + 12} ${h + 40} L${w + 46} ${h + 40}Z" fill="${curtain}"/>
  </g>`;
}

function skyDefs(u) {
  return `<linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#9fd3f5"/><stop offset="1" stop-color="#e3f3fc"/></linearGradient>`;
}

/* ---------- Living room ---------- */

function livingRoom(u) {
  return `
  <defs>
    ${skyDefs(u)}
    <pattern id="${u}dots" width="44" height="44" patternUnits="userSpaceOnUse">
      <circle cx="22" cy="22" r="3" fill="#efd2b0"/><circle cx="0" cy="0" r="3" fill="#efd2b0"/>
      <circle cx="44" cy="0" r="3" fill="#efd2b0"/><circle cx="0" cy="44" r="3" fill="#efd2b0"/><circle cx="44" cy="44" r="3" fill="#efd2b0"/>
    </pattern>
    <radialGradient id="${u}lamp" cx=".5" cy="0" r="1">
      <stop offset="0" stop-color="#fff3c4" stop-opacity=".75"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="#f8e6cf"/>
  <rect width="1600" height="680" fill="url(#${u}dots)"/>

  ${windowFrame(u, 250, 150, 300, 270, '#f4a3b8')}

  <!-- picture frames -->
  <g transform="translate(1060 170)">
    <rect width="150" height="112" rx="8" fill="#fff" stroke="#c99b6d" stroke-width="8"/>
    <path d="M40 56 Q72 28 104 56 Q72 84 40 56Z" fill="#7ec4e8"/><path d="M102 56 L126 40 L126 72Z" fill="#7ec4e8"/>
    <circle cx="56" cy="51" r="5" fill="#335"/>
  </g>
  <g transform="translate(1250 210)">
    <rect width="96" height="120" rx="8" fill="#fff" stroke="#e88aa8" stroke-width="8"/>
    <path d="M48 92 C20 70 26 40 48 56 C70 40 76 70 48 92Z" fill="#ff8fb1"/>
  </g>

  <!-- swinging pendant lamp -->
  <path d="M700 290 L940 290 L1100 700 L540 700Z" fill="url(#${u}lamp)" class="glow"/>
  <line x1="820" y1="0" x2="820" y2="134" stroke="#8a7066" stroke-width="4"/>
  <g class="swing">
    <line x1="820" y1="134" x2="820" y2="216" stroke="#8a7066" stroke-width="4"/>
    <path d="M766 286 Q820 206 874 286Z" fill="#ffc96b"/>
    <ellipse cx="820" cy="286" rx="54" ry="10" fill="#ffe3a3" class="glow"/>
  </g>
  <circle cx="820" cy="134" r="8" fill="#8a7066"/>

  <!-- bookshelf -->
  <g transform="translate(1180 380)">
    <rect width="260" height="300" rx="8" fill="#c08b5c"/>
    <rect x="14" y="14" width="232" height="128" fill="#a77448"/><rect x="14" y="158" width="232" height="128" fill="#a77448"/>
    <rect x="28" y="54" width="22" height="88" fill="#e8574f"/><rect x="54" y="40" width="20" height="102" fill="#6aa5e0"/>
    <rect x="78" y="62" width="26" height="80" fill="#f6c244"/><rect x="108" y="48" width="18" height="94" fill="#8cc152"/>
    <rect x="146" y="70" width="80" height="72" rx="10" fill="#f4a3b8"/>
    <rect x="28" y="196" width="24" height="90" fill="#b388ff"/><rect x="56" y="210" width="20" height="76" fill="#ff9f43"/>
    <circle cx="170" cy="250" r="30" fill="#c48be6"/><path d="M150 236 Q170 254 190 232 M146 254 Q170 270 194 250" stroke="#a46bc6" stroke-width="4" fill="none"/>
  </g>

  <!-- floor -->
  <rect y="680" width="1600" height="320" fill="#cf9760"/>
  <g stroke="#b5825a" stroke-width="3">
    <line x1="0" y1="760" x2="1600" y2="760"/><line x1="0" y1="850" x2="1600" y2="850"/><line x1="0" y1="940" x2="1600" y2="940"/>
    <line x1="220" y1="680" x2="220" y2="760"/><line x1="700" y1="680" x2="700" y2="760"/><line x1="1240" y1="680" x2="1240" y2="760"/>
    <line x1="460" y1="760" x2="460" y2="850"/><line x1="980" y1="760" x2="980" y2="850"/><line x1="1450" y1="760" x2="1450" y2="850"/>
    <line x1="140" y1="850" x2="140" y2="940"/><line x1="620" y1="850" x2="620" y2="940"/><line x1="1120" y1="850" x2="1120" y2="940"/>
  </g>
  <rect y="672" width="1600" height="16" fill="#fffaf3"/>

  <!-- couch -->
  <g transform="translate(80 470)">
    <rect x="0" y="0" width="420" height="140" rx="44" fill="#a9c1e3"/>
    <rect x="270" y="30" width="100" height="84" rx="22" fill="#f4a3b8" transform="rotate(-8 320 72)"/>
    <rect x="-20" y="110" width="460" height="110" rx="34" fill="#93afd8"/>
    <rect x="-40" y="60" width="80" height="170" rx="36" fill="#a9c1e3"/><rect x="400" y="60" width="80" height="170" rx="36" fill="#a9c1e3"/>
    <rect x="10" y="226" width="20" height="20" rx="4" fill="#8a6a50"/><rect x="410" y="226" width="20" height="20" rx="4" fill="#8a6a50"/>
  </g>

  <!-- plant -->
  <g transform="translate(600 560)">
    <ellipse cx="-24" cy="0" rx="18" ry="52" fill="#6fbf73" transform="rotate(-25 -24 0)"/>
    <ellipse cx="24" cy="-6" rx="18" ry="56" fill="#5aa95f" transform="rotate(22 24 -6)"/>
    <ellipse cx="0" cy="-20" rx="16" ry="60" fill="#7fcf83"/>
    <path d="M-40 40 L40 40 L30 120 L-30 120Z" fill="#e0895a"/><rect x="-46" y="34" width="92" height="16" rx="5" fill="#cf7646"/>
  </g>

  <!-- rug, bowls -->
  <ellipse cx="800" cy="900" rx="430" ry="86" fill="#f1a7bd"/>
  <ellipse cx="800" cy="900" rx="380" ry="66" fill="none" stroke="#fff3f7" stroke-width="7" stroke-dasharray="20 14"/>
  <g transform="translate(1330 880)">
    <ellipse rx="60" ry="16" fill="#d0405f"/><path d="M-60 0 Q-54 32 0 32 Q54 32 60 0Z" fill="#e85a7a"/><ellipse cy="-2" rx="46" ry="9" fill="#a86a3c"/>
  </g>
  <g transform="translate(1470 890)">
    <ellipse rx="50" ry="14" fill="#5b8fd6"/><path d="M-50 0 Q-45 28 0 28 Q45 28 50 0Z" fill="#76a6e8"/><ellipse cy="-2" rx="38" ry="8" fill="#bfe3ff"/>
  </g>`;
}

/* ---------- Bedroom ---------- */

// A crinkle tunnel lying on the floor, with an opening on one end.
function crinkleTunnel(x, y, w, h, color, ring, openLeft) {
  let rings = '';
  for (let rx = x + 30; rx < x + w - 24; rx += 34) {
    rings += `<path d="M${rx} ${y + 6} Q${rx + 10} ${y + h / 2} ${rx} ${y + h - 6}" stroke="${ring}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  }
  const ox = openLeft ? x + 8 : x + w - 8;
  return `<g>
    <ellipse cx="${x + w / 2}" cy="${y + h + 8}" rx="${w / 2 + 10}" ry="12" fill="#4a2f45" opacity=".15"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}"/>
    <rect x="${x + 16}" y="${y + 10}" width="${w - 32}" height="${h * 0.18}" rx="${h * 0.09}" fill="#fff" opacity=".25"/>
    ${rings}
    <ellipse cx="${ox}" cy="${y + h / 2}" rx="${h * 0.34}" ry="${h / 2}" fill="${color}" stroke="${ring}" stroke-width="5"/>
    <ellipse cx="${ox}" cy="${y + h / 2}" rx="${h * 0.23}" ry="${h * 0.38}" fill="#3a2a4f"/>
  </g>`;
}

// A carpeted cat-tree platform with a soft cushion on top.
function perch(cx, y, w, cushion) {
  return `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="26" rx="13" fill="#8a6fb0"/>
    <ellipse cx="${cx}" cy="${y + 2}" rx="${w / 2 - 8}" ry="11" fill="${cushion}"/>`;
}

function bedroom(u) {
  const bulbs = [];
  for (let i = 0; i <= 14; i++) {
    const x = 120 + i * 100;
    const y = 70 + Math.sin((i / 14) * Math.PI * 3) * 24 + 24;
    const col = ['#ffd43b', '#ff8fb1', '#8fd3ff', '#b6f09c'][i % 4];
    bulbs.push(`<circle cx="${x}" cy="${y + 14}" r="9" fill="${col}" class="glow" style="animation-delay:${(i % 4) * 0.5}s"/>`);
  }
  return `
  <defs>
    <linearGradient id="${u}night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b2a5c"/><stop offset="1" stop-color="#5b4f8f"/>
    </linearGradient>
    <pattern id="${u}stripes" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="#b9a8e0"/><rect width="30" height="60" fill="#c4b5e6"/>
    </pattern>
    <radialGradient id="${u}lamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffe9a8" stop-opacity=".8"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${u}sisal" width="16" height="10" patternUnits="userSpaceOnUse">
      <rect width="16" height="10" fill="#ead6b4"/><rect width="16" height="4" fill="#d6bb91"/>
    </pattern>
  </defs>
  <rect width="1600" height="1000" fill="url(#${u}stripes)"/>

  <!-- fairy lights -->
  <path d="M80 70 Q260 140 420 80 T760 90 T1100 80 T1520 90" fill="none" stroke="#5c4a6e" stroke-width="3"/>
  ${bulbs.join('')}

  <!-- night window -->
  <g transform="translate(1100 190)">
    <rect x="-14" y="-14" width="328" height="288" rx="14" fill="#fffaf3" stroke="#a48bc8" stroke-width="4"/>
    <rect width="300" height="260" fill="url(#${u}night)"/>
    <circle cx="210" cy="78" r="38" fill="#fff6c9" class="glow"/><circle cx="226" cy="66" r="34" fill="url(#${u}night)"/>
    <g fill="#fff">
      <circle cx="50" cy="50" r="3"/><circle cx="110" cy="96" r="2.5"/><circle cx="70" cy="170" r="3"/>
      <circle cx="160" cy="40" r="2"/><circle cx="260" cy="190" r="2.5"/><circle cx="140" cy="210" r="2"/>
    </g>
    <line x1="150" y1="0" x2="150" y2="260" stroke="#fffaf3" stroke-width="10"/>
    <line x1="0" y1="130" x2="300" y2="130" stroke="#fffaf3" stroke-width="10"/>
    <rect x="-40" y="-34" width="380" height="10" rx="5" fill="#8a6fb0"/>
    <path d="M-34 -26 Q10 110 -12 300 L-46 300Z" fill="#ff9ec4"/><path d="M334 -26 Q290 110 312 300 L346 300Z" fill="#ff9ec4"/>
  </g>

  <!-- swinging star mobile -->
  <line x1="820" y1="0" x2="820" y2="134" stroke="#fff" stroke-width="3"/>
  <g class="swing">
    <line x1="740" y1="134" x2="900" y2="134" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <line x1="740" y1="134" x2="740" y2="200" stroke="#fff" stroke-width="2"/>
    <line x1="900" y1="134" x2="900" y2="220" stroke="#fff" stroke-width="2"/>
    <line x1="820" y1="134" x2="820" y2="250" stroke="#fff" stroke-width="2"/>
    <path d="M740 196 l7 15 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2Z" fill="#ffd43b"/>
    <path d="M917 230 a20 20 0 1 1 -14 -14 a15 15 0 1 0 14 14Z" fill="#fff6c9"/>
    <path d="M820 246 l7 15 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2Z" fill="#ff8fb1"/>
  </g>

  <!-- wall-mounted cat steps above the bed -->
  <g>
    ${[[190, 330, '#ff9ec4'], [330, 262, '#8fd3ff'], [470, 330, '#ffd43b']].map(([cx, y, c]) => `
      <path d="M${cx - 44} ${y + 22} L${cx - 44} ${y + 50} L${cx - 14} ${y + 22} M${cx + 44} ${y + 22} L${cx + 44} ${y + 50} L${cx + 14} ${y + 22}" stroke="#7a62a0" stroke-width="7" fill="none" stroke-linejoin="round"/>
      <rect x="${cx - 66}" y="${y}" width="132" height="24" rx="10" fill="#8a6fb0"/>
      <rect x="${cx - 58}" y="${y - 10}" width="116" height="14" rx="7" fill="${c}"/>`).join('')}
  </g>

  <!-- bed -->
  <g transform="translate(40 400)">
    <rect x="0" y="0" width="70" height="300" rx="20" fill="#8a6fb0"/>
    <rect x="40" y="150" width="500" height="120" rx="24" fill="#fff"/>
    <rect x="40" y="170" width="500" height="110" rx="24" fill="#ffb3cf"/>
    <path d="M60 170 Q300 140 540 170 L540 200 Q300 176 60 200Z" fill="#ff9ec4"/>
    <ellipse cx="160" cy="146" rx="90" ry="40" fill="#fffaf3" stroke="#e4d8f0" stroke-width="4"/>
    <rect x="510" y="110" width="50" height="190" rx="18" fill="#8a6fb0"/>
    <g fill="#fff" opacity=".7"><circle cx="260" cy="230" r="8"/><circle cx="360" cy="250" r="8"/><circle cx="460" cy="226" r="8"/></g>
  </g>

  <!-- nightstand + lamp -->
  <circle cx="680" cy="520" r="130" fill="url(#${u}lamp)" class="glow"/>
  <g transform="translate(620 560)">
    <rect width="120" height="120" rx="12" fill="#a48bc8"/><rect x="14" y="40" width="92" height="10" rx="5" fill="#8a6fb0"/>
    <rect x="54" y="-50" width="12" height="50" fill="#6b5a86"/>
    <path d="M24 -50 L96 -50 L80 -110 L40 -110Z" fill="#ffe9a8"/>
  </g>

  <!-- floor -->
  <rect y="680" width="1600" height="320" fill="#8c79b0"/>
  <g stroke="#7d6aa1" stroke-width="3">
    <line x1="0" y1="770" x2="1600" y2="770"/><line x1="0" y1="870" x2="1600" y2="870"/>
    <line x1="300" y1="680" x2="300" y2="770"/><line x1="900" y1="680" x2="900" y2="770"/><line x1="1400" y1="680" x2="1400" y2="770"/>
    <line x1="600" y1="770" x2="600" y2="870"/><line x1="1200" y1="770" x2="1200" y2="870"/>
  </g>
  <rect y="672" width="1600" height="16" fill="#e9e1f6"/>

  <!-- tall cat tree with a condo (right wall) -->
  <g>
    <rect x="1438" y="676" width="160" height="26" rx="10" fill="#6b5a86"/>
    <rect x="1462" y="200" width="30" height="480" fill="url(#${u}sisal)"/>
    <rect x="1548" y="430" width="28" height="250" fill="url(#${u}sisal)"/>
    <rect x="1440" y="470" width="150" height="120" rx="22" fill="#9b87cf"/>
    <ellipse cx="1515" cy="534" rx="36" ry="38" fill="#3a2a4f"/>
    ${perch(1515, 456, 176, '#ff9ec4')}
    ${perch(1477, 300, 140, '#8fd3ff')}
    ${perch(1500, 190, 170, '#ffd43b')}
    <line x1="1440" y1="312" x2="1440" y2="390" stroke="#fff" stroke-width="3"/>
    <circle cx="1440" cy="400" r="14" fill="#ff8fb1"/><circle cx="1436" cy="396" r="5" fill="#fff" opacity=".5"/>
  </g>

  <!-- small cat tree beside the rug, with a dangling pompom -->
  <g>
    <rect x="1000" y="680" width="130" height="22" rx="9" fill="#6b5a86"/>
    <rect x="1050" y="450" width="28" height="232" fill="url(#${u}sisal)"/>
    ${perch(1064, 560, 120, '#b6f09c')}
    ${perch(1064, 438, 150, '#ff9ec4')}
    <line x1="1000" y1="450" x2="1000" y2="520" stroke="#fff" stroke-width="3"/>
    <circle cx="1000" cy="530" r="13" fill="#ffd43b"/><circle cx="996" cy="526" r="4" fill="#fff" opacity=".5"/>
  </g>

  <!-- crinkle tunnels -->
  ${crinkleTunnel(965, 716, 460, 92, '#8fd3ff', '#5fb3e6', true)}

  <!-- fluffy round rug -->
  <ellipse cx="800" cy="905" rx="420" ry="88" fill="#fff"/>
  <ellipse cx="800" cy="905" rx="420" ry="88" fill="none" stroke="#f4eefc" stroke-width="18" stroke-dasharray="4 14"/>
  <ellipse cx="800" cy="905" rx="300" ry="58" fill="#f6eefc"/>

  ${crinkleTunnel(-20, 760, 430, 100, '#ff9ec4', '#e9789f', false)}

  <!-- cat bed basket -->
  <g transform="translate(1390 860)">
    <ellipse rx="130" ry="44" fill="#d9a46a"/><ellipse cy="-8" rx="104" ry="30" fill="#ff9ec4"/>
    <path d="M-130 0 Q-124 44 0 46 Q124 44 130 0" fill="#c48d55"/>
  </g>`;
}

/* ---------- Catio ---------- */

function catio(u) {
  const screens = [];
  for (let x = 0; x <= 1600; x += 200) screens.push(`<rect x="${x}" y="0" width="22" height="690" fill="#fffaf3"/>`);
  return `
  <defs>
    ${skyDefs(u)}
    <pattern id="${u}mesh" width="14" height="14" patternUnits="userSpaceOnUse">
      <path d="M0 0 L14 0 M0 0 L0 14" stroke="#ffffff" stroke-opacity=".25" stroke-width="1"/>
    </pattern>
    <pattern id="${u}deck" width="160" height="40" patternUnits="userSpaceOnUse">
      <rect width="160" height="40" fill="#c99566"/><rect y="36" width="160" height="4" fill="#a8774d"/>
      <rect x="120" width="4" height="40" fill="#a8774d"/>
    </pattern>
  </defs>
  <!-- outdoors -->
  <rect width="1600" height="1000" fill="url(#${u}sky)"/>
  <circle cx="1380" cy="150" r="70" fill="#ffe27a" class="glow"/>
  <g class="drift">${cloud(300, 140, 1.6)}${cloud(900, 220, 1.2)}${cloud(1200, 110, 1)}</g>
  <path d="M0 520 Q240 420 480 500 Q760 400 1040 490 Q1320 410 1600 480 L1600 700 L0 700Z" fill="#a8d8a0"/>
  <path d="M0 600 Q300 540 620 590 Q960 520 1260 580 Q1440 550 1600 570 L1600 700 L0 700Z" fill="#8cc97f"/>
  <g transform="translate(1180 470)"><rect x="-10" y="0" width="20" height="90" fill="#8a6a50"/><circle cy="-30" r="70" fill="#6fbf73"/><circle cx="-40" cy="10" r="46" fill="#5aa95f"/><circle cx="44" cy="4" r="50" fill="#7fcf83"/></g>

  <!-- screen walls -->
  <rect width="1600" height="690" fill="url(#${u}mesh)"/>
  ${screens.join('')}
  <rect y="0" width="1600" height="26" fill="#fffaf3"/>

  <!-- hanging plant basket (sways) -->
  <line x1="820" y1="26" x2="820" y2="134" stroke="#8a6a50" stroke-width="3"/>
  <g class="swing">
    <path d="M820 134 L770 200 M820 134 L870 200 M820 134 L820 200" stroke="#8a6a50" stroke-width="2"/>
    <path d="M760 196 L880 196 L860 250 L780 250Z" fill="#e0895a"/>
    <path d="M770 200 Q750 260 760 320 M790 210 Q784 270 796 300 M850 210 Q860 280 846 330 M870 200 Q892 250 884 296" stroke="#5aa95f" stroke-width="6" fill="none" stroke-linecap="round"/>
    <g fill="#ff8fb1"><circle cx="760" cy="320" r="9"/><circle cx="846" cy="330" r="9"/><circle cx="884" cy="296" r="8"/></g>
    <ellipse cx="820" cy="194" rx="62" ry="12" fill="#7fcf83"/>
  </g>

  <!-- cat tree -->
  <g transform="translate(140 300)">
    <rect x="70" y="40" width="34" height="360" fill="#e7d3b0"/>
    <rect x="200" y="160" width="30" height="240" fill="#e7d3b0"/>
    <rect x="0" y="20" width="180" height="34" rx="12" fill="#a8774d"/>
    <rect x="140" y="140" width="160" height="34" rx="12" fill="#a8774d"/>
    <rect x="-10" y="380" width="320" height="30" rx="10" fill="#8a6a50"/>
    <ellipse cx="90" cy="18" rx="70" ry="16" fill="#ff9ec4"/>
  </g>

  <!-- deck -->
  <rect y="690" width="1600" height="310" fill="url(#${u}deck)"/>
  <rect y="682" width="1600" height="14" fill="#fffaf3"/>

  <!-- potted sunflowers -->
  <g transform="translate(1360 560)">
    <path d="M-12 120 Q-30 40 -40 -40 M14 120 Q24 30 40 -10" stroke="#5aa95f" stroke-width="8" fill="none"/>
    <g transform="translate(-40 -40)">${petals('#ffc94d')}<circle r="18" fill="#8a5a3c"/></g>
    <g transform="translate(40 -10) scale(.8)">${petals('#ffb347')}<circle r="18" fill="#8a5a3c"/></g>
    <path d="M-60 110 L60 110 L48 200 L-48 200Z" fill="#6aa5e0"/><rect x="-66" y="100" width="132" height="18" rx="6" fill="#5b8fd6"/>
  </g>
  <g transform="translate(560 640)">
    <ellipse cx="-16" cy="0" rx="14" ry="40" fill="#6fbf73" transform="rotate(-20 -16 0)"/>
    <ellipse cx="16" cy="-4" rx="14" ry="42" fill="#5aa95f" transform="rotate(18 16 -4)"/>
    <path d="M-36 30 L36 30 L28 100 L-28 100Z" fill="#e0895a"/>
  </g>

  <!-- outdoor mat + water fountain -->
  <rect x="420" y="860" width="760" height="110" rx="55" fill="#ffd166"/>
  <rect x="450" y="878" width="700" height="74" rx="37" fill="none" stroke="#fff6dc" stroke-width="6" stroke-dasharray="18 12"/>
  <g transform="translate(1440 900)">
    <ellipse rx="64" ry="18" fill="#5b8fd6"/><path d="M-64 0 Q-58 36 0 36 Q58 36 64 0Z" fill="#76a6e8"/>
    <ellipse cy="-2" rx="50" ry="11" fill="#bfe3ff"/><path d="M0 -4 Q0 -40 0 -46" stroke="#bfe3ff" stroke-width="6" stroke-linecap="round"/>
  </g>`;
}

function petals(color) {
  let out = '';
  for (let i = 0; i < 10; i++) out += `<ellipse cx="0" cy="-30" rx="10" ry="18" fill="${color}" transform="rotate(${i * 36})"/>`;
  return out;
}

const ROOM_ART = { living: livingRoom, bedroom, catio };

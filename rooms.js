'use strict';

/* =========================================================
   Rooms (settings) — drawn as inline SVG, 1000x600 viewBox.
   The cat sits on the rug around x=500, y=520.
   ========================================================= */

// ----- Living room / kitchen -----
const LIVING_SVG = `
        <!-- wall -->
        <rect width="1000" height="420" fill="#f6e3c5"/>
        <rect x="0" y="0" width="470" height="420" fill="#cfe8df"/>
        <g fill="#c0ddd2"><rect x="0" y="0" width="470" height="420" fill="url(#tiles)"/></g>
        <defs>
          <pattern id="tiles" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#d8eee6"/>
            <rect width="38" height="38" x="1" y="1" fill="#e4f4ee"/>
          </pattern>
          <pattern id="boards" width="120" height="30" patternUnits="userSpaceOnUse">
            <rect width="120" height="30" fill="#c58b52"/>
            <rect width="118" height="28" x="1" y="1" fill="#cf9760"/>
            <line x1="60" y1="0" x2="60" y2="30" stroke="#b47a44" stroke-width="2"/>
          </pattern>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#8fd3ff"/>
            <stop offset="1" stop-color="#d9f1ff"/>
          </linearGradient>
        </defs>
        <!-- wallpaper stripes, living room side -->
        <g fill="#f1d7b0">
          <rect x="500" y="0" width="22" height="420"/><rect x="560" y="0" width="22" height="420"/>
          <rect x="620" y="0" width="22" height="420"/><rect x="680" y="0" width="22" height="420"/>
          <rect x="740" y="0" width="22" height="420"/><rect x="800" y="0" width="22" height="420"/>
          <rect x="860" y="0" width="22" height="420"/><rect x="920" y="0" width="22" height="420"/>
          <rect x="980" y="0" width="22" height="420"/>
        </g>
        <!-- divider pillar -->
        <rect x="465" y="0" width="20" height="420" fill="#e8cfa6"/>

        <!-- KITCHEN: window -->
        <rect x="150" y="50" width="170" height="130" rx="6" fill="#fff"/>
        <rect x="160" y="60" width="150" height="110" fill="url(#sky)"/>
        <circle cx="280" cy="90" r="16" fill="#ffe27a"/>
        <ellipse cx="200" cy="100" rx="24" ry="10" fill="#fff" opacity=".9"/>
        <rect x="232" y="60" width="6" height="110" fill="#fff"/>
        <rect x="160" y="112" width="150" height="6" fill="#fff"/>
        <path d="M145 45 Q190 120 160 185 L140 185 Z" fill="#f58f8f"/>
        <path d="M325 45 Q280 120 310 185 L330 185 Z" fill="#f58f8f"/>
        <!-- upper cabinets -->
        <rect x="20" y="30" width="110" height="120" rx="6" fill="#8fbfae"/>
        <rect x="30" y="40" width="42" height="100" rx="4" fill="#9ccbba"/>
        <rect x="78" y="40" width="42" height="100" rx="4" fill="#9ccbba"/>
        <circle cx="66" cy="120" r="4" fill="#f6e3c5"/><circle cx="84" cy="120" r="4" fill="#f6e3c5"/>
        <!-- hanging pans -->
        <line x1="355" y1="40" x2="440" y2="40" stroke="#7a6a5a" stroke-width="5" stroke-linecap="round"/>
        <line x1="375" y1="40" x2="375" y2="62" stroke="#7a6a5a" stroke-width="3"/>
        <circle cx="375" cy="85" r="24" fill="#5b5b66"/><circle cx="375" cy="85" r="17" fill="#6f6f7b"/>
        <line x1="420" y1="40" x2="420" y2="58" stroke="#7a6a5a" stroke-width="3"/>
        <rect x="414" y="58" width="12" height="40" rx="5" fill="#d08a4a"/>
        <ellipse cx="420" cy="104" rx="16" ry="12" fill="#d08a4a"/>
        <!-- counter + lower cabinets -->
        <rect x="0" y="250" width="470" height="20" fill="#f2f2f2"/>
        <rect x="0" y="268" width="470" height="152" fill="#7fb3a1"/>
        <rect x="15" y="282" width="100" height="125" rx="5" fill="#8fbfae"/>
        <rect x="125" y="282" width="100" height="125" rx="5" fill="#8fbfae"/>
        <rect x="235" y="282" width="100" height="125" rx="5" fill="#8fbfae"/>
        <rect x="345" y="282" width="110" height="125" rx="5" fill="#8fbfae"/>
        <g fill="#f6e3c5"><rect x="95" y="300" width="6" height="26" rx="3"/><rect x="140" y="300" width="6" height="26" rx="3"/><rect x="315" y="300" width="6" height="26" rx="3"/><rect x="360" y="300" width="6" height="26" rx="3"/></g>
        <!-- counter items: jar of treats, kettle, fruit bowl -->
        <rect x="40" y="200" width="44" height="52" rx="8" fill="#d9f0ff" stroke="#9cc" stroke-width="2"/>
        <rect x="36" y="192" width="52" height="12" rx="4" fill="#e07a5f"/>
        <text x="62" y="236" font-size="18" text-anchor="middle">🐟</text>
        <path d="M160 250 Q150 205 185 200 Q220 205 210 250 Z" fill="#e07a5f"/>
        <rect x="178" y="190" width="14" height="10" rx="3" fill="#333"/>
        <path d="M210 215 Q232 210 226 232" stroke="#e07a5f" stroke-width="6" fill="none"/>
        <ellipse cx="380" cy="246" rx="44" ry="10" fill="#f4c27a"/>
        <circle cx="362" cy="232" r="12" fill="#ef5350"/><circle cx="384" cy="228" r="13" fill="#ffca28"/><circle cx="402" cy="234" r="11" fill="#7cb342"/>

        <!-- LIVING ROOM: picture frame -->
        <rect x="560" y="70" width="130" height="95" rx="4" fill="#a0673a"/>
        <rect x="570" y="80" width="110" height="75" fill="#bfe3b0"/>
        <path d="M570 155 L610 110 L640 140 L655 125 L680 155 Z" fill="#6aa86a"/>
        <circle cx="655" cy="98" r="9" fill="#fff4a8"/>
        <!-- shelf with plant -->
        <rect x="770" y="140" width="160" height="10" rx="3" fill="#a0673a"/>
        <rect x="790" y="110" width="30" height="30" rx="4" fill="#e07a5f"/>
        <path d="M805 110 Q785 80 795 65 M805 110 Q805 75 812 58 M805 110 Q825 82 830 70" stroke="#4f9a5a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <rect x="850" y="104" width="14" height="36" fill="#7d8de0"/><rect x="866" y="98" width="14" height="42" fill="#f2b84b"/><rect x="882" y="108" width="12" height="32" fill="#e57373"/>
        <!-- floor lamp -->
        <line x1="950" y1="140" x2="950" y2="400" stroke="#555" stroke-width="6"/>
        <path d="M915 140 L985 140 L970 90 L930 90 Z" fill="#ffe7a3"/>
        <ellipse cx="950" cy="402" rx="26" ry="6" fill="#555"/>
        <!-- couch -->
        <rect x="560" y="250" width="360" height="90" rx="30" fill="#6c7fd8"/>
        <rect x="575" y="300" width="330" height="70" rx="18" fill="#7f91e6"/>
        <rect x="540" y="280" width="50" height="110" rx="22" fill="#5e70c9"/>
        <rect x="890" y="280" width="50" height="110" rx="22" fill="#5e70c9"/>
        <rect x="600" y="270" width="70" height="50" rx="14" fill="#f2b84b" transform="rotate(-8 635 295)"/>
        <rect x="560" y="388" width="14" height="20" fill="#4a3a2a"/><rect x="906" y="388" width="14" height="20" fill="#4a3a2a"/>

        <!-- floor -->
        <rect x="0" y="420" width="1000" height="180" fill="url(#boards)"/>
        <rect x="0" y="414" width="1000" height="10" fill="#e8cfa6"/>
        <!-- rug -->
        <ellipse cx="500" cy="520" rx="300" ry="62" fill="#e57373"/>
        <ellipse cx="500" cy="520" rx="270" ry="50" fill="#f28b82"/>
        <ellipse cx="500" cy="520" rx="230" ry="38" fill="none" stroke="#fff3" stroke-width="8" stroke-dasharray="20 12"/>
        <!-- food & water bowls -->
        <ellipse cx="250" cy="515" rx="40" ry="12" fill="#3f88c5"/>
        <path d="M210 505 Q250 545 290 505 Z" fill="#3f88c5"/>
        <ellipse cx="250" cy="506" rx="34" ry="8" fill="#8b5a2b"/>
        <ellipse cx="760" cy="515" rx="40" ry="12" fill="#e07a5f"/>
        <path d="M720 505 Q760 545 800 505 Z" fill="#e07a5f"/>
        <ellipse cx="760" cy="506" rx="34" ry="8" fill="#a6dcf5"/>
      `;

// ----- Bedroom: cat trees, wall steps and crinkle tunnels -----
function fairyLights() {
  const colors = ['#ffd166', '#ff8fb1', '#8ef0a8', '#7fd3ff', '#c48cff'];
  let out = '<path d="M0 26 Q125 70 250 26 Q375 70 500 26 Q625 70 750 26 Q875 70 1000 26" stroke="#7a6a8a" stroke-width="2" fill="none"/>';
  for (let i = 0; i < 40; i++) {
    const x = 12 + i * 25;
    const t = (x % 250) / 250; // position within one swag
    const y = 26 + 88 * t * (1 - t) + 5;
    out += `<circle class="glow" cx="${x}" cy="${y.toFixed(1)}" r="6" fill="${colors[i % colors.length]}" style="animation-delay:${(i % 7) * 0.3}s"/>`;
  }
  return out;
}

function tunnel(x, y, w, h, color, ring, openLeft) {
  let rings = '';
  for (let rx = x + 22; rx < x + w - 16; rx += 26) {
    rings += `<path d="M${rx} ${y + 4} Q${rx + 8} ${y + h / 2} ${rx} ${y + h - 4}" stroke="${ring}" stroke-width="5" fill="none"/>`;
  }
  const ox = openLeft ? x + 6 : x + w - 6;
  return `
    <ellipse cx="${x + w / 2}" cy="${y + h + 6}" rx="${w / 2 + 6}" ry="9" fill="#000" opacity=".15"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}"/>
    ${rings}
    <ellipse cx="${ox}" cy="${y + h / 2}" rx="${h * 0.32}" ry="${h / 2}" fill="${color}" stroke="${ring}" stroke-width="4"/>
    <ellipse cx="${ox}" cy="${y + h / 2}" rx="${h * 0.22}" ry="${h * 0.4}" fill="#2a2440"/>`;
}

function stars(points) {
  return points.map(([x, y, r]) => `<circle class="glow" cx="${x}" cy="${y}" r="${r}" fill="#fff8d6" style="animation-delay:${(x % 5) * 0.4}s"/>`).join('');
}

const BEDROOM_SVG = `
  <defs>
    <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="#ebe3fb"/>
      <circle cx="15" cy="15" r="4" fill="#dccff6"/><circle cx="45" cy="45" r="4" fill="#dccff6"/>
    </pattern>
    <pattern id="carpet" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="#a993cf"/><circle cx="9" cy="9" r="2.4" fill="#b6a2d9"/>
    </pattern>
    <pattern id="sisal" width="12" height="8" patternUnits="userSpaceOnUse">
      <rect width="12" height="8" fill="#dcbc8e"/><rect width="12" height="3" fill="#c49e6a"/>
    </pattern>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#262a66"/><stop offset="1" stop-color="#6656a8"/>
    </linearGradient>
  </defs>

  <!-- wall -->
  <rect width="1000" height="420" fill="url(#dots)"/>
  ${fairyLights()}

  <!-- window with a starry night -->
  <rect x="410" y="80" width="180" height="150" rx="8" fill="#fff"/>
  <rect x="420" y="90" width="160" height="130" fill="url(#night)"/>
  <circle cx="548" cy="122" r="18" fill="#fff4b8"/><circle cx="558" cy="116" r="16" fill="#3a3a80"/>
  ${stars([[445, 110, 2], [470, 150, 1.6], [505, 120, 2.2], [520, 175, 1.4], [455, 195, 1.8], [560, 190, 2]])}
  <rect x="497" y="90" width="6" height="130" fill="#fff"/><rect x="420" y="152" width="160" height="6" fill="#fff"/>
  <path d="M400 72 Q440 150 418 238 L398 238 Z" fill="#9b87cf"/>
  <path d="M600 72 Q560 150 582 238 L602 238 Z" fill="#9b87cf"/>
  <rect x="392" y="66" width="216" height="10" rx="5" fill="#7a6a8a"/>

  <!-- wall-mounted cat steps (zig-zag) above the bed -->
  <g>
    <rect x="40" y="110" width="96" height="16" rx="6" fill="#a37b55"/><rect x="44" y="102" width="88" height="10" rx="5" fill="#ff9ebd"/>
    <rect x="160" y="70" width="96" height="16" rx="6" fill="#a37b55"/><rect x="164" y="62" width="88" height="10" rx="5" fill="#7fd3ff"/>
    <rect x="280" y="110" width="96" height="16" rx="6" fill="#a37b55"/><rect x="284" y="102" width="88" height="10" rx="5" fill="#ffd166"/>
    <path d="M60 126 L60 140 L80 126 M116 126 L116 140 L96 126 M180 86 L180 100 L200 86 M236 86 L236 100 L216 86 M300 126 L300 140 L320 126 M356 126 L356 140 L336 126" stroke="#8a6440" stroke-width="5" fill="none"/>
  </g>

  <!-- bed -->
  <rect x="24" y="220" width="320" height="140" rx="34" fill="#8e7cc3"/>
  <rect x="44" y="236" width="280" height="40" rx="18" fill="#a493d6"/>
  <rect x="14" y="300" width="350" height="72" rx="16" fill="#fff"/>
  <ellipse cx="96" cy="300" rx="56" ry="22" fill="#fff" stroke="#e4dcef" stroke-width="3"/>
  <ellipse cx="226" cy="300" rx="56" ry="22" fill="#fff" stroke="#e4dcef" stroke-width="3"/>
  <path d="M14 330 L364 330 L364 392 Q364 404 352 404 L26 404 Q14 404 14 392 Z" fill="#f7a8c4"/>
  <path d="M14 352 L364 352" stroke="#fff" stroke-width="8" opacity=".6"/>
  <rect x="26" y="404" width="16" height="16" fill="#5e4a8a"/><rect x="336" y="404" width="16" height="16" fill="#5e4a8a"/>

  <!-- nightstand + lamp -->
  <rect x="372" y="330" width="70" height="90" rx="8" fill="#c49e6a"/>
  <rect x="380" y="350" width="54" height="26" rx="4" fill="#d9b98c"/><circle cx="407" cy="363" r="3" fill="#8a6440"/>
  <rect x="402" y="296" width="8" height="34" fill="#7a6a8a"/>
  <path d="M384 300 L428 300 L418 268 L394 268 Z" fill="#ffe7a3"/>

  <!-- big cat tree with a condo -->
  <rect x="704" y="400" width="250" height="20" rx="8" fill="#8a6440"/>
  <rect x="740" y="130" width="24" height="272" fill="url(#sisal)"/>
  <rect x="890" y="230" width="24" height="172" fill="url(#sisal)"/>
  <rect x="822" y="60" width="22" height="80" fill="url(#sisal)"/>
  <ellipse cx="790" cy="132" rx="72" ry="14" fill="#7a5bbf"/><ellipse cx="790" cy="126" rx="66" ry="11" fill="#9b87cf"/>
  <ellipse cx="833" cy="58" rx="54" ry="12" fill="#7a5bbf"/><ellipse cx="833" cy="53" rx="48" ry="9" fill="#9b87cf"/>
  <rect x="826" y="232" width="130" height="92" rx="14" fill="#7a5bbf"/>
  <ellipse cx="890" cy="282" rx="28" ry="26" fill="#2a2440"/>
  <ellipse cx="890" cy="232" rx="70" ry="12" fill="#9b87cf"/>
  <ellipse cx="752" cy="292" rx="52" ry="11" fill="#7a5bbf"/><ellipse cx="752" cy="287" rx="46" ry="8" fill="#9b87cf"/>
  <line x1="820" y1="134" x2="820" y2="196" stroke="#7a6a8a" stroke-width="2"/>
  <circle class="swing" cx="820" cy="204" r="11" fill="#ff7a9a"/>

  <!-- small cat tree by the bed -->
  <rect x="456" y="300" width="18" height="120" fill="url(#sisal)"/>
  <rect x="436" y="408" width="60" height="12" rx="5" fill="#8a6440"/>
  <ellipse cx="465" cy="300" rx="34" ry="9" fill="#ff9ebd"/>

  <!-- carpet -->
  <rect x="0" y="420" width="1000" height="180" fill="url(#carpet)"/>
  <rect x="0" y="414" width="1000" height="10" fill="#d9cdee"/>

  <!-- fluffy round rug -->
  <ellipse cx="500" cy="522" rx="250" ry="58" fill="#fbe3ef"/>
  <ellipse cx="500" cy="522" rx="250" ry="58" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="4 10" opacity=".7"/>
  <ellipse cx="500" cy="522" rx="190" ry="40" fill="none" stroke="#f7c3da" stroke-width="6"/>

  <!-- crinkle tunnels -->
  ${tunnel(30, 456, 280, 72, '#6fb7e8', '#4f97c8', false)}
  ${tunnel(700, 494, 270, 64, '#f2a65a', '#d88a3c', true)}

  <!-- toys on the floor -->
  <circle cx="352" cy="566" r="14" fill="#ff7a9a"/><path d="M340 560 Q352 572 364 560 M342 570 Q352 558 362 572" stroke="#fff" stroke-width="2" fill="none"/>
  <path d="M640 470 Q660 440 690 452" stroke="#7a6a8a" stroke-width="3" fill="none"/>
  <path d="M690 452 l10 -10 l2 14 z" fill="#ffd166"/>`;

// ----- Catio: a screened porch looking out on the garden -----
function picketFence(y) {
  let out = `<rect x="0" y="${y + 18}" width="1000" height="10" fill="#f1e6d6"/><rect x="0" y="${y + 48}" width="1000" height="10" fill="#f1e6d6"/>`;
  for (let x = 6; x < 1000; x += 34) {
    out += `<path d="M${x} ${y + 76} L${x} ${y + 8} L${x + 11} ${y} L${x + 22} ${y + 8} L${x + 22} ${y + 76} Z" fill="#fff8ee" stroke="#e2d4c0" stroke-width="2"/>`;
  }
  return out;
}

function tree(x, y, s, c1, c2) {
  return `<rect x="${x - 8 * s}" y="${y}" width="${16 * s}" height="${90 * s}" fill="#8a5a3a"/>
    <circle cx="${x}" cy="${y - 10 * s}" r="${48 * s}" fill="${c1}"/>
    <circle cx="${x - 34 * s}" cy="${y + 12 * s}" r="${32 * s}" fill="${c2}"/>
    <circle cx="${x + 34 * s}" cy="${y + 14 * s}" r="${34 * s}" fill="${c2}"/>`;
}

function flowers(y) {
  const colors = ['#ff8fb1', '#ffd166', '#c48cff', '#ff6b6b', '#fff'];
  let out = '';
  for (let i = 0; i < 26; i++) {
    const x = 20 + i * 38 + (i % 3) * 6;
    out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 22 - (i % 4) * 5}" stroke="#4f9a5a" stroke-width="3"/>
      <circle cx="${x}" cy="${y - 24 - (i % 4) * 5}" r="7" fill="${colors[i % colors.length]}"/>
      <circle cx="${x}" cy="${y - 24 - (i % 4) * 5}" r="2.5" fill="#fff4a8"/>`;
  }
  return out;
}

function bridge(x1, x2, y) {
  let out = `<path d="M${x1} 24 Q${(x1 + x2) / 2} ${y + 34} ${x2} 24" stroke="#d9b98c" stroke-width="4" fill="none"/>`;
  const n = 9;
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t;
    const yy = y + 22 * 4 * t * (1 - t) * 0.6;
    out += `<line x1="${x.toFixed(1)}" y1="${(yy - 26 + 26 * 4 * t * (1 - t) * 0.3).toFixed(1)}" x2="${x.toFixed(1)}" y2="${yy.toFixed(1)}" stroke="#d9b98c" stroke-width="2"/>
      <rect x="${(x - 10).toFixed(1)}" y="${yy.toFixed(1)}" width="20" height="10" rx="2" fill="#b07a4f"/>`;
  }
  return out;
}

const CATIO_SVG = `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7cc8ff"/><stop offset="1" stop-color="#e3f6ff"/>
    </linearGradient>
    <pattern id="mesh" width="18" height="18" patternUnits="userSpaceOnUse">
      <path d="M0 0 L18 0 M0 0 L0 18" stroke="#ffffff" stroke-width="1" opacity=".35"/>
    </pattern>
    <pattern id="deck" width="200" height="34" patternUnits="userSpaceOnUse">
      <rect width="200" height="34" fill="#a8744a"/>
      <rect width="200" height="30" fill="#b9845a"/>
      <circle cx="10" cy="15" r="2" fill="#8a5a3a"/><circle cx="190" cy="15" r="2" fill="#8a5a3a"/>
    </pattern>
  </defs>

  <!-- outside -->
  <rect width="1000" height="420" fill="url(#sky)"/>
  <circle cx="860" cy="90" r="36" fill="#ffe27a"/><circle cx="860" cy="90" r="50" fill="#ffe27a" opacity=".25"/>
  <g class="drift" fill="#fff" opacity=".95">
    <ellipse cx="180" cy="80" rx="50" ry="18"/><ellipse cx="215" cy="70" rx="34" ry="18"/>
    <ellipse cx="600" cy="60" rx="44" ry="15"/><ellipse cx="630" cy="52" rx="28" ry="14"/>
  </g>
  <path d="M0 270 Q160 190 340 250 Q520 300 700 230 Q860 180 1000 240 L1000 420 L0 420 Z" fill="#b6e094"/>
  <path d="M0 310 Q200 260 420 300 Q640 340 820 290 Q920 270 1000 290 L1000 420 L0 420 Z" fill="#93cc72"/>
  ${tree(110, 220, 1.1, '#6fbf6a', '#5aa95a')}
  ${tree(320, 240, 0.8, '#7ccf73', '#62b462')}
  ${tree(700, 230, 0.9, '#6fbf6a', '#5aa95a')}
  ${tree(930, 210, 1.2, '#7ccf73', '#62b462')}
  <!-- birdhouse -->
  <rect x="546" y="220" width="10" height="110" fill="#8a5a3a"/>
  <rect x="526" y="182" width="50" height="44" fill="#ff8fb1"/>
  <path d="M518 186 L551 156 L584 186 Z" fill="#e0577a"/>
  <circle cx="551" cy="204" r="9" fill="#5a3a2a"/>
  ${picketFence(300)}
  ${flowers(400)}

  <!-- screen mesh -->
  <rect width="1000" height="414" fill="url(#mesh)"/>

  <!-- wooden frame -->
  <g fill="#8a5a3a">
    <rect x="0" y="0" width="1000" height="24"/>
    <rect x="0" y="0" width="22" height="420"/><rect x="238" y="0" width="22" height="420"/>
    <rect x="489" y="0" width="22" height="210"/><rect x="740" y="0" width="22" height="420"/>
    <rect x="978" y="0" width="22" height="420"/>
    <rect x="0" y="200" width="1000" height="12"/>
  </g>

  <!-- rope bridge across the top -->
  ${bridge(260, 489, 70)}
  ${bridge(511, 740, 70)}

  <!-- shelves on posts -->
  <rect x="762" y="150" width="96" height="14" rx="5" fill="#b07a4f"/><rect x="766" y="142" width="88" height="10" rx="5" fill="#7cc4a4"/>
  <rect x="142" y="140" width="96" height="14" rx="5" fill="#b07a4f"/><rect x="146" y="132" width="88" height="10" rx="5" fill="#ffd166"/>

  <!-- hammock -->
  <path d="M770 300 Q875 372 970 300" stroke="#6a4a3a" stroke-width="3" fill="none"/>
  <path d="M780 304 Q875 380 960 304 Q875 352 780 304 Z" fill="#f2a65a"/>
  <path d="M790 310 Q875 368 950 310" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="10 8" opacity=".7"/>

  <!-- potted cat grass and plants -->
  <path d="M40 360 L120 360 L110 420 L50 420 Z" fill="#e07a5f"/>
  <rect x="34" y="352" width="92" height="12" rx="4" fill="#c86a50"/>
  <path d="M50 354 L44 300 M62 354 L64 292 M74 354 L80 298 M86 354 L94 290 M98 354 L108 302 M110 354 L120 312" stroke="#7cc95a" stroke-width="5" stroke-linecap="round"/>
  <path d="M890 370 L960 370 L952 420 L898 420 Z" fill="#7d8de0"/>
  <path d="M925 370 Q890 330 900 300 M925 370 Q930 320 940 296 M925 370 Q960 340 966 318" stroke="#4f9a5a" stroke-width="8" fill="none" stroke-linecap="round"/>

  <!-- deck floor -->
  <rect x="0" y="420" width="1000" height="180" fill="url(#deck)"/>
  <rect x="0" y="414" width="1000" height="10" fill="#8a5a3a"/>

  <!-- outdoor mat -->
  <ellipse cx="500" cy="524" rx="250" ry="56" fill="#7cc4a4"/>
  <ellipse cx="500" cy="524" rx="218" ry="44" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="26 14" opacity=".7"/>

  <!-- cushion bed + water fountain -->
  <ellipse cx="160" cy="500" rx="86" ry="26" fill="#ffb3c7"/>
  <ellipse cx="160" cy="492" rx="64" ry="16" fill="#ffd6e2"/>
  <ellipse cx="842" cy="520" rx="44" ry="13" fill="#e07a5f"/>
  <path d="M800 510 Q842 548 884 510 Z" fill="#e07a5f"/>
  <ellipse cx="842" cy="511" rx="36" ry="8" fill="#a6dcf5"/>
  <path d="M842 510 Q842 488 852 482" stroke="#a6dcf5" stroke-width="4" fill="none"/>`;

// ----- Room list -----
const ROOMS = [
  { id: 'living', name: 'Living Room', emoji: '🛋️', bg: '#cf9760', svg: LIVING_SVG },
  {
    id: 'bedroom', name: 'Bedroom', emoji: '🛏️', bg: '#a993cf', svg: BEDROOM_SVG,
    blurb: 'Cozy cat trees, a condo and crinkle tunnels. A feather wand sometimes pops out of a tunnel!',
    unlock: { hint: 'Win 3 games', progress: (x) => [x.wins, 3] },
  },
  {
    id: 'catio', name: 'Catio', emoji: '🌿', bg: '#b9845a', svg: CATIO_SVG,
    blurb: 'A sunny screened porch with a garden view. Birds come to visit!',
    unlock: { hint: 'Collect 12 stars', progress: (x) => [x.totalStars, 12] },
  },
];

let roomUid = 0;
// Each copy of a room gets its own id prefix so patterns don't clash.
function renderRoom(room, cls = 'room-svg') {
  const p = `r${++roomUid}-`;
  const body = room.svg.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`);
  return `<svg class="${cls}" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice">${body}</svg>`;
}

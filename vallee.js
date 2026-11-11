'use strict';
/* La vallée poétique de la page d'accueil : décor dessiné et animations. */
const Vallee = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  let raf = null, offMouse = null;
  const put = (p, tag, a = {}) => { const e = document.createElementNS(NS, tag); Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v)); p.appendChild(e); return e; };

  const MARKUP = `<svg id="vScene" viewBox="0 0 1100 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="vSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d5f8f"/><stop offset=".3" stop-color="#a98aa8"/><stop offset=".56" stop-color="#e2b6a8"/><stop offset=".72" stop-color="#f4dcc0"/><stop offset="1" stop-color="#f8d0a8"/></linearGradient>
      <radialGradient id="vGlow"><stop offset="0" stop-color="#fff0c8" stop-opacity=".7"/><stop offset="1" stop-color="#fff0c8" stop-opacity="0"/></radialGradient>
      <linearGradient id="vMt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d7ea6"/><stop offset="1" stop-color="#d9c2cc"/></linearGradient>
      <linearGradient id="vMt2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c6f9a"/><stop offset="1" stop-color="#cdb8c6"/></linearGradient>
      <linearGradient id="vHill1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9d8fa6"/><stop offset="1" stop-color="#d8c8c8"/></linearGradient>
      <linearGradient id="vHill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d8a84"/><stop offset="1" stop-color="#b9b9a2"/></linearGradient>
      <linearGradient id="vWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf0e4"/><stop offset=".4" stop-color="#cfd8e4"/><stop offset="1" stop-color="#8fa4c0"/></linearGradient>
      <radialGradient id="vSoft"><stop offset="0" stop-color="#fff4ee" stop-opacity=".85"/><stop offset="1" stop-color="#fff4ee" stop-opacity="0"/></radialGradient>
      <radialGradient id="vWash"><stop offset="0" stop-color="#f6c6d4" stop-opacity=".7"/><stop offset="1" stop-color="#f6c6d4" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1100" height="620" fill="url(#vSky)"/>
    <rect id="vDusk" width="1100" height="620" fill="#2a1f5a" opacity="0"/>
    <g id="vStars" opacity="0"></g>
    <circle id="vSun" cx="550" cy="300" r="220" fill="url(#vGlow)"/>
    <g class="lay" data-depth="6"><g id="vClouds" fill="url(#vSoft)">
      <ellipse cx="200" cy="170" rx="120" ry="16"/><ellipse cx="900" cy="150" rx="140" ry="18"/><ellipse cx="520" cy="110" rx="90" ry="10"/>
      <ellipse cx="560" cy="300" rx="260" ry="30"/><ellipse cx="380" cy="330" rx="160" ry="20"/><ellipse cx="760" cy="330" rx="170" ry="22"/>
    </g></g>
    <g id="vBirds" fill="none" stroke="#3a2a5a" stroke-width="2.2" stroke-linecap="round"></g>
    <g class="lay" data-depth="10">
      <g transform="translate(0 46)">
        <path d="M300 340 L460 150 L520 220 L560 190 L700 340Z" fill="url(#vMt)"/><path d="M460 150 L430 205 L455 198 L470 220 L490 190 L520 220Z" fill="#f2e8ec"/>
        <path d="M600 340 L760 140 L900 340Z" fill="url(#vMt2)"/><path d="M760 140 L735 180 L760 172 L780 190Z" fill="#f2e8ec"/>
        <path d="M420 360 L560 230 L690 360Z" fill="url(#vMt)"/><path d="M560 230 L540 262 L560 256 L578 266Z" fill="#f2e8ec"/>
        <ellipse id="vMistFix" cx="560" cy="350" rx="200" ry="22" fill="#fbe2ec" opacity=".75"/>
      </g>
      <rect x="544" y="330" width="12" height="44" fill="#cfe6ff"/><g id="vFall"></g>
      <ellipse id="vFoam" cx="550" cy="376" rx="16" ry="4" fill="#fff" opacity=".8"/>
    </g>
    <g id="vMists"></g>
    <g class="lay" data-depth="18"><g id="vTrees"></g></g>
    <g class="lay" data-depth="26">
      <path d="M520 380 L580 380 L800 620 L300 620Z" fill="url(#vWater)"/>
      <g id="vFlow" fill="#fff"></g><g id="vSparks" fill="#fff"></g>
      <path d="M520 380 L300 620 L0 620 L0 560 L490 380Z" fill="#7f8f80"/><path d="M580 380 L800 620 L1100 620 L1100 560 L610 380Z" fill="#7f8f80"/>
      <path d="M490 380 L0 560 L0 572 L500 384Z" fill="#d8d0b0"/><path d="M610 380 L1100 560 L1100 572 L600 384Z" fill="#d8d0b0"/>
      <g id="vGrass"></g>
    </g>
    <g class="lay" data-depth="40"><g id="vRocks"></g></g>
    <g id="vPetals"></g>
  </svg>`;

  function draw(root) {
    const $ = (id) => root.querySelector('#' + id);
    let seed = 7; const rd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    const T = $('vTrees'), G = $('vGrass');
    put(T, 'path', { d: 'M0 352 Q150 288 310 345 Q420 376 520 386 L0 600Z', fill: 'url(#vHill1)' });
    put(T, 'path', { d: 'M1100 352 Q950 288 790 345 Q680 376 580 386 L1100 600Z', fill: 'url(#vHill1)' });
    put(T, 'path', { d: 'M0 436 Q180 372 350 418 L500 384 L0 600Z', fill: 'url(#vHill2)' });
    put(T, 'path', { d: 'M1100 436 Q920 372 750 418 L600 384 L1100 600Z', fill: 'url(#vHill2)' });
    const edge = (x) => 560 - (x / 490) * 180, size = (x) => 1.12 - x / 540;
    const branch = (x, y, ang, len, w, depth, tips) => {
      const bend = (rd() - .5) * .5, x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len, cx = x + Math.cos(ang + bend) * len * .55, cy = y + Math.sin(ang + bend) * len * .55;
      put(T, 'path', { d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`, stroke: '#4d3d4b', 'stroke-width': Math.max(.7, w).toFixed(2), fill: 'none', 'stroke-linecap': 'round' });
      if (depth === 0) { tips.push([x2, y2]); return; }
      if (depth < 3) tips.push([x2, y2]);
      const n = rd() < .3 ? 3 : 2;
      for (let i = 0; i < n; i++) branch(x2, y2, ang + (i - (n - 1) / 2) * (.5 + rd() * .4) + (rd() - .5) * .3, len * (.66 + rd() * .16), w * .66, depth - 1, tips);
    };
    const tree = (x, y, s) => {
      const tips = [];
      branch(x, y + 6, -1.57 + (rd() - .5) * .18, 74 * s, 10 * s, s > .55 ? 5 : 4, tips);
      tips.filter(() => rd() < .35).forEach(([a, b]) => put(T, 'circle', { cx: a, cy: b, r: (26 + rd() * 20) * s, fill: 'url(#vWash)' }));
      tips.forEach(([a, b]) => { const n = s > .55 ? 5 : 3; for (let i = 0; i < n; i++) put(T, 'circle', { cx: a + (rd() - .5) * 28 * s, cy: b + (rd() - .5) * 24 * s, r: (1.4 + rd() * 2.6) * Math.max(s, .55), fill: ['#fbeaf0', '#f6cfdc', '#ffffff', '#efb6ca'][Math.floor(rd() * 4)], opacity: .6 + rd() * .4 }); });
    };
    [472, 430, 372, 295, 195, 75].forEach((x) => { tree(x, edge(x), size(x)); tree(1100 - x, edge(x), size(x)); });
    for (let i = 0; i < 240; i++) {
      const left = rd() < .5, xx = rd() * 450, yy = edge(xx) + 8 + rd() * (620 - edge(xx) - 10);
      if (xx > 300 + (620 - yy) * (220 / 240) - 6) continue;
      const k = .4 + (yy - 380) / 240, X = left ? xx : 1100 - xx;
      put(G, 'path', { d: `M${X} ${yy} q${(rd() - .5) * 6} ${-7 * k} ${(rd() - .5) * 8} ${-14 * k}`, stroke: '#566b5c', 'stroke-width': .9, fill: 'none', opacity: .7 });
      if (rd() < .3) put(G, 'circle', { cx: X, cy: yy - 14 * k, r: 1.8 * k + .5, fill: ['#fbeaf0', '#e8d2e6', '#f6e4b8'][Math.floor(rd() * 3)] });
    }
    [[360, 600, 50], [450, 580, 34], [520, 600, 40], [640, 590, 42], [740, 604, 50], [600, 540, 20], [480, 530, 18], [690, 520, 16], [420, 610, 30], [820, 612, 40]].forEach(([x, y, r]) => {
      put($('vRocks'), 'ellipse', { cx: x, cy: y, rx: r, ry: r * .55, fill: '#7d7078' });
      put($('vRocks'), 'ellipse', { cx: x - r * .2, cy: y - r * .2, rx: r * .6, ry: r * .3, fill: '#a89aa0' });
    });
    for (let i = 0; i < 60; i++) put($('vStars'), 'circle', { cx: rd() * 1100, cy: rd() * 260, r: .6 + rd() * 1.2, fill: '#fff', opacity: .4 + rd() * .6 });
    return rd;
  }

  function mount(host) {
    stop();
    host.insertAdjacentHTML('afterbegin', MARKUP);
    const svg = host.querySelector('#vScene');
    const $ = (id) => svg.querySelector('#' + id);
    const rd = draw(svg);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const streaks = Array.from({ length: 26 }, () => ({ t: rd(), off: rd() * 2 - 1, len: .3 + rd() * .7, el: put($('vFlow'), 'rect', { rx: 1 }) }));
    const sparks = Array.from({ length: 22 }, () => ({ t: rd(), off: rd() * 2 - 1, ph: rd() * 6, el: put($('vSparks'), 'circle', {}) }));
    const drops = Array.from({ length: 7 }, (_, i) => ({ x: 545 + i * 1.6, y: 330 + rd() * 44, v: 30 + rd() * 30, el: put($('vFall'), 'rect', { width: 1.2, height: 6, fill: '#fff', opacity: .9 }) }));
    const clouds = [...$('vClouds').querySelectorAll('ellipse')].map((e) => ({ e, x: +e.getAttribute('cx'), v: 4 + rd() * 8 }));
    const birds = Array.from({ length: 4 }, (_, i) => ({ x: -100 - i * 260, y: 90 + rd() * 90, v: 22 + rd() * 14, ph: rd() * 6, el: put($('vBirds'), 'path') }));
    const petals = Array.from({ length: 16 }, () => ({ x: Math.random() * 1100, y: Math.random() * 620, v: 8 + Math.random() * 18, ph: Math.random() * 6.28, el: put($('vPetals'), 'ellipse', { rx: 3.6, ry: 1.9, fill: Math.random() < .5 ? '#fbeaf0' : '#f6cfdc', opacity: .85 }) }));
    const mists = [[250, 372, 300, 26, 5], [830, 362, 320, 28, -4], [550, 392, 260, 18, 3]].map(([x, y, rx, ry, v]) => ({ x, v, el: put($('vMists'), 'ellipse', { cx: x, cy: y, rx, ry, fill: 'url(#vSoft)' }) }));
    const layers = [...svg.querySelectorAll('.lay')].map((g) => ({ g, d: +g.dataset.depth }));

    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e) => { const r = host.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; };
    const onLeave = () => { mx = 0; my = 0; };
    host.addEventListener('mousemove', onMove); host.addEventListener('mouseleave', onLeave);
    offMouse = () => { host.removeEventListener('mousemove', onMove); host.removeEventListener('mouseleave', onLeave); };
    const touch = matchMedia('(hover: none)').matches;

    const DAY = 80; let last = performance.now(), start = last;
    function frame(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now; const t = (now - start) / 1000;
      if (touch) { mx = Math.sin(t * .3) * .3; my = Math.sin(t * .2) * .15; }
      cx += (mx - cx) * .06; cy += (my - cy) * .06;
      layers.forEach(({ g, d }) => g.setAttribute('transform', `translate(550 310) scale(1.05) translate(-550 -310) translate(${(-cx * d).toFixed(2)} ${(-cy * d * .5).toFixed(2)})`));
      const k = (1 - Math.cos(t / DAY * Math.PI * 2)) / 2, sun = $('vSun');
      sun.setAttribute('cy', 300 + k * 70); sun.setAttribute('opacity', 1 - k * .55);
      $('vDusk').setAttribute('opacity', k * .45); $('vStars').setAttribute('opacity', Math.max(0, k - .35) * 1.4);
      clouds.forEach((c) => { c.x += c.v * dt; if (c.x > 1350) c.x = -250; c.e.setAttribute('cx', c.x.toFixed(1)); });
      streaks.forEach((s) => { s.t += dt * (.08 + s.t * .25); if (s.t > 1) { s.t = 0; s.off = rd() * 2 - 1; }
        const y = 380 + s.t * 240, half = 30 + s.t * 220, w = (8 + s.t * 90) * s.len;
        s.el.setAttribute('x', (550 + s.off * half * .8 - w / 2).toFixed(1)); s.el.setAttribute('y', y.toFixed(1)); s.el.setAttribute('width', w.toFixed(1)); s.el.setAttribute('height', (1 + s.t * 2.5).toFixed(1)); s.el.setAttribute('opacity', (Math.sin(s.t * Math.PI) * .8).toFixed(2)); });
      sparks.forEach((p) => { p.t += dt * (.06 + p.t * .2); if (p.t > 1) { p.t = 0; p.off = rd() * 2 - 1; }
        const y = 380 + p.t * 240, half = 30 + p.t * 220;
        p.el.setAttribute('cx', (550 + p.off * half * .85).toFixed(1)); p.el.setAttribute('cy', y.toFixed(1)); p.el.setAttribute('r', (.6 + p.t * 1.8).toFixed(2)); p.el.setAttribute('opacity', (Math.max(0, Math.sin(t * 4 + p.ph)) * Math.sin(p.t * Math.PI)).toFixed(2)); });
      drops.forEach((d) => { d.y += d.v * dt; if (d.y > 372) d.y = 330; d.el.setAttribute('x', d.x); d.el.setAttribute('y', d.y.toFixed(1)); });
      $('vFoam').setAttribute('rx', (15 + Math.sin(t * 6) * 2).toFixed(1));
      $('vMistFix').setAttribute('rx', (200 + Math.sin(t * .5) * 14).toFixed(1));
      birds.forEach((b) => { b.x += b.v * dt; if (b.x > 1200) { b.x = -120; b.y = 80 + rd() * 100; }
        const f = Math.sin(t * 8 + b.ph) * 4, y = b.y + Math.sin(t + b.ph) * 6;
        b.el.setAttribute('d', `M${b.x - 8} ${y - f} Q${b.x - 4} ${y - 5} ${b.x} ${y} Q${b.x + 4} ${y - 5} ${b.x + 8} ${y - f}`); });
      petals.forEach((p) => { p.y += p.v * dt * .45; p.x += (14 + Math.sin(t + p.ph) * 24) * dt * .45; if (p.y > 630) { p.y = -8; p.x = Math.random() * 1100; } if (p.x > 1110) p.x = -8;
        p.el.setAttribute('cx', p.x.toFixed(1)); p.el.setAttribute('cy', p.y.toFixed(1)); p.el.setAttribute('transform', `rotate(${(t * 60 + p.ph * 50).toFixed(0)} ${p.x.toFixed(1)} ${p.y.toFixed(1)})`); });
      mists.forEach((m) => { m.x += m.v * dt; if (m.x > 1400) m.x = -300; if (m.x < -300) m.x = 1400; m.el.setAttribute('cx', m.x.toFixed(1)); });
      raf = reduce ? null : requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = null; if (offMouse) offMouse(); offMouse = null; }
  return { mount, stop };
})();

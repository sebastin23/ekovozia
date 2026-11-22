/* asistente.js · asistente de ayuda del hub (IA de Ekovozia) — v2
   - Botón flotante 💬 en el hub y dentro de cada juego (en los juegos es pequeño y se puede ocultar).
   - Explica cómo se juega, da consejos y responde dudas del juego en el que estás (usa el catálogo games.js).
   - "Reportar un problema": manda tu descripción (+ los últimos errores de tu navegador) al administrador.
   - Se carga el PRIMERO en cada página para que, al escribir en el chat, las teclas no muevan el juego.
   - La conversación solo vive en memoria: al recargar se borra. Habla con el Worker de Ekovozia (HUB_API). */
(function (w, d) {
  'use strict';
  var API = w.HUB_API || 'https://eco.x-mayor.workers.dev';
  var MAX_IN = 500, MAX_TURNS = 10, COOLDOWN = 2500, PREF = 'hub_asistente', PREF_FULL = 'hub_asistente_full';
  var slug = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/i, '') || 'index';
  var inGame = slug !== 'index';
  var turns = [], busy = false, lastSend = 0, lastReport = 0, mode = 'chat', skipTurns = 0, pickKind = '';
  var fab, panel, box, inp, btn, ready = false;

  /* ---- teclado: lo que escribes en el chat no llega al juego ---- */
  function enUi(t) { return t && t.closest && (t.closest('#asp') || t.closest('#asb')); }
  ['keydown', 'keypress'].forEach(function (ev) {
    w.addEventListener(ev, function (e) {
      if (!enUi(e.target)) return;
      if (ev === 'keydown' && e.key === 'Escape') { toggle(false); }
      e.stopImmediatePropagation();
    }, true);
  });

  /* ---- catálogo y prompt ---- */
  function catalogo(cb) {
    if (w.GAMES) return cb();
    var s = d.createElement('script'); s.src = 'games.js'; s.onload = cb; s.onerror = cb; d.head.appendChild(s);
  }
  function norm(x) { return String(x || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  /* Juego del que se habla: el que estás jugando o, en el hub, el último que nombraste en el chat */
  function enfoque() {
    var G = w.GAMES || [], i, j, k, t, al;
    if (inGame) { for (i = 0; i < G.length; i++) if (G[i].id === slug) return G[i]; }
    for (k = turns.length - 1; k >= skipTurns; k--) {
      if (turns[k].role !== 'user') continue;
      t = norm(turns[k].content);
      for (i = 0; i < G.length; i++) {
        al = [G[i].id.replace(/-/g, ' '), G[i].name].concat(G[i].alias || []);
        for (j = 0; j < al.length; j++) if (norm(al[j]).length > 2 && t.indexOf(norm(al[j])) !== -1) return G[i];
      }
    }
    return null;
  }
  function fichaJuego(g) {
    var t = 'JUEGO EN FOCO: ' + g.name + (g.disabled ? ' (NO disponible ahora: está en actualización)' : '') + '.\n' +
      'Qué es: ' + (g.desc || '') + '\nControles: ' + (g.controls || 'sin datos') + '\n';
    if (g.help) t += 'Resumen: ' + g.help + '\n';
    if (g.tuto && g.tuto.length) t += 'Pasos del tutorial (úsalos tal cual, en este orden):\n' + g.tuto.map(function (x, n) { return (n + 1) + '. ' + x; }).join('\n') + '\n';
    if (g.tips && g.tips.length) t += 'Trucos pro:\n' + g.tips.map(function (x) { return '- ' + x; }).join('\n') + '\n';
    return t;
  }
  function sistema() {
    var G = w.GAMES || [], cur = enfoque();
    var t = 'Eres el asistente de ayuda de ARCADE HUB, un hub gratuito de minijuegos web. Hablas en el idioma de la persona (español de España por defecto), con tono cercano, claro y paciente, como un amigo que se sabe los juegos al dedillo. No uses títulos, ni tablas, ni negritas ni markdown.\n\n' +
      'REGLAS CLAVE:\n' +
      '1) HABLA DE UN SOLO JUEGO cada vez. Si la persona pide ayuda, controles, tutorial o trucos y NO hay un juego en foco ni lo ha nombrado, no expliques nada: pregúntale en una frase de qué juego quiere hablar (puedes poner 3 o 4 nombres de ejemplo). Nunca expliques varios juegos a la vez. La única excepción es «qué juegos hay»: nombre y una frase muy corta de cada uno.\n' +
      '2) TUTORIAL: si te piden aprender a jugar, enséñalo paso a paso con una lista numerada (1., 2., 3.…) de 4 a 7 pasos cortos, usando los pasos de la ficha del juego, y termina ofreciendo trucos pro.\n' +
      '3) TRUCOS PRO: son consejos legítimos de estrategia y manejo para jugar mejor (tipo «haz esto y te será más fácil»), 3 a 5, cada uno en su línea empezando por «💡». NO son códigos ni trampas: no reveles códigos secretos, contraseñas de administrador, modos admin ni formas de hacer trampas o saltarse sanciones.\n' +
      '4) CONTROLES: dalos en líneas cortas (una acción por línea) y menciona también el móvil si la ficha lo indica.\n' +
      '5) Tras responder, si no lo han pedido ya, ofrece en una frase corta el tutorial paso a paso o los trucos pro del mismo juego. Una sola pregunta como máximo.\n' +
      '6) EXACTITUD TOTAL: usa solo los datos de abajo. Si algo no está, di que no estás seguro y sugiere probarlo en el juego o pulsar «Reportar un problema». No inventes teclas, cifras, niveles ni funciones. Si la persona discute un dato, comprueba la ficha antes de ceder.\n' +
      '7) Solo hablas del hub y de sus juegos; si preguntan otra cosa, dilo en una frase. Si preguntan quién eres: el asistente de IA del hub (Ekovozia); puedes equivocarte.\n\n' +
      'SOBRE EL HUB: portada con buscador (atajo «/»), filtros por etiqueta y ⭐ Favoritos, y una tarjeta por juego con su estrella de favorito. Al abrir un juego aparece una barra con «← Juegos» (volver), «↻» (reiniciar) y «⛶» (pantalla completa del juego). Este chat (botón 💬) tiene un botón ⛶ para ampliarlo a pantalla completa. ' +
      'El progreso y los favoritos se guardan en el navegador (borrar los datos del navegador los pierde). Neón Buggy guarda en la nube si creas contraseña. ' +
      'Si algo falla: recargar la página; si sigue, «Reportar un problema» en este chat avisa al administrador. Privacidad: politica-privacidad.html.\n\n';
    if (cur) t += fichaJuego(cur) + '\n';
    else t += 'JUEGO EN FOCO: ninguno todavía' + (inGame ? '' : ' (la persona está en la portada del hub)') + '. Pregunta de cuál quiere hablar.\n\n';
    t += 'LISTA DE JUEGOS (solo nombres y qué son; no los expliques si no te los piden):\n';
    G.forEach(function (g) {
      if (cur && g.id === cur.id) return;
      t += '- ' + g.name + (g.disabled ? ' (no disponible ahora)' : '') + ': ' + (g.tags || []).join(', ') + '. ' + (g.desc || '').slice(0, 90) + '\n';
    });
    return t.slice(0, 8800);
  }

  /* ---- interfaz ---- */
  function build() {
    if (ready) return; ready = true;
    var z = inGame ? 2147483000 : 40;
    var css = d.createElement('style');
    css.textContent =
      '#asb{position:fixed;z-index:' + z + ';border-radius:50%;border:1px solid rgba(255,255,255,.25);background:#ff3b5c;color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.45);' +
      (inGame ? 'left:6px;top:45%;width:36px;height:36px;font-size:17px;opacity:.5;padding:0' : 'right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));width:52px;height:52px;font-size:24px') + '}#asb:hover,#asb:focus{opacity:1}' +
      '#asp{position:fixed;z-index:' + z + ';' + (inGame ? 'left:8px;bottom:8px;' : 'right:14px;bottom:calc(76px + env(safe-area-inset-bottom,0px));') + 'width:min(360px,calc(100vw - 16px));height:min(480px,calc(100vh - 70px));display:none;flex-direction:column;background:#121a33;color:#f4f7fb;border:1px solid rgba(255,255,255,.18);border-radius:16px;box-shadow:0 16px 50px rgba(0,0,0,.6);overflow:hidden;font:14px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:left}' +
      '#asp.on{display:flex}#asp *{box-sizing:border-box}#asp header{padding:10px 12px;background:#0b1020;display:flex;align-items:center;gap:8px;font-weight:700}#asp header small{font-weight:400;color:#9aa7c7;display:block;font-size:11px}#asp header button{background:none;border:0;color:#9aa7c7;font-size:20px;cursor:pointer;padding:0 4px}#asp header #asz{margin-left:auto}' +
      '#asp.full{left:0!important;right:0!important;top:0!important;bottom:0!important;width:100vw!important;height:100vh!important;height:100dvh!important;border-radius:0!important;border:0}#asp.full #asm div{max-width:min(780px,92%);font-size:15px}#asp.full #asm{padding:14px max(10px,calc((100% - 780px)/2))}#asp.full #asq,#asp.full #asf{padding-left:max(8px,calc((100% - 780px)/2));padding-right:max(8px,calc((100% - 780px)/2))}' +
      '#asm{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px}#asm div{max-width:88%;padding:8px 10px;border-radius:12px;white-space:pre-wrap;word-break:break-word}' +
      '#asm .u{align-self:flex-end;background:#ff3b5c;color:#fff}#asm .a{align-self:flex-start;background:rgba(255,255,255,.09)}#asm .s{align-self:center;background:none;color:#9aa7c7;font-size:12px;text-align:center}' +
      '#asq{display:flex;gap:6px;padding:0 8px 6px;flex-wrap:wrap}#asq button{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#f4f7fb;border-radius:999px;padding:5px 10px;font:inherit;font-size:12px;cursor:pointer}#asq button.rep{border-color:#ffc53a;color:#ffc53a}' +
      '#asf{display:flex;gap:6px;padding:8px;border-top:1px solid rgba(255,255,255,.12)}#asf input{flex:1;min-width:0;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:10px;color:#f4f7fb;padding:9px 10px;font:inherit}#asf button{background:#ffc53a;border:0;border-radius:10px;padding:0 14px;font-weight:700;cursor:pointer;color:#000}#asf button:disabled{opacity:.5}' +
      '#asf.rep input{border-color:#ffc53a}';
    d.head.appendChild(css);
    fab = d.createElement('button');
    fab.id = 'asb'; fab.type = 'button'; fab.title = 'Ayuda'; fab.setAttribute('aria-label', 'Abrir el asistente de ayuda'); fab.textContent = '💬';
    panel = d.createElement('div');
    panel.id = 'asp'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Asistente de ayuda');
    panel.innerHTML = '<header><span>🤖</span><span>Ayuda del hub<small>Asistente de IA (Ekovozia, modelo Pro) · no escribas datos personales</small></span><button type="button" id="asz" aria-label="Pantalla completa" title="Pantalla completa">⛶</button><button type="button" id="asx" aria-label="Cerrar">✕</button></header>' +
      '<div id="asm"></div><div id="asq"></div><form id="asf"><input id="asi" maxlength="' + MAX_IN + '" autocomplete="off" placeholder="Pregunta sobre los juegos…"><button type="submit" id="ass">Enviar</button></form>';
    d.body.appendChild(fab); d.body.appendChild(panel);
    box = panel.querySelector('#asm'); inp = panel.querySelector('#asi'); btn = panel.querySelector('#ass');

    /* los toques y clics sobre el chat no llegan al juego */
    ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'pointermove', 'click', 'wheel', 'contextmenu'].forEach(function (ev) {
      [fab, panel].forEach(function (el) { el.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true }); });
    });

    if (inGame && lsGet(PREF) === 'off') fab.style.display = 'none';
    var gj = enfoque();
    add('s', inGame && gj ? 'Hola 👋 Soy una IA y conozco ' + gj.name + ' al detalle. Te enseño a jugar paso a paso, te doy trucos pro y te explico los controles.' : 'Hola 👋 Soy una IA. Dime de qué juego quieres ayuda (uno cada vez) o pulsa un botón: tutorial paso a paso, trucos pro o controles.');
    setFull(lsGet(PREF_FULL) === 'on');
    quick();

    fab.addEventListener('click', function () { toggle(); });
    panel.querySelector('#asx').addEventListener('click', function () { toggle(false); });
    panel.querySelector('#asz').addEventListener('click', function () { setFull(!panel.classList.contains('full')); });
    panel.querySelector('#asf').addEventListener('submit', onSubmit);
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function setFull(on) {
    panel.classList.toggle('full', !!on);
    var z = panel.querySelector('#asz');
    z.textContent = on ? '🗗' : '⛶';
    z.title = on ? 'Salir de pantalla completa' : 'Pantalla completa';
    z.setAttribute('aria-label', z.title);
    lsSet(PREF_FULL, on ? 'on' : 'off');
    box.scrollTop = box.scrollHeight;
  }

  var MSG = {
    tuto: function (n) { return 'Enséñame a jugar a ' + n + ' paso a paso, como un tutorial.'; },
    trucos: function (n) { return 'Dame trucos pro para jugar mejor a ' + n + '.'; },
    ctrl: function (n) { return 'Dime los controles de ' + n + '.'; }
  };
  function ask(kind) {
    var g = enfoque();
    if (g) { send(MSG[kind](g.name)); return; }
    pickKind = kind; setMode('pick');
  }
  function quick() {
    var q = panel.querySelector('#asq'); q.textContent = '';
    var mk = function (txt, fn, cls) { var b = d.createElement('button'); b.type = 'button'; b.textContent = txt; if (cls) b.className = cls; b.addEventListener('click', fn); q.appendChild(b); };
    if (mode === 'report') { mk('↩ Volver al chat', function () { setMode('chat'); }); return; }
    if (mode === 'pick') {
      (w.GAMES || []).filter(function (g) { return !g.disabled; }).forEach(function (g) {
        mk((g.emoji || '🎮') + ' ' + g.name, function () { var k = pickKind; setMode('chat'); send(MSG[k](g.name)); });
      });
      mk('↩ Cancelar', function () { setMode('chat'); });
      return;
    }
    mk('📖 Tutorial paso a paso', function () { ask('tuto'); });
    mk('💡 Trucos pro', function () { ask('trucos'); });
    mk('🎮 Controles', function () { ask('ctrl'); });
    if (!inGame && enfoque()) mk('🔄 Otro juego', function () { skipTurns = turns.length; quick(); add('s', 'Vale, ¿de qué otro juego quieres hablar?'); });
    mk('⚠️ Reportar un problema', function () { setMode('report'); }, 'rep');
    if (inGame) mk('Ocultar este botón', function () { lsSet(PREF, 'off'); fab.style.display = 'none'; toggle(false); });
    else mk(lsGet(PREF) === 'off' ? 'Mostrar el botón en los juegos' : 'Ocultar el botón en los juegos', function () { lsSet(PREF, lsGet(PREF) === 'off' ? 'on' : 'off'); quick(); });
  }
  function setMode(m) {
    mode = m; var f = panel.querySelector('#asf');
    f.classList.toggle('rep', m === 'report');
    inp.placeholder = m === 'report' ? 'Cuéntame qué ha pasado y en qué momento…' : 'Pregunta sobre los juegos…';
    btn.textContent = m === 'report' ? 'Reportar' : 'Enviar';
    if (m === 'report') add('s', 'Describe el problema. Se envía al administrador junto con la página y los últimos errores de tu navegador. No pongas datos personales.');
    if (m === 'pick') add('s', '¿De qué juego? Elige uno 👇');
    quick(); if (m !== 'pick') inp.focus();
  }

  function add(cls, text) {
    var e = d.createElement('div'); e.className = cls; e.textContent = text;   /* textContent: nunca HTML */
    box.appendChild(e); box.scrollTop = box.scrollHeight; return e;
  }
  function limpia(t) { return String(t).replace(/\*\*(.+?)\*\*/g, '$1').replace(/`/g, '').replace(/^#{1,6}\s+/gm, '').replace(/^\s*[*]\s+/gm, '- ').trim(); }

  function toggle(v) {
    if (!ready) return;
    var on = v === undefined ? !panel.classList.contains('on') : v;
    panel.classList.toggle('on', on);
    if (on) {
      try { if (d.pointerLockElement) d.exitPointerLock(); } catch (e) {}   /* juegos 3D: suelta el ratón */
      try { w.dispatchEvent(new Event('blur')); } catch (e) {}             /* muchos juegos sueltan teclas / se pausan al perder el foco */
      setTimeout(function () { inp.focus(); }, 50);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    var q = inp.value.trim();
    if (!q) return;
    if (mode === 'report') return report(q);
    send(q);
  }

  function send(q) {
    if (busy) return;
    var now = Date.now();
    if (now - lastSend < COOLDOWN) { add('s', 'Un momento, no vayas tan rápido 🙂'); return; }
    lastSend = now; busy = true; btn.disabled = true; inp.value = '';
    add('u', q); turns.push({ role: 'user', content: q });
    var wait = add('a', '…');
    catalogo(function () {
      var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 45000);
      fetch(API, {
        method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctl.signal,
        body: JSON.stringify({ tier: 'pro', system: sistema(), messages: turns.slice(-MAX_TURNS) })
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { s: r.status, j: j }; }); })
        .then(function (o) {
          if (o.s === 200 && o.j.text) {
            var t = limpia(o.j.text); wait.textContent = t; wait.className = 'a'; turns.push({ role: 'assistant', content: t });
          } else {
            turns.pop(); wait.className = 's';
            wait.textContent = o.s === 429 ? 'Demasiados mensajes seguidos. Espera un poco y prueba otra vez.' :
              o.s === 403 ? 'El asistente no está disponible ahora mismo.' : 'No he podido responder. Inténtalo de nuevo en un rato (o pulsa «Reportar un problema»).';
          }
        })
        .catch(function () { turns.pop(); wait.className = 's'; wait.textContent = 'Sin conexión con el asistente. Inténtalo más tarde.'; })
        .then(function () { clearTimeout(to); busy = false; btn.disabled = false; box.scrollTop = box.scrollHeight; if (mode === 'chat') quick(); });
    });
  }

  function report(q) {
    if (busy) return;
    if (Date.now() - lastReport < 60000) { add('s', 'Ya enviaste un reporte hace un momento. Espera un minuto.'); return; }
    busy = true; btn.disabled = true; inp.value = '';
    add('u', q);
    var errs = [];
    try { errs = JSON.parse(lsGet('hub_errores') || '[]').slice(-3).map(function (x) { return { p: x.p, m: x.m, f: x.f, l: x.l }; }); } catch (e) {}
    fetch(API + '/hub/report', {
      method: 'POST', headers: { 'content-type': 'text/plain' },
      body: JSON.stringify({ p: slug + '.html', t: q.slice(0, MAX_IN), errs: errs })
    }).then(function (r) {
      if (r.status === 204 || r.ok) { lastReport = Date.now(); add('s', '✅ ¡Enviado! Gracias, el administrador lo recibirá.'); setMode('chat'); }
      else add('s', r.status === 429 ? 'Demasiados reportes seguidos. Prueba en un rato.' : 'No se pudo enviar el reporte. Inténtalo más tarde.');
    }).catch(function () { add('s', 'Sin conexión: no se pudo enviar el reporte.'); })
      .then(function () { busy = false; btn.disabled = false; });
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', build); else build();
})(window, document);

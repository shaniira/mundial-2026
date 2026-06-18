// ============================================================
// MUNDIAL 2026 v3 — Banderas + Estilo tarjetas + Tabla grupos
// ============================================================
(function () {
  if (document.getElementById('mw26-root')) return;

  var state = {
    partidos: [],
    grupos: {},
    partidoActivo: 0,
    grupoActivo: null,
    overlayVisible: true,
    tabActiva: 'partido',
    expandido: false
  };

  var cdInterval = null;
  var pollInterval = null;
  var lastCmdTs = 0;

  // Códigos ISO de país (2 letras) para generar banderas como IMAGEN
  // — más confiable que emoji, que no renderiza bien en Windows/algunos sistemas
  var BANDERAS = {
    'Argentina': 'ar', 'Argelia': 'dz', 'Brasil': 'br', 'Colombia': 'co',
    'España': 'es', 'Marruecos': 'ma', 'Francia': 'fr', 'Senegal': 'sn',
    'Alemania': 'de', 'Portugal': 'pt', 'Inglaterra': 'gb-eng', 'Italia': 'it',
    'México': 'mx', 'Mexico': 'mx', 'Uruguay': 'uy', 'Ecuador': 'ec', 'Chile': 'cl',
    'Perú': 'pe', 'Paraguay': 'py', 'Bolivia': 'bo', 'Venezuela': 've',
    'Japón': 'jp', 'Korea Republic': 'kr', 'Corea del Sur': 'kr', 'Arabia Saudita': 'sa',
    'Australia': 'au', 'Irán': 'ir', 'Canadá': 'ca', 'Estados Unidos': 'us',
    'Países Bajos': 'nl', 'Bélgica': 'be', 'Croacia': 'hr', 'Suiza': 'ch',
    'Polonia': 'pl', 'Dinamarca': 'dk', 'Suecia': 'se', 'Noruega': 'no',
    'Turquía': 'tr', 'Ucrania': 'ua', 'Serbia': 'rs', 'Austria': 'at',
    'Ghana': 'gh', 'Nigeria': 'ng', 'Camerún': 'cm', 'Sudáfrica': 'za', 'South Africa': 'za',
    'Egipto': 'eg', 'Túnez': 'tn', 'Costa de Marfil': 'ci', 'Mali': 'ml',
    'Costa Rica': 'cr', 'Honduras': 'hn', 'Qatar': 'qa', 'Irak': 'iq', 'Czechia': 'cz',
    'Nueva Zelanda': 'nz', 'Panamá': 'pa', 'Jamaica': 'jm', 'Congo DR': 'cd',
    'Uzbekistán': 'uz', 'Curazao': 'cw', 'Cabo Verde': 'cv', 'Jordania': 'jo',
    'Bosnia y Herzegovina': 'ba', 'Escocia': 'gb-sct', 'Haití': 'ht'
  };

  // Devuelve un <img> con la bandera real (flagcdn.com, gratis, sin API key)
  function bandera(nombre, size) {
    var code = BANDERAS[nombre];
    size = size || 24;
    if (!code) return '<span style="font-size:' + (size*0.7) + 'px">🏳️</span>';
    return '<img src="https://flagcdn.com/w40/' + code + '.png" ' +
      'alt="' + nombre + '" width="' + size + '" ' +
      'style="display:inline-block;vertical-align:middle;border-radius:2px;width:' + size + 'px;height:auto;object-fit:cover" ' +
      'onerror="this.style.display=\'none\'"/>';
  }

  // ── INIT ──────────────────────────────────────────────────
  async function init() {
    var data = await msg({ tipo: 'GET_STATE' });
    if (data) {
      state.partidos       = data.partidos || [];
      state.grupos         = data.grupos || {};
      state.overlayVisible = data.overlayVisible !== false;
      state.partidoActivo  = data.partidoActivo || 0;
    }
    var vivoIdx = state.partidos.findIndex(function(p) { return p.estado === 'EN_VIVO'; });
    if (vivoIdx >= 0) state.partidoActivo = vivoIdx;

    var gruposKeys = Object.keys(state.grupos);
    if (gruposKeys.length) state.grupoActivo = gruposKeys[0];

    mount();
    startCountdown();
    startPoll();

    chrome.storage.local.get(['cmd', 'cmdTs'], function(d) {
      if (!d.cmdTs || Date.now() - d.cmdTs > 5000) return;
      lastCmdTs = d.cmdTs;
      if (d.cmd === 'ABRIR')   { state.expandido = true; state.tabActiva = 'partido'; rerender(); }
      if (d.cmd === 'FIXTURE') { state.expandido = true; state.tabActiva = 'fixture'; rerender(); }
      chrome.storage.local.remove(['cmd', 'cmdTs']);
    });
  }

  function mount() {
    var root = document.getElementById('mw26-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'mw26-root';
      document.body.appendChild(root);
    }
    root.innerHTML = buildAll();
    root.style.display = state.overlayVisible ? '' : 'none';
    bind();
  }

  function rerender() {
    var wasOpen = !!document.querySelector('#mw26-panel.open');
    mount();
    if (wasOpen) {
      var panel = document.getElementById('mw26-panel');
      if (panel) panel.classList.add('open');
    }
    startCountdown();
  }

  function buildAll() {
    var p = getPart();
    return buildPanel(p) + buildPill(p);
  }

  function getPart() { return state.partidos[state.partidoActivo] || null; }

  function statusInfo(estado) {
    if (estado === 'EN_VIVO')    return { cls: 's-vivo',       lbl: 'LIVE',       right: 'FIXTURE' };
    if (estado === 'FINALIZADO') return { cls: 's-finalizado', lbl: 'FINALIZADO', right: 'FULL TIME' };
    return { cls: 's-proximo', lbl: 'PROGRAMADO', right: 'PREDICCIONES ABIERTAS' };
  }

  function buildPill(p) {
    if (!p) return '<div id="mw26-pill"><div class="pill-led proximo"></div><span class="pill-score">MUNDIAL 2026</span><span class="pill-badge proximo">HOY</span></div>';
    var cls = ecls(p.estado);
    var bl = bandera(p.local.nombre, 16), bv = bandera(p.visita.nombre, 16);
    var bdg = p.estado === 'EN_VIVO' ? p.minuto+"'" : p.estado === 'FINALIZADO' ? 'FIN' : (p.hora || 'PRÓ');
    var sc = p.estado !== 'PROXIMO' ? (p.local.goles + ' – ' + p.visita.goles) : 'vs';
    return '<div id="mw26-pill"><div class="pill-led ' + cls + '"></div>' +
      '<span class="pill-flags">' + bl + bv + '</span>' +
      '<span class="pill-score">' + sc + '</span>' +
      '<span class="pill-badge ' + cls + '">' + bdg + '</span></div>';
  }

  function buildPanel(p) {
    return '<div id="mw26-panel' + (state.expandido ? ' open' : '') + '">' +
      '<div class="mw-content">' +
        buildHeader() + buildTabs() +
        '<div class="mw-pane' + (state.tabActiva === 'partido' ? ' on' : '') + '" data-pane="partido">' + buildPartido(p) + '</div>' +
        '<div class="mw-pane' + (state.tabActiva === 'fixture' ? ' on' : '') + '" data-pane="fixture">' + buildFixture() + '</div>' +
        '<div class="mw-pane' + (state.tabActiva === 'grupos' ? ' on' : '') + '" data-pane="grupos">' + buildGrupos() + '</div>' +
      '</div>' +
    '</div>';
  }

  function buildHeader() {
    return '<div class="mw-header">' +
      '<div class="mw-header-left">' +
        '<span class="mw-ball">🏆</span>' +
        '<div><div class="mw-title">MUNDIAL 2026</div><div class="mw-sub">USA · CANADÁ · MÉXICO</div></div>' +
      '</div>' +
      '<div class="mw-header-actions">' +
        '<button class="mw-min" id="mw-min" title="Minimizar">─</button>' +
        '<button class="mw-close" id="mw-close" title="Cerrar">✕</button>' +
      '</div>' +
    '</div>';
  }

  function buildTabs() {
    return '<div class="mw-tabs" style="background:#fff;border-bottom:1px solid #e2e8f0">' +
      tab('partido', '⚽ Partido') + tab('fixture', '📅 Fixture') + tab('grupos', '🏆 Grupos') +
    '</div>';
  }
  function tab(id, label) {
    var on = state.tabActiva === id;
    return '<div class="mw-tab' + (on ? ' on' : '') + '" data-tab="' + id + '" style="color:' + (on ? '#0c1f3d' : '#94a3b8') + ';border-bottom-color:' + (on ? '#0c1f3d' : 'transparent') + ';background:' + (on ? '#f8fafc' : 'transparent') + '">' + label + '</div>';
  }

  // ── PARTIDO — tarjeta estilo referencia ────────────────────
  function buildPartido(p) {
    if (!p) return '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:13px;background:#fff">Sin partidos disponibles</div>';

    var bl = bandera(p.local.nombre, 32), bv = bandera(p.visita.nombre, 32);
    var total = state.partidos.length, idx = state.partidoActivo;
    var info = statusInfo(p.estado);
    var fecha = new Date().toLocaleDateString('es-PE');

    var scoreTxt = p.estado !== 'PROXIMO' ? (p.local.goles + ' - ' + p.visita.goles) : 'VS';
    var centerLbl = p.estado === 'EN_VIVO' ? 'MARCADOR PARCIAL' : p.estado === 'FINALIZADO' ? 'RESULTADO FINAL' : '';

    var footerTxt = p.estado === 'EN_VIVO'
      ? 'Minuto ' + p.minuto + "' · " + p.sede
      : p.estado === 'FINALIZADO'
        ? fecha + (p.horaJugado ? ' · ' + p.horaJugado : '') + ' · ' + p.sede
        : fecha + ' · ' + (p.hora || '') + ' · ' + p.sede;

    var proximo = state.partidos.find(function(x) { return x.estado === 'PROXIMO' && x.horaMs; });
    var hayPos = p.local.posesion > 0;

    return '' +
    // nav
    '<div class="mw-nav" style="background:#fff;padding:10px 14px 0">' +
      '<button class="mw-nav-btn" id="btn-prev">‹</button>' +
      '<div class="mw-nav-meta"><div class="mw-nav-grupo" style="color:#0c1f3d">GRUPO ' + p.grupo + ' · ' + (idx+1) + '/' + total + '</div>' +
      '<div class="mw-nav-sede" style="color:#94a3b8">' + p.sede + '</div></div>' +
      '<button class="mw-nav-btn" id="btn-next">›</button>' +
    '</div>' +

    // status bar + card
    '<div style="margin:10px 14px 0">' +
      '<div class="mw-status-bar ' + info.cls + '">' +
        '<div class="mw-status-left">' + (p.estado === 'EN_VIVO' ? '<span class="mw-status-dot live"></span>' : '') + '<span>' + info.lbl + '</span></div>' +
        '<span>' + info.right + '</span>' +
      '</div>' +
      '<div class="mw-card">' +
        '<div class="mw-card-body">' +
          '<div class="mw-card-team"><div class="mw-card-flag-circle">' + bl + '</div><div class="mw-card-team-name">' + p.local.nombre + '</div></div>' +
          '<div class="mw-card-center">' +
            (centerLbl ? '<div class="mw-card-center-lbl">' + centerLbl + '</div>' : '') +
            '<div class="' + (p.estado === 'PROXIMO' ? 'mw-card-vs' : 'mw-card-score') + '">' + scoreTxt + '</div>' +
            '<div class="mw-card-date">' + fecha + '</div>' +
          '</div>' +
          '<div class="mw-card-team right"><div class="mw-card-flag-circle">' + bv + '</div><div class="mw-card-team-name">' + p.visita.nombre + '</div></div>' +
        '</div>' +
        '<div class="mw-card-footer">' + footerTxt + '</div>' +
      '</div>' +
    '</div>' +

    (hayPos ? '<div style="margin:10px 14px 0" class="mw-posesion">' +
      '<span class="mw-pos-n" style="color:#0c1f3d">' + p.local.posesion + '%</span>' +
      '<div class="mw-pos-track"><div class="mw-pos-lbl" style="color:#94a3b8">POSESIÓN</div><div class="mw-pos-fill" style="width:' + p.local.posesion + '%;background:linear-gradient(90deg,#1e5fd6,#0c1f3d)"></div></div>' +
      '<span class="mw-pos-n r" style="color:#0c1f3d">' + p.visita.posesion + '%</span></div>' : '') +

    (proximo && p.estado !== 'PROXIMO' ? '<div class="mw-countdown">' +
      '<div class="mw-cd-label">⏱ Próximo partido</div>' +
      '<div class="mw-cd-row">' +
        '<div class="mw-cd-block"><div class="mw-cd-n" id="cd-h">--</div><div class="mw-cd-u">HORAS</div></div><div class="mw-cd-sep">:</div>' +
        '<div class="mw-cd-block"><div class="mw-cd-n" id="cd-m">--</div><div class="mw-cd-u">MIN</div></div><div class="mw-cd-sep">:</div>' +
        '<div class="mw-cd-block"><div class="mw-cd-n" id="cd-s">--</div><div class="mw-cd-u">SEG</div></div>' +
      '</div>' +
      '<div class="mw-cd-next">' + bandera(proximo.local.nombre, 16) + ' ' + proximo.local.nombre + ' vs ' + proximo.visita.nombre + ' ' + bandera(proximo.visita.nombre, 16) + '</div>' +
    '</div>' : '') +

    '<div class="mw-ia">' +
      '<div class="mw-ia-hdr"><div class="mw-ia-icon">🤖</div><div class="mw-ia-title">Predicción IA</div></div>' +
      '<div class="mw-ia-bars">' +
        iaRow(bandera(p.local.nombre, 16), p.local.nombre, p.iaLocal, 'w') +
        iaRow('🤝', 'Empate', p.iaEmpate, 'd', true) +
        iaRow(bandera(p.visita.nombre, 16), p.visita.nombre, p.iaVisita, 'l') +
      '</div>' +
      '<div class="mw-ia-tip">💡 ' + p.iaTip + '</div>' +
      '<div class="mw-ia-dato">' + p.datoRaro + '</div>' +
    '</div>';
  }

  function iaRow(flag, name, pct, type, isEmpate) {
    return '<div class="mw-ia-row"><span class="mw-ia-flag">' + flag + '</span>' +
      '<span class="mw-ia-name' + (isEmpate ? ' empate' : '') + '">' + name + '</span>' +
      '<div class="mw-ia-track"><div class="mw-ia-fill ' + type + '" style="width:' + pct + '%"></div></div>' +
      '<span class="mw-ia-pct ' + type + '">' + pct + '%</span></div>';
  }

  // ── FIXTURE ─────────────────────────────────────────────────
  function buildFixture() {
    if (!state.partidos.length) return '<div style="padding:20px;text-align:center;color:#94a3b8;background:#fff">Sin partidos</div>';

    var grupos = { 'EN_VIVO': [], 'PROXIMO': [], 'FINALIZADO': [] };
    state.partidos.forEach(function(p, i) { grupos[p.estado].push({ p: p, i: i }); });

    var html = '<div class="mw-fixture" style="background:#fff">';

    if (grupos.EN_VIVO.length) html += seccionFixture('🔴 En vivo ahora', grupos.EN_VIVO);
    if (grupos.PROXIMO.length) html += seccionFixture('🔵 Próximos', grupos.PROXIMO);
    if (grupos.FINALIZADO.length) html += seccionFixture('⚫ Finalizados', grupos.FINALIZADO);

    return html + '</div>';
  }

  function seccionFixture(titulo, items) {
    var html = '<div style="padding:8px 14px 4px;font-size:10px;font-weight:800;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;background:#f8fafc">' + titulo + '</div>';
    items.forEach(function(item) {
      var p = item.p, i = item.i, sel = i === state.partidoActivo;
      var bl = bandera(p.local.nombre, 20), bv = bandera(p.visita.nombre, 20);
      if (p.estado === 'EN_VIVO') right = '<div class="mw-fx-vivo">EN VIVO ' + p.minuto + "'</div><div class=\"mw-fx-score\" style=\"color:#0f172a\">" + p.local.goles + '–' + p.visita.goles + '</div>';
      else if (p.estado === 'FINALIZADO') right = '<div class="mw-fx-score" style="color:#0f172a">' + p.local.goles + '–' + p.visita.goles + '</div><div class="mw-fx-fin" style="color:#94a3b8">FIN' + (p.horaJugado ? ' · ' + p.horaJugado : '') + '</div>';
      else right = '<div class="mw-fx-hora" style="color:#1e5fd6">' + (p.hora || '') + '</div>';

      html += '<div class="mw-fx-item' + (sel ? ' selected' : '') + '" data-idx="' + i + '" style="border-bottom:1px solid #f1f5f9' + (sel ? ';background:#f0f7ff' : '') + '">' +
        '<div class="mw-fx-flags">' + bl + bv + '</div>' +
        '<div class="mw-fx-info"><div class="mw-fx-teams" style="color:#0f172a">' + p.local.nombre + ' vs ' + p.visita.nombre + '</div>' +
        '<div class="mw-fx-meta" style="color:#94a3b8">Grupo ' + p.grupo + ' · ' + p.ciudad + '</div></div>' +
        '<div class="mw-fx-right">' + right + '</div>' +
      '</div>';
    });
    return html;
  }

  // ── GRUPOS — tabla de posiciones ──────────────────────────
  function buildGrupos() {
    var keys = Object.keys(state.grupos);
    if (!keys.length) return '<div style="padding:20px;text-align:center;color:#94a3b8;background:#fff">Sin datos de grupos</div>';
    if (!state.grupoActivo) state.grupoActivo = keys[0];

    var g = state.grupos[state.grupoActivo];
    var equipos = g.equipos.slice().sort(function(a, b) {
      var ptsA = a.g * 3 + a.e, ptsB = b.g * 3 + b.e;
      if (ptsB !== ptsA) return ptsB - ptsA;
      return (b.gf - b.gc) - (a.gf - a.gc);
    });

    var jugados = equipos.reduce(function(s, e) { return s + e.pj; }, 0) / 2;

    var chips = keys.map(function(k) {
      return '<div class="mw-grupo-chip' + (k === state.grupoActivo ? ' on' : '') + '" data-grupo="' + k + '">Grupo ' + k + '</div>';
    }).join('');

    var filas = equipos.map(function(e, idx) {
      var pts = e.g * 3 + e.e;
      var clasifica = idx < 2;
      return '<tr>' +
        '<td><span class="mw-tabla-pos' + (clasifica ? ' clasifica' : '') + '">' + (idx+1) + '</span></td>' +
        '<td class="mw-tabla-equipo"><span class="mw-tabla-flag">' + bandera(e.nombre, 18) + '</span>' + e.nombre + '</td>' +
        '<td>' + e.pj + '</td>' +
        '<td class="mw-tabla-g">' + e.g + '</td>' +
        '<td>' + e.e + '</td>' +
        '<td class="mw-tabla-p">' + e.p + '</td>' +
        '<td>' + e.gf + '</td>' +
        '<td>' + e.gc + '</td>' +
        '<td style="font-weight:800;color:#0c1f3d">' + pts + '</td>' +
      '</tr>';
    }).join('');

    return '<div class="mw-grupos-wrap">' +
      '<div class="mw-grupo-selector">' + chips + '</div>' +
      '<div class="mw-grupo-header"><span class="mw-grupo-titulo">' + g.nombre + '</span><span class="mw-grupo-jugados">' + jugados + ' jugados</span></div>' +
      '<table class="mw-tabla"><thead><tr><th></th><th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>Pts</th></tr></thead>' +
      '<tbody>' + filas + '</tbody></table>' +
      '<div class="mw-grupo-nota">🟢 1° y 2° avanzan directo</div>' +
    '</div>';
  }

  // ── EVENTOS ───────────────────────────────────────────────
  function bind() {
    var root = document.getElementById('mw26-root');
    if (!root) return;

    root.querySelector('#mw26-pill').addEventListener('click', function() {
      state.expandido = !state.expandido;
      var panel = document.getElementById('mw26-panel');
      if (panel) panel.classList.toggle('open', state.expandido);
    });

    var minBtn = root.querySelector('#mw-min');
    if (minBtn) minBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      state.expandido = false;
      var panel = document.getElementById('mw26-panel');
      if (panel) panel.classList.remove('open');
    });

    var closeBtn = root.querySelector('#mw-close');
    if (closeBtn) closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      state.expandido = false;
      state.overlayVisible = false;
      chrome.storage.local.set({ overlayVisible: false });
      var fullRoot = document.getElementById('mw26-root');
      if (fullRoot) fullRoot.style.display = 'none';
    });

    root.querySelectorAll('.mw-tab').forEach(function(t) {
      t.addEventListener('click', function(e) {
        e.stopPropagation();
        state.tabActiva = t.dataset.tab;
        rerender();
      });
    });

    var btnPrev = root.querySelector('#btn-prev'), btnNext = root.querySelector('#btn-next');
    if (btnPrev) btnPrev.addEventListener('click', function(e) {
      e.stopPropagation();
      if (state.partidoActivo > 0) { state.partidoActivo--; rerender(); }
    });
    if (btnNext) btnNext.addEventListener('click', function(e) {
      e.stopPropagation();
      if (state.partidoActivo < state.partidos.length - 1) { state.partidoActivo++; rerender(); }
    });

    root.querySelectorAll('.mw-fx-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        state.partidoActivo = parseInt(item.dataset.idx);
        state.tabActiva = 'partido';
        rerender();
      });
    });

    root.querySelectorAll('.mw-grupo-chip').forEach(function(chip) {
      chip.addEventListener('click', function(e) {
        e.stopPropagation();
        state.grupoActivo = chip.dataset.grupo;
        rerender();
      });
    });
  }

  // ── COUNTDOWN ─────────────────────────────────────────────
  function startCountdown() {
    if (cdInterval) clearInterval(cdInterval);
    var proximo = state.partidos.find(function(p) { return p.estado === 'PROXIMO' && p.horaMs; });
    if (!proximo) return;
    cdInterval = setInterval(function() {
      if (!contextoValido()) { clearInterval(cdInterval); return; }
      var diff = proximo.horaMs - Date.now();
      if (diff <= 0) { clearInterval(cdInterval); return; }
      var h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
      var eh = document.getElementById('cd-h'), em = document.getElementById('cd-m'), es = document.getElementById('cd-s');
      if (eh) eh.textContent = pad(h);
      if (em) em.textContent = pad(m);
      if (es) es.textContent = pad(s);
    }, 1000);
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // Detecta si la extensión sigue activa (no fue recargada/desinstalada)
  function contextoValido() {
    try {
      return !!(chrome.runtime && chrome.runtime.id);
    } catch (e) {
      return false;
    }
  }

  // ── POLLING ───────────────────────────────────────────────
  function startPoll() {
    if (pollInterval) clearInterval(pollInterval);
    pollInterval = setInterval(function() {
      if (!contextoValido()) {
        // La extensión fue recargada/actualizada — detener el polling
        // de esta instancia vieja para no seguir generando errores
        clearInterval(pollInterval);
        return;
      }
      try {
        chrome.storage.local.get(['cmd', 'cmdTs', 'overlayVisible', 'partidos', 'grupos'], function(d) {
          if (chrome.runtime.lastError) return; // contexto se invalidó justo ahora
          var ov = d.overlayVisible !== false;
          if (ov !== state.overlayVisible) {
            state.overlayVisible = ov;
            var root = document.getElementById('mw26-root');
            if (root) root.style.display = ov ? '' : 'none';
          }
          var partidosCambiaron = d.partidos && JSON.stringify(d.partidos) !== JSON.stringify(state.partidos);
          var gruposCambiaron = d.grupos && JSON.stringify(d.grupos) !== JSON.stringify(state.grupos);
          if (partidosCambiaron) state.partidos = d.partidos;
          if (gruposCambiaron) state.grupos = d.grupos;
          if (partidosCambiaron || gruposCambiaron) rerender();
          if (d.cmdTs && d.cmdTs !== lastCmdTs) {
            lastCmdTs = d.cmdTs;
            if (d.cmd === 'ABRIR')   { state.expandido = true; state.tabActiva = 'partido'; rerender(); }
            if (d.cmd === 'FIXTURE') { state.expandido = true; state.tabActiva = 'fixture'; rerender(); }
            chrome.storage.local.remove(['cmd', 'cmdTs']);
          }
        });
      } catch (e) {
        // Extension context invalidated — detener silenciosamente
        clearInterval(pollInterval);
      }
    }, 800);
  }

  chrome.runtime.onMessage.addListener(function(m) {
    if (m.tipo === 'TICK') { state.partidos = m.partidos; if (m.grupos) state.grupos = m.grupos; rerender(); }
    if (m.tipo === 'ABRIR_WIDGET')  { state.expandido = true; state.tabActiva = 'partido'; rerender(); }
    if (m.tipo === 'ABRIR_FIXTURE') { state.expandido = true; state.tabActiva = 'fixture'; rerender(); }
  });

  function ecls(e) { if (e === 'EN_VIVO') return 'vivo'; if (e === 'FINALIZADO') return 'finalizado'; return 'proximo'; }
  function msg(payload) { return new Promise(function(r) { try { chrome.runtime.sendMessage(payload, r); } catch(e) { r(null); } }); }

  init();
})();

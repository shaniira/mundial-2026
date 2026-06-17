// Mismo mapa de banderas que el content script — códigos ISO para imágenes reales
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

function bandera(nombre, size) {
  var code = BANDERAS[nombre];
  size = size || 20;
  if (!code) return '<span style="font-size:' + (size*0.7) + 'px">🏳️</span>';
  return '<img src="https://flagcdn.com/w40/' + code + '.png" alt="' + nombre + '" ' +
    'style="display:inline-block;vertical-align:middle;border-radius:2px;width:' + size + 'px;height:auto;object-fit:cover"/>';
}

async function init() {
  const data = await chrome.runtime.sendMessage({ tipo: 'GET_STATE' });
  if (!data) return;
  const { partidos = [], overlayVisible } = data;

  const vivo  = partidos.filter(function(p) { return p.estado === 'EN_VIVO'; });
  const prox  = partidos.filter(function(p) { return p.estado === 'PROXIMO'; });
  const goles = partidos.reduce(function(a, p) { return a + (p.local.goles||0) + (p.visita.goles||0); }, 0);

  document.getElementById('st-vivo').textContent  = vivo.length;
  document.getElementById('st-prox').textContent  = prox.length;
  document.getElementById('st-goles').textContent = goles;

  // Partido en vivo
  if (vivo[0]) {
    var v = vivo[0];
    document.getElementById('live-section').innerHTML =
      '<div class="live-card">' +
        '<div class="live-header">' +
          '<div class="live-dot"></div>' +
          '<span class="live-lbl">EN VIVO</span>' +
          '<span class="live-min">' + v.minuto + '\'</span>' +
        '</div>' +
        '<div class="live-score-row">' +
          '<div class="live-team">' +
            '<div class="live-flag">' + bandera(v.local.nombre, 24) + '</div>' +
            '<div class="live-name">' + v.local.nombre + '</div>' +
          '</div>' +
          '<div class="live-score">' + v.local.goles + '\u2013' + v.visita.goles + '</div>' +
          '<div class="live-team">' +
            '<div class="live-flag">' + bandera(v.visita.nombre, 24) + '</div>' +
            '<div class="live-name">' + v.visita.nombre + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Próximo
  if (prox[0]) {
    var p = prox[0];
    document.getElementById('prox-section').innerHTML =
      '<div class="proximo-card">' +
        '<div class="prox-lbl">\u23f1 Pr\u00f3ximo partido</div>' +
        '<div class="prox-row">' +
          '<span class="prox-match">' + bandera(p.local.nombre, 16) + ' ' + p.local.nombre + ' vs ' + p.visita.nombre + ' ' + bandera(p.visita.nombre, 16) + '</span>' +
          '<span class="prox-hora">' + (p.hora || '') + '</span>' +
        '</div>' +
      '</div>';
  }

  // Toggle overlay
  document.getElementById('tog').checked = overlayVisible !== false;
  document.getElementById('tog').addEventListener('change', function(e) {
    chrome.storage.local.set({ overlayVisible: e.target.checked });
  });

  // ── BOTÓN ABRIR WIDGET ──────────────────────────────────────
  // Simple: guardamos el comando en storage y mandamos mensaje.
  // El content script SIEMPRE está presente (se inyecta en todas
  // las páginas vía manifest), así que no necesitamos fallback.
  document.getElementById('btn-abrir').addEventListener('click', function() {
    chrome.storage.local.set({ cmd: 'ABRIR', cmdTs: Date.now() }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { tipo: 'ABRIR_WIDGET' }, function() {
            void chrome.runtime.lastError; // ignorar si no hay listener aún
          });
        }
        window.close();
      });
    });
  });

  // ── BOTÓN FIXTURE ───────────────────────────────────────────
  document.getElementById('btn-fixture').addEventListener('click', function() {
    chrome.storage.local.set({ cmd: 'FIXTURE', cmdTs: Date.now() }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { tipo: 'ABRIR_FIXTURE' }, function() {
            void chrome.runtime.lastError;
          });
        }
        window.close();
      });
    });
  });
}

init();

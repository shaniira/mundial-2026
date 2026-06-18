// ============================================================
// MUNDIAL 2026 — Background Worker
// Datos REALES actualizados — 17 junio 2026
// ============================================================

// Partidos del Mundial 2026 — Jornada 1, Grupos K y L (17 junio)
const PARTIDOS = [
  {
    id: 'w001',
    local:  { nombre: 'Portugal', goles: 1, intentos: 1, posesion: 52 },
    visita: { nombre: 'Congo DR', goles: 1, intentos: 4, posesion: 48 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'K',
    sede: 'Estadio Houston',
    ciudad: 'Houston',
    hora: null,
    horaJugado: '11:00',
    iaLocal: 58,
    iaEmpate: 27,
    iaVisita: 15,
    iaTip: 'Portugal dominó posesión pero falló en eficacia. Congo DR hizo historia con su primer gol mundialista.',
    datoRaro: '🏆 Yoane Wissa anotó el primer gol de la historia de RD Congo en un Mundial'
  },
  {
    id: 'w002',
    local:  { nombre: 'Inglaterra', goles: 4, intentos: 12, posesion: 59 },
    visita: { nombre: 'Croacia',    goles: 2, intentos: 7,  posesion: 41 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'L',
    sede: 'AT&T Stadium',
    ciudad: 'Dallas',
    hora: null,
    horaJugado: '14:00',
    iaLocal: 71,
    iaEmpate: 16,
    iaVisita: 13,
    iaTip: 'Doblete de Harry Kane y goles de Bellingham y Rashford sellaron la goleada inglesa.',
    datoRaro: '⚡ Harry Kane anotó su gol 16 en Mundiales — empatando el récord de Klose en solo 12 partidos'
  },
  {
    id: 'w003',
    local:  { nombre: 'Ghana', goles: null, intentos: 0, posesion: 0 },
    visita: { nombre: 'Panamá', goles: null, intentos: 0, posesion: 0 },
    minuto: 0,
    estado: 'PROXIMO',
    grupo: 'L',
    sede: 'Estadio Toronto',
    ciudad: 'Toronto',
    hora: '18:00',
    horaMs: new Date('2026-06-17T18:00:00-05:00').getTime(),
    iaLocal: 54,
    iaEmpate: 26,
    iaVisita: 20,
    iaTip: 'Ghana debuta sin su capitán Thomas Partey, ausente por temas de visa. Panamá llega con ilusión a su segundo Mundial.',
    datoRaro: '🇬🇭 Ghana jugará sin Thomas Partey, a quien Canadá negó la visa por procesos legales pendientes'
  },
  {
    id: 'w004',
    local:  { nombre: 'Colombia', goles: null, intentos: 0, posesion: 0 },
    visita: { nombre: 'Uzbekistán', goles: null, intentos: 0, posesion: 0 },
    minuto: 0,
    estado: 'PROXIMO',
    grupo: 'K',
    sede: 'Estadio Ciudad de México',
    ciudad: 'Ciudad de México',
    hora: '21:00',
    horaMs: new Date('2026-06-17T21:00:00-06:00').getTime(),
    iaLocal: 68,
    iaEmpate: 21,
    iaVisita: 11,
    iaTip: 'Colombia, dirigida por Néstor Lorenzo, es favorita ante el debutante Uzbekistán de Fabio Cannavaro. La altura de CDMX puede ser factor.',
    datoRaro: '🇺🇿 Uzbekistán juega su primer Mundial de la historia, dirigido por el ex campeón del mundo Fabio Cannavaro'
  }
];

// Tabla de grupos — datos reales tras Jornada 1
const GRUPOS = {
  'A': {
    nombre: 'Grupo A',
    equipos: [
      { nombre: 'Mexico',         pj: 1, g: 1, e: 0, p: 0, gf: 2, gc: 0 },
      { nombre: 'Korea Republic', pj: 1, g: 1, e: 0, p: 0, gf: 2, gc: 1 },
      { nombre: 'Czechia',        pj: 1, g: 0, e: 0, p: 1, gf: 1, gc: 2 },
      { nombre: 'South Africa',   pj: 1, g: 0, e: 0, p: 1, gf: 0, gc: 2 }
    ]
  },
  'I': {
    nombre: 'Grupo I',
    equipos: [
      { nombre: 'Francia',  pj: 1, g: 1, e: 0, p: 0, gf: 3, gc: 1 },
      { nombre: 'Noruega',  pj: 1, g: 1, e: 0, p: 0, gf: 4, gc: 1 },
      { nombre: 'Senegal',  pj: 1, g: 0, e: 0, p: 1, gf: 1, gc: 3 },
      { nombre: 'Irak',     pj: 1, g: 0, e: 0, p: 1, gf: 1, gc: 4 }
    ]
  },
  'J': {
    nombre: 'Grupo J',
    equipos: [
      { nombre: 'Argentina', pj: 1, g: 1, e: 0, p: 0, gf: 3, gc: 0 },
      { nombre: 'Argelia',   pj: 1, g: 0, e: 0, p: 1, gf: 0, gc: 3 }
    ]
  },
  'K': {
    nombre: 'Grupo K',
    equipos: [
      { nombre: 'Portugal',    pj: 1, g: 0, e: 1, p: 0, gf: 1, gc: 1 },
      { nombre: 'Congo DR',    pj: 1, g: 0, e: 1, p: 0, gf: 1, gc: 1 },
      { nombre: 'Colombia',    pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0 },
      { nombre: 'Uzbekistán',  pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0 }
    ]
  },
  'L': {
    nombre: 'Grupo L',
    equipos: [
      { nombre: 'Inglaterra', pj: 1, g: 1, e: 0, p: 0, gf: 4, gc: 2 },
      { nombre: 'Croacia',    pj: 1, g: 0, e: 0, p: 1, gf: 2, gc: 4 },
      { nombre: 'Ghana',      pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0 },
      { nombre: 'Panamá',     pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0 }
    ]
  }
};

// Versión del dataset — cuando cambia, fuerza limpieza total del storage viejo
const DATA_VERSION = 'v5-minuto-real';

// ── Init: se ejecuta SIEMPRE que el service worker arranca ───
async function inicializarDatos() {
  const { dataVersion } = await chrome.storage.local.get('dataVersion');

  if (dataVersion !== DATA_VERSION) {
    // Datos viejos detectados — limpiar todo y reescribir desde cero
    await chrome.storage.local.clear();
    await chrome.storage.local.set({
      partidos: PARTIDOS,
      grupos: GRUPOS,
      partidoActivo: 0,
      overlayVisible: true,
      dataVersion: DATA_VERSION
    });
  } else {
    // Misma versión — solo refrescar contenido (por si cambié textos/IA)
    await chrome.storage.local.set({ partidos: PARTIDOS, grupos: GRUPOS });
  }

  // Recalcular minutos reales inmediatamente (sin esperar el próximo tick de 60s)
  await recalcularMinutos();
}

// Recalcula el minuto de cada partido EN_VIVO según el tiempo real transcurrido
async function recalcularMinutos() {
  const { partidos } = await chrome.storage.local.get('partidos');
  if (!partidos) return;

  const actualizados = partidos.map(p => {
    if (p.estado === 'PROXIMO' && p.horaMs && Date.now() >= p.horaMs) {
      return {
        ...p,
        estado: 'EN_VIVO',
        minuto: Math.min(Math.max(Math.floor((Date.now() - p.horaMs) / 60000) + 1, 1), 90),
        local:  { ...p.local,  goles: p.local.goles ?? 0,  intentos: p.local.intentos ?? 0,  posesion: p.local.posesion || 50 },
        visita: { ...p.visita, goles: p.visita.goles ?? 0, intentos: p.visita.intentos ?? 0, posesion: p.visita.posesion || 50 }
      };
    }
    if (p.estado === 'EN_VIVO' && p.horaMs) {
      const minutoReal = Math.min(Math.max(Math.floor((Date.now() - p.horaMs) / 60000) + 1, 1), 90);
      if (minutoReal >= 90) return { ...p, minuto: 90, estado: 'FINALIZADO' };
      return { ...p, minuto: minutoReal };
    }
    return p;
  });

  await chrome.storage.local.set({ partidos: actualizados });
}

chrome.runtime.onInstalled.addListener(async () => {
  await inicializarDatos();
  chrome.alarms.create('tick', { periodInMinutes: 1 });
});

chrome.runtime.onStartup.addListener(async () => {
  await inicializarDatos();
});

// También al cargar el script (cubre el caso de "Recargar" en chrome://extensions)
inicializarDatos();

// ── Tick cada minuto: activa partidos próximos y calcula minuto REAL ──
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== 'tick') return;

  const { partidos } = await chrome.storage.local.get('partidos');
  const actualizados = partidos.map(p => {
    // Activar partido cuando llega su hora de inicio
    if (p.estado === 'PROXIMO' && p.horaMs && Date.now() >= p.horaMs) {
      return {
        ...p,
        estado: 'EN_VIVO',
        minuto: 1,
        local:  { ...p.local,  goles: 0, intentos: 0, posesion: 50 },
        visita: { ...p.visita, goles: 0, intentos: 0, posesion: 50 }
      };
    }
    // Minuto calculado por tiempo REAL transcurrido, no por contador acumulado
    // (así no se desincroniza si Chrome estuvo cerrado/dormido un rato)
    if (p.estado === 'EN_VIVO' && p.horaMs) {
      const minutosTranscurridos = Math.floor((Date.now() - p.horaMs) / 60000) + 1;
      const minutoReal = Math.min(Math.max(minutosTranscurridos, 1), 90);
      if (minutoReal >= 90) {
        return { ...p, minuto: 90, estado: 'FINALIZADO' };
      }
      return { ...p, minuto: minutoReal };
    }
    return p;
  });

  await chrome.storage.local.set({ partidos: actualizados, ultimaActualizacion: Date.now() });

  const tabs = await chrome.tabs.query({});
  tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, { tipo: 'TICK', partidos: actualizados }).catch(() => {});
  });
});

// ── Mensajes ──────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  handle(msg, sendResponse);
  return true;
});

async function handle(msg, sendResponse) {
  switch (msg.tipo) {
    case 'GET_STATE': {
      const data = await chrome.storage.local.get(['partidos','grupos','partidoActivo','overlayVisible','ultimaActualizacion']);
      sendResponse(data);
      break;
    }
    case 'SET_ACTIVO': {
      await chrome.storage.local.set({ partidoActivo: msg.idx });
      sendResponse({ ok: true });
      break;
    }
    case 'TOGGLE_OVERLAY': {
      const { overlayVisible } = await chrome.storage.local.get('overlayVisible');
      await chrome.storage.local.set({ overlayVisible: !overlayVisible });
      sendResponse({ overlayVisible: !overlayVisible });
      break;
    }
    default: sendResponse({ error: 'desconocido' });
  }
}

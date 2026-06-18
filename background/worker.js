// ============================================================
// MUNDIAL 2026 — Background Worker
// Datos REALES actualizados — 17 junio 2026
// ============================================================

// Partidos del Mundial 2026 — Jornada 1, Grupos K y L (17 junio)
const PARTIDOS = [
  {
    id: 'w000a',
    fecha: '2026-06-11',
    local:  { nombre: 'Mexico', goles: 2, intentos: 8, posesion: 54 },
    visita: { nombre: 'South Africa', goles: 0, intentos: 4, posesion: 46 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'A',
    sede: 'Estadio Azteca',
    ciudad: 'Ciudad de México',
    hora: null,
    horaJugado: '11 jun',
    iaLocal: 70,
    iaEmpate: 18,
    iaVisita: 12,
    iaTip: 'México abrió el Mundial con autoridad ante su gente en el Azteca, con goles de Quiñones y Raúl Jiménez.',
    datoRaro: '⚽ Julián Quiñones anotó el primer gol de este Mundial 2026, al minuto 9'
  },
  {
    id: 'w000b',
    fecha: '2026-06-11',
    local:  { nombre: 'Korea Republic', goles: 2, intentos: 15, posesion: 55 },
    visita: { nombre: 'Czechia', goles: 1, intentos: 7, posesion: 34 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'A',
    sede: 'Estadio Guadalajara',
    ciudad: 'Guadalajara',
    hora: null,
    horaJugado: '11 jun',
    iaLocal: 52,
    iaEmpate: 28,
    iaVisita: 20,
    iaTip: 'Corea remontó un gol de Krejci con un doblete de Hwang In-beom (incluida una asistencia) en el segundo tiempo.',
    datoRaro: '🔄 Corea del Sur venía abajo 0-1 y dio vuelta el partido en menos de 15 minutos'
  },
  {
    id: 'w000c',
    fecha: '2026-06-16',
    local:  { nombre: 'Francia', goles: 3, intentos: 14, posesion: 58 },
    visita: { nombre: 'Senegal', goles: 1, intentos: 9, posesion: 42 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'I',
    sede: 'MetLife Stadium',
    ciudad: 'Nueva Jersey',
    hora: null,
    horaJugado: '16 jun',
    iaLocal: 73,
    iaEmpate: 15,
    iaVisita: 12,
    iaTip: 'Doblete de Mbappé (superó a Just Fontaine como goleador histórico de Francia en Mundiales) y gol de Barcola.',
    datoRaro: '⭐ Kylian Mbappé llegó a 14 goles en Mundiales con este doblete, superando a Just Fontaine'
  },
  {
    id: 'w000d',
    fecha: '2026-06-16',
    local:  { nombre: 'Irak', goles: 1, intentos: 10, posesion: 41 },
    visita: { nombre: 'Noruega', goles: 4, intentos: 10, posesion: 59 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'I',
    sede: 'Estadio Boston',
    ciudad: 'Foxborough',
    hora: null,
    horaJugado: '16 jun',
    iaLocal: 14,
    iaEmpate: 18,
    iaVisita: 68,
    iaTip: 'Doblete de Erling Haaland en el regreso de Noruega a un Mundial tras 28 años de ausencia.',
    datoRaro: '👑 Haaland debutó en Mundiales con un doblete; Noruega no jugaba uno desde Francia 1998'
  },
  {
    id: 'w000e',
    fecha: '2026-06-16',
    local:  { nombre: 'Argentina', goles: 3, intentos: 11, posesion: 56 },
    visita: { nombre: 'Argelia', goles: 0, intentos: 3, posesion: 44 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'J',
    sede: 'Estadio Kansas City',
    ciudad: 'Kansas City',
    hora: null,
    horaJugado: '16 jun',
    iaLocal: 75,
    iaEmpate: 15,
    iaVisita: 10,
    iaTip: 'Hat-trick de Lionel Messi, quien igualó a Miroslav Klose como máximo goleador histórico de los Mundiales con 16 goles.',
    datoRaro: '🐐 Messi hizo su primer hat-trick en un Mundial, en su partido número 200 con la Selección Argentina'
  },
  {
    id: 'w001',
    fecha: '2026-06-17',
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
    fecha: '2026-06-17',
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
    fecha: '2026-06-17',
    local:  { nombre: 'Ghana', goles: 1, intentos: 9, posesion: 55 },
    visita: { nombre: 'Panamá', goles: 0, intentos: 6, posesion: 45 },
    minuto: 90,
    estado: 'FINALIZADO',
    grupo: 'L',
    sede: 'Estadio Toronto',
    ciudad: 'Toronto',
    hora: null,
    horaJugado: '18:00',
    horaMs: new Date('2026-06-17T18:00:00-05:00').getTime(),
    iaLocal: 54,
    iaEmpate: 26,
    iaVisita: 20,
    iaTip: 'Partido cerrado y disputado. Ghana sufrió pero encontró el premio en el descuento para llevarse los tres puntos.',
    datoRaro: '⚽ Caleb Yirenkyi anotó el gol del triunfo de Ghana en el minuto 90+5, tras una asistencia de Thomas-Asante'
  },
  {
    id: 'w004',
    fecha: '2026-06-17',
    local:  { nombre: 'Colombia', goles: 2, intentos: 9, posesion: 58 },
    visita: { nombre: 'Uzbekistán', goles: 1, intentos: 3, posesion: 42 },
    minuto: 1,
    estado: 'EN_VIVO',
    grupo: 'K',
    sede: 'Estadio Ciudad de México',
    ciudad: 'Ciudad de México',
    hora: '21:00',
    horaMs: new Date('2026-06-17T21:00:00-05:00').getTime(),
    iaLocal: 68,
    iaEmpate: 21,
    iaVisita: 11,
    iaTip: 'Colombia se puso arriba con gol de Daniel Muñoz, Uzbekistán empató con Fayzullaev, y Luis Díaz devolvió la ventaja cafetera con una gran definición.',
    datoRaro: '⚽ Daniel Muñoz (min 40), Fayzullaev (min 59) y Luis Díaz (min 65) anotaron en un partido vibrante en el Azteca'
  }
];

// ════════════════════════════════════════════════════════════
// ÚNICA COSA QUE HAY QUE EDITAR PARA ACTUALIZAR EL MUNDIAL:
// el array PARTIDOS de arriba (resultados, estado, minuto, etc).
// La tabla de posiciones (GRUPOS) se calcula sola a partir de eso.
// ════════════════════════════════════════════════════════════

// Lista de qué equipos integran cada grupo — esto SÍ es fijo durante
// todo el torneo (no cambia partido a partido), por eso vive aparte.
// Los 12 grupos completos del Mundial 2026 — esto permite que la pestaña
// GRUPOS muestre la tabla de TODO el torneo, aunque PARTIDOS (de donde
// se arma Partido/Fixture) solo tenga cargados los encuentros del día.
// ════════════════════════════════════════════════════════════
// Fecha "de hoy" para Partido y Fixture — SOLO estos partidos se
// muestran ahí. Cambiar este valor cada día que actualices datos.
// Los partidos de otras fechas (jornadas anteriores) siguen
// existiendo en PARTIDOS para que GRUPOS los siga sumando, pero
// no aparecen en Partido/Fixture.
// ════════════════════════════════════════════════════════════
const FECHA_HOY = '2026-06-17';

function partidosDeHoy(partidos) {
  return partidos.filter(p => p.fecha === FECHA_HOY);
}

const EQUIPOS_POR_GRUPO = {
  'A': ['Mexico', 'Korea Republic', 'Czechia', 'South Africa'],
  'B': ['Canadá', 'Bosnia y Herzegovina', 'Qatar', 'Suiza'],
  'C': ['Brasil', 'Marruecos', 'Haití', 'Escocia'],
  'D': ['Estados Unidos', 'Paraguay', 'Australia', 'Turquía'],
  'E': ['Alemania', 'Curazao', 'Costa de Marfil', 'Ecuador'],
  'F': ['Países Bajos', 'Japón', 'Suecia', 'Túnez'],
  'G': ['Bélgica', 'Egipto', 'Irán', 'Nueva Zelanda'],
  'H': ['España', 'Cabo Verde', 'Arabia Saudita', 'Uruguay'],
  'I': ['Francia', 'Noruega', 'Senegal', 'Irak'],
  'J': ['Argentina', 'Argelia', 'Austria', 'Jordania'],
  'K': ['Portugal', 'Congo DR', 'Colombia', 'Uzbekistán'],
  'L': ['Inglaterra', 'Ghana', 'Croacia', 'Panamá']
};

// ════════════════════════════════════════════════════════════
// FUENTE AUTOMÁTICA DE FIXTURE — openfootball/worldcup.json
// (dominio público, sin API key, CC0). Provee SOLO el calendario
// (equipos, fecha, hora, sede, grupo) — NO trae goles ni estado
// en vivo, así que eso sigue viviendo en PARTIDOS (manual).
// ════════════════════════════════════════════════════════════
const OPENFOOTBALL_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

// El dataset usa nombres en inglés (y a veces placeholders de
// repechaje) — los traducimos a los nombres que ya usa el resto
// del sistema (BANDERAS, EQUIPOS_POR_GRUPO, etc en overlay.js)
const TRADUCCION_EQUIPOS = {
  'Mexico': 'Mexico',
  'South Africa': 'South Africa',
  'South Korea': 'Korea Republic',
  'Czechia': 'Czechia',
  'Canada': 'Canadá',
  'Qatar': 'Qatar',
  'Switzerland': 'Suiza',
  'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
  'Brazil': 'Brasil',
  'Morocco': 'Marruecos',
  'Haiti': 'Haití',
  'Scotland': 'Escocia',
  'USA': 'Estados Unidos',
  'Paraguay': 'Paraguay',
  'Australia': 'Australia',
  'Turkey': 'Turquía',
  'Germany': 'Alemania',
  'Curaçao': 'Curazao',
  'Ivory Coast': 'Costa de Marfil',
  'Ecuador': 'Ecuador',
  'Netherlands': 'Países Bajos',
  'Japan': 'Japón',
  'Sweden': 'Suecia',
  'Tunisia': 'Túnez',
  'Belgium': 'Bélgica',
  'Egypt': 'Egipto',
  'Iran': 'Irán',
  'New Zealand': 'Nueva Zelanda',
  'Spain': 'España',
  'Cape Verde': 'Cabo Verde',
  'Saudi Arabia': 'Arabia Saudita',
  'Uruguay': 'Uruguay',
  'France': 'Francia',
  'Norway': 'Noruega',
  'Senegal': 'Senegal',
  'Iraq': 'Irak',
  'Argentina': 'Argentina',
  'Algeria': 'Argelia',
  'Austria': 'Austria',
  'Jordan': 'Jordania',
  'Portugal': 'Portugal',
  'Uzbekistan': 'Uzbekistán',
  'Colombia': 'Colombia',
  'England': 'Inglaterra',
  'Croatia': 'Croacia',
  'Ghana': 'Ghana',
  'Panama': 'Panamá',

  // ── Placeholders del repechaje YA resueltos en la realidad, pero
  // que el dataset público todavía no actualizó con el nombre final.
  // Esto hay que revisarlo cada tanto: si OpenFootball actualiza su
  // fuente, estas líneas dejan de ser necesarias pero no rompen nada.
  'DR Congo': 'Congo DR'
  // Nombres tipo "UEFA Path D winner", "IC Path 1 winner", "3A/B/C/..."
  // son placeholders de equipos aún no definidos (repechaje/cruces de
  // eliminación directa) — se filtran y se ignoran, no se traducen.
};

function traducirEquipo(nombreEn) {
  return TRADUCCION_EQUIPOS[nombreEn] || null; // null = placeholder, se descarta
}

// Convierte "Group A" -> "A", también soporta groups ya en formato corto
function codigoGrupo(grupoTexto) {
  if (!grupoTexto) return null;
  const m = grupoTexto.match(/Group\s+([A-L])/i);
  return m ? m[1] : null;
}

// Descarga el fixture público y lo normaliza a la fecha de hoy
async function fetchFixtureOpenFootball() {
  const resp = await fetch(OPENFOOTBALL_URL);
  if (!resp.ok) throw new Error('OpenFootball respondió ' + resp.status);
  const data = await resp.json();

  return data.matches
    .filter(m => m.date === FECHA_HOY)              // solo partidos de hoy
    .map(m => {
      const local = traducirEquipo(m.team1);
      const visita = traducirEquipo(m.team2);
      const grupo = codigoGrupo(m.group);
      if (!local || !visita || !grupo) return null;  // placeholder sin definir aún, se ignora

      return {
        local, visita, grupo,
        fecha: m.date,
        sede: m.ground,
        // el dataset trae hora local con offset (ej "20:00 UTC-6") —
        // guardamos el texto crudo, el horaMs definitivo lo pone el
        // partido manual si existe (para no romper el countdown)
        horaTexto: m.time,
        // si el partido ya se jugó, la API trae el marcador final
        // real (m.score.ft = [golesLocal, golesVisita])
        score: m.score && m.score.ft ? m.score.ft : null
      };
    })
    .filter(Boolean);
}

// Combina el fixture automático con los datos manuales (goles, estado,
// IA) que ya existan en PARTIDOS. Si un partido de hoy NO está en
// PARTIDOS todavía, se crea uno "placeholder" en estado PROXIMO con
// los datos básicos del fixture, listo para que luego le agregues
// manualmente el resultado cuando termine.
function mezclarFixtureConDatosManuales(fixtureHoy, partidosManuales) {
  const manualesDeHoy = partidosManuales.filter(p => p.fecha === FECHA_HOY);

  return fixtureHoy.map((f, i) => {
    const existente = manualesDeHoy.find(p =>
      (p.local.nombre === f.local && p.visita.nombre === f.visita) ||
      (p.local.nombre === f.visita && p.visita.nombre === f.local) // el dataset puede traer el orden invertido
    );

    if (existente) {
      // Si el partido manual aún no tiene marcador final pero la API
      // SÍ ya lo tiene (el partido terminó), lo autocompletamos —
      // pero conservamos tu IA/tip/dato curioso escritos a mano.
      const yaEstaFinalizado = existente.estado === 'FINALIZADO';
      if (!yaEstaFinalizado && f.score) {
        const mismoOrden = existente.local.nombre === f.local;
        const [g1, g2] = f.score;
        const golesLocal  = mismoOrden ? g1 : g2;
        const golesVisita = mismoOrden ? g2 : g1;
        return {
          ...existente,
          estado: 'FINALIZADO',
          minuto: 90,
          local:  { ...existente.local,  goles: golesLocal },
          visita: { ...existente.visita, goles: golesVisita }
        };
      }
      return existente; // ya tiene goles/estado/IA a mano — se respeta tal cual
    }

    // Partido nuevo que el fixture trae pero que aún no agregaste a mano.
    // Si la API ya tiene su marcador final, lo usamos directo.
    const golesLocal  = f.score ? f.score[0] : null;
    const golesVisita = f.score ? f.score[1] : null;
    const estado = f.score ? 'FINALIZADO' : 'PROXIMO';

    return {
      id: 'auto-' + f.grupo + '-' + i,
      fecha: f.fecha,
      local:  { nombre: f.local,  goles: golesLocal,  intentos: 0, posesion: 0 },
      visita: { nombre: f.visita, goles: golesVisita, intentos: 0, posesion: 0 },
      minuto: f.score ? 90 : 0,
      estado: estado,
      grupo: f.grupo,
      sede: f.sede,
      ciudad: f.sede,
      hora: f.horaTexto,
      horaMs: null, // sin horaMs hasta que se complete a mano (afecta solo el countdown exacto)
      iaLocal: 50, iaEmpate: 25, iaVisita: 25,
      iaTip: estado === 'FINALIZADO' ? 'Resultado obtenido automáticamente — análisis de IA pendiente.' : 'Partido programado — aún sin análisis de IA cargado.',
      datoRaro: ''
    };
  });
}

// Calcula la tabla de posiciones de todos los grupos a partir de los
// resultados en PARTIDOS. Solo cuenta partidos FINALIZADOS.
function calcularGrupos(partidos) {
  const grupos = {};

  for (const codigo in EQUIPOS_POR_GRUPO) {
    const tabla = {};
    EQUIPOS_POR_GRUPO[codigo].forEach(nombre => {
      tabla[nombre] = { nombre, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0 };
    });
    grupos[codigo] = { nombre: 'Grupo ' + codigo, equipos: tabla };
  }

  partidos.forEach(p => {
    if (p.estado !== 'FINALIZADO') return; // solo partidos ya jugados cuentan
    const g = grupos[p.grupo];
    if (!g) return;

    const local = g.equipos[p.local.nombre];
    const visita = g.equipos[p.visita.nombre];
    if (!local || !visita) return; // equipo no registrado en EQUIPOS_POR_GRUPO

    local.pj++;  visita.pj++;
    local.gf += p.local.goles;   local.gc += p.visita.goles;
    visita.gf += p.visita.goles; visita.gc += p.local.goles;

    if (p.local.goles > p.visita.goles)      { local.g++;  visita.p++; }
    else if (p.local.goles < p.visita.goles) { visita.g++; local.p++;  }
    else                                      { local.e++;  visita.e++; }
  });

  // Convertir de objeto a array (lo que espera el resto del código)
  for (const codigo in grupos) {
    grupos[codigo].equipos = Object.values(grupos[codigo].equipos);
  }
  return grupos;
}

// Versión del dataset — cuando cambia, fuerza limpieza total del storage viejo
const DATA_VERSION = 'v13-dr-congo-y-scores-api';

// ── Init: se ejecuta SIEMPRE que el service worker arranca ───
async function inicializarDatos() {
  const { dataVersion } = await chrome.storage.local.get('dataVersion');
  const gruposCalculados = calcularGrupos(PARTIDOS);     // TODO el torneo (siempre manual)

  // El fixture de HOY intenta venir de la fuente pública; si falla
  // por cualquier motivo (sin internet, GitHub caído, formato
  // cambiado), cae de vuelta a los partidos manuales — el plugin
  // nunca debe romperse por culpa de la fuente externa.
  let partidosHoy;
  try {
    const fixtureHoy = await fetchFixtureOpenFootball();
    partidosHoy = mezclarFixtureConDatosManuales(fixtureHoy, PARTIDOS);
    console.log('[Mundial2026] Fixture de hoy obtenido de OpenFootball:', partidosHoy.length, 'partidos');
  } catch (err) {
    console.warn('[Mundial2026] No se pudo obtener fixture automático, usando solo datos manuales:', err.message);
    partidosHoy = partidosDeHoy(PARTIDOS);
  }

  if (dataVersion !== DATA_VERSION) {
    // Datos viejos detectados — limpiar todo y reescribir desde cero
    await chrome.storage.local.clear();
    await chrome.storage.local.set({
      partidos: partidosHoy,
      grupos: gruposCalculados,
      partidoActivo: 0,
      overlayVisible: true,
      dataVersion: DATA_VERSION
    });
  } else {
    // Misma versión — solo refrescar contenido (por si cambié textos/IA)
    await chrome.storage.local.set({ partidos: partidosHoy, grupos: gruposCalculados });
  }

  // Recalcular minutos reales inmediatamente (sin esperar el próximo tick de 60s)
  await recalcularMinutos();
}

// Recalcula el minuto de cada partido EN_VIVO según el tiempo real transcurrido
async function recalcularMinutos() {
  const { partidos } = await chrome.storage.local.get('partidos'); // solo los de hoy
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

  // Para Grupos, sumamos los partidos de hoy YA actualizados + los de
  // otras fechas (que no cambian) — así nunca se "olvidan" jornadas pasadas
  const partidosDeOtrosDias = PARTIDOS.filter(p => p.fecha !== FECHA_HOY);
  const todosParaGrupos = partidosDeOtrosDias.concat(actualizados);

  await chrome.storage.local.set({ partidos: actualizados, grupos: calcularGrupos(todosParaGrupos) });
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

  // La tabla de grupos se recalcula sola — nunca hay que tocarla a mano.
  // Combina los de hoy (ya actualizados) con los de otras fechas (sin tocar)
  const partidosDeOtrosDias = PARTIDOS.filter(p => p.fecha !== FECHA_HOY);
  const gruposActualizados = calcularGrupos(partidosDeOtrosDias.concat(actualizados));

  await chrome.storage.local.set({ partidos: actualizados, grupos: gruposActualizados, ultimaActualizacion: Date.now() });

  const tabs = await chrome.tabs.query({});
  tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, { tipo: 'TICK', partidos: actualizados, grupos: gruposActualizados }).catch(() => {});
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

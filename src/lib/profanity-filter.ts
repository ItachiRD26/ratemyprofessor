// profanity-filter.ts
// Filtro de palabras inapropiadas — español general + vocabulario dominicano

const bannedWords: string[] = [
  // ─── Dominicano específico ───
  "mmg",
  "rptm",
  "rptn",
  "mamaguevo",
  "mamaguevaso",
  "mamasemilla",
  "mamabicho",
  "comebicho",
  "comemierda",
  "comemierdas",
  "singao",
  "singá",
  "singar",
  "singue",
  "singa",
  "singando",
  "singador",
  "malparío",
  "malparido",
  "malparida",
  "azaroso",
  "azarosa",
  "prieto sucio",
  "tigueron",
  "tiguerón",
  "cabroncito",
  "carajillo",
  "diablo cojuelo",
  "fundillo",
  "funde",
  "prieto",
  "niche",
  "haitian",
  "haitiano sucio",
  "negro sucio",
  "bejuco",
  "bicho",
  "come candela",
  "coñazo",
  "coño",
  "verga",
  "vergón",
  "vergona",
  "crica",
  "criquita",
  "tubazo",
  "chivo",
  "chivato",
  "cuero",
  "cueros",
  "culerón",
  "culero",
  "ñame",

  // ─── Español general ───
  "puto",
  "puta",
  "putas",
  "putos",
  "putísima",
  "putísimo",
  "prostituta",
  "perra",
  "perro",
  "mierda",
  "mierdas",
  "mierdero",
  "mierdoso",
  "cabrón",
  "cabron",
  "cabrona",
  "hijo de puta",
  "hijoputa",
  "hdp",
  "hija de puta",
  "ojete",
  "pendejo",
  "pendeja",
  "pendejos",
  "pendejada",
  "idiota",
  "imbécil",
  "imbecil",
  "estúpido",
  "estupido",
  "estúpida",
  "gilipollas",
  "gilipolla",
  "coño",
  "concha",
  "conchuda",
  "conchudo",
  "maricón",
  "maricon",
  "maricona",
  "marica",
  "mariconazo",
  "sodomita",
  "culiao",
  "culiado",
  "culiao",
  "culear",
  "culo",
  "culos",
  "culona",
  "culón",
  "pene",
  "penes",
  "pija",
  "pijas",
  "polla",
  "pollas",
  "picha",
  "pirula",
  "cipote",
  "falo",
  "vagina",
  "vaginas",
  "vulva",
  "chocha",
  "chochas",
  "pepino",
  "tetas",
  "teta",
  "tetona",
  "tetonas",
  "pezon",
  "pezón",
  "culo",
  "nalgas",
  "pompas",
  "trasero guarro",
  "zorras",
  "zorra",
  "zorron",
  "zorrón",
  "ramera",
  "furcia",
  "meretriz",
  "mamada",
  "mamadas",
  "mamar",
  "chupar",
  "follar",
  "joder",
  "joderme",
  "jodete",
  "jodate",
  "que te jodan",
  "me la suda",
  "coger",
  "cogerse",
  "tirar",
  "tirarse",
  "pajero",
  "pajera",
  "pajeros",
  "paja",
  "pajas",
  "hacerse una paja",
  "hacerse pajas",
  "mogollón",
  "subnormal",
  "mongolo",
  "mongola",
  "retrasado",
  "retrasada",
  "retrasados",
  "inútil",
  "inutiles",
  "inutil",
  "maldito",
  "maldita",
  "malditos",
  "malditas",
  "bastardo",
  "bastarda",
  "bastardos",
  "bastardas",
  "animal",
  "bestia",
  "monstruo",
  "asqueroso",
  "asquerosa",
  "asquerosos",
  "repugnante",
  "asco",

  // ─── Insultos raciales / discriminatorios ───
  "negro de mierda",
  "blanco de mierda",
  "sudaca",
  "sudacas",
  "indio de mierda",
  "moro",
  "morazo",
  "judío de mierda",
  "nazi",
  "fascista",

  // ─── Variaciones con números / leet speak ───
  // (estas se capturan también por el normalizador de abajo,
  //  pero las incluimos explícitamente por seguridad)
  "p1cha",
  "p0lla",
  "c0ño",
  "put4",
  "m13rda",
  "c4bron",
  "h1joputa",
  "c0mer",
  "v3rga",
]

// Eliminar duplicados
const uniqueBannedWords = [...new Set(bannedWords)]

/**
 * Normaliza el texto para detectar leet speak y sustituciones comunes:
 * 0→o, 1→i/l, 3→e, 4→a, 5→s, $→s, @→a, etc.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/0/g,  "o")
    .replace(/1/g,  "i")
    .replace(/3/g,  "e")
    .replace(/4/g,  "a")
    .replace(/5/g,  "s")
    .replace(/7/g,  "t")
    .replace(/8/g,  "b")
    .replace(/\$/g, "s")
    .replace(/@/g,  "a")
    .replace(/\+/g, "t")
    .replace(/!/g,  "i")
    // Eliminar espacios entre letras (p u t a → puta)
    .replace(/\s+/g, " ")
    // Eliminar caracteres repetidos excesivos (puuuuta → puta)
    .replace(/(.)\1{2,}/g, "$1$1")
}

/**
 * Detecta si el texto contiene alguna palabra prohibida.
 * Revisa el texto original y su versión normalizada.
 */
export function containsProfanity(text: string): boolean {
  const lower      = text.toLowerCase()
  const normalized = normalizeText(text)

  for (const word of uniqueBannedWords) {
    if (lower.includes(word) || normalized.includes(word)) {
      return true
    }
  }
  return false
}

/**
 * Censura las palabras prohibidas con asteriscos.
 * Útil para mostrar contenido existente que pasó el filtro.
 */
export function censorText(text: string): string {
  let result = text
  for (const word of uniqueBannedWords) {
    const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
    result = result.replace(regex, "*".repeat(word.length))
  }
  return result
}

/**
 * Devuelve las palabras prohibidas encontradas en el texto.
 * Útil para logging/moderación.
 */
export function getFoundProfanity(text: string): string[] {
  const lower      = text.toLowerCase()
  const normalized = normalizeText(text)
  return uniqueBannedWords.filter(w => lower.includes(w) || normalized.includes(w))
}
// Lista de provincias de República Dominicana
export const provinces = [
    { id: "santo-domingo", name: "Santo Domingo" },
    { id: "santiago", name: "Santiago" },
    { id: "la-vega", name: "La Vega" },
    { id: "san-pedro-de-macoris", name: "San Pedro de Macorís" },
    { id: "bonao", name: "Bonao" },
    { id: "san-francisco-de-macoris", name: "San Francisco de Macorís" },
    { id: "azua", name: "Azua" },
    {id: "nagua", name: "Nagua" },
    { id: "otras", name: "Otras provincias" },
  ]
  
  // Lista de universidades de República Dominicana
  export const universities = [
    {
      id: "uasd",
      name: "Universidad Autónoma de Santo Domingo (UASD)",
      type: "public",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://uasd.edu.do",
    },
    {
      id: "uapa",
      name: "Universidad Abierta para Adultos (UAPA)",
      type: "public",
      locations: ["santiago", "santo-domingo", "nagua"],
      mainLocation: "Santo Domingo",
      website: "https://www.uapa.edu.do/",
    },
    {
      id: "intec",
      name: "Instituto Tecnológico de Santo Domingo (INTEC)",
      type: "public",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.intec.edu.do",
    },
    {
      id: "pucmm",
      name: "Pontificia Universidad Católica Madre y Maestra (PUCMM)",
      type: "private",
      locations: ["santiago", "santo-domingo"],
      mainLocation: "Santiago",
      website: "https://www.pucmm.edu.do",
    },
    {
      id: "unibe",
      name: "Universidad Iberoamericana (UNIBE)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.unibe.edu.do",
    },
    {
      id: "unapec",
      name: "Universidad APEC (UNAPEC)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://unapec.edu.do",
    },
    {
      id: "unicaribe",
      name: "Universidad del Caribe (UNICARIBE)",
      type: "private",
      locations: ["santo-domingo", "otras"],
      mainLocation: "Santo Domingo",
      website: "https://www.unicaribe.edu.do",
    },
    {
      id: "utesa",
      name: "Universidad Tecnológica de Santiago (UTESA)",
      type: "private",
      locations: ["santiago", "santo-domingo", "otras"],
      mainLocation: "Santiago",
      website: "https://www.utesa.edu",
    },
    {
      id: "unphu",
      name: "Universidad Nacional Pedro Henríquez Ureña (UNPHU)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://unphu.edu.do",
    },
    {
      id: "om",
      name: "Universidad Dominicana O&M",
      type: "private",
      locations: ["santo-domingo", "otras"],
      mainLocation: "Santo Domingo",
      website: "https://www.udoym.edu.do",
    },
    {
      id: "ucateci",
      name: "Universidad Católica Tecnológica del Cibao (UCATECI)",
      type: "private",
      locations: ["la-vega"],
      mainLocation: "La Vega",
      website: "https://www.ucateci.edu.do",
    },
    {
      id: "uce",
      name: "Universidad Central del Este (UCE)",
      type: "private",
      locations: ["san-pedro-de-macoris", "otras"],
      mainLocation: "San Pedro de Macorís",
      website: "https://www.uce.edu.do",
    },
    {
      id: "itla",
      name: "Instituto Tecnológico de las Américas (ITLA)",
      type: "public",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://itla.edu.do",
    },    
    {
      id: "ufhec",
      name: "Universidad Federico Henríquez y Carvajal (UFHEC)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.ufhec.edu.do",
    },
    {
      id: "uod",
      name: "Universidad Odontológica Dominicana (UOD)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.uod.edu.do",
    },
    {
      id: "unad",
      name: "Universidad Adventista Dominicana (UNAD)",
      type: "private",
      locations: ["bonao"],
      mainLocation: "Bonao",
      website: "https://www.unad.edu.do",
    },
    {
      id: "ucne",
      name: "Universidad Católica Nordestana (UCNE)",
      type: "private",
      locations: ["san-francisco-de-macoris"],
      mainLocation: "San Francisco de Macorís",
      website: "https://www.ucne.edu",
    },
    {
      id: "isa",
      name: "Universidad ISA",
      type: "private",
      locations: ["santiago"],
      mainLocation: "Santiago",
      website: "https://www.isa.edu.do",
    },
    {
      id: "unicda",
      name: "Universidad Dominico-Americana (UNICDA)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.unicda.edu.do",
    },
    {
      id: "upid",
      name: "Universidad Psicología Industrial Dominicana (UPID)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.upid.edu.do",
    },
    {
      id: "uniremhos",
      name: "Universidad Eugenio María de Hostos (UNIREMHOS)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.uniremhos.edu.do",
    },
    {
      id: "utesur",
      name: "Universidad Tecnológica del Sur (UTESUR)",
      type: "private",
      locations: ["azua"],
      mainLocation: "Azua",
      website: "https://www.utesur.edu.do",
    },
    {
      id: "univic",
      name: "Universidad Leonardo Da Vinci (UNIVIC)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.univic.edu.do",
    },
    {
      id: "ute",
      name: "Universidad de la Tercera Edad (UTE)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.ute.edu.do",
    },
    {
      id: "unefa",
      name: "Universidad Experimental Félix Adam (UNEFA)",
      type: "private",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.unefa.edu.do",
    },
    {
      id: "isfodosu",
      name: "Instituto Superior de Formación Docente Salomé Ureña (ISFODOSU)",
      type: "specialized",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.isfodosu.edu.do",
    },
    {
      id: "itsc",
      name: "Instituto Tecnológico Superior Comunitario (ITSC)",
      type: "specialized",
      locations: ["santo-domingo"],
      mainLocation: "Santo Domingo",
      website: "https://www.itsc.edu.do",
    },
  ]
  
  // Función para verificar si una universidad tiene múltiples ubicaciones
  export function hasMultipleLocations(universityId: string): boolean {
    const university = universities.find((uni) => uni.id === universityId)
    return university ? university.locations.length > 1 : false
  }
  
  // Función para obtener las ubicaciones de una universidad
  export function getUniversityLocations(universityId: string): { id: string; name: string }[] {
    const university = universities.find((uni) => uni.id === universityId)
    if (!university) return []
  
    return university.locations.map((locationId) => {
      const province = provinces.find((p) => p.id === locationId)
      return {
        id: locationId,
        name: province ? province.name : locationId,
      }
    })
  }
  
  
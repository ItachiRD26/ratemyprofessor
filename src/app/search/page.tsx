"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Search, ChevronRight, Plus, Star, Filter,
  School, BookOpen, User, X, ArrowUpDown, Users,
} from "lucide-react"
import { universities, hasMultipleLocations, getUniversityLocations } from "@/lib/university-data"
import { fetchProfessors, fetchCareers, fetchSubjects, fetchReviewsByProfessorId } from "@/lib/database"
import AdBanner from "@/components/ad-banner"

const ADS = {
  KEY_728x90:  "28848673",
  KEY_300x250: "26470285",
}

const AD_INTERVAL = 4

interface Career { id: string; name: string; universityId: string }
interface Subject { id: string; name: string; careerId: string }
interface Professor {
  id: string; name: string; universityId: string
  provinceId?: string; subjects: string[]
  totalReviews: number; averageRating: number
}
interface Review { id: string; rating: number }
interface UniversityLocation { id: string; name: string }
type SortOption = "rating_desc" | "rating_asc" | "reviews_desc" | "name_asc"

function getRatingColor(r: number) {
  if (r >= 4) return "text-emerald-600"
  if (r >= 3) return "text-amber-500"
  return "text-red-500"
}
function getRatingBar(r: number) {
  if (r >= 4) return "bg-emerald-400"
  if (r >= 3) return "bg-amber-400"
  return "bg-red-400"
}

export default function SearchPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const [allProfessors, setAllProfessors] = useState<Professor[]>([])
  const [careers,  setCareers]  = useState<Career[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])

  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [selectedProvince,   setSelectedProvince]   = useState("")
  const [selectedCareer,     setSelectedCareer]     = useState("")
  const [selectedSubject,    setSelectedSubject]    = useState("")
  const [searchQuery,        setSearchQuery]        = useState("")
  const [sortOption,         setSortOption]         = useState<SortOption>("rating_desc")
  const [showFilters,        setShowFilters]        = useState(true)

  const [isLoadingProfessors, setIsLoadingProfessors] = useState(false)
  const [isLoadingCareers,    setIsLoadingCareers]    = useState(false)
  const [isLoadingSubjects,   setIsLoadingSubjects]   = useState(false)
  const [showProvinceFilter,  setShowProvinceFilter]  = useState(false)
  const [universityLocations, setUniversityLocations] = useState<UniversityLocation[]>([])

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Leer URL params al montar (solo una vez)
  useEffect(() => {
    const u    = searchParams.get("university")
    const prov = searchParams.get("province")
    const c    = searchParams.get("career")
    const s    = searchParams.get("subject")
    const q    = searchParams.get("q")
    if (u)    setSelectedUniversity(u)
    if (prov) setSelectedProvince(prov)
    if (c)    setSelectedCareer(c)
    if (s)    setSelectedSubject(s)
    if (q)    { setSearchQuery(q); setDebouncedQuery(q) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Debounce campo nombre
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedQuery(searchQuery), 350)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [searchQuery])

  // Carreras al cambiar universidad
  useEffect(() => {
    setSelectedCareer(""); setSelectedSubject(""); setSubjects([]); setCareers([])
    if (!selectedUniversity) {
      setShowProvinceFilter(false); setUniversityLocations([]); return
    }
    const hasMultiple = hasMultipleLocations(selectedUniversity)
    setShowProvinceFilter(hasMultiple)
    if (hasMultiple) {
      setUniversityLocations(getUniversityLocations(selectedUniversity))
      if (!selectedProvince) return
    } else {
      setSelectedProvince("")
    }
    const load = async () => {
      setIsLoadingCareers(true)
      const all = await fetchCareers()
      setCareers(all.filter((c: Career) => c.universityId === selectedUniversity))
      setIsLoadingCareers(false)
    }
    load()
  }, [selectedUniversity, selectedProvince])

  // Materias al cambiar carrera
  useEffect(() => {
    setSelectedSubject("")
    if (!selectedCareer) { setSubjects([]); return }
    const load = async () => {
      setIsLoadingSubjects(true)
      const all = await fetchSubjects()
      setSubjects(all.filter((s: Subject) => s.careerId === selectedCareer))
      setIsLoadingSubjects(false)
    }
    load()
  }, [selectedCareer])

  // Cargar profesores + sus reseñas (mismo enfoque que funcionaba antes)
  useEffect(() => {
    if (!selectedUniversity && !debouncedQuery) { setAllProfessors([]); return }

    const load = async () => {
      setIsLoadingProfessors(true)
      let all = await fetchProfessors()

      // Filtrar
      if (debouncedQuery)     all = all.filter(p => p.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
      if (selectedUniversity) all = all.filter(p => p.universityId === selectedUniversity)
      if (selectedProvince)   all = all.filter(p => p.provinceId === selectedProvince)
      if (selectedSubject)    all = all.filter(p => p.subjects.includes(selectedSubject))

      // Enriquecer con reseñas reales — igual que el código original que funcionaba
      const enriched = await Promise.all(
        all.map(async (prof: Professor) => {
          const reviews = await fetchReviewsByProfessorId(prof.id)
          const total   = reviews.length
          const average = total
            ? reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) / total
            : 0
          return { ...prof, totalReviews: total, averageRating: average }
        })
      )

      setAllProfessors(enriched)
      setIsLoadingProfessors(false)
    }
    load()
  }, [selectedUniversity, selectedProvince, selectedSubject, debouncedQuery])

  // Ordenar en cliente
  const sortedProfessors = [...allProfessors].sort((a, b) => {
    switch (sortOption) {
      case "rating_desc":  return (b.averageRating || 0) - (a.averageRating || 0)
      case "rating_asc":   return (a.averageRating || 0) - (b.averageRating || 0)
      case "reviews_desc": return (b.totalReviews  || 0) - (a.totalReviews  || 0)
      case "name_asc":     return a.name.localeCompare(b.name)
    }
  })

  const clearFilters = useCallback(() => {
    setSelectedUniversity(""); setSelectedProvince(""); setSelectedCareer("")
    setSelectedSubject(""); setSearchQuery(""); setDebouncedQuery("")
    setAllProfessors([])
    router.push("/search")
  }, [router])

  const hasActiveFilters = !!(selectedUniversity || selectedCareer ||
    selectedSubject || searchQuery || selectedProvince)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedUniversity) params.set("university", selectedUniversity)
    if (selectedProvince)   params.set("province",   selectedProvince)
    if (selectedCareer)     params.set("career",     selectedCareer)
    if (selectedSubject)    params.set("subject",    selectedSubject)
    if (searchQuery)        params.set("q",          searchQuery)
    router.push(`/search?${params.toString()}`)
  }

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={14}
          className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  )

  // Grid con ads cada AD_INTERVAL tarjetas
  const renderResults = () => {
    const items: React.ReactNode[] = []
    sortedProfessors.forEach((prof, index) => {
      if (index > 0 && index % AD_INTERVAL === 0) {
        items.push(
          <div key={`ad-${index}`} className="col-span-full flex justify-center py-2">
            <div className="hidden md:block">
              <AdBanner adKey={ADS.KEY_728x90} width={728} height={90} />
            </div>
            <div className="md:hidden">
              <AdBanner adKey={ADS.KEY_300x250} width={300} height={250} />
            </div>
          </div>
        )
      }

      const uniName  = universities.find(u => u.id === prof.universityId)?.name || "Universidad"
      const hasRating = prof.totalReviews > 0

      items.push(
        <Link key={prof.id} href={`/professor/${prof.id}`}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-slate-100 hover:border-sky-200 group flex flex-col"
          aria-label={`Ver perfil de ${prof.name}`}
        >
          {/* Barra de color por rating */}
          <div className={`h-1 w-full ${hasRating ? getRatingBar(prof.averageRating) : "bg-slate-200"}`} />

          <div className="p-5 flex-1">
            <div className="flex items-start gap-4">
              {/* Avatar con color dinámico */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 transition-colors ${
                hasRating
                  ? prof.averageRating >= 4
                    ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                    : prof.averageRating >= 3
                    ? "bg-amber-50 text-amber-600 group-hover:bg-amber-100"
                    : "bg-red-50 text-red-500 group-hover:bg-red-100"
                  : "bg-sky-50 text-sky-600 group-hover:bg-sky-100"
              }`}>
                {prof.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                  {prof.name}
                </h3>
                <p className="text-slate-500 text-xs mb-2 truncate">{uniName}</p>

                {hasRating ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-lg font-black ${getRatingColor(prof.averageRating)}`}>
                      {prof.averageRating.toFixed(1)}
                    </span>
                    {renderStars(prof.averageRating)}
                    <span className="text-slate-400 text-xs">
                      ({prof.totalReviews} {prof.totalReviews === 1 ? "reseña" : "reseñas"})
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">Sin reseñas aún</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-5 py-2.5 flex justify-end items-center text-sky-600 group-hover:bg-sky-50 transition-colors text-sm">
            Ver perfil
            <ChevronRight size={15} className="ml-1 group-hover:ml-2 transition-all" />
          </div>
        </Link>
      )
    })
    return items
  }

  const showResults = sortedProfessors.length > 0 ||
    (isLoadingProfessors && !!(selectedUniversity || debouncedQuery))

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Buscar profesores</h1>
          <p className="text-slate-500 text-sm">
            Filtra por universidad, carrera o nombre para encontrar al profesor que buscas.
          </p>
        </div>

        {/* ── Filtros ── */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 border border-slate-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Filter size={17} className="text-sky-600" />
              Filtros
              {hasActiveFilters && (
                <span className="bg-sky-600 text-white text-xs rounded-full px-2 py-0.5 font-medium">
                  activos
                </span>
              )}
            </h2>
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button onClick={clearFilters}
                  className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors">
                  <X size={13} /> Limpiar
                </button>
              )}
              <button onClick={() => setShowFilters(!showFilters)}
                className="text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center gap-1">
                {showFilters ? "Ocultar" : "Mostrar"}
                <ChevronRight size={15} className={`transition-transform ${showFilters ? "rotate-90" : ""}`} />
              </button>
            </div>
          </div>

          {showFilters && (
            <form onSubmit={handleSearch} className="space-y-5">
              {/* Nombre — lo más usado, va primero */}
              <div>
                <label htmlFor="search" className="block text-xs font-medium text-slate-600 mb-1.5">
                  <User size={12} className="inline mr-1 text-sky-500" /> Nombre del profesor
                </label>
                <div className="relative">
                  <input id="search" type="text" value={searchQuery} autoComplete="off"
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Ej: Juan García..."
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-slate-800 shadow-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" size={16} />
                  {searchQuery && (
                    <button type="button"
                      onClick={() => { setSearchQuery(""); setDebouncedQuery("") }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Universidad */}
                <div>
                  <label htmlFor="university" className="block text-xs font-medium text-slate-600 mb-1.5">
                    <School size={12} className="inline mr-1 text-sky-500" /> Universidad
                  </label>
                  <select id="university" value={selectedUniversity}
                    onChange={e => setSelectedUniversity(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 shadow-sm bg-white">
                    <option value="">Todas</option>
                    {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>

                {/* Provincia (condicional) */}
                {showProvinceFilter && (
                  <div>
                    <label htmlFor="province" className="block text-xs font-medium text-slate-600 mb-1.5">
                      📍 Sede / Provincia
                    </label>
                    <select id="province" value={selectedProvince}
                      onChange={e => setSelectedProvince(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 shadow-sm bg-white">
                      <option value="">Todas las sedes</option>
                      {universityLocations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                  </div>
                )}

                {/* Carrera */}
                <div>
                  <label htmlFor="career" className="block text-xs font-medium text-slate-600 mb-1.5">
                    🎓 Carrera
                  </label>
                  <select id="career" value={selectedCareer}
                    onChange={e => setSelectedCareer(e.target.value)}
                    disabled={!selectedUniversity || isLoadingCareers}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 shadow-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">
                      {isLoadingCareers ? "Cargando..." : !selectedUniversity ? "Selecciona universidad" : "Todas"}
                    </option>
                    {careers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                {/* Materia */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-slate-600 mb-1.5">
                    <BookOpen size={12} className="inline mr-1 text-sky-500" /> Materia
                  </label>
                  <select id="subject" value={selectedSubject}
                    onChange={e => setSelectedSubject(e.target.value)}
                    disabled={!selectedCareer || isLoadingSubjects}
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 shadow-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">
                      {isLoadingSubjects ? "Cargando..." : !selectedCareer ? "Selecciona carrera" : "Todas"}
                    </option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
            </form>
          )}
        </section>

        {/* AD entre filtros y resultados */}
        {showResults && (
          <div className="flex justify-center mb-8">
            <div className="hidden md:block">
              <AdBanner adKey={ADS.KEY_728x90} width={728} height={90} />
            </div>
            <div className="md:hidden">
              <AdBanner adKey={ADS.KEY_300x250} width={300} height={250} />
            </div>
          </div>
        )}

        {/* ── Resultados ── */}
        {(selectedUniversity || debouncedQuery) && (
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-sky-600" />
                <h2 className="font-bold text-slate-800 text-lg">
                  {isLoadingProfessors
                    ? "Buscando..."
                    : `${sortedProfessors.length} ${sortedProfessors.length === 1 ? "profesor encontrado" : "profesores encontrados"}`
                  }
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {sortedProfessors.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    <ArrowUpDown size={14} className="text-slate-400 flex-shrink-0" />
                    <select value={sortOption} onChange={e => setSortOption(e.target.value as SortOption)}
                      className="text-sm border border-slate-200 rounded-lg py-1.5 pl-2 pr-7 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-700 bg-white shadow-sm appearance-none cursor-pointer">
                      <option value="rating_desc">Mayor calificación</option>
                      <option value="rating_asc">Menor calificación</option>
                      <option value="reviews_desc">Más reseñas</option>
                      <option value="name_asc">Nombre A-Z</option>
                    </select>
                  </div>
                )}
                <Link href="/add-professor"
                  className="inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-medium border border-sky-200 hover:border-sky-400 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg transition-all">
                  <Plus size={15} /> Añadir profesor
                </Link>
              </div>
            </div>

            {isLoadingProfessors ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-r-transparent mb-4" />
                <p className="text-slate-500 text-sm">Buscando profesores...</p>
              </div>
            ) : sortedProfessors.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderResults()}
                </div>
                <div className="flex justify-center mt-10">
                  <div className="hidden md:block">
                    <AdBanner adKey={ADS.KEY_728x90} width={728} height={90} />
                  </div>
                  <div className="md:hidden">
                    <AdBanner adKey={ADS.KEY_300x250} width={300} height={250} />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={28} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No se encontraron resultados</h3>
                <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                  {debouncedQuery
                    ? `No hay profesores con el nombre "${debouncedQuery}".`
                    : "Intenta cambiar los filtros o añade al profesor."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {hasActiveFilters && (
                    <button onClick={clearFilters}
                      className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-200 font-medium text-sm">
                      <X size={15} /> Limpiar filtros
                    </button>
                  )}
                  <Link href="/add-professor"
                    className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-2.5 rounded-xl hover:bg-sky-700 font-medium text-sm shadow-sm">
                    <Plus size={15} /> Añadir profesor
                  </Link>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Estado inicial */}
        {!selectedUniversity && !debouncedQuery && (
          <div className="text-center py-16 text-slate-400">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-base">Escribe un nombre o selecciona una universidad para comenzar.</p>
          </div>
        )}

      </div>
    </div>
  )
}
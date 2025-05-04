"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, ChevronRight, Plus, Star, Filter, School, BookOpen, User } from "lucide-react"
import { universities, hasMultipleLocations, getUniversityLocations } from "@/lib/university-data"
import { fetchProfessors, fetchCareers, fetchSubjects, fetchReviewsByProfessorId } from "@/lib/database"

interface Career {
  id: string
  name: string
  universityId: string
}

interface Subject {
  id: string
  name: string
  careerId: string
}

interface Professor {
  id: string
  name: string
  universityId: string
  provinceId?: string
  subjects: string[]
  totalReviews?: number
  averageRating?: number
}

interface Review {
  id: string
  rating: number
}

interface UniversityLocation {
  id: string
  name: string
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [careers, setCareers] = useState<Career[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [professors, setProfessors] = useState<Professor[]>([])

  const [selectedUniversity, setSelectedUniversity] = useState<string>("")
  const [selectedCareer, setSelectedCareer] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [showProvinceFilter, setShowProvinceFilter] = useState<boolean>(false)
  const [universityLocations, setUniversityLocations] = useState<UniversityLocation[]>([])
  const [showFilters, setShowFilters] = useState<boolean>(true)

  useEffect(() => {
    if (!selectedUniversity) {
      setShowProvinceFilter(false)
      setUniversityLocations([])
      setCareers([])
      return
    }

    const hasMultiple = hasMultipleLocations(selectedUniversity)
    setShowProvinceFilter(hasMultiple)

    if (hasMultiple) {
      const locations = getUniversityLocations(selectedUniversity)
      setUniversityLocations(locations)
      if (!selectedProvince) {
        setCareers([])
        return
      }
    } else {
      setSelectedProvince("")
    }

    const loadCareers = async () => {
      setIsLoading(true)
      const allCareers = await fetchCareers()
      const filtered = allCareers.filter((c: Career) => c.universityId === selectedUniversity)
      setCareers(filtered)
      setIsLoading(false)
    }

    loadCareers()
  }, [selectedUniversity, selectedProvince])

  useEffect(() => {
    if (!selectedCareer) {
      setSubjects([])
      return
    }

    const loadSubjects = async () => {
      setIsLoading(true)
      const allSubjects = await fetchSubjects()
      const filtered = allSubjects.filter((s: Subject) => s.careerId === selectedCareer)
      setSubjects(filtered)
      setIsLoading(false)
    }

    loadSubjects()
  }, [selectedCareer])

  useEffect(() => {
    if (!selectedUniversity && !searchQuery) {
      setProfessors([])
      return
    }

    const loadProfessors = async () => {
      setIsLoading(true)
      let all = await fetchProfessors()

      if (searchQuery) {
        all = all.filter((p: Professor) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }
      if (selectedUniversity) {
        all = all.filter((p: Professor) => p.universityId === selectedUniversity)
      }
      if (selectedProvince) {
        all = all.filter((p: Professor) => p.provinceId === selectedProvince)
      }
      if (selectedSubject) {
        all = all.filter((p: Professor) => p.subjects.includes(selectedSubject))
      }

      const enriched = await Promise.all(
        all.map(async (prof: Professor) => {
          const reviews = await fetchReviewsByProfessorId(prof.id)
          const total = reviews.length
          const average = total ? reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) / total : 0
          return { ...prof, totalReviews: total, averageRating: average }
        }),
      )

      if (!searchQuery && !selectedSubject) {
        enriched.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      }

      setProfessors(enriched)
      setIsLoading(false)
    }

    loadProfessors()
  }, [selectedSubject, searchQuery, selectedUniversity, selectedProvince])

  useEffect(() => {
    const universityParam = searchParams.get("university")
    const provinceParam = searchParams.get("province")
    const careerParam = searchParams.get("career")
    const subjectParam = searchParams.get("subject")
    const queryParam = searchParams.get("q")

    if (universityParam) setSelectedUniversity(universityParam)
    if (provinceParam) setSelectedProvince(provinceParam)
    if (careerParam) setSelectedCareer(careerParam)
    if (subjectParam) setSelectedSubject(subjectParam)
    if (queryParam) setSearchQuery(queryParam)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedUniversity) params.set("university", selectedUniversity)
    if (selectedProvince) params.set("province", selectedProvince)
    if (selectedCareer) params.set("career", selectedCareer)
    if (selectedSubject) params.set("subject", selectedSubject)
    if (searchQuery) params.set("q", searchQuery)
    router.push(`/search?${params.toString()}`)
  }

  const renderStars = (rating: number) => (
    <div className="flex" aria-label={`Calificación: ${rating.toFixed(1)} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={`${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Explora y califica profesores universitarios
          </h1>
          <div className="max-w-3xl">
            <p className="text-slate-700 mb-4 leading-relaxed">
              Bienvenido a RateMyProfessorRD, la plataforma donde los estudiantes pueden compartir y descubrir
              experiencias reales con profesores universitarios en República Dominicana.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Utiliza los filtros para buscar por universidad, provincia, carrera o materia, y encuentra información
              útil como valoraciones, comentarios y dificultad.
            </p>
          </div>
        </section>

        {/* Search Form */}
        <section className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10 border border-sky-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <Filter size={20} className="text-sky-600" />
              Filtros de búsqueda
            </h2>
            <button
              onClick={toggleFilters}
              className="text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center gap-1"
            >
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
              <ChevronRight size={16} className={`transition-transform ${showFilters ? "rotate-90" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label htmlFor="university" className="block text-sm font-medium text-slate-800">
                    <School size={16} className="inline mr-1 text-sky-600" /> Universidad
                  </label>
                  <select
                    id="university"
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    className="w-full rounded-md border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800 shadow-sm"
                  >
                    <option value="">Seleccionar universidad</option>
                    {universities.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                {showProvinceFilter && (
                  <div className="space-y-2">
                    <label htmlFor="province" className="block text-sm font-medium text-slate-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline h-4 w-4 mr-1 text-sky-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>{" "}
                      Provincia
                    </label>
                    <select
                      id="province"
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full rounded-md border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800 shadow-sm"
                    >
                      <option value="">Seleccionar provincia</option>
                      {universityLocations.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="career" className="block text-sm font-medium text-slate-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline h-4 w-4 mr-1 text-sky-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>{" "}
                    Carrera
                  </label>
                  <select
                    id="career"
                    value={selectedCareer}
                    onChange={(e) => setSelectedCareer(e.target.value)}
                    className="w-full rounded-md border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800 shadow-sm"
                  >
                    <option value="">Seleccionar carrera</option>
                    {careers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-800">
                    <BookOpen size={16} className="inline mr-1 text-sky-600" /> Materia
                  </label>
                  <select
                    id="subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full rounded-md border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800 shadow-sm"
                  >
                    <option value="">Seleccionar materia</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label htmlFor="search" className="block text-sm font-medium text-slate-800 mb-2">
                  <User size={16} className="inline mr-1 text-sky-600" /> Buscar por nombre
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border-slate-200 pl-10 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800 shadow-sm"
                    placeholder="Nombre del profesor"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" size={18} />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-md flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-medium"
                  aria-label="Buscar profesores"
                >
                  <Search size={18} />
                  Buscar profesores
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Ad Space - Clearly labeled */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-10 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>

        {/* Results */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-sky-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Profesores encontrados
            </h2>
            {selectedUniversity && (
              <Link
                href="/add-professor"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium hover:underline transition-colors"
                aria-label="Añadir nuevo profesor"
              >
                <Plus size={18} /> Añadir profesor
              </Link>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md border border-sky-100">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-r-transparent"></div>
              <p className="mt-4 text-sky-800">Cargando resultados...</p>
            </div>
          ) : professors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professors.map((professor) => (
                <Link
                  key={professor.id}
                  href={`/professor/${professor.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-slate-200 hover:border-sky-200 group"
                  aria-label={`Ver perfil de ${professor.name}`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xl font-bold group-hover:bg-sky-200 transition-colors">
                        {professor.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-700 transition-colors">
                          {professor.name}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">
                          {universities.find((u) => u.id === professor.universityId)?.name || "Universidad"}
                        </p>
                        <div className="flex items-center gap-2">
                          {renderStars(professor.averageRating ?? 0)}
                          <span className="text-slate-600 text-sm">
                            ({professor.totalReviews} {professor.totalReviews === 1 ? "reseña" : "reseñas"})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-6 py-3 flex justify-end items-center text-sky-600 group-hover:bg-sky-50 transition-colors">
                    Ver perfil <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-10 text-center border border-slate-200">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No se encontraron resultados</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                {selectedUniversity
                  ? "No se encontraron profesores en esta universidad con los criterios seleccionados."
                  : "Selecciona una universidad para ver los profesores disponibles."}
              </p>
              <Link
                href="/add-professor"
                className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
                aria-label="Añadir nuevo profesor"
              >
                <Plus size={18} />
                Añadir profesor
              </Link>
            </div>
          )}
        </section>

        {/* Bottom Ad Space - Clearly labeled */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mt-10 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

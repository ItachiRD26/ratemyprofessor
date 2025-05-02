"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, ChevronRight, Plus, Star } from "lucide-react"
import AdBanner from "@/components/ad-banner"
import { universities, hasMultipleLocations, getUniversityLocations } from "@/lib/university-data"
import { fetchProfessors, fetchCareers, fetchSubjects, fetchReviewsByProfessorId } from "@/lib/database"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [careers, setCareers] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [professors, setProfessors] = useState<any[]>([])

  const [selectedUniversity, setSelectedUniversity] = useState<string>("")
  const [selectedCareer, setSelectedCareer] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [showProvinceFilter, setShowProvinceFilter] = useState<boolean>(false)
  const [universityLocations, setUniversityLocations] = useState<{ id: string; name: string }[]>([])

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
      const filtered = allCareers.filter(
        (c: any) => c.universityId === selectedUniversity
      )      
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
      const filtered = allSubjects.filter((s: any) => s.careerId === selectedCareer)
      setSubjects(filtered)
      setIsLoading(false)
    }

    loadSubjects()
  }, [selectedCareer])

  useEffect(() => {
    if (!selectedSubject && !searchQuery) {
      setProfessors([])
      return
    }

    const loadProfessors = async () => {
      setIsLoading(true)
      let all = await fetchProfessors()

      if (searchQuery) {
        all = all.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }
      if (selectedUniversity) {
        all = all.filter((p) => p.universityId === selectedUniversity)
      }
      if (selectedProvince) {
        all = all.filter((p) => p.provinceId === selectedProvince)
      }
      if (selectedSubject) {
        all = all.filter((p) => p.subjects.includes(selectedSubject))
      }

      const enriched = await Promise.all(
        all.map(async (prof) => {
          const reviews = await fetchReviewsByProfessorId(prof.id)
          const total = reviews.length
          const average = total ? reviews.reduce((acc, r) => acc + r.rating, 0) / total : 0
          return { ...prof, totalReviews: total, averageRating: average }
        }),
      )

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
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={`${star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Buscar Profesores</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10 border border-blue-100">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">Universidad</label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
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
                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-2">Provincia</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
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

              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">Carrera</label>
                <select
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                  className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
                >
                  <option value="">Seleccionar carrera</option>
                  {careers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">Materia</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
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

            <div className="grid grid-cols-1 mt-4">
              <label className="block text-sm font-medium text-blue-800 mb-2">Buscar por nombre</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border-blue-200 pl-10 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
                  placeholder="Nombre del profesor"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md flex items-center gap-2 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200"
              >
                <Search size={18} />
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Resultados</h2>
            {selectedSubject && (
              <Link
                href="/add-professor"
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium hover:underline"
              >
                <Plus size={18} /> Añadir profesor
              </Link>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-blue-800">Cargando resultados...</p>
            </div>
          ) : professors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professors.map((professor) => (
                <Link
                  key={professor.id}
                  href={`/professor/${professor.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-blue-100 hover:border-blue-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold group-hover:bg-blue-200 transition-colors">
                        {professor.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-blue-900 group-hover:text-blue-700 transition-colors">
                          {professor.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {universities.find((u) => u.id === professor.universityId)?.name || "Universidad"}
                        </p>
                        <div className="flex items-center gap-2">
                          {renderStars(professor.averageRating)}
                          <span className="text-gray-600 text-sm">
                            ({professor.totalReviews} {professor.totalReviews === 1 ? "reseña" : "reseñas"})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 px-6 py-3 flex justify-end items-center text-blue-700 group-hover:bg-blue-100 transition-colors">
                    Ver perfil <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-10 text-center border border-blue-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-blue-700" />
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {selectedSubject || searchQuery
                  ? "No se encontraron profesores con los criterios seleccionados."
                  : "No has realizado una búsqueda aún o no esta en la base de datos."}
              </p>
              <Link
                href="/add-professor"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200"
              >
                <Plus size={18} />
                Añadir profesor y Materia
              </Link>
            </div>
          )}
        </div>

        <div className="mt-12">
          <AdBanner slot="0987654321" className="h-[250px] bg-blue-50 rounded-md overflow-hidden shadow-sm" />
        </div>
      </div>
    </div>
  )
}

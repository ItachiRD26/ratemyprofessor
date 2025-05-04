"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  Star,
  Filter,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  School,
  BarChart,
  MessageSquare,
  Clock,
} from "lucide-react"
import { universities } from "@/lib/university-data"
import { fetchProfessorById, fetchReviewsByProfessorId, fetchSubjects } from "@/lib/database"

// Types
type Professor = {
  id: string
  name: string
  universityId: string
  provinceId?: string
  subjects: string[]
  averageRating: number
  totalReviews: number
}

type Review = {
  id: string
  professorId: string
  subjectId: string
  rating: number
  difficulty: number
  wouldTakeAgain: boolean
  comment: string
  date: number
  helpful: number
  notHelpful: number
}

type Subject = {
  id: string
  name: string
  careerId: string
  code?: string
}

export default function ProfessorProfilePage() {
  const params = useParams()
  const professorId = params.id as string

  const [professor, setProfessor] = useState<Professor | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [subjectsMap, setSubjectsMap] = useState<Record<string, Subject>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [filterOption, setFilterOption] = useState<string>("recent")
  const [stats, setStats] = useState({
    avgDifficulty: 0,
    wouldTakeAgainPercent: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [prof, reviewsData, allSubjects] = await Promise.all([
          fetchProfessorById(professorId),
          fetchReviewsByProfessorId(professorId),
          fetchSubjects(),
        ])

        if (!prof) {
          return
        }

        // Actualizar promedio y cantidad de reseñas si hay reseñas disponibles
        if (reviewsData.length > 0) {
          const total = reviewsData.reduce((acc, r) => acc + r.rating, 0)
          const avg = total / reviewsData.length
          prof.averageRating = avg
          prof.totalReviews = reviewsData.length

          // Calcular estadísticas adicionales
          const totalDifficulty = reviewsData.reduce((acc, r) => acc + r.difficulty, 0)
          const avgDifficulty = totalDifficulty / reviewsData.length
          const wouldTakeAgain = reviewsData.filter((r) => r.wouldTakeAgain).length
          const wouldTakeAgainPercent = (wouldTakeAgain / reviewsData.length) * 100

          setStats({
            avgDifficulty,
            wouldTakeAgainPercent,
          })
        }

        setProfessor(prof)
        setReviews(reviewsData)
        setFilteredReviews(reviewsData)

        const subjectsDict: Record<string, Subject> = {}
        allSubjects.forEach((sub) => {
          subjectsDict[sub.id] = sub
        })
        setSubjectsMap(subjectsDict)
      } catch (error) {
        console.error("Error loading professor data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [professorId])

  useEffect(() => {
    if (reviews.length === 0) return
    const sorted = [...reviews]
    switch (filterOption) {
      case "recent":
        sorted.sort((a, b) => b.date - a.date)
        break
      case "oldest":
        sorted.sort((a, b) => a.date - b.date)
        break
      case "highest":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "lowest":
        sorted.sort((a, b) => a.rating - b.rating)
        break
    }
    setFilteredReviews(sorted)
  }, [filterOption, reviews])

  const renderStars = (rating: number) => (
    <div className="flex" aria-label={`Calificación: ${rating.toFixed(1)} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={`${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("es-DO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center py-16">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-r-transparent"></div>
            <p className="mt-4 text-slate-700">Cargando información del profesor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!professor) {
    return (
      <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Profesor no encontrado</h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              No se pudo encontrar el profesor con el ID especificado. Es posible que haya sido eliminado o que la URL
              sea incorrecta.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-colors shadow-md"
            >
              <ChevronLeft size={18} />
              Volver a la búsqueda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const university = universities.find((u) => u.id === professor.universityId)

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ChevronLeft size={18} />
            Volver a la búsqueda
          </Link>
        </div>

        {/* Top Ad Banner - Clearly labeled */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>

        {/* Professor Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-slate-200">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-3xl font-bold mx-auto md:mx-0">
                {professor.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center md:text-left">{professor.name}</h1>
                <p className="text-slate-600 mb-4 flex items-center gap-2 justify-center md:justify-start">
                  <School size={18} className="text-sky-600" />
                  {university?.name || "Universidad"}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    {renderStars(professor.averageRating)}
                    <span className="font-bold text-lg text-slate-900">{professor.averageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-slate-600 text-center md:text-left">
                    {professor.totalReviews} {professor.totalReviews === 1 ? "reseña" : "reseñas"}
                  </span>
                </div>

                {professor.totalReviews > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-lg">
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm text-slate-600 mb-1 flex items-center gap-1">
                        <BarChart size={14} className="text-sky-600" /> Dificultad promedio
                      </span>
                      <span className="font-semibold text-slate-900">{stats.avgDifficulty.toFixed(1)}/5</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm text-slate-600 mb-1 flex items-center gap-1">
                        <ThumbsUp size={14} className="text-sky-600" /> Lo tomarían de nuevo
                      </span>
                      <span className="font-semibold text-slate-900">{stats.wouldTakeAgainPercent.toFixed(0)}%</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-sm text-slate-600 mb-1 flex items-center gap-1">
                        <Clock size={14} className="text-sky-600" /> Última reseña
                      </span>
                      <span className="font-semibold text-slate-900">
                        {reviews.length > 0 ? formatDate(reviews[0].date) : "N/A"}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <BookOpen size={16} className="text-sky-600" /> Materias que imparte:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {professor.subjects.map((subjectId) => {
                      const sub = subjectsMap[subjectId]
                      const label = sub ? `${sub.name}${sub.code ? ` (${sub.code})` : ""}` : subjectId
                      return (
                        <span
                          key={subjectId}
                          className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm border border-sky-100"
                        >
                          {label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Review Button - Top */}
        <div className="mb-8 text-center">
          <Link
            href={`/professor/${professorId}/add-review`}
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-colors shadow-md"
          >
            <Star size={18} />
            Añadir reseña
          </Link>
        </div>

        {/* Middle Ad Banner - Clearly labeled */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare size={20} className="text-sky-600" /> Reseñas de estudiantes
            </h2>

            <div className="relative">
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-800 shadow-sm"
                aria-label="Ordenar reseñas"
              >
                <option value="recent">Más recientes</option>
                <option value="oldest">Más antiguas</option>
                <option value="highest">Mayor calificación</option>
                <option value="lowest">Menor calificación</option>
              </select>
              <Filter
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:border-sky-200 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {renderStars(review.rating)}
                          <span className="font-bold text-slate-900">{review.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-slate-600 flex items-center gap-1">
                          <BookOpen size={14} className="text-sky-600" />
                          {subjectsMap[review.subjectId]?.name || review.subjectId}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-sm bg-slate-50 px-3 py-1 rounded-full">
                        <Calendar size={14} className="text-sky-600" />
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>

                    <div className="mb-4 bg-slate-50 p-4 rounded-lg">
                      <p className="text-slate-800 whitespace-pre-line">{review.comment}</p>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <BarChart size={16} className="text-sky-600" />
                        <span className="font-semibold">Dificultad:</span> {review.difficulty}/5
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={16} className={review.wouldTakeAgain ? "text-green-500" : "text-slate-400"} />
                        <span className="font-semibold">¿Lo tomaría de nuevo?</span>{" "}
                        <span className={review.wouldTakeAgain ? "text-green-600" : "text-red-600"}>
                          {review.wouldTakeAgain ? "Sí" : "No"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <button
                          className="text-slate-500 hover:text-sky-600 transition-colors p-1 rounded-full hover:bg-sky-50"
                          aria-label="Marcar como útil"
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <span className="text-sm text-slate-600">{review.helpful}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          className="text-slate-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                          aria-label="Marcar como no útil"
                        >
                          <ThumbsDown size={16} />
                        </button>
                        <span className="text-sm text-slate-600">{review.notHelpful}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Sin reseñas aún</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Este profesor aún no tiene reseñas. ¡Sé el primero en compartir tu experiencia!
              </p>
              <Link
                href={`/professor/${professorId}/add-review`}
                className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-colors shadow-md"
              >
                <Star size={18} />
                Añadir reseña
              </Link>
            </div>
          )}

          {filteredReviews.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                href={`/professor/${professorId}/add-review`}
                className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-colors shadow-md"
              >
                <Star size={18} />
                Añadir reseña
              </Link>
            </div>
          )}
        </section>

        {/* Bottom Ad Banner - Clearly labeled */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

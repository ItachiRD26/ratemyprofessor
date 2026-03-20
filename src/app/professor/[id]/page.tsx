"use client"

import { useState, useEffect, useCallback } from "react"
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
  BarChart2,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { universities } from "@/lib/university-data"
import {
  fetchProfessorById,
  fetchReviewsByProfessorId,
  fetchSubjects,
  updateReviewVote,
} from "@/lib/database"

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

// ── Helpers de votos (localStorage, nunca salen del dispositivo) ──
const VOTES_KEY = "rmprd_voted_reviews"

function getVotedReviews(): Record<string, "helpful" | "notHelpful"> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY) || "{}")
  } catch {
    return {}
  }
}

function persistVote(reviewId: string, type: "helpful" | "notHelpful") {
  const votes = getVotedReviews()
  votes[reviewId] = type
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
}

// ── Helpers de colores por calificación ──
function getRatingColor(r: number) {
  return r >= 4 ? "text-emerald-600" : r >= 3 ? "text-amber-500" : "text-red-500"
}
function getRatingBarColor(r: number) {
  return r >= 4 ? "bg-emerald-400" : r >= 3 ? "bg-amber-400" : "bg-red-400"
}
function getRatingBadgeClass(r: number) {
  return r >= 4
    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
    : r >= 3
    ? "bg-amber-50 border-amber-200 text-amber-500"
    : "bg-red-50 border-red-200 text-red-500"
}
function getDifficultyLabel(d: number) {
  if (d <= 1.5) return "Muy fácil"
  if (d <= 2.5) return "Fácil"
  if (d <= 3.5) return "Moderado"
  if (d <= 4.5) return "Difícil"
  return "Muy difícil"
}

export default function ProfessorProfilePage() {
  const params = useParams()
  const professorId = params.id as string

  const [professor, setProfessor] = useState<Professor | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [subjectsMap, setSubjectsMap] = useState<Record<string, Subject>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [filterOption, setFilterOption] = useState("recent")
  const [votedReviews, setVotedReviews] = useState<Record<string, "helpful" | "notHelpful">>({})
  const [votingInProgress, setVotingInProgress] = useState<string | null>(null)
  const [stats, setStats] = useState({
    avgDifficulty: 0,
    wouldTakeAgainPercent: 0,
    ratingDistribution: [0, 0, 0, 0, 0],
  })

  // Cargar votos guardados en este dispositivo
  useEffect(() => {
    setVotedReviews(getVotedReviews())
  }, [])

  // Cargar datos del profesor
  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        const [prof, reviewsData, allSubjects] = await Promise.all([
          fetchProfessorById(professorId),
          fetchReviewsByProfessorId(professorId),
          fetchSubjects(),
        ])

        if (!prof) return

        if (reviewsData.length > 0) {
          const avg = reviewsData.reduce((a, r) => a + r.rating, 0) / reviewsData.length
          prof.averageRating = avg
          prof.totalReviews = reviewsData.length

          const avgDiff = reviewsData.reduce((a, r) => a + r.difficulty, 0) / reviewsData.length
          const wta = (reviewsData.filter((r) => r.wouldTakeAgain).length / reviewsData.length) * 100

          // Distribución: índice 0 = 1 estrella, índice 4 = 5 estrellas
          const dist = [0, 0, 0, 0, 0]
          reviewsData.forEach((r) => {
            dist[Math.min(Math.max(Math.round(r.rating) - 1, 0), 4)]++
          })

          setStats({ avgDifficulty: avgDiff, wouldTakeAgainPercent: wta, ratingDistribution: dist })
        }

        const sorted = [...reviewsData].sort((a, b) => b.date - a.date)
        setProfessor(prof)
        setReviews(sorted)
        setFilteredReviews(sorted)

        const dict: Record<string, Subject> = {}
        allSubjects.forEach((s) => { dict[s.id] = s })
        setSubjectsMap(dict)
      } catch (e) {
        console.error("Error cargando profesor:", e)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [professorId])

  // Ordenar reseñas según el filtro
  useEffect(() => {
    if (!reviews.length) return
    const s = [...reviews]
    if (filterOption === "recent")  s.sort((a, b) => b.date - a.date)
    if (filterOption === "oldest")  s.sort((a, b) => a.date - b.date)
    if (filterOption === "highest") s.sort((a, b) => b.rating - a.rating)
    if (filterOption === "lowest")  s.sort((a, b) => a.rating - b.rating)
    if (filterOption === "helpful") s.sort((a, b) => b.helpful - a.helpful)
    setFilteredReviews(s)
  }, [filterOption, reviews])

  // Manejar votos: actualiza Firebase + localStorage + UI optimista
  const handleVote = useCallback(
    async (reviewId: string, type: "helpful" | "notHelpful") => {
      if (votedReviews[reviewId] || votingInProgress === reviewId) return
      setVotingInProgress(reviewId)
      try {
        await updateReviewVote(reviewId, type)
        persistVote(reviewId, type)
        setVotedReviews((prev) => ({ ...prev, [reviewId]: type }))
        const patch = (list: Review[]) =>
          list.map((r) => (r.id === reviewId ? { ...r, [type]: r[type] + 1 } : r))
        setReviews(patch)
        setFilteredReviews(patch)
      } catch (e) {
        console.error("Error guardando voto:", e)
      } finally {
        setVotingInProgress(null)
      }
    },
    [votedReviews, votingInProgress]
  )

  const renderStars = (rating: number, size = 18) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={
            s <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-200"
          }
        />
      ))}
    </div>
  )

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("es-DO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // ── Estados de carga y error ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-600 border-r-transparent mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Cargando perfil del profesor...</p>
        </div>
      </div>
    )
  }

  if (!professor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
        <div className="text-center bg-white rounded-2xl shadow p-10 max-w-md mx-4">
          <AlertCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profesor no encontrado</h2>
          <p className="text-slate-500 mb-6 text-sm">
            No pudimos encontrar este perfil. Puede que haya sido eliminado o que la URL sea incorrecta.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 font-medium transition-colors"
          >
            <ChevronLeft size={18} /> Volver a la búsqueda
          </Link>
        </div>
      </div>
    )
  }

  const university = universities.find((u) => u.id === professor.universityId)
  const maxDist = Math.max(...stats.ratingDistribution, 1)

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Volver */}
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-800 font-medium mb-6 transition-colors group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver a la búsqueda
        </Link>

        {/* ── TARJETA PRINCIPAL ── */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden mb-6">
          {/* Barra de color según rating */}
          <div className={`h-2 w-full ${getRatingBarColor(professor.averageRating)}`} />

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold flex-shrink-0 mx-auto md:mx-0 ${
                  professor.averageRating >= 4
                    ? "bg-emerald-50 text-emerald-600"
                    : professor.averageRating >= 3
                    ? "bg-amber-50 text-amber-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {professor.name.charAt(0).toUpperCase()}
              </div>

              {/* Nombre + universidad + rating */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {professor.name}
                </h1>
                <div className="flex items-center gap-2 justify-center md:justify-start text-slate-500 mb-4">
                  <School size={15} className="text-sky-500" />
                  <span className="text-sm">{university?.name || "Universidad"}</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <span className={`text-5xl font-black ${getRatingColor(professor.averageRating)}`}>
                    {professor.averageRating.toFixed(1)}
                  </span>
                  <div>
                    {renderStars(professor.averageRating, 20)}
                    <p className="text-sm text-slate-500 mt-1">
                      {professor.totalReviews}{" "}
                      {professor.totalReviews === 1 ? "reseña" : "reseñas"}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end">
                <Link
                  href={`/add-review/${professorId}`}
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-2.5 rounded-xl hover:bg-sky-700 transition-colors font-medium shadow-sm"
                >
                  <Star size={16} fill="currentColor" />
                  Añadir reseña
                </Link>
              </div>
            </div>

            {/* Estadísticas */}
            {professor.totalReviews > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <BarChart2 size={13} className="text-sky-500" />
                    DIFICULTAD PROMEDIO
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-slate-800">
                      {stats.avgDifficulty.toFixed(1)}
                    </span>
                    <span className="text-slate-400 text-sm mb-0.5">/5</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {getDifficultyLabel(stats.avgDifficulty)}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <TrendingUp size={13} className="text-sky-500" />
                    LO TOMARÍAN DE NUEVO
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-slate-800">
                      {stats.wouldTakeAgainPercent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-sky-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${stats.wouldTakeAgainPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Clock size={13} className="text-sky-500" />
                    ÚLTIMA RESEÑA
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {reviews.length > 0 ? formatDate(reviews[0].date) : "N/A"}
                  </span>
                </div>
              </div>
            )}

            {/* Distribución de calificaciones */}
            {professor.totalReviews > 0 && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
                  Distribución de calificaciones
                </p>
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = stats.ratingDistribution[star - 1]
                    const pct = Math.round((count / maxDist) * 100)
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 w-4 text-right">{star}</span>
                        <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-amber-400 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 w-4">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Materias */}
            <div className="mt-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <BookOpen size={13} className="text-sky-500" />
                Materias que imparte
              </p>
              <div className="flex flex-wrap gap-2">
                {professor.subjects.map((sid) => {
                  const sub = subjectsMap[sid]
                  const label = sub
                    ? `${sub.name}${sub.code ? ` (${sub.code})` : ""}`
                    : sid
                  return (
                    <span
                      key={sid}
                      className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm border border-sky-100 font-medium"
                    >
                      {label}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── ENCABEZADO DE RESEÑAS ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare size={20} className="text-sky-600" />
            Reseñas de estudiantes
          </h2>
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-700 shadow-sm cursor-pointer"
              aria-label="Ordenar reseñas"
            >
              <option value="recent">Más recientes</option>
              <option value="oldest">Más antiguas</option>
              <option value="highest">Mayor calificación</option>
              <option value="lowest">Menor calificación</option>
              <option value="helpful">Más útiles</option>
            </select>
            <Filter
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={14}
            />
          </div>
        </div>

        {/* Badge de anonimato */}
        <div className="flex items-start gap-2 bg-sky-50 border border-sky-100 rounded-xl p-3 mb-5 text-sm text-sky-700">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-sky-500" />
          <span>
            Todas las reseñas son <strong>100% anónimas</strong>. No se almacena ningún dato
            personal junto a las reseñas.
          </span>
        </div>

        {/* ── LISTA DE RESEÑAS ── */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const alreadyVoted = votedReviews[review.id]
              const isVoting = votingInProgress === review.id

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  {/* Barra de color */}
                  <div className={`h-1 w-full ${getRatingBarColor(review.rating)}`} />

                  <div className="p-5">
                    {/* Fila superior: rating + materia + fecha */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-xl px-3 py-1.5 border font-bold text-lg ${getRatingBadgeClass(review.rating)}`}
                        >
                          {review.rating.toFixed(1)}
                        </div>
                        <div>
                          {renderStars(review.rating, 15)}
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <BookOpen size={11} />
                            {subjectsMap[review.subjectId]?.name || "Materia"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        <Calendar size={12} />
                        {formatDate(review.date)}
                      </div>
                    </div>

                    {/* Comentario */}
                    <p className="text-slate-700 leading-relaxed mb-4 text-sm whitespace-pre-line">
                      {review.comment}
                    </p>

                    {/* Badges de dificultad y "tomaría de nuevo" */}
                    <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-slate-100">
                      <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <BarChart2 size={12} className="text-sky-500" />
                        Dificultad: <strong>{review.difficulty}/5</strong>
                      </span>
                      <span
                        className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
                          review.wouldTakeAgain
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-red-50 text-red-600 border-red-100"
                        }`}
                      >
                        {review.wouldTakeAgain ? (
                          <><CheckCircle size={12} /> Lo tomaría de nuevo</>
                        ) : (
                          <><XCircle size={12} /> No lo tomaría de nuevo</>
                        )}
                      </span>
                    </div>

                    {/* Fila de votos */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-slate-400">¿Útil esta reseña?</span>

                      <button
                        onClick={() => handleVote(review.id, "helpful")}
                        disabled={!!alreadyVoted || isVoting}
                        aria-label="Marcar como útil"
                        className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all ${
                          alreadyVoted === "helpful"
                            ? "bg-sky-50 text-sky-600 border-sky-200 cursor-default"
                            : alreadyVoted
                            ? "text-slate-300 border-slate-100 cursor-not-allowed"
                            : "text-slate-500 border-slate-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 cursor-pointer"
                        }`}
                      >
                        <ThumbsUp size={14} />
                        <span>{review.helpful}</span>
                      </button>

                      <button
                        onClick={() => handleVote(review.id, "notHelpful")}
                        disabled={!!alreadyVoted || isVoting}
                        aria-label="Marcar como no útil"
                        className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all ${
                          alreadyVoted === "notHelpful"
                            ? "bg-red-50 text-red-500 border-red-200 cursor-default"
                            : alreadyVoted
                            ? "text-slate-300 border-slate-100 cursor-not-allowed"
                            : "text-slate-500 border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 cursor-pointer"
                        }`}
                      >
                        <ThumbsDown size={14} />
                        <span>{review.notHelpful}</span>
                      </button>

                      {isVoting && (
                        <span className="text-xs text-slate-400 animate-pulse">Guardando...</span>
                      )}
                      {alreadyVoted && !isVoting && (
                        <span className="text-xs text-slate-400">✓ Gracias por tu voto</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-100">
            <MessageSquare className="w-14 h-14 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Sin reseñas aún</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm">
              ¡Sé el primero en compartir tu experiencia de forma anónima!
            </p>
            <Link
              href={`/add-review/${professorId}`}
              className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition-colors font-medium shadow-sm"
            >
              <Star size={16} fill="currentColor" />
              Añadir reseña
            </Link>
          </div>
        )}

        {filteredReviews.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href={`/add-review/${professorId}`}
              className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition-colors font-medium shadow-sm"
            >
              <Star size={16} fill="currentColor" />
              Añadir tu reseña
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
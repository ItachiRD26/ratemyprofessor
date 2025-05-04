"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { fetchProfessorById, fetchSubjects, saveReview } from "@/lib/database"
import {
  ChevronLeft,
  Star,
  AlertCircle,
  BookOpen,
  ThumbsUp,
  MessageSquare,
  BarChart,
  User,
  Info,
  HelpCircle,
} from "lucide-react"

type Subject = {
  id: string
  name: string
  careerId: string
  code?: string
}

export default function AddReviewPage() {
  const params = useParams()
  const professorId = params.id as string
  const router = useRouter()

  const [selectedSubject, setSelectedSubject] = useState("")
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [rating, setRating] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean | null>(null)
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [professorName, setProfessorName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTips, setShowTips] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const professor = await fetchProfessorById(professorId)
        if (professor) {
          setProfessorName(professor.name)

          const allSubjects = await fetchSubjects()
          // Filter subjects that belong to this professor
          const professorSubjects = allSubjects.filter((subject) => professor.subjects.includes(subject.id))
          setSubjects(professorSubjects)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [professorId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!selectedSubject) newErrors.subject = "Selecciona una materia"
    if (rating === 0) newErrors.rating = "Selecciona una calificación"
    if (difficulty === 0) newErrors.difficulty = "Selecciona una dificultad"
    if (wouldTakeAgain === null) newErrors.again = "Indica si lo tomarías de nuevo"
    if (!comment.trim()) newErrors.comment = "Agrega un comentario"
    else if (comment.trim().length < 20) newErrors.comment = "El comentario debe tener al menos 20 caracteres"

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await saveReview({
        professorId,
        subjectId: selectedSubject,
        rating,
        difficulty,
        wouldTakeAgain: wouldTakeAgain === true, // Convierte a boolean
        comment,
        date: Date.now(),
        helpful: 0,
        notHelpful: 0,
      })

      router.push(`/professor/${professorId}`)
    } catch (error) {
      console.error("Error saving review:", error)
      setErrors({ submit: "Hubo un error al guardar la reseña. Inténtalo de nuevo." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href={`/professor/${professorId}`}
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ChevronLeft size={18} />
            Volver al perfil del profesor
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Añadir reseña</h1>
            <p className="text-slate-600 mt-2">
              {isLoading ? "Cargando información..." : `Compartir tu experiencia con ${professorName}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors self-start"
          >
            <HelpCircle size={18} /> {showTips ? "Ocultar consejos" : "Consejos para reseñas"}
          </button>
        </div>

        {showTips && (
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Info size={18} className="text-sky-600" /> Consejos para escribir una buena reseña
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Sé específico sobre lo que te gustó o no te gustó de la clase</li>
              <li>Menciona el estilo de enseñanza, la disponibilidad del profesor y la estructura del curso</li>
              <li>Evita comentarios personales o irrespetuosos</li>
              <li>Incluye información sobre exámenes, tareas y proyectos</li>
              <li>Tu reseña ayudará a otros estudiantes a tomar decisiones informadas</li>
            </ul>
          </div>
        )}

        {/* Top Ad Banner - Clearly labeled */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white p-8 rounded-xl shadow-md flex items-center justify-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-sky-600 border-r-transparent"></div>
            <p className="ml-3 text-slate-700">Cargando información del profesor...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200"
          >
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-slate-800 items-center gap-1">
                <BookOpen size={16} className="text-sky-600" /> Materia *
              </label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full rounded-md px-4 py-2 border ${
                  errors.subject ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-sky-200"
                } focus:border-sky-500 focus:ring focus:ring-opacity-50 text-slate-800`}
              >
                <option value="">Selecciona una materia</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} {subject.code ? `(${subject.code})` : ""}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.subject}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-800 items-center gap-1">
                  <Star size={16} className="text-sky-600" /> Calificación general *
                </label>
                <div className="flex items-center">
                  {renderStarRating(rating, setRating)}
                  <span className="ml-2 text-slate-600 text-sm">
                    {rating > 0 ? ratingLabels.rating[rating - 1] : "Sin calificar"}
                  </span>
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.rating}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-800 items-center gap-1">
                  <BarChart size={16} className="text-sky-600" /> Nivel de dificultad *
                </label>
                <div className="flex items-center">
                  {renderStarRating(difficulty, setDifficulty)}
                  <span className="ml-2 text-slate-600 text-sm">
                    {difficulty > 0 ? ratingLabels.difficulty[difficulty - 1] : "Sin calificar"}
                  </span>
                </div>
                {errors.difficulty && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.difficulty}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-800 items-center gap-1">
                <ThumbsUp size={16} className="text-sky-600" /> ¿Lo tomarías de nuevo? *
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setWouldTakeAgain(true)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    wouldTakeAgain === true ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setWouldTakeAgain(false)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    wouldTakeAgain === false
                      ? "bg-sky-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  No
                </button>
              </div>
              {errors.again && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.again}
                </p>
              )}
            </div>

            {/* Middle Ad Banner - Clearly labeled */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
              <div className="h-[90px] bg-slate-100 flex items-center justify-center">
                <p className="text-slate-400 text-sm">Anuncio</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium text-slate-800 items-center gap-1">
                <MessageSquare size={16} className="text-sky-600" /> Tu experiencia con este profesor *
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full rounded-md px-4 py-2 border ${
                  errors.comment ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-sky-200"
                } focus:border-sky-500 focus:ring focus:ring-opacity-50 text-slate-800`}
                rows={6}
                placeholder="Comparte tu experiencia con este profesor. ¿Cómo es su estilo de enseñanza? ¿Qué te gustó o no te gustó de sus clases? ¿Recomendarías este profesor a otros estudiantes?"
              />
              <div className="flex justify-between items-center">
                <div>
                  {errors.comment && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.comment}
                    </p>
                  )}
                </div>
                <p className="text-sm text-slate-500">{comment.length} / 1000 caracteres (mínimo 20)</p>
              </div>
            </div>

            <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
              <div className="flex items-start gap-3">
                <User size={20} className="text-sky-600 mt-1" />
                <div>
                  <h3 className="font-medium text-slate-800">Tu reseña será anónima</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Tu identidad no será revelada. Nos tomamos en serio la privacidad de nuestros usuarios y la
                    objetividad de las reseñas.
                  </p>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-600 flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.submit}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-sky-600 text-white px-8 py-3 rounded-md hover:bg-sky-700 disabled:bg-sky-400 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  "Publicar reseña"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Bottom Ad Banner - Clearly labeled */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mt-8 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ratingLabels = {
  rating: ["Muy malo", "Malo", "Regular", "Bueno", "Excelente"],
  difficulty: ["Muy fácil", "Fácil", "Moderado", "Difícil", "Muy difícil"],
}

function renderStarRating(value: number, setValue: (n: number) => void) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setValue(i)}
          className="focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-full p-1"
          aria-label={`${i} estrellas`}
        >
          <Star
            size={24}
            className={`${
              i <= value ? "text-amber-400 fill-amber-400" : "text-slate-300"
            } hover:text-amber-400 transition-colors`}
          />
        </button>
      ))}
    </div>
  )
}

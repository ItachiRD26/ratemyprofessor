"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { fetchProfessorById, fetchSubjects, saveReview } from "@/lib/database"
import { ChevronLeft } from "lucide-react"

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

  useEffect(() => {
    fetchProfessorById(professorId).then((professor) => {
      if (professor) {
        setProfessorName(professor.name)
      }
    })

    fetchSubjects().then((subjects) => {
      setSubjects(subjects)
    })
  }, [professorId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!selectedSubject) newErrors.subject = "Selecciona una materia"
    if (rating === 0) newErrors.rating = "Selecciona una calificación"
    if (difficulty === 0) newErrors.difficulty = "Selecciona una dificultad"
    if (wouldTakeAgain === null) newErrors.again = "Indica si lo tomarías de nuevo"
    if (!comment.trim()) newErrors.comment = "Agrega un comentario"

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    await saveReview({
      professorId,
      subjectId: selectedSubject,
      rating,
      difficulty,
      wouldTakeAgain,
      comment,
      date: Date.now(),
      helpful: 0,
      notHelpful: 0,
    })

    router.push(`/professor/${professorId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/professor/${professorId}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <ChevronLeft size={18} />
          Volver al perfil
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-black">Añadir reseña para {professorName}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Materia *</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full border rounded p-2 text-black"
          >
            <option value="">Selecciona una materia</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Calificación *</label>
          {renderStarRating(rating, setRating, errors.rating)}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Dificultad *</label>
          {renderStarRating(difficulty, setDifficulty, errors.difficulty)}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">¿Lo tomarías de nuevo? *</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setWouldTakeAgain(true)}
              className={`px-4 py-2 rounded ${
                wouldTakeAgain === true ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setWouldTakeAgain(false)}
              className={`px-4 py-2 rounded ${
                wouldTakeAgain === false ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
              }`}
            >
              No
            </button>
          </div>
          {errors.again && <p className="text-red-500 text-sm mt-1">{errors.again}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Comentario *</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 text-black"
            rows={5}
          />
          {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Enviar reseña
        </button>
      </form>
    </div>
  )
}

function renderStarRating(value: number, setValue: (n: number) => void, error?: string) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setValue(i)}
          className={`text-2xl ${i <= value ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </div>
  )
}

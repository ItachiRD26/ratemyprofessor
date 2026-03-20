// database.ts (Firebase Realtime Database version)

import { db } from "@/lib/firebase"
import { ref, push, set, get, child, update, increment } from "firebase/database"

export interface Professor {
  id: string;
  name: string;
  universityId: string;
  provinceId?: string;
  subjects: string[];
  careerId: string;
  averageRating: number;
  totalReviews: number;
}

export type NewProfessor = Omit<Professor, 'id'>;

export interface Subject {
  id: string;
  name: string;
  code?: string;
  careerId: string;
}

export type NewSubject = Omit<Subject, 'id'>;

export interface Career {
  id: string;
  name: string;
  universityId: string;
  provinceId: string;
}

export type NewCareer = Omit<Career, 'id'>;

export interface Review {
  id: string;
  professorId: string;
  subjectId: string;
  rating: number;
  difficulty: number;
  wouldTakeAgain: boolean;
  comment: string;
  date: number;
  helpful: number;
  notHelpful: number;
}

export type NewReview = Omit<Review, 'id'>;

// ─────────────────────────────────────────
// Profesores
// ─────────────────────────────────────────

export async function professorExists(
  name: string,
  universityId: string,
  careerId: string,
  subjectIds: string[]
): Promise<boolean> {
  const professors = await fetchProfessors()
  return professors.some(prof => {
    if (
      prof.name.toLowerCase() !== name.toLowerCase() ||
      prof.universityId !== universityId ||
      prof.careerId !== careerId
    ) return false
    return prof.subjects?.some(subjectId => subjectIds.includes(subjectId))
  })
}

export async function saveProfessor(
  professor: NewProfessor & { careerId: string; subjects: string[] }
): Promise<string> {
  const exists = await professorExists(
    professor.name,
    professor.universityId,
    professor.careerId,
    professor.subjects
  )
  if (exists) {
    throw new Error("Ya existe un profesor con estos datos (nombre, universidad, carrera y materia)")
  }
  const newRef = push(ref(db, "professors"))
  await set(newRef, professor)
  return newRef.key!
}

export async function fetchProfessors(): Promise<Professor[]> {
  const snapshot = await get(ref(db, "professors"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({
    ...(value as Omit<Professor, 'id'>),
    id,
  }))
}

export async function fetchProfessorById(id: string): Promise<Professor | null> {
  const snapshot = await get(child(ref(db), `professors/${id}`))
  if (!snapshot.exists()) return null
  return { ...snapshot.val(), id }
}

// ─────────────────────────────────────────
// Carreras
// ─────────────────────────────────────────

export async function saveCareer(career: NewCareer): Promise<string> {
  const newRef = push(ref(db, "careers"))
  await set(newRef, career)
  return newRef.key!
}

export async function fetchCareers(): Promise<Career[]> {
  const snapshot = await get(ref(db, "careers"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data)
    .map(([id, value]) => ({ ...(value as Omit<Career, 'id'>), id }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

// ─────────────────────────────────────────
// Materias
// ─────────────────────────────────────────

export async function saveSubject(subject: NewSubject): Promise<string> {
  const newRef = push(ref(db, "subjects"))
  const cleanSubject: Partial<NewSubject> = {
    name: subject.name,
    careerId: subject.careerId,
  }
  if (subject.code) cleanSubject.code = subject.code
  await set(newRef, cleanSubject)
  return newRef.key!
}

export async function fetchSubjects(): Promise<Subject[]> {
  const snapshot = await get(ref(db, "subjects"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({
    ...(value as Omit<Subject, 'id'>),
    id,
  }))
}

export async function fetchSubjectById(id: string): Promise<Subject | null> {
  const snapshot = await get(child(ref(db), `subjects/${id}`))
  if (!snapshot.exists()) return null
  return { ...snapshot.val(), id }
}

// ─────────────────────────────────────────
// Reseñas
// ─────────────────────────────────────────

export async function fetchReviewsByProfessorId(professorId: string): Promise<Review[]> {
  const snapshot = await get(ref(db, "reviews"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data)
    .map(([id, value]) => ({ ...(value as Omit<Review, 'id'>), id }))
    .filter((review) => review.professorId === professorId)
}

/**
 * Guarda la reseña Y actualiza averageRating + totalReviews en el profesor.
 * Así las reseñas futuras ya poblaran esos campos correctamente en Firebase.
 */
export async function saveReview(review: NewReview): Promise<string> {
  // 1. Guardar reseña
  const newRef = push(ref(db, "reviews"))
  await set(newRef, review)

  // 2. Recalcular stats del profesor con todas sus reseñas
  const allReviews = await fetchReviewsByProfessorId(review.professorId)
  const total = allReviews.length
  const avg   = total > 0 ? allReviews.reduce((acc, r) => acc + r.rating, 0) / total : 0

  // 3. Actualizar nodo del profesor
  await update(ref(db, `professors/${review.professorId}`), {
    averageRating: Math.round(avg * 10) / 10,
    totalReviews:  total,
  })

  return newRef.key!
}

// Voto útil/no útil — atómico
export async function updateReviewVote(
  reviewId: string,
  type: 'helpful' | 'notHelpful'
): Promise<void> {
  await update(ref(db, `reviews/${reviewId}`), {
    [type]: increment(1),
  })
}
// database.ts (Firebase Realtime Database version)

import { db } from "@/lib/firebase"
import { ref, push, set, get, child } from "firebase/database"

// Save a new professor
type NewProfessor = {
  name: string;
  universityId: string;
  provinceId?: string;
  subjects: string[];
  averageRating: number;
  totalReviews: number;
}

export async function saveProfessor(professor: NewProfessor): Promise<string> {
  const newRef = push(ref(db, "professors"))
  await set(newRef, professor)
  return newRef.key!
}

// Save a new subject
export async function saveSubject(subject: {
  name: string;
  code?: string;
  careerId: string;
}): Promise<string> {
  const newRef = push(ref(db, "subjects"))

  // Crear el objeto limpio sin "undefined"
  const cleanSubject: any = {
    name: subject.name,
    careerId: subject.careerId
  }

  if (subject.code) {
    cleanSubject.code = subject.code
  }

  await set(newRef, cleanSubject)
  return newRef.key!
}


// Save a new career
export async function saveCareer(career: {
  name: string;
  universityId: string;
  provinceId: string;
}): Promise<string> {
  const newRef = push(ref(db, "careers"))
  await set(newRef, career)
  return newRef.key!
}

// Save a new review
export async function saveReview(review: {
  professorId: string;
  subjectId: string;
  rating: number;
  difficulty: number;
  wouldTakeAgain: boolean;
  comment: string;
  date: number;
  helpful: number;
  notHelpful: number;
}): Promise<string> {
  const newRef = push(ref(db, "reviews"))
  await set(newRef, review)
  return newRef.key!
}

// Fetch all professors
export async function fetchProfessors(): Promise<any[]> {
  const snapshot = await get(ref(db, "professors"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({ id, ...(value as any) }))
}

// Fetch professor by ID
export async function fetchProfessorById(id: string): Promise<any | null> {
  const snapshot = await get(child(ref(db), `professors/${id}`))
  if (!snapshot.exists()) return null
  return { id, ...snapshot.val() }
}

// Fetch all careers
export async function fetchCareers(): Promise<any[]> {
  const snapshot = await get(ref(db, "careers"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({ id, ...(value as any) }))
}

// Fetch all subjects
export async function fetchSubjects(): Promise<any[]> {
  const snapshot = await get(ref(db, "subjects"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({ id, ...(value as any) }))
}

// Fetch subject by ID
export async function fetchSubjectById(id: string): Promise<any | null> {
  const snapshot = await get(child(ref(db), `subjects/${id}`))
  if (!snapshot.exists()) return null
  return { id, ...snapshot.val() }
}

// Fetch reviews by professor ID
export async function fetchReviewsByProfessorId(professorId: string): Promise<any[]> {
  const snapshot = await get(ref(db, "reviews"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data)
    .map(([id, value]) => ({ id, ...(value as any) }))
    .filter((review) => review.professorId === professorId)
}

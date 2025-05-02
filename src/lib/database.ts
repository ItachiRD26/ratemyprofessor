// database.ts (Firebase Realtime Database version)

import { db } from "@/lib/firebase"
import { ref, push, set, get, child } from "firebase/database"

// Define interfaces for all data types
export interface Professor {
  id: string;
  name: string;
  universityId: string;
  provinceId?: string;
  subjects: string[];
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

// Save a new professor
export async function saveProfessor(professor: NewProfessor): Promise<string> {
  const newRef = push(ref(db, "professors"))
  await set(newRef, professor)
  return newRef.key!
}

// Save a new subject
export async function saveSubject(subject: NewSubject): Promise<string> {
  const newRef = push(ref(db, "subjects"))
  const cleanSubject: Partial<NewSubject> = {
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
export async function saveCareer(career: NewCareer): Promise<string> {
  const newRef = push(ref(db, "careers"))
  await set(newRef, career)
  return newRef.key!
}

// Save a new review
export async function saveReview(review: NewReview): Promise<string> {
  const newRef = push(ref(db, "reviews"))
  await set(newRef, review)
  return newRef.key!
}

// Fetch all professors
export async function fetchProfessors(): Promise<Professor[]> {
  const snapshot = await get(ref(db, "professors"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({ ...(value as Omit<Professor, 'id'>), id }))
}

// Fetch professor by ID
export async function fetchProfessorById(id: string): Promise<Professor | null> {
  const snapshot = await get(child(ref(db), `professors/${id}`))
  if (!snapshot.exists()) return null
  return { ...snapshot.val(), id }
}

// Fetch all careers
export async function fetchCareers(): Promise<Career[]> {
  const snapshot = await get(ref(db, "careers"))
  const data = snapshot.val()
  if (!data) return []

  return Object.entries(data)
    .map(([id, value]) => ({ ...(value as Omit<Career, 'id'>), id }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

// Fetch all subjects
export async function fetchSubjects(): Promise<Subject[]> {
  const snapshot = await get(ref(db, "subjects"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data).map(([id, value]) => ({ ...(value as Omit<Subject, 'id'>), id }))
}

// Fetch subject by ID
export async function fetchSubjectById(id: string): Promise<Subject | null> {
  const snapshot = await get(child(ref(db), `subjects/${id}`))
  if (!snapshot.exists()) return null
  return { ...snapshot.val(), id }
}

// Fetch reviews by professor ID
export async function fetchReviewsByProfessorId(professorId: string): Promise<Review[]> {
  const snapshot = await get(ref(db, "reviews"))
  const data = snapshot.val()
  if (!data) return []
  return Object.entries(data)
    .map(([id, value]) => ({ ...(value as Omit<Review, 'id'>), id }))
    .filter((review) => review.professorId === professorId)
}
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  AlertCircle,
  Plus,
  Save,
  School,
  BookOpen,
  User,
  MapPin,
  GraduationCap,
  HelpCircle,
  Info,
} from "lucide-react"
import { universities, provinces } from "@/lib/university-data"
import { fetchCareers, fetchSubjects, saveProfessor, saveSubject, saveCareer, professorExists } from "@/lib/database"

interface Subject {
  id: string
  name: string
  code?: string
  careerId: string
}

interface Career {
  id: string
  name: string
  universityId: string
  provinceId: string
}

export default function AddProfessorPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCareer, setSelectedCareer] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([])
  const [careers, setCareers] = useState<Career[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showProvinceFilter, setShowProvinceFilter] = useState(false)
  const [universityLocations, setUniversityLocations] = useState<{ id: string; name: string }[]>([])
  const [newCareerName, setNewCareerName] = useState("")
  const [showNewCareerForm, setShowNewCareerForm] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [newSubjectCode, setNewSubjectCode] = useState("")
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    if (!selectedUniversity) {
      setShowProvinceFilter(false)
      setUniversityLocations([])
      setCareers([])
      setSelectedProvince("")
      return
    }
    const university = universities.find((u) => u.id === selectedUniversity)
    if (!university) return

    const hasMultiple = university.locations.length > 1
    setShowProvinceFilter(hasMultiple)

    if (hasMultiple) {
      const locations = university.locations.map((loc) => {
        const province = provinces.find((p) => p.id === loc)
        return { id: loc, name: province?.name || loc }
      })
      setUniversityLocations(locations)
      if (!selectedProvince) {
        setCareers([])
        return
      }
    } else {
      setSelectedProvince(university.locations[0])
    }

    setIsLoading(true)
    fetchCareers()
      .then((all) => {
        const filtered = all.filter((c) => c.universityId === selectedUniversity)
        setCareers(filtered)
      })
      .finally(() => setIsLoading(false))
  }, [selectedUniversity, selectedProvince])

  useEffect(() => {
    if (!selectedCareer) {
      setAvailableSubjects([])
      setSelectedSubjects([])
      return
    }
    setIsLoading(true)
    fetchSubjects()
      .then((all) => {
        const filtered = all.filter((s) => s.careerId === selectedCareer)
        setAvailableSubjects(filtered)
      })
      .finally(() => setIsLoading(false))
  }, [selectedCareer])

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId],
    )
  }

  useEffect(() => {
    if (!name.trim() || !selectedUniversity || !selectedCareer || selectedSubjects.length === 0) return

    const checkProfessor = async () => {
      try {
        const exists = await professorExists(name, selectedUniversity, selectedCareer, selectedSubjects)

        setErrors((prev) => ({
          ...prev,
          name: exists ? "Este profesor ya está registrado para esta materia y universidad" : "",
        }))
      } catch (error) {
        console.error("Error al verificar profesor:", error)
      }
    }

    const timer = setTimeout(checkProfessor, 500)
    return () => clearTimeout(timer)
  }, [name, selectedUniversity, selectedCareer, selectedSubjects])

  const addNewSubject = async () => {
    if (!newSubjectName.trim()) return
    if (!selectedCareer) {
      alert("Debes seleccionar una carrera antes de agregar una materia.")
      return
    }
    const alreadyExists = availableSubjects.some((s) => s.name.toLowerCase() === newSubjectName.toLowerCase())
    if (alreadyExists) return

    const newSubject = {
      name: newSubjectName,
      code: newSubjectCode || undefined,
      careerId: selectedCareer,
    }

    const id = await saveSubject(newSubject)

    if (typeof id === "string") {
      const subjectWithId = { id, ...newSubject }
      setAvailableSubjects((prev) => [...prev, subjectWithId])
      setSelectedSubjects((prev) => [...prev, id])
      setNewSubjectName("")
      setNewSubjectCode("")
    }
  }

  const handleAddCareer = async () => {
    if (!newCareerName.trim() || !selectedUniversity || !selectedProvince) {
      alert("Debes seleccionar universidad y provincia antes de agregar una carrera.")
      return
    }
    const newCareer = {
      name: newCareerName,
      universityId: selectedUniversity,
      provinceId: selectedProvince,
    }

    const newId = await saveCareer(newCareer)
    if (typeof newId === "string") {
      const fullCareer = { id: newId, ...newCareer }
      setCareers((prev) => [...prev, fullCareer])
      setSelectedCareer(newId)
      setNewCareerName("")
      setShowNewCareerForm(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = "Debes ingresar el nombre del profesor"
    if (!selectedUniversity) newErrors.university = "Debes seleccionar una universidad"
    if (showProvinceFilter && !selectedProvince) newErrors.province = "Debes seleccionar una provincia"
    if (!selectedCareer) newErrors.career = "Debes seleccionar una carrera"
    if (selectedSubjects.length === 0) newErrors.subjects = "Debes seleccionar al menos una materia"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const newId = await saveProfessor({
        name,
        universityId: selectedUniversity,
        provinceId: selectedProvince,
        careerId: selectedCareer,
        subjects: selectedSubjects,
        averageRating: 0,
        totalReviews: 0,
      })
      router.push(`/professor/${newId}`)
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({
          ...prev,
          name: error.message.includes("Ya existe")
            ? "Este profesor ya está registrado para esta materia y universidad (nombre, universidad, carrera y materia)"
            : "Error al guardar el profesor",
        }))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <ChevronLeft size={18} /> Volver a la búsqueda
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Añadir Profesor</h1>
            <p className="text-slate-600 mt-2">Completa el formulario para añadir un nuevo profesor a la plataforma</p>
          </div>
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors self-start"
          >
            <HelpCircle size={18} /> {showHelp ? "Ocultar ayuda" : "Mostrar ayuda"}
          </button>
        </div>

        {showHelp && (
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Info size={18} className="text-sky-600" /> Cómo añadir un profesor
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Completa todos los campos marcados con asterisco (*)</li>
              <li>Si no encuentras la carrera o materia, puedes añadirla usando los botones correspondientes</li>
              <li>Puedes seleccionar múltiples materias para un mismo profesor</li>
              <li>El sistema verificará automáticamente si el profesor ya existe para evitar duplicados</li>
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

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label
                htmlFor="professor-name"
                className="block text-sm font-medium text-slate-800 items-center gap-1"
              >
                <User size={16} className="text-sky-600" /> Nombre del Profesor *
              </label>
              <input
                id="professor-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-md px-4 py-2 border ${
                  errors.name ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-sky-200"
                } focus:border-sky-500 focus:ring focus:ring-opacity-50 text-slate-800`}
                placeholder="Ej: Juan Pérez"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="university" className="block text-sm font-medium text-slate-800 items-center gap-1">
                <School size={16} className="text-sky-600" /> Universidad *
              </label>
              <select
                id="university"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className={`w-full rounded-md px-4 py-2 border ${
                  errors.university ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-sky-200"
                } focus:border-sky-500 focus:ring focus:ring-opacity-50 text-slate-800`}
              >
                <option value="">Seleccionar universidad</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              {errors.university && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.university}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {showProvinceFilter && (
              <div className="space-y-2">
                <label htmlFor="province" className="block text-sm font-medium text-slate-800 items-center gap-1">
                  <MapPin size={16} className="text-sky-600" /> Provincia *
                </label>
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className={`w-full rounded-md px-4 py-2 border ${
                    errors.province ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-sky-200"
                  } focus:border-sky-500 focus:ring focus:ring-opacity-50 text-slate-800`}
                >
                  <option value="">Seleccionar provincia</option>
                  {universityLocations.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.province}
                  </p>
                )}
              </div>
            )}

            <div className={showProvinceFilter ? "" : "md:col-span-2"}>
              <div className="space-y-2">
                <label htmlFor="career" className="block text-sm font-medium text-slate-800 items-center gap-1">
                  <GraduationCap size={16} className="text-sky-600" /> Carrera *
                </label>
                <select
                  id="career"
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                  className={`w-full rounded-md px-4 py-2 border ${
                    errors.career ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-sky-200"
                  } focus:border-sky-500 focus:ring focus:ring-opacity-50 text-slate-800`}
                >
                  <option value="">Seleccionar carrera</option>
                  {careers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.career && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.career}
                  </p>
                )}
                {!showNewCareerForm ? (
                  <button
                    type="button"
                    onClick={() => setShowNewCareerForm(true)}
                    className="text-sky-600 text-sm mt-2 hover:text-sky-800 underline transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} /> ¿No ves la carrera? Haz clic aquí para agregar una nueva
                  </button>
                ) : null}
              </div>

              {showNewCareerForm && (
                <div className="mt-4 p-4 bg-sky-50 rounded-lg border border-sky-100">
                  <h3 className="font-medium text-slate-800 mb-3 flex items-center gap-1">
                    <Plus size={16} className="text-sky-600" /> Nueva Carrera
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="new-career" className="block text-sm font-medium text-slate-700 mb-1">
                        Nombre de la nueva carrera
                      </label>
                      <input
                        id="new-career"
                        type="text"
                        value={newCareerName}
                        onChange={(e) => setNewCareerName(e.target.value)}
                        className="w-full rounded-md px-4 py-2 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800"
                        placeholder="Ej: Ingeniería Civil"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAddCareer}
                        disabled={!newCareerName.trim() || !selectedUniversity || !selectedProvince}
                        className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        <Save size={16} /> Guardar carrera
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewCareerForm(false)}
                        className="border border-slate-200 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Middle Ad Banner - Clearly labeled */}
          {selectedCareer && (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
              <div className="h-[90px] bg-slate-100 flex items-center justify-center">
                <p className="text-slate-400 text-sm">Anuncio</p>
              </div>
            </div>
          )}

          {selectedCareer && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-4 text-lg flex items-center gap-2">
                <BookOpen size={18} className="text-sky-600" />
                {availableSubjects.length === 0 ? "Agregar la primera materia" : "Materias"}
              </h3>

              {availableSubjects.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {availableSubjects.map((subject) => (
                      <div
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        className={`p-3 rounded-md cursor-pointer border transition-colors ${
                          selectedSubjects.includes(subject.id)
                            ? "bg-sky-100 border-sky-300"
                            : "bg-white border-slate-200 hover:border-sky-200"
                        }`}
                        role="checkbox"
                        aria-checked={selectedSubjects.includes(subject.id)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            toggleSubject(subject.id)
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center ${
                              selectedSubjects.includes(subject.id)
                                ? "bg-sky-600 text-white"
                                : "border border-slate-300"
                            }`}
                          >
                            {selectedSubjects.includes(subject.id) && <span className="text-xs">✓</span>}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{subject.name}</p>
                            {subject.code && <p className="text-xs text-slate-500">{subject.code}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.subjects && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.subjects}
                    </p>
                  )}
                </div>
              )}

              <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-1">
                  <Plus size={16} className="text-sky-600" />
                  {availableSubjects.length === 0 ? "Nueva materia" : "Agregar otra materia"}
                </h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="subject-name" className="block text-sm font-medium text-slate-700 mb-1">
                        Nombre de la materia *
                      </label>
                      <input
                        id="subject-name"
                        type="text"
                        placeholder="Ej: Análisis Matemático"
                        className="w-full rounded-md px-4 py-2 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject-code" className="block text-sm font-medium text-slate-700 mb-1">
                        Código (opcional)
                      </label>
                      <input
                        id="subject-code"
                        type="text"
                        placeholder="Ej: AM-101"
                        className="w-full rounded-md px-4 py-2 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 text-slate-800"
                        value={newSubjectCode}
                        onChange={(e) => setNewSubjectCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addNewSubject}
                    disabled={!newSubjectName.trim() || !selectedCareer}
                    className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} /> Guardar materia
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-sky-600 text-white px-8 py-3 rounded-md hover:bg-sky-700 disabled:bg-sky-400 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} /> Guardar Profesor
                </>
              )}
            </button>
          </div>
        </form>

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

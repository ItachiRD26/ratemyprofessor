"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, AlertCircle, Plus, Save } from "lucide-react"
import { universities, provinces } from "@/lib/university-data"
import { fetchCareers, fetchSubjects, saveProfessor, saveSubject, saveCareer } from "@/lib/database"

export default function AddProfessorPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCareer, setSelectedCareer] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [availableSubjects, setAvailableSubjects] = useState<any[]>([])
  const [careers, setCareers] = useState<any[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showProvinceFilter, setShowProvinceFilter] = useState(false)
  const [universityLocations, setUniversityLocations] = useState<{ id: string; name: string }[]>([])
  const [newCareerName, setNewCareerName] = useState("")
  const [showNewCareerForm, setShowNewCareerForm] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [newSubjectCode, setNewSubjectCode] = useState("")

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
        const filtered = all.filter(
          (c) => c.universityId === selectedUniversity
        )        
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
    console.log("Guardando carrera:", newCareer)
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
        subjects: selectedSubjects,
        averageRating: 0,
        totalReviews: 0,
      })
      router.push(`/professor/${newId}`)
    } catch (error) {
      console.error("Error al guardar profesor:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            <ChevronLeft size={18} /> Volver a la búsqueda
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Añadir Profesor</h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">Nombre del Profesor *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-md px-4 py-2 border ${
                  errors.name ? "border-red-500 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
                } focus:border-blue-500 focus:ring focus:ring-opacity-50 text-gray-800`}
                placeholder="Ej: Juan Pérez"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">Universidad *</label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className={`w-full rounded-md px-4 py-2 ${
                  errors.university ? "border-red-500 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
                } focus:border-blue-500 focus:ring focus:ring-opacity-50 text-gray-800`}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {showProvinceFilter && (
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">Provincia *</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className={`w-full rounded-md px-4 py-2 ${
                    errors.province ? "border-red-500 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
                  } focus:border-blue-500 focus:ring focus:ring-opacity-50 text-gray-800`}
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
              <label className="block text-sm font-medium text-blue-800 mb-2">Carrera *</label>
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className={`w-full rounded-md px-4 py-2 ${
                  errors.career ? "border-red-500 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
                } focus:border-blue-500 focus:ring focus:ring-opacity-50 text-gray-800`}
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
                  className="text-blue-700 text-sm mt-2 hover:text-blue-900 underline transition-colors"
                >
                  ¿No ves la carrera? Haz clic aquí para agregar una nueva
                </button>
              ) : (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-3">Nueva Carrera</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Nombre de la nueva carrera</label>
                      <input
                        type="text"
                        value={newCareerName}
                        onChange={(e) => setNewCareerName(e.target.value)}
                        className="w-full rounded-md px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
                        placeholder="Ej: Ingeniería Civil"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAddCareer}
                        disabled={!newCareerName.trim() || !selectedUniversity || !selectedProvince}
                        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        <Save size={16} /> Guardar carrera
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewCareerForm(false)}
                        className="border border-blue-200 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {selectedCareer && (
            <div className="pt-6 border-t border-blue-100">
              <h3 className="font-medium text-blue-900 mb-4 text-lg">
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
                            ? "bg-blue-100 border-blue-300"
                            : "bg-white border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center ${
                              selectedSubjects.includes(subject.id)
                                ? "bg-blue-700 text-white"
                                : "border border-gray-300"
                            }`}
                          >
                            {selectedSubjects.includes(subject.id) && <span className="text-xs">✓</span>}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{subject.name}</p>
                            {subject.code && <p className="text-xs text-gray-500">{subject.code}</p>}
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

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-3">
                  {availableSubjects.length === 0 ? "Nueva materia" : "Agregar otra materia"}
                </h4>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Nombre de la materia *</label>
                      <input
                        type="text"
                        placeholder="Ej: Análisis Matemático"
                        className="w-full rounded-md px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Código (opcional)</label>
                      <input
                        type="text"
                        placeholder="Ej: AM-101"
                        className="w-full rounded-md px-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800"
                        value={newSubjectCode}
                        onChange={(e) => setNewSubjectCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addNewSubject}
                    disabled={!newSubjectName.trim() || !selectedCareer}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} /> Guardar materia
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-blue-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-700 text-white px-8 py-3 rounded-md hover:bg-blue-800 disabled:bg-blue-400 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 flex items-center gap-2"
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
      </div>
    </div>
  )
}

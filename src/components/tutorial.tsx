"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Search, Star, BookOpen, School, Plus,
  ChevronRight, ChevronLeft, X, Sparkles,
  GraduationCap, MessageSquare, ThumbsUp, Shield,
} from "lucide-react"

// ── Tipos ──────────────────────────────────────────────────────────────────
interface TutorialStep {
  id: string
  targetId?: string        // ID del elemento del DOM a resaltar (opcional)
  icon: React.ReactNode
  badge: string            // Número de paso o emoji
  title: string
  description: string
  position?: "top" | "bottom" | "left" | "right" | "center"
  highlight?: boolean      // Si debe iluminar el elemento
}

interface SiteTutorialProps {
  /** Mostrar automáticamente en la primera visita */
  autoShow?: boolean
  /** Botón externo para abrir el tutorial */
  triggerLabel?: string
  showTriggerButton?: boolean
}

// ── Pasos del tutorial ─────────────────────────────────────────────────────
const STEPS: TutorialStep[] = [
  {
    id: "welcome",
    icon: <Sparkles className="w-8 h-8 text-sky-500" />,
    badge: "👋",
    title: "Bienvenido a RateMyProfessorRD",
    description:
      "La plataforma donde estudiantes dominicanos comparten experiencias académicas de forma 100% anónima. En 2 minutos te explicamos todo lo que puedes hacer aquí.",
    position: "center",
  },
  {
    id: "search-university",
    targetId: "tutorial-university-select",
    icon: <School className="w-8 h-8 text-sky-500" />,
    badge: "1",
    title: "Elige tu universidad",
    description:
      "Empieza seleccionando tu universidad. Tenemos más de 15 universidades de República Dominicana. Si tu universidad tiene múltiples recintos, podrás filtrar también por provincia.",
    position: "bottom",
    highlight: true,
  },
  {
    id: "search-career",
    targetId: "tutorial-career-select",
    icon: <GraduationCap className="w-8 h-8 text-sky-500" />,
    badge: "2",
    title: "Filtra por carrera y materia",
    description:
      "Una vez elegida la universidad, selecciona tu carrera y la materia específica para ver solo los profesores relevantes para ti.",
    position: "bottom",
    highlight: true,
  },
  {
    id: "search-name",
    targetId: "tutorial-search-input",
    icon: <Search className="w-8 h-8 text-sky-500" />,
    badge: "3",
    title: "Busca por nombre",
    description:
      "¿Ya sabes el nombre del profesor? Escríbelo directamente aquí y lo encontrarás al instante sin necesidad de filtros.",
    position: "bottom",
    highlight: true,
  },
  {
    id: "results",
    targetId: "tutorial-results",
    icon: <Star className="w-8 h-8 text-amber-400" />,
    badge: "4",
    title: "Explora los resultados",
    description:
      "Cada tarjeta muestra el nombre del profesor, su universidad y su calificación promedio según las reseñas de otros estudiantes. Haz clic en cualquier tarjeta para ver el perfil completo.",
    position: "top",
    highlight: true,
  },
  {
    id: "professor-profile",
    icon: <MessageSquare className="w-8 h-8 text-sky-500" />,
    badge: "5",
    title: "El perfil del profesor",
    description:
      "En el perfil verás: calificación promedio con estrellas, distribución de notas, porcentaje de estudiantes que lo tomarían de nuevo, dificultad promedio y todas las reseñas detalladas de otros estudiantes.",
    position: "center",
  },
  {
    id: "add-review",
    icon: <BookOpen className="w-8 h-8 text-sky-500" />,
    badge: "6",
    title: "Añade tu reseña",
    description:
      "Dentro del perfil de cualquier profesor encontrarás el botón \"Añadir reseña\". Podrás dar una calificación del 1 al 5, indicar la dificultad, si lo tomarías de nuevo y dejar un comentario. Todo de forma completamente anónima.",
    position: "center",
  },
  {
    id: "vote-reviews",
    icon: <ThumbsUp className="w-8 h-8 text-sky-500" />,
    badge: "7",
    title: "Vota las reseñas",
    description:
      "¿Una reseña te fue útil? Puedes dar 👍 o 👎 a cualquier reseña. Tu voto se guarda en tu dispositivo para que no puedas votar dos veces, y nunca se asocia a tu identidad.",
    position: "center",
  },
  {
    id: "add-professor",
    targetId: "tutorial-add-professor",
    icon: <Plus className="w-8 h-8 text-sky-500" />,
    badge: "8",
    title: "¿No encuentras a tu profesor?",
    description:
      "Si tu profesor aún no está registrado, puedes añadirlo tú mismo. Solo necesitas su nombre, universidad, carrera y materia. Así otros estudiantes podrán calificarlo también.",
    position: "top",
    highlight: true,
  },
  {
    id: "privacy",
    icon: <Shield className="w-8 h-8 text-emerald-500" />,
    badge: "🔒",
    title: "Tu privacidad está protegida",
    description:
      "Todas las reseñas son 100% anónimas. No necesitas registrarte, ni creamos una cuenta. No almacenamos tu IP ni ningún dato personal junto a tus reseñas. Puedes usar la plataforma con total tranquilidad.",
    position: "center",
  },
]

const STORAGE_KEY = "rmprd_tutorial_done"

// ── Componente principal ───────────────────────────────────────────────────
export default function SiteTutorial({
  autoShow = true,
  showTriggerButton = true,
  triggerLabel = "¿Cómo funciona?",
}: SiteTutorialProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const step = STEPS[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === STEPS.length - 1
  const progress = ((currentStep + 1) / STEPS.length) * 100

  // Auto-mostrar en la primera visita
  useEffect(() => {
    if (!autoShow) return
    const done = localStorage.getItem(STORAGE_KEY)
    if (!done) {
      const timer = setTimeout(() => setIsOpen(true), 800)
      return () => clearTimeout(timer)
    }
  }, [autoShow])

  // Recalcular posición del elemento resaltado
  useEffect(() => {
    if (!isOpen || !step.targetId) {
      setTargetRect(null)
      return
    }

    const updateRect = () => {
      const el = document.getElementById(step.targetId!)
      if (el) {
        const rect = el.getBoundingClientRect()
        setTargetRect(rect)
        // Scroll suave al elemento
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      } else {
        setTargetRect(null)
      }
    }

    updateRect()
    window.addEventListener("resize", updateRect)
    window.addEventListener("scroll", updateRect)
    return () => {
      window.removeEventListener("resize", updateRect)
      window.removeEventListener("scroll", updateRect)
    }
  }, [isOpen, currentStep, step.targetId])

  const animateTransition = useCallback((fn: () => void) => {
    setIsAnimating(true)
    setTimeout(() => {
      fn()
      setIsAnimating(false)
    }, 180)
  }, [])

  const goNext = useCallback(() => {
    if (isLast) return close()
    animateTransition(() => setCurrentStep((s) => s + 1))
  }, [isLast, animateTransition])

  const goPrev = useCallback(() => {
    if (isFirst) return
    animateTransition(() => setCurrentStep((s) => s - 1))
  }, [isFirst, animateTransition])

  const close = useCallback(() => {
    setIsOpen(false)
    setCurrentStep(0)
    localStorage.setItem(STORAGE_KEY, "true")
  }, [])

  const open = useCallback(() => {
    setCurrentStep(0)
    setIsOpen(true)
  }, [])

  // Teclado
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") goNext()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, goNext, goPrev, close])

  // ── Calcular posición del tooltip ────────────────────────────────────────
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect || step.position === "center" || !step.targetId) {
      return {}
    }

    const MARGIN = 16
    const tooltipW = Math.min(360, window.innerWidth - 32)

    let top = 0
    let left = 0

    if (step.position === "bottom") {
      top = targetRect.bottom + MARGIN
      left = Math.max(16, Math.min(
        targetRect.left + targetRect.width / 2 - tooltipW / 2,
        window.innerWidth - tooltipW - 16
      ))
    } else if (step.position === "top") {
      top = targetRect.top - MARGIN - 10 // se ajusta con transform
      left = Math.max(16, Math.min(
        targetRect.left + targetRect.width / 2 - tooltipW / 2,
        window.innerWidth - tooltipW - 16
      ))
    }

    return { position: "fixed", top, left, width: tooltipW }
  }

  const isCentered = step.position === "center" || !step.targetId || !targetRect

  return (
    <>
      {/* ── Botón de apertura ── */}
      {showTriggerButton && (
        <button
          onClick={open}
          className="inline-flex items-center gap-2 bg-white text-sky-700 border border-sky-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-sky-50 hover:border-sky-300 transition-all shadow-sm"
          aria-label="Abrir tutorial"
        >
          <Sparkles size={15} className="text-sky-500" />
          {triggerLabel}
        </button>
      )}

      {/* ── Overlay ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          style={{
            background: targetRect && !isCentered
              ? "rgba(0,0,0,0.55)"
              : "rgba(0,0,0,0.6)",
          }}
          onClick={close}
          aria-hidden="true"
        >
          {/* Spotlight sobre el elemento resaltado */}
          {targetRect && !isCentered && (
            <div
              style={{
                position: "fixed",
                top: targetRect.top - 6,
                left: targetRect.left - 6,
                width: targetRect.width + 12,
                height: targetRect.height + 12,
                borderRadius: 12,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                pointerEvents: "none",
                zIndex: 9998,
                border: "2px solid rgba(56,189,248,0.8)",
                background: "transparent",
              }}
            />
          )}
        </div>
      )}

      {/* ── Tooltip / Modal ── */}
      {isOpen && (
        <div
          className="z-[9999]"
          style={
            isCentered
              ? {
                  position: "fixed",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                  pointerEvents: "none",
                }
              : { ...getTooltipStyle(), zIndex: 9999 }
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            style={{
              width: isCentered ? Math.min(440, window.innerWidth - 32) : "100%",
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(6px) scale(0.98)" : "translateY(0) scale(1)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            {/* Barra de progreso */}
            <div className="h-1 bg-slate-100">
              <div
                className="h-1 bg-sky-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Contenido */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-sky-500 uppercase tracking-wider">
                      Paso {currentStep + 1} de {STEPS.length}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight mt-0.5">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={close}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 flex-shrink-0 ml-2"
                  aria-label="Cerrar tutorial"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Descripción */}
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                {step.description}
              </p>

              {/* Indicadores de paso */}
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => animateTransition(() => setCurrentStep(i))}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentStep
                        ? "w-6 h-2 bg-sky-500"
                        : i < currentStep
                        ? "w-2 h-2 bg-sky-300"
                        : "w-2 h-2 bg-slate-200"
                    }`}
                    aria-label={`Ir al paso ${i + 1}`}
                  />
                ))}
              </div>

              {/* Botones */}
              <div className="flex items-center gap-3">
                {!isFirst && (
                  <button
                    onClick={goPrev}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    <ChevronLeft size={16} /> Anterior
                  </button>
                )}

                <button
                  onClick={goNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  {isLast ? (
                    <>¡Entendido, empezar! <Sparkles size={15} /></>
                  ) : (
                    <>Siguiente <ChevronRight size={16} /></>
                  )}
                </button>
              </div>

              {/* Atajo de teclado */}
              <p className="text-center text-xs text-slate-400 mt-3">
                Usa las teclas ← → para navegar · Esc para cerrar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
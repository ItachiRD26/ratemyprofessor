"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) setShowBanner(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4">
      <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-sky-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie size={18} className="text-sky-400" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-white mb-1">
              Uso de cookies
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Usamos cookies esenciales para que el sitio funcione correctamente (por ejemplo,
              para recordar tus votos en reseñas). No usamos cookies de rastreo publicitario
              sin tu permiso. Lee nuestra{" "}
              <Link href="/privacy-politics" className="text-sky-400 hover:text-sky-300 underline">
                política de privacidad
              </Link>
              .
            </p>
          </div>

          <button
            onClick={handleReject}
            aria-label="Cerrar sin aceptar"
            className="text-slate-500 hover:text-slate-300 flex-shrink-0 transition-colors mt-0.5"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 mt-4 justify-end">
          <button
            onClick={handleReject}
            className="text-xs text-slate-400 hover:text-white px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors"
          >
            Solo esenciales
          </button>
          <button
            onClick={handleAccept}
            className="text-xs bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl transition-colors font-medium"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
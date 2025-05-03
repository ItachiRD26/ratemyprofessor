// components/cookie-banner.tsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (consent !== 'accepted') {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro{' '}
          <Link href="/privacy-politics" className="underline hover:text-blue-300">
            uso de cookies
          </Link>.
        </div>
        <div className="flex gap-2">
          <button 
            onClick={acceptCookies}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
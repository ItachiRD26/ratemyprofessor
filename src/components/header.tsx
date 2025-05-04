"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X, Home, Info, School, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-gradient-to-r from-sky-50 to-white border-b border-sky-100"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 relative">
            <Image
              src="/logo.png"
              alt="RateMyProf RD Logo"
              fill
              sizes="48px"
              priority
              className="drop-shadow-sm object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
              RateMyProf <span className="text-sky-600">RD</span>
            </span>
            <span className="text-xs text-sky-600 hidden sm:block">Califica a tus profesores</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          <Link
            href="/"
            className="text-slate-800 font-medium hover:text-sky-600 transition-colors flex items-center gap-1.5 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-sky-600 after:transition-all hover:after:w-full"
          >
            <Home size={16} />
            Inicio
          </Link>
          <Link
            href="/about"
            className="text-slate-800 font-medium hover:text-sky-600 transition-colors flex items-center gap-1.5 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-sky-600 after:transition-all hover:after:w-full"
          >
            <Info size={16} />
            Acerca de
          </Link>
          <Link
            href="/search"
            className="text-slate-800 font-medium hover:text-sky-600 transition-colors flex items-center gap-1.5 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-sky-600 after:transition-all hover:after:w-full"
          >
            <School size={16} />
            Universidades
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
          >
            <Search size={18} />
            <span className="hidden sm:inline">Buscar</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-800 hover:text-sky-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-sky-100 shadow-md">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link
              href="/"
              className="text-slate-800 font-medium py-3 hover:bg-sky-50 px-3 rounded transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="text-sky-600" />
              Inicio
            </Link>
            <Link
              href="/about"
              className="text-slate-800 font-medium py-3 hover:bg-sky-50 px-3 rounded transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={18} className="text-sky-600" />
              Acerca de
            </Link>
            <Link
              href="/search"
              className="text-slate-800 font-medium py-3 hover:bg-sky-50 px-3 rounded transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <School size={18} className="text-sky-600" />
              Universidades
            </Link>
            <Link
              href="/add-professor"
              className="text-slate-800 font-medium py-3 hover:bg-sky-50 px-3 rounded transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={18} className="text-sky-600" />
              Añadir profesor
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

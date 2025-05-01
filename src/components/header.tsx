"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 relative">
            <Image
              src="/logo.png"
              alt="RateMyProf RD Logo"
              layout="fill"
              objectFit="contain"
              priority
              className="drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
              RateMyProf <span className="text-black">RD</span>
            </span>
            <span className="text-xs text-blue-600 hidden sm:block">Califica a tus profesores</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          <Link
            href="/"
            className="text-blue-800 font-medium hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className="text-blue-800 font-medium hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Acerca de
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
          >
            <Search size={18} />
            <span className="hidden sm:inline">Buscar</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-800 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 shadow-md">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link
              href="/"
              className="text-blue-800 font-medium py-2 hover:bg-blue-50 px-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/about"
              className="text-blue-800 font-medium py-2 hover:bg-blue-50 px-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Acerca de
            </Link>
            <Link
              href="/universities"
              className="text-blue-800 font-medium py-2 hover:bg-blue-50 px-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Universidades
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

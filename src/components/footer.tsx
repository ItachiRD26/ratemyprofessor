import Link from "next/link"
import { Mail, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-sky-400">RateMyProfessorRD</h3>
            <p className="text-slate-300 mb-4 max-w-md">
              Plataforma para estudiantes universitarios de República Dominicana que permite calificar y compartir
              experiencias sobre profesores de forma anónima.
            </p>
            <div className="flex">
              <a
                href="mailto:contacto@ratemyprofessorrd.com"
                className="text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-2"
                aria-label="Email"
                title="Email"
              >
                <Mail size={18} /> contacto@ratemyprofessorrd.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-slate-300 hover:text-white transition-colors">
                  Buscar profesores
                </Link>
              </li>
              <li>
                <Link href="/add-professor" className="text-slate-300 hover:text-white transition-colors">
                  Añadir profesor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms-conditions" className="text-slate-300 hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy-politics" className="text-slate-300 hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 mt-6 text-center text-slate-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} RateMyProfessorRD. Todos los derechos reservados.</p>
          <p className="flex items-center justify-center gap-1">
            Hecho con <Heart size={14} className="text-red-500 fill-red-500" /> en República Dominicana
          </p>
        </div>
      </div>
    </footer>
  )
}

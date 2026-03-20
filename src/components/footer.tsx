import Link from "next/link"
import { Mail, Heart, Shield, FileText } from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3 text-white">
              RateMyProf<span className="text-sky-400">RD</span>
            </h3>
            <p className="text-slate-400 mb-5 text-sm leading-relaxed max-w-xs">
              Plataforma 100% anónima para estudiantes universitarios de República Dominicana.
              Comparte y descubre experiencias académicas de forma libre y honesta.
            </p>
            <a
              href="mailto:contacto@ratemyprofessorrd.com"
              className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2 text-sm"
              aria-label="Enviar correo"
            >
              <Mail size={16} />
              contacto@ratemyprofessorrd.com
            </a>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-slate-300 uppercase tracking-wider">
              Navegar
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Inicio" },
                { href: "/search", label: "Buscar profesores" },
                { href: "/add-professor", label: "Añadir profesor" },
                { href: "/about", label: "Acerca de" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-slate-300 uppercase tracking-wider">
              Legal y privacidad
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/terms-conditions", label: "Términos y condiciones", Icon: FileText },
                { href: "/privacy-politics", label: "Política de privacidad", Icon: Shield },
                { href: "/about", label: "Contacto", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <Icon size={13} className="text-slate-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Badge de anonimato */}
            <div className="mt-5 bg-slate-800 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Shield size={13} className="text-sky-400" />
                <span>
                  Reseñas{" "}
                  <strong className="text-sky-400">100% anónimas</strong> — sin registro requerido
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs">
          <p>&copy; {year} RateMyProfessorRD. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            Hecho con <Heart size={12} className="text-red-500 fill-red-500" /> en República
            Dominicana
          </p>
        </div>
      </div>
    </footer>
  )
}
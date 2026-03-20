import {
  Search,
  MessageSquare,
  Shield,
  UserCheck,
  FileCheck,
  Info,
  Mail,
  AlertTriangle,
  Scale,
  EyeOff,
  Heart,
} from "lucide-react"
import Link from "next/link"
import AdBanner from "@/components/ad-banner"

const ADS = {
  KEY_728x90:  "28848673",
  KEY_300x250: "26470285",
}

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Encabezado */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Acerca de RateMyProfessorRD
          </h1>
          <p className="text-slate-600 text-lg">
            Una plataforma independiente creada por estudiantes, para estudiantes.
          </p>
        </div>

        {/* ── AVISO LEGAL DESTACADO ── */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={22} />
            <div>
              <h2 className="font-bold text-amber-800 mb-1 text-base">Aviso importante</h2>
              <p className="text-sm text-amber-700 leading-relaxed">
                RateMyProfessorRD es una plataforma <strong>independiente y no afiliada</strong> a
                ninguna universidad, institución educativa, gobierno ni organismo oficial de República
                Dominicana. Los nombres de universidades o instituciones que puedan aparecer en las
                reseñas de los usuarios son utilizados únicamente como referencia descriptiva, de la
                misma forma que un periódico menciona una institución al cubrir una noticia. No
                representamos, respaldamos ni tenemos ningún acuerdo con ninguna entidad educativa.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* ── Columna principal ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Misión */}
            <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Info className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-2xl text-slate-900 font-bold">¿Qué es RateMyProfessorRD?</h2>
              </div>
              <div className="space-y-4 text-slate-700">
                <p className="leading-relaxed">
                  RateMyProfessorRD es una plataforma digital independiente donde estudiantes
                  universitarios de República Dominicana pueden compartir, de forma completamente
                  anónima, sus experiencias académicas con profesores.
                </p>
                <p className="leading-relaxed">
                  Fue creada por estudiantes, sin fines de lucro directo, con el único objetivo de
                  que la comunidad estudiantil dominicana pueda tomar decisiones académicas más
                  informadas. Ninguna reseña está vinculada a la identidad de quien la publica.
                </p>
                <p className="leading-relaxed">
                  Esta plataforma opera bajo los principios de libertad de expresión responsable.
                  Las opiniones aquí expresadas pertenecen exclusivamente a sus autores y no
                  representan la posición de RateMyProfessorRD ni de ninguna institución.
                </p>
              </div>
            </section>

            {/* Cómo funciona */}
            <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Search className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Cómo funciona</h2>
              </div>
              <div className="space-y-8">
                {[
                  {
                    n: "1",
                    title: "Busca un profesor",
                    desc: "Busca por nombre de profesor. Si no aparece todavía, cualquier usuario puede añadirlo. No se requiere cuenta ni registro.",
                  },
                  {
                    n: "2",
                    title: "Lee las reseñas",
                    desc: "Consulta las calificaciones, nivel de dificultad y comentarios de otros estudiantes para orientar tus decisiones académicas.",
                  },
                  {
                    n: "3",
                    title: "Publica tu reseña de forma anónima",
                    desc: "Comparte tu experiencia sin revelar tu identidad. No guardamos tu nombre, correo ni ningún dato personal junto a tu reseña.",
                  },
                ].map((item) => (
                  <div key={item.n} className="flex gap-6">
                    <div className="w-14 h-14 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                      {item.n}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-slate-800">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Compromisos */}
            <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Nuestros compromisos</h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    Icon: EyeOff,
                    title: "Anonimato real",
                    desc: "Las reseñas no están vinculadas a ningún dato personal. No requerimos registro. Los votos se almacenan solo en tu dispositivo.",
                    color: "border-emerald-400 bg-emerald-50",
                  },
                  {
                    Icon: MessageSquare,
                    title: "Moderación de contenido",
                    desc: "No permitimos insultos, amenazas, información personal de terceros ni contenido ofensivo. Las reseñas que violen estas normas son eliminadas.",
                    color: "border-sky-500 bg-sky-50",
                  },
                  {
                    Icon: FileCheck,
                    title: "Transparencia",
                    desc: "Somos claros sobre lo que somos: una plataforma de opinión estudiantil, independiente y sin afiliación institucional.",
                    color: "border-sky-500 bg-sky-50",
                  },
                  {
                    Icon: UserCheck,
                    title: "Respeto a los profesores",
                    desc: "Si un profesor considera que una reseña contiene información falsa o difamatoria, puede contactarnos para solicitar su revisión.",
                    color: "border-sky-500 bg-sky-50",
                  },
                ].map(({ Icon, title, desc, color }) => (
                  <div key={title} className={`p-5 rounded-lg border-l-4 ${color}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-5 w-5 text-sky-600 flex-shrink-0" />
                      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Descargo de responsabilidad */}
            <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Scale className="h-5 w-5 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Descargo de responsabilidad</h2>
              </div>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  RateMyProfessorRD actúa como plataforma intermediaria de opiniones. El contenido
                  publicado por los usuarios es responsabilidad exclusiva de quienes lo generan.
                  No verificamos la identidad de los usuarios ni la veracidad de cada reseña.
                </p>
                <p>
                  El uso de nombres de profesores en esta plataforma es legal bajo el principio de
                  libertad de expresión sobre figuras públicas en el ejercicio de sus funciones
                  profesionales, ampliamente reconocido en las legislaciones de países
                  democráticos, incluyendo la República Dominicana.
                </p>
                <p>
                  <strong className="text-slate-700">
                    RateMyProfessorRD no está afiliado, patrocinado ni avalado por ninguna
                    universidad, institución educativa ni organismo gubernamental.
                  </strong>{" "}
                  Los nombres de instituciones que aparezcan en el contenido generado por usuarios
                  son utilizados de forma meramente referencial.
                </p>
                <p>
                  Para solicitudes legales, eliminación de contenido o cualquier reclamación,
                  contáctanos directamente en{" "}
                  <a
                    href="mailto:contacto@ratemyprofessorrd.com"
                    className="text-sky-600 hover:underline font-medium"
                  >
                    contacto@ratemyprofessorrd.com
                  </a>
                  . Respondemos en un plazo máximo de 72 horas.
                </p>
              </div>

              {/* Links legales */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-3">
                <Link
                  href="/terms-conditions"
                  className="inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-medium bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100 transition-colors"
                >
                  <Shield size={14} /> Términos y Condiciones
                </Link>
                <Link
                  href="/privacy-politics"
                  className="inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-medium bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100 transition-colors"
                >
                  <EyeOff size={14} /> Política de Privacidad
                </Link>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-xl shadow-md p-6 md:p-8 text-white text-center">
              <Heart className="w-10 h-10 mx-auto mb-3 text-sky-200" />
              <h2 className="text-2xl font-bold mb-3">Hecho por y para estudiantes dominicanos</h2>
              <p className="mb-6 text-sky-100 max-w-xl mx-auto text-sm">
                Esta plataforma existe gracias a la comunidad. Cada reseña que publicas ayuda a
                otro estudiante a tomar una mejor decisión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 px-6 py-3 rounded-md font-medium hover:bg-sky-50 transition-colors shadow-md"
                >
                  <Search size={18} /> Buscar profesores
                </Link>
                <Link
                  href="/add-professor"
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white border border-sky-400 px-6 py-3 rounded-md font-medium hover:bg-sky-600 transition-colors shadow-md"
                >
                  Añadir profesor
                </Link>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-8">

            {/* Contacto */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-sky-600" /> Contáctanos
              </h2>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                ¿Tienes preguntas, sugerencias, o eres un profesor que quiere solicitar la revisión
                de una reseña? Escríbenos.
              </p>
              <a
                href="mailto:contacto@ratemyprofessorrd.com"
                className="text-sky-600 hover:text-sky-800 font-medium text-sm block mb-3 break-all"
              >
                contacto@ratemyprofessorrd.com
              </a>
              <p className="text-slate-400 text-xs">
                Respondemos en menos de 72 horas.
              </p>
            </section>

            {/* Preguntas frecuentes rápidas */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-xl font-bold mb-4 text-slate-900">Preguntas frecuentes</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "¿Están afiliados a alguna universidad?",
                    a: "No. Somos una plataforma 100% independiente, sin afiliación a ninguna institución educativa.",
                  },
                  {
                    q: "¿Las reseñas son realmente anónimas?",
                    a: "Sí. No guardamos tu identidad, correo ni IP vinculados a tus reseñas. No necesitas crear una cuenta.",
                  },
                  {
                    q: "¿Soy profesor y quiero eliminar una reseña falsa?",
                    a: "Contáctanos al correo con la URL de la reseña y la razón. Revisamos cada caso en 72 horas.",
                  },
                  {
                    q: "¿Quién puede publicar reseñas?",
                    a: "Cualquier persona. Aunque confiamos en que quienes publican son estudiantes actuales o egresados.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="font-semibold text-slate-800 text-sm mb-1">{q}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* AD sidebar: 300×250 */}
            <AdBanner adKey={ADS.KEY_300x250} width={300} height={250} />
          </div>
        </div>

        {/* AD bottom: 728×90 desktop / 300×250 mobile */}
        <div className="mt-12 flex justify-center max-w-6xl mx-auto">
          <div className="hidden md:block">
            <AdBanner adKey={ADS.KEY_728x90} width={728} height={90} />
          </div>
          <div className="md:hidden">
            <AdBanner adKey={ADS.KEY_300x250} width={300} height={250} />
          </div>
        </div>

      </div>
    </div>
  )
}
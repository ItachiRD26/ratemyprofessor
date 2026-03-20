"use client"

import Link from "next/link"
import { Search, Star, ChevronRight, School, ArrowRight } from "lucide-react"
import { universities } from "@/lib/university-data"
import AdBanner from "@/components/ad-banner"

/**
 * 🔑 PEGA AQUÍ TUS KEYS DE ADSTERRA
 * Adsterra → Publishers → My Sites → tu sitio → Ad Units → Get Code → copia el "key"
 *
 * Keys que necesitas crear/copiar:
 *   KEY_728x90  → Banner 728×90  (ya creado ✅)
 *   KEY_300x250 → Banner 300×250 (ya creado ✅)
 */
const ADS = {
  KEY_728x90:  "b9e543bce710b4ff4d173c767a51dcf8",
  KEY_300x250: "0300a674afc01f9df824c74038817554",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Califica a tus profesores{" "}
              <span className="block mt-2">de forma anónima</span>
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-sky-100">
              Ayuda a otros estudiantes a elegir los mejores profesores en las universidades de
              República Dominicana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-sky-50 transition-colors shadow-lg hover:shadow-xl"
              >
                <Search size={20} /> Buscar profesores
              </Link>
              <Link
                href="/add-professor"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white border border-sky-400 px-8 py-4 rounded-md text-lg font-medium hover:bg-sky-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Añadir profesor
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hidden md:block absolute bottom-0 left-0 w-full h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />
      </section>

      {/* ── Stats ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,200+", label: "Profesores" },
              { value: "15+",    label: "Universidades" },
              { value: "5,000+", label: "Reseñas" },
              { value: "100+",   label: "Carreras" },
            ].map((stat) => (
              <div key={stat.label} className="bg-sky-50 rounded-lg p-6 border border-sky-100">
                <p className="text-3xl font-bold text-sky-700 mb-2">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD 1: Entre Stats y "Cómo funciona" ── */}
      {/* Desktop: 728×90 | Mobile: 300×250 */}
      <div className="py-5 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="hidden md:block">
            <AdBanner adKey={ADS.KEY_728x90} width={728} height={90} />
          </div>
          <div className="md:hidden">
            <AdBanner adKey={ADS.KEY_300x250} width={300} height={250} />
          </div>
        </div>
      </div>

      {/* ── Cómo funciona ── */}
      <section className="py-16 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nuestra plataforma te permite encontrar y calificar profesores de manera sencilla,
              ayudando a toda la comunidad estudiantil.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Busca tu universidad", desc: "Selecciona tu universidad, carrera y materia para encontrar a tus profesores." },
              { step: "2", title: "Lee las reseñas", desc: "Descubre lo que otros estudiantes opinan sobre los profesores y su metodología." },
              { step: "3", title: "Comparte tu experiencia", desc: "Califica a tus profesores de forma anónima y ayuda a otros estudiantes a elegir mejor." },
            ].map((item) => (
              <div key={item.step} className="bg-white p-8 rounded-xl shadow-md text-center border border-sky-100 hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Universidades destacadas ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Universidades destacadas</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explora las principales universidades de República Dominicana y encuentra información
              sobre sus profesores.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {universities
              .filter((uni) =>
                ["uasd", "pucmm", "intec", "unibe", "unapec", "om", "utesa", "unphu"].includes(uni.id)
              )
              .map((uni) => (
                <Link
                  key={uni.id}
                  href={`/search?university=${uni.id}`}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all hover:border-sky-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                      <School className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 group-hover:text-sky-700 transition-colors">
                        {uni.name.split("(")[0].trim()}
                      </h3>
                      <p className="text-slate-600 text-sm">{uni.mainLocation}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end items-center text-sky-600 text-sm font-medium">
                    Ver profesores <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/search" className="inline-flex items-center text-sky-600 hover:text-sky-800 font-medium">
              Ver todas las universidades <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AD 2: Entre Universidades y Testimonios ── */}
      {/* 300×250 funciona bien en ambos (desktop y mobile) a esta altura */}
      <div className="py-6 bg-sky-50 flex justify-center">
        <AdBanner adKey={ADS.KEY_300x250} width={300} height={250} />
      </div>

      {/* ── Testimonios ── */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Descubre cómo nuestra plataforma ha ayudado a estudiantes a tomar mejores decisiones académicas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { text: "Esta plataforma me ayudó a elegir los mejores profesores para mi carrera. Las reseñas son muy útiles y precisas.", initials: "MS", name: "María S.", career: "Estudiante de Medicina" },
              { text: "Gracias a las reseñas pude evitar profesores con malas evaluaciones y elegir los que mejor se adaptan a mi estilo de aprendizaje.", initials: "JR", name: "Juan R.", career: "Estudiante de Ingeniería" },
              { text: "Una herramienta indispensable para todo estudiante universitario. Me ha ayudado a planificar mejor mis semestres.", initials: "LC", name: "Laura C.", career: "Estudiante de Psicología" },
            ].map((t) => (
              <div key={t.initials} className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
                <div className="flex items-center gap-2 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={18} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 mb-4">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-medium">{t.initials}</div>
                  <div>
                    <p className="font-medium text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.career}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-sky-700 to-sky-900 rounded-2xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">¿Listo para compartir tu experiencia?</h2>
            <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
              Ayuda a otros estudiantes compartiendo tus experiencias con profesores universitarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search" className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-sky-50 transition-colors shadow-lg">
                <Search size={20} /> Buscar profesores
              </Link>
              <Link href="/add-professor" className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white border border-sky-400 px-8 py-4 rounded-md text-lg font-medium hover:bg-sky-700 transition-colors shadow-lg">
                Añadir profesor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AD 3: Justo antes del footer ── */}
      {/* Desktop: 728×90 | Mobile: 300×250 */}
      <div className="py-5 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 flex justify-center">
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
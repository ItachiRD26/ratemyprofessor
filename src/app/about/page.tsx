import { School, Search, MessageSquare, Shield, UserCheck, FileCheck, Info } from "lucide-react"
import Link from "next/link"
import { universities } from "@/lib/university-data"

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Acerca de RateMyProfessorRD</h1>
          <p className="text-slate-600 text-lg">
            Ayudando a estudiantes dominicanos a tomar decisiones académicas informadas
          </p>
        </div>

        {/* Top Ad Banner - Clearly labeled */}
        <div className="w-full max-w-7xl mx-auto bg-slate-50 border border-slate-200 rounded-lg p-4 mb-10 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Mission Section */}
            <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Info className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-2xl text-slate-900 font-bold">Nuestra misión</h2>
              </div>

              <div className="space-y-4 text-slate-700">
                <p className="leading-relaxed">
                  CalificaProfesor es una plataforma diseñada para ayudar a los estudiantes universitarios de República
                  Dominicana a tomar decisiones informadas sobre sus profesores y cursos.
                </p>
                <p className="leading-relaxed">
                  Creemos que la transparencia en la educación superior es fundamental para mejorar la calidad de la
                  enseñanza y el aprendizaje. Nuestra plataforma permite a los estudiantes compartir sus experiencias de
                  manera anónima, proporcionando información valiosa para otros estudiantes.
                </p>
                <p className="leading-relaxed">
                  Nuestro objetivo es crear una comunidad donde los estudiantes puedan compartir sus experiencias de
                  manera respetuosa y constructiva, ayudando a otros a elegir los mejores profesores y cursos para su
                  educación.
                </p>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Search className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Cómo funciona</h2>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-800">Busca tu universidad</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Selecciona tu universidad, carrera y materia para encontrar a tus profesores. Si no encuentras a
                      tu profesor, puedes añadirlo a nuestra base de datos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-800">Lee las reseñas</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Descubre lo que otros estudiantes opinan sobre los profesores. Lee sus experiencias,
                      calificaciones y comentarios para tomar una decisión informada.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-800">Comparte tu experiencia</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Después de tomar un curso, comparte tu experiencia con el profesor. Califica su enseñanza,
                      dificultad y si lo recomendarías a otros estudiantes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Middle Ad Banner - Clearly labeled */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
              <div className="h-[120px] bg-slate-100 flex items-center justify-center">
                <p className="text-slate-400 text-sm">Anuncio</p>
              </div>
            </div>

            {/* Policies Section */}
            <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Nuestras políticas</h2>
              </div>

              <div className="space-y-6">
                <div className="p-5 bg-sky-50 rounded-lg border-l-4 border-sky-500">
                  <div className="flex items-center gap-3 mb-2">
                    <UserCheck className="h-5 w-5 text-sky-600" />
                    <h3 className="text-lg font-semibold text-slate-800">Anonimato</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Todas las reseñas son anónimas para proteger la privacidad de los estudiantes y fomentar comentarios
                    honestos. No recopilamos información personal identificable.
                  </p>
                </div>

                <div className="p-5 bg-sky-50 rounded-lg border-l-4 border-sky-500">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="h-5 w-5 text-sky-600" />
                    <h3 className="text-lg font-semibold text-slate-800">Moderación de contenido</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Nos tomamos en serio la calidad del contenido. No permitimos lenguaje ofensivo, ataques personales o
                    contenido inapropiado. Todas las reseñas pasan por un filtro de palabras inapropiadas y son
                    revisadas periódicamente.
                  </p>
                </div>

                <div className="p-5 bg-sky-50 rounded-lg border-l-4 border-sky-500">
                  <div className="flex items-center gap-3 mb-2">
                    <FileCheck className="h-5 w-5 text-sky-600" />
                    <h3 className="text-lg font-semibold text-slate-800">Precisión de la información</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Nos esforzamos por mantener información precisa y actualizada. Si encuentras algún error, por favor
                    contáctanos para corregirlo. Valoramos la retroalimentación de nuestra comunidad.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-xl shadow-md p-6 md:p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h2>
              <p className="mb-6 text-sky-100 max-w-2xl mx-auto">
                Únete a miles de estudiantes que ya están tomando decisiones informadas sobre sus profesores y cursos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 px-6 py-3 rounded-md text-lg font-medium hover:bg-sky-50 transition-colors shadow-md"
                >
                  <Search size={18} />
                  Buscar profesores
                </Link>
                <Link
                  href="/add-professor"
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white border border-sky-400 px-6 py-3 rounded-md text-lg font-medium hover:bg-sky-600 transition-colors shadow-md"
                >
                  Añadir profesor
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Universities Section */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <School className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Universidades participantes</h2>
              </div>

              <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-sky-50">
                <ul className="space-y-3">
                  {universities.map((uni) => (
                    <li
                      key={uni.id}
                      className="flex items-center gap-3 p-3 hover:bg-sky-50 rounded-lg transition-colors border border-slate-100"
                    >
                      <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center shrink-0">
                        <School className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-slate-900 font-medium">{uni.name}</span>
                        <span className="text-sm text-slate-500 block">{uni.mainLocation}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Side Ad Banner - Clearly labeled */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
              <div className="h-[250px] bg-slate-100 flex items-center justify-center">
                <p className="text-slate-400 text-sm">Anuncio</p>
              </div>
            </div>

            {/* Contact Info */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-xl font-bold mb-4 text-slate-900">Contáctanos</h2>
              <p className="text-slate-600 mb-4">
                ¿Tienes preguntas, sugerencias o comentarios? Nos encantaría escucharte.
              </p>
              <a
                href="mailto:contacto@ratemyprofessorrd.com"
                className="text-sky-600 hover:text-sky-800 font-medium block mb-2"
              >
                contacto@ratemyprofessorrd.com
              </a>
              <p className="text-slate-500 text-sm">
                Responderemos a tu mensaje lo antes posible, generalmente dentro de 24-48 horas.
              </p>
            </section>
          </div>
        </div>

        {/* Bottom Ad Banner - Clearly labeled */}
        <div className="w-full max-w-7xl mx-auto bg-slate-50 border border-slate-200 rounded-lg p-4 mt-10 text-center">
          <p className="text-xs text-slate-500 mb-2">ESPACIO PUBLICITARIO</p>
          <div className="h-[90px] bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Anuncio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

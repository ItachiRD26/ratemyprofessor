// Importar los datos de universidades
import { universities } from "@/lib/university-data"

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-blue-900 text-center">Acerca de CalificaProfesor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl text-blue-800 font-bold mb-6">Nuestra misión</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                CalificaProfesor es una plataforma diseñada para ayudar a los estudiantes universitarios de República
                Dominicana a tomar decisiones informadas sobre sus profesores y cursos.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Creemos que la transparencia en la educación superior es fundamental para mejorar la calidad de la
                enseñanza y el aprendizaje. Nuestra plataforma permite a los estudiantes compartir sus experiencias de
                manera anónima, proporcionando información valiosa para otros estudiantes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nuestro objetivo es crear una comunidad donde los estudiantes puedan compartir sus experiencias de
                manera respetuosa y constructiva, ayudando a otros a elegir los mejores profesores y cursos para su
                educación.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Cómo funciona</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-700">Busca tu universidad</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Selecciona tu universidad, carrera y materia para encontrar a tus profesores. Si no encuentras a
                      tu profesor, puedes añadirlo a nuestra base de datos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-700">Lee las reseñas</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Descubre lo que otros estudiantes opinan sobre los profesores. Lee sus experiencias,
                      calificaciones y comentarios para tomar una decisión informada.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-700">Comparte tu experiencia</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Después de tomar un curso, comparte tu experiencia con el profesor. Califica su enseñanza,
                      dificultad y si lo recomendarías a otros estudiantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Nuestras políticas</h2>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">Anonimato</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Todas las reseñas son anónimas para proteger la privacidad de los estudiantes y fomentar comentarios
                    honestos.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">Moderación de contenido</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nos tomamos en serio la calidad del contenido. No permitimos lenguaje ofensivo, ataques personales o
                    contenido inapropiado. Todas las reseñas pasan por un filtro de palabras inapropiadas.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">Precisión de la información</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nos esforzamos por mantener información precisa y actualizada. Si encuentras algún error, por favor
                    contáctanos para corregirlo.
                  </p>
                </div>
              </div>
            </div>
          </div>
            {/* Ad Banner */}
           {/* aquiva un el banner de anuncios */}

            {/* Actualizar la sección de universidades participantes */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold mb-6 text-blue-800">Universidades participantes</h2>
              <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                <ul className="space-y-3">
                  {universities.map((uni) => (
                    <li
                      key={uni.id}
                      className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-sm">{uni.name.charAt(0)}</span>
                      </div>
                      <div>
                        <span className="text-blue-900 font-medium">{uni.name}</span>
                        <span className="text-sm text-gray-600 block">{uni.mainLocation}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

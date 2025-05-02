import Link from "next/link"
import { Search } from "lucide-react"
// import AdBanner from "@/components/ad-banner"

// Importar los datos de universidades
import { universities } from "@/lib/university-data"

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Califica a tus profesores <span className="block mt-2">de forma anónima</span>
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-blue-100">
            Ayuda a otros estudiantes a elegir los mejores profesores en las universidades de República Dominicana.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
          >
            <Search size={20} />
            Buscar profesores
          </Link>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        {/* aqui va el banner de anuncios */}
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">¿Cómo funciona?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Busca tu universidad</h3>
              <p className="text-gray-600">
                Selecciona tu universidad, carrera y materia para encontrar a tus profesores.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Lee las reseñas</h3>
              <p className="text-gray-600">Descubre lo que otros estudiantes opinan sobre los profesores.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Comparte tu experiencia</h3>
              <p className="text-gray-600">Califica a tus profesores de forma anónima y ayuda a otros estudiantes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        {/* aqui va el banner de anuncios */}
      </div>

      {/* Featured Universities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-900">Universidades destacadas</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities
              .filter((uni) => ["uasd", "pucmm", "intec", "unibe", "unapec", "om", "utesa", "unphu"].includes(uni.id))
              .map((uni) => (
                <Link
                  key={uni.id}
                  href={`/search?university=${uni.id}`}
                  className="bg-white border border-blue-100 rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <span className="font-bold text-lg">{uni.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-900 group-hover:text-blue-700 transition-colors">
                        {uni.name.split("(")[0].trim()}
                      </h3>
                      <p className="text-gray-600 text-sm">{uni.mainLocation}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

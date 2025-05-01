import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AdBanner from "@/components/ad-banner"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft size={16} className="mr-1" /> Volver al inicio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">1. Aceptación de los Términos</h2>
                <p className="text-gray-600">
                  Al acceder y utilizar CalificaProfesor, aceptas cumplir con estos Términos y Condiciones y todas las
                  leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes
                  utilizar este sitio.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">2. Uso del Sitio</h2>
                <p className="text-gray-600 mb-2">
                  CalificaProfesor es una plataforma que permite a los estudiantes compartir sus experiencias con
                  profesores universitarios de forma anónima. Al utilizar este sitio, te comprometes a:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Proporcionar información precisa y veraz.</li>
                  <li>No publicar contenido difamatorio, abusivo, obsceno o ilegal.</li>
                  <li>No utilizar el sitio para acosar, amenazar o intimidar a otros.</li>
                  <li>No intentar acceder a áreas restringidas del sitio.</li>
                  <li>No utilizar el sitio para fines comerciales sin autorización.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">3. Contenido del Usuario</h2>
                <p className="text-gray-600 mb-2">
                  Al publicar contenido en CalificaProfesor, otorgas a la plataforma una licencia mundial, no exclusiva,
                  libre de regalías para usar, reproducir, modificar, adaptar, publicar, traducir y distribuir dicho
                  contenido.
                </p>
                <p className="text-gray-600">
                  Nos reservamos el derecho de eliminar cualquier contenido que consideremos inapropiado, ofensivo o que
                  viole estos términos.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">4. Privacidad</h2>
                <p className="text-gray-600">
                  Tu privacidad es importante para nosotros. Consulta nuestra{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Política de Privacidad
                  </Link>{" "}
                  para obtener información sobre cómo recopilamos, utilizamos y protegemos tus datos.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">5. Limitación de Responsabilidad</h2>
                <p className="text-gray-600">
                  CalificaProfesor no se hace responsable de la precisión, integridad o utilidad de la información
                  proporcionada por los usuarios. El contenido del sitio se proporciona "tal cual" sin garantías de
                  ningún tipo.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">6. Modificaciones</h2>
                <p className="text-gray-600">
                  Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las
                  modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio. Es tu
                  responsabilidad revisar periódicamente estos términos.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">7. Ley Aplicable</h2>
                <p className="text-gray-600">
                  Estos Términos y Condiciones se rigen por las leyes de la República Dominicana. Cualquier disputa
                  relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de la
                  República Dominicana.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">8. Contacto</h2>
                <p className="text-gray-600">
                  Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos en{" "}
                  <a href="mailto:info@calificaprofesor.com" className="text-blue-600 hover:underline">
                    info@calificaprofesor.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Enlaces rápidos</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Ad Banner */}
          <AdBanner slot="1234567890" className="h-[600px] bg-gray-100" />
        </div>
      </div>
    </div>
  )
}


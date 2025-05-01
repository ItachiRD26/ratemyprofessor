import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AdBanner from "@/components/ad-banner"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft size={16} className="mr-1" /> Volver al inicio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">1. Información que Recopilamos</h2>
                <p className="text-gray-600 mb-2">CalificaProfesor recopila la siguiente información:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>
                    Información que proporcionas voluntariamente al utilizar nuestro sitio, como reseñas y comentarios.
                  </li>
                  <li>
                    Información técnica, como tu dirección IP, tipo de navegador, páginas visitadas y tiempo de
                    permanencia en el sitio.
                  </li>
                  <li>Cookies y tecnologías similares para mejorar tu experiencia en el sitio.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">2. Cómo Utilizamos tu Información</h2>
                <p className="text-gray-600 mb-2">Utilizamos la información recopilada para:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Proporcionar y mantener nuestro servicio.</li>
                  <li>Mejorar, personalizar y ampliar nuestro servicio.</li>
                  <li>Analizar cómo utilizas nuestro servicio.</li>
                  <li>Desarrollar nuevos productos, servicios y funcionalidades.</li>
                  <li>Comunicarnos contigo, incluyendo notificaciones relacionadas con el servicio.</li>
                  <li>Prevenir y abordar problemas técnicos y de seguridad.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">3. Compartir tu Información</h2>
                <p className="text-gray-600 mb-2">
                  No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Con tu consentimiento explícito.</li>
                  <li>Para cumplir con obligaciones legales.</li>
                  <li>Para proteger y defender nuestros derechos y propiedad.</li>
                  <li>Para prevenir o investigar posibles infracciones relacionadas con el servicio.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">4. Seguridad de los Datos</h2>
                <p className="text-gray-600">
                  La seguridad de tus datos es importante para nosotros, pero recuerda que ningún método de transmisión
                  por Internet o método de almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por utilizar
                  medios comercialmente aceptables para proteger tu información personal, no podemos garantizar su
                  seguridad absoluta.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">5. Cookies</h2>
                <p className="text-gray-600">
                  Utilizamos cookies para recopilar información y mejorar nuestro servicio. Puedes configurar tu
                  navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, si
                  no aceptas cookies, es posible que no puedas utilizar algunas partes de nuestro servicio.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">6. Enlaces a Otros Sitios</h2>
                <p className="text-gray-600">
                  Nuestro servicio puede contener enlaces a otros sitios que no son operados por nosotros. Si haces clic
                  en un enlace de terceros, serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que
                  revises la Política de Privacidad de cada sitio que visites.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">7. Cambios a esta Política de Privacidad</h2>
                <p className="text-gray-600">
                  Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio
                  publicando la nueva Política de Privacidad en esta página. Se te aconseja revisar esta Política de
                  Privacidad periódicamente para cualquier cambio.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">8. Contacto</h2>
                <p className="text-gray-600">
                  Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos en{" "}
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
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Términos y Condiciones
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


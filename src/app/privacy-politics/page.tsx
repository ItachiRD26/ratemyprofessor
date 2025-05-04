import Link from "next/link"
import { Lock, Database, Cookie, ExternalLink, Shield, UserCheck, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-sky-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Política de Privacidad</h1>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 text-lg mb-6">
                En RateMyProfessorRD, respetamos tu privacidad y protegemos tus datos personales conforme a lo
                establecido por la legislación vigente y las recomendaciones de Google. Esta política describe cómo
                recopilamos, usamos y protegemos tu información.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Database className="h-5 w-5 text-sky-600" />
                    1. Información que recolectamos
                  </h2>
                  <p className="text-slate-700">
                    Podemos recopilar información como tu dirección IP, tipo de navegador, ubicación aproximada y
                    actividad dentro del sitio. Si decides registrarte, también podríamos recopilar tu nombre o
                    dirección de correo electrónico. Esta información nos ayuda a mejorar nuestros servicios y
                    personalizar tu experiencia.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <UserCheck className="h-5 w-5 text-sky-600" />
                    2. Cómo usamos la información
                  </h2>
                  <p className="text-slate-700">
                    Usamos los datos recopilados para mejorar la experiencia del usuario, garantizar la seguridad del
                    sistema y, si aplicas, personalizar contenido o comunicaciones. También podemos utilizar esta
                    información para:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-700">
                    <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                    <li>Detectar, prevenir y abordar problemas técnicos o de seguridad</li>
                    <li>Analizar cómo se utilizan nuestros servicios para mejorarlos</li>
                    <li>Comunicarnos contigo sobre actualizaciones o cambios en nuestros servicios</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Cookie className="h-5 w-5 text-sky-600" />
                    3. Cookies
                  </h2>
                  <p className="text-slate-700">
                    Este sitio puede usar cookies y tecnologías similares para recopilar información de navegación y
                    mejorar la funcionalidad del sitio. Puedes ajustar tu navegador para rechazarlas si lo deseas. Las
                    cookies nos ayudan a entender cómo interactúas con nuestro sitio y nos permiten recordar tus
                    preferencias para futuras visitas.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <ExternalLink className="h-5 w-5 text-sky-600" />
                    4. Servicios de terceros
                  </h2>
                  <p className="text-slate-700">
                    Podemos utilizar servicios de terceros como Google Analytics, Google Ads o Firebase. Estos servicios
                    pueden recopilar información anónima sobre tu uso del sitio bajo sus propias políticas de
                    privacidad. Te recomendamos revisar las políticas de privacidad de estos servicios para entender
                    cómo manejan tu información.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-sky-600" />
                    5. Seguridad
                  </h2>
                  <p className="text-slate-700">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra
                    accesos no autorizados, pérdidas o manipulaciones. Sin embargo, ningún método de transmisión por
                    Internet o método de almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar su
                    seguridad absoluta.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <UserCheck className="h-5 w-5 text-sky-600" />
                    6. Derechos del usuario
                  </h2>
                  <p className="text-slate-700">
                    Puedes solicitar acceso, rectificación o eliminación de tus datos personales enviándonos un mensaje
                    a través de nuestra sección de contacto. Responderemos a tu solicitud en un plazo razonable y de
                    acuerdo con la legislación aplicable.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-sky-600" />
                    7. Cambios en la política de privacidad
                  </h2>
                  <p className="text-slate-700">
                    Podemos actualizar nuestra política de privacidad de vez en cuando. Te notificaremos cualquier
                    cambio publicando la nueva política de privacidad en esta página y, si los cambios son
                    significativos, te enviaremos una notificación.
                  </p>
                </section>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-200 text-slate-500 text-sm flex items-center justify-between">
                <p>Última actualización: {new Date().toLocaleDateString()}</p>
                <Link href="/terms-conditions" className="text-sky-600 hover:text-sky-800">
                  Ver Términos y Condiciones →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

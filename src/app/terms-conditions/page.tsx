import Link from "next/link"
import { Shield, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function TermsConditionsPage() {
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
                <Shield className="h-6 w-6 text-sky-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Términos y Condiciones</h1>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 text-lg mb-6">
                Bienvenido a CalificaProfesor. Al acceder y utilizar nuestra plataforma, aceptas los siguientes términos
                y condiciones. Por favor, léelos detenidamente antes de continuar.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-sky-600" />
                    1. Uso de la plataforma
                  </h2>
                  <p className="text-slate-700">
                    Nuestra plataforma permite a estudiantes calificar y dejar reseñas sobre profesores universitarios
                    de forma anónima. No está permitido publicar contenido ofensivo, difamatorio o que viole derechos de
                    terceros. Nos reservamos el derecho de eliminar cualquier contenido que consideremos inapropiado sin
                    previo aviso.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    2. Registro y participación
                  </h2>
                  <p className="text-slate-700">
                    No es obligatorio registrarse para visualizar contenido, pero sí para publicar o administrar
                    reseñas. Aceptas proporcionar información veraz y no suplantar a otras personas. Eres responsable de
                    mantener la confidencialidad de tu cuenta y contraseña, así como de todas las actividades que
                    ocurran bajo tu cuenta.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-sky-600" />
                    3. Propiedad intelectual
                  </h2>
                  <p className="text-slate-700">
                    Todo el contenido y código de esta plataforma es propiedad de CalificaProfesor. No se permite su uso
                    no autorizado sin consentimiento previo. Al publicar contenido en nuestra plataforma, nos otorgas
                    una licencia mundial, no exclusiva, libre de regalías para usar, reproducir, modificar, adaptar,
                    publicar, traducir y distribuir dicho contenido en cualquier medio.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-sky-600" />
                    4. Suspensión de usuarios
                  </h2>
                  <p className="text-slate-700">
                    Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos o generen
                    contenido inapropiado. También podemos restringir el acceso a la plataforma a cualquier persona, en
                    cualquier momento y por cualquier motivo, sin previo aviso ni responsabilidad.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-sky-600" />
                    5. Cambios en los términos
                  </h2>
                  <p className="text-slate-700">
                    Estos términos pueden ser modificados en cualquier momento. Te recomendamos revisarlos
                    periódicamente para estar informado de cualquier cambio. El uso continuado de la plataforma después
                    de cualquier modificación constituye la aceptación de los nuevos términos.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-sky-600" />
                    6. Limitación de responsabilidad
                  </h2>
                  <p className="text-slate-700">
                    CalificaProfesor no se hace responsable de la precisión, integridad o utilidad de cualquier
                    contenido publicado por los usuarios. Utilizas la plataforma bajo tu propio riesgo. No nos hacemos
                    responsables de ningún daño directo, indirecto, incidental, consecuente o punitivo que resulte del
                    uso o la imposibilidad de usar nuestra plataforma.
                  </p>
                </section>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-200 text-slate-500 text-sm flex items-center justify-between">
                <p>Última actualización: {new Date().toLocaleDateString()}</p>
                <Link href="/privacy-politics" className="text-sky-600 hover:text-sky-800">
                  Ver Política de Privacidad →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

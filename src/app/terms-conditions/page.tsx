import Link from "next/link"
import {
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Lock,
  UserX,
  MessageSquare,
  Scale,
  Heart,
} from "lucide-react"

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

          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 border border-slate-200">
            {/* Encabezado */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 text-sky-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Términos y Condiciones</h1>
                <p className="text-slate-500 text-sm mt-1">
                  RateMyProfessorRD — Plataforma de reseñas estudiantiles de RD
                </p>
              </div>
            </div>

            {/* Resumen rápido */}
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 mb-8">
              <h2 className="font-semibold text-sky-800 mb-2 flex items-center gap-2">
                <CheckCircle size={16} />
                Resumen rápido
              </h2>
              <ul className="text-sm text-sky-700 space-y-1">
                <li>• Esta plataforma es anónima: tus reseñas no llevan tu nombre ni datos personales.</li>
                <li>• El propósito es ayudar a estudiantes a tomar mejores decisiones académicas.</li>
                <li>• Está prohibido publicar contenido falso, ofensivo o difamatorio.</li>
                <li>• No requerimos registro para leer ni publicar reseñas.</li>
                <li>• Nos reservamos el derecho de eliminar contenido inapropiado.</li>
              </ul>
            </div>

            <div className="space-y-10">

              {/* 1 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  1. Uso de la plataforma
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  RateMyProfessorRD es una plataforma estudiantil destinada exclusivamente a la comunidad
                  universitaria de la República Dominicana. Su objetivo es permitir que los estudiantes
                  compartan experiencias académicas sobre profesores universitarios de forma anónima y
                  constructiva, ayudando a otros a tomar decisiones informadas sobre su educación.
                </p>
                <p className="text-slate-600 leading-relaxed mt-3">
                  El uso de la plataforma implica la aceptación plena de estos términos. Si no estás de
                  acuerdo con alguna parte, te pedimos que no utilices el sitio.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  2. Contenido de las reseñas
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Las reseñas deben reflejar experiencias reales y honestas como estudiante. Al publicar
                  una reseña, aceptas que:
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[
                    "Las reseñas deben ser verídicas y basadas en tu experiencia personal como estudiante.",
                    "Está estrictamente prohibido publicar contenido ofensivo, discriminatorio, difamatorio, amenazante o que constituya acoso.",
                    "No puedes hacerte pasar por otra persona ni publicar reseñas sobre profesores con quienes no hayas tomado clases.",
                    "No se permite publicar información personal de terceros (teléfonos, correos, domicilios, etc.).",
                    "Las críticas deben ser constructivas y referirse al desempeño académico del profesor, no a aspectos personales irrelevantes.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-sky-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Lock className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  3. Anonimato y privacidad de reseñas
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  El anonimato es un pilar fundamental de RateMyProfessorRD. Las reseñas publicadas{" "}
                  <strong>
                    no están asociadas a ningún nombre de usuario, dirección IP ni dato identificable
                  </strong>
                  . Esto significa que:
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[
                    "No almacenamos tu identidad junto con tu reseña.",
                    "No compartimos datos personales con los profesores calificados ni con las universidades.",
                    "Los votos de 'útil / no útil' en las reseñas se rastrean únicamente en tu dispositivo para evitar votos duplicados, sin enviarse a ningún servidor de forma identificable.",
                    "No es necesario crear una cuenta para publicar reseñas.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-sky-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <UserX className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  4. Moderación y eliminación de contenido
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Nos reservamos el derecho de revisar, editar o eliminar cualquier reseña, comentario
                  o contenido que consideremos que viola estos términos, sin necesidad de previo aviso.
                  También podemos hacerlo a solicitud de un profesor si demuestra que una reseña contiene
                  información falsa y/o difamatoria. La eliminación de contenido no implica aceptación
                  de responsabilidad por nuestra parte.
                </p>
              </section>

              {/* 5 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  5. Propiedad intelectual
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  El diseño, código y contenido editorial de esta plataforma son propiedad de
                  RateMyProfessorRD y no pueden ser utilizados sin autorización previa. Al publicar una
                  reseña, otorgas a RateMyProfessorRD una licencia no exclusiva para mostrar y distribuir
                  dicho contenido dentro de la plataforma. Esta licencia finaliza si el contenido es
                  eliminado.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  6. Limitación de responsabilidad
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  RateMyProfessorRD actúa como intermediario y no se hace responsable de la veracidad,
                  exactitud o adecuación de las reseñas publicadas por los usuarios. Las opiniones
                  expresadas son exclusivamente responsabilidad de quienes las publican. No somos
                  responsables de decisiones académicas tomadas con base en el contenido de la plataforma.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  7. Conductas prohibidas
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Está expresamente prohibido:
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[
                    "Publicar múltiples reseñas sobre el mismo profesor desde el mismo dispositivo para manipular calificaciones.",
                    "Publicar reseñas falsas pagadas o incentivadas de cualquier forma.",
                    "Usar la plataforma para acosar, intimidar o amenazar a cualquier persona.",
                    "Intentar acceder o alterar datos de otros usuarios o del sistema.",
                    "Usar robots, scripts u otros medios automatizados para interactuar con la plataforma.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 8 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  8. Compromiso con la comunidad
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  RateMyProfessorRD es un proyecto hecho por y para estudiantes dominicanos. Creemos en
                  la libertad de expresión responsable y en el derecho de todo estudiante a tomar
                  decisiones académicas informadas. Te pedimos que uses esta plataforma con respeto,
                  honestidad y espíritu constructivo.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  9. Cambios en los términos
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Podemos actualizar estos términos en cualquier momento. Los cambios entran en vigencia
                  al ser publicados en esta página. El uso continuado de la plataforma después de
                  cualquier modificación constituye la aceptación de los nuevos términos.
                </p>
              </section>

            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
              <p>
                Última actualización:{" "}
                {new Date().toLocaleDateString("es-DO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Link href="/privacy-politics" className="text-sky-600 hover:text-sky-800 font-medium">
                Ver Política de Privacidad →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import Link from "next/link"
import {
  Lock,
  Database,
  Cookie,
  ExternalLink,
  Shield,
  UserCheck,
  AlertTriangle,
  Eye,
  EyeOff,
  Server,
  Smartphone,
} from "lucide-react"

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

          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 border border-slate-200">
            {/* Encabezado */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lock className="h-7 w-7 text-sky-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Política de Privacidad</h1>
                <p className="text-slate-500 text-sm mt-1">
                  RateMyProfessorRD —{" "}
                  {new Date().toLocaleDateString("es-DO", { year: "numeric", month: "long" })}
                </p>
              </div>
            </div>

            {/* Destacado de anonimato */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <EyeOff className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h2 className="font-bold text-emerald-800 mb-1">
                    Tu anonimato es nuestra prioridad
                  </h2>
                  <p className="text-sm text-emerald-700">
                    Las reseñas publicadas en RateMyProfessorRD{" "}
                    <strong>no están vinculadas a tu identidad</strong>. No almacenamos tu nombre,
                    correo electrónico ni dirección IP junto con el contenido de las reseñas. No
                    necesitas crear una cuenta para participar.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-10">
              En RateMyProfessorRD, respetamos tu privacidad y protegemos tu información. Esta
              política describe de forma clara qué datos recopilamos, cuáles{" "}
              <strong>no</strong> recopilamos, cómo los usamos y cuáles son tus derechos.
            </p>

            <div className="space-y-10">

              {/* 1 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-4">
                  <Database className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  1. ¿Qué información recopilamos?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* NO recopilamos */}
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <EyeOff size={16} className="text-red-500" />
                      <span className="font-semibold text-red-700 text-sm">
                        Lo que NO recopilamos
                      </span>
                    </div>
                    <ul className="text-sm text-red-700 space-y-1.5">
                      {[
                        "Tu nombre o identidad",
                        "Tu dirección de correo electrónico",
                        "Tu dirección IP vinculada a reseñas",
                        "Datos de tu cuenta universitaria",
                        "Historial de navegación completo",
                        "Tu ubicación exacta",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SÍ recopilamos */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye size={16} className="text-emerald-600" />
                      <span className="font-semibold text-emerald-700 text-sm">
                        Lo que SÍ recopilamos
                      </span>
                    </div>
                    <ul className="text-sm text-emerald-700 space-y-1.5">
                      {[
                        "Contenido de tus reseñas (calificación, comentario, materia)",
                        "Fecha y hora de publicación de la reseña",
                        "Conteo de votos útil/no útil por reseña",
                        "Datos de navegación anónimos (tipo de navegador, idioma)",
                        "Ubicación aproximada (país/región, no exacta)",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Smartphone className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  2. Datos almacenados en tu dispositivo
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Para evitar votos duplicados y mejorar tu experiencia, guardamos algunos datos{" "}
                  <strong>únicamente en tu propio dispositivo</strong> (mediante{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">
                    localStorage
                  </code>
                  ):
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {[
                    {
                      t: "Registro de reseñas votadas",
                      d: "Para que no puedas votar dos veces en la misma reseña. Este dato nunca sale de tu dispositivo.",
                    },
                    {
                      t: "Preferencias de cookies",
                      d: "Tu decisión sobre aceptar o rechazar cookies se guarda localmente.",
                    },
                  ].map((item) => (
                    <li
                      key={item.t}
                      className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100"
                    >
                      <span className="text-sky-500 mt-0.5 text-base">→</span>
                      <div>
                        <strong className="text-slate-700">{item.t}:</strong> {item.d}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <UserCheck className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  3. ¿Cómo usamos la información?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Los datos recopilados se usan exclusivamente para:
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[
                    "Mostrar las reseñas y calificaciones de profesores a otros estudiantes.",
                    "Calcular promedios de calificación y dificultad.",
                    "Detectar y prevenir abuso de la plataforma (spam, contenido falso).",
                    "Analizar el uso general del sitio para mejorarlo (de forma agregada y anónima).",
                    "Cumplir obligaciones legales si aplica.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-500 mt-1 text-sm">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 mt-3 leading-relaxed">
                  <strong>
                    No vendemos, alquilamos ni compartimos tu información
                  </strong>{" "}
                  con terceros para fines comerciales o publicitarios.
                </p>
              </section>

              {/* 4 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Cookie className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  4. Cookies
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Utilizamos cookies de forma limitada para mejorar la funcionalidad del sitio. Al
                  visitar la plataforma por primera vez, te solicitamos tu consentimiento mediante
                  nuestro banner de cookies. Puedes:
                </p>
                <ul className="space-y-1 text-slate-600 mt-3">
                  {[
                    "Aceptar todas las cookies para una experiencia completa.",
                    "Rechazar cookies no esenciales sin perder funcionalidades básicas.",
                    "Ajustar las preferencias de cookies en tu navegador en cualquier momento.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 5 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  5. Servicios de terceros
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Para el funcionamiento de la plataforma utilizamos los siguientes servicios externos,
                  cada uno con sus propias políticas de privacidad:
                </p>
                <div className="space-y-2">
                  {[
                    {
                      name: "Firebase (Google)",
                      purpose:
                        "Base de datos en tiempo real para almacenar profesores, reseñas y calificaciones.",
                      url: "https://firebase.google.com/support/privacy",
                    },
                    {
                      name: "Cloudflare",
                      purpose:
                        "CDN, protección contra ataques y análisis de tráfico anonimizado.",
                      url: "https://www.cloudflare.com/privacypolicy/",
                    },
                    {
                      name: "Adsterra / redes de anuncios",
                      purpose:
                        "Publicidad que ayuda a sostener el proyecto de forma gratuita.",
                      url: "https://adsterra.com/privacy-policy/",
                    },
                  ].map((svc) => (
                    <div
                      key={svc.name}
                      className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100"
                    >
                      <ExternalLink size={15} className="text-sky-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <strong className="text-slate-700">{svc.name}:</strong>{" "}
                        <span className="text-slate-600">{svc.purpose}</span>{" "}
                        <a
                          href={svc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 hover:underline"
                        >
                          Ver política →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  6. Seguridad
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Implementamos medidas de seguridad técnicas incluyendo conexiones cifradas (HTTPS),
                  reglas de seguridad en la base de datos Firebase y protección a través de Cloudflare.
                  Sin embargo, ningún sistema es 100% infalible. En caso de una brecha de seguridad que
                  afecte datos de usuarios, lo comunicaremos de forma transparente.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <UserCheck className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  7. Tus derechos
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Dado el carácter anónimo de la plataforma, el ejercicio de algunos derechos puede
                  ser limitado. Sin embargo, puedes:
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[
                    "Solicitar la eliminación de una reseña que hayas publicado contactándonos por correo.",
                    "Solicitar información sobre los datos que conservamos relacionados con tu actividad.",
                    "Optar por no usar cookies no esenciales a través del banner de consentimiento.",
                    "Borrar los datos locales de tu dispositivo desde la configuración de tu navegador.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 mt-3">
                  Para cualquier solicitud:{" "}
                  <a
                    href="mailto:contacto@ratemyprofessorrd.com"
                    className="text-sky-600 hover:underline font-medium"
                  >
                    contacto@ratemyprofessorrd.com
                  </a>
                </p>
              </section>

              {/* 8 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-sky-600 flex-shrink-0" />
                  8. Cambios en esta política
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Podemos actualizar esta política cuando sea necesario. Los cambios se publicarán en
                  esta página con la fecha de actualización. Para cambios significativos, colocaremos
                  un aviso visible en el sitio.
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
              <Link
                href="/terms-conditions"
                className="text-sky-600 hover:text-sky-800 font-medium"
              >
                Ver Términos y Condiciones →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl text-black mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Política de Privacidad</h1>
      <p className="mb-4">
        En CalificaProfesor, respetamos tu privacidad y protegemos tus datos personales conforme a lo establecido por la legislación vigente y las recomendaciones de Google.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Información que recolectamos</h2>
      <p className="mb-4">
        Podemos recopilar información como tu dirección IP, tipo de navegador, ubicación aproximada y actividad dentro del sitio. Si decides registrarte, también podríamos recopilar tu nombre o dirección de correo electrónico.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Cómo usamos la información</h2>
      <p className="mb-4">
        Usamos los datos recopilados para mejorar la experiencia del usuario, garantizar la seguridad del sistema y, si aplicas, personalizar contenido o comunicaciones.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Cookies</h2>
      <p className="mb-4">
        Este sitio puede usar cookies y tecnologías similares para recopilar información de navegación y mejorar la funcionalidad del sitio. Puedes ajustar tu navegador para rechazarlas si lo deseas.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Servicios de terceros</h2>
      <p className="mb-4">
        Podemos utilizar servicios de terceros como Google Analytics, Google Ads o Firebase. Estos servicios pueden recopilar información anónima sobre tu uso del sitio bajo sus propias políticas de privacidad.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Seguridad</h2>
      <p className="mb-4">
        Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdidas o manipulaciones.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Derechos del usuario</h2>
      <p className="mb-4">
        Puedes solicitar acceso, rectificación o eliminación de tus datos personales enviándonos un mensaje a través de nuestra sección de contacto.
      </p>

      <p className="mt-8 text-sm text-gray-600">Última actualización: {new Date().toLocaleDateString()}</p>
    </div>
  )
}

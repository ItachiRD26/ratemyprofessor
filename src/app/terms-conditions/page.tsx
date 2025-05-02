export default function TermsConditionsPage() {
    return (
      <div className="max-w-4xl text-black mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Términos y Condiciones</h1>
        <p className="mb-4">
          Bienvenido a CalificaProfesor. Al acceder y utilizar nuestra plataforma, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente antes de continuar.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Uso de la plataforma</h2>
        <p className="mb-4">
          Nuestra plataforma permite a estudiantes calificar y dejar reseñas sobre profesores universitarios de forma anónima. No está permitido publicar contenido ofensivo, difamatorio o que viole derechos de terceros.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Registro y participación</h2>
        <p className="mb-4">
          No es obligatorio registrarse para visualizar contenido, pero sí para publicar o administrar reseñas. Aceptas proporcionar información veraz y no suplantar a otras personas.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Propiedad intelectual</h2>
        <p className="mb-4">
          Todo el contenido y código de esta plataforma es propiedad de CalificaProfesor. No se permite su uso no autorizado sin consentimiento previo.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Suspensión de usuarios</h2>
        <p className="mb-4">
          Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos o generen contenido inapropiado.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Cambios en los términos</h2>
        <p className="mb-4">
          Estos términos pueden ser modificados en cualquier momento. Te recomendamos revisarlos periódicamente para estar informado de cualquier cambio.
        </p>
  
        <p className="mt-8 text-sm text-gray-600">Última actualización: {new Date().toLocaleDateString()}</p>
      </div>
    )
  }
  
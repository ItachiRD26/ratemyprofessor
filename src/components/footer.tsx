import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="border-t mt-8 pt-8 text-center text-black space-y-2">
          <p>&copy; {new Date().getFullYear()} RateMyProfessorRD. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-6 text-sm text-blue-600">
            <Link href="/terms-conditions" className="hover:underline">
              Términos y condiciones
            </Link>
            <Link href="/privacy-politics" className="hover:underline">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="border-t mt-8 pt-8 text-center text-black">
          <p>&copy; {new Date().getFullYear()} CalificaProfesor. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


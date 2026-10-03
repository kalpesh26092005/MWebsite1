import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-rose-50/30 px-4">
      <div className="text-center">
        <p className="font-serif text-7xl font-bold text-rose-500 sm:text-8xl">404</p>
        <h1 className="mt-4 font-serif text-2xl font-bold text-ink sm:text-3xl">This page wilted away</h1>
        <p className="mt-3 text-sm text-ink/60 sm:text-base">
          But the handmade blooms are still fresh — head back to the collection.
        </p>
        <Link
          to="/creations"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          View Creations <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

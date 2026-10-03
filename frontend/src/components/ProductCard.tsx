import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import type { Product } from '../types'
import { categoryName } from '../data/catalog'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/creations/${product.id}`}
      className="group overflow-hidden rounded-3xl border border-rose-100/80 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-rose-100/40 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-rose-50">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-rose-600 shadow-sm">
            Featured
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/10 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Heart className="text-rose-500" size={20} />
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-marigold-600">
          {categoryName(product.category)}
        </p>
        <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-ink group-hover:text-rose-700 transition-colors">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-rose-600">{product.priceLabel}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-ink/50 transition-colors group-hover:text-rose-600">
            View <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}

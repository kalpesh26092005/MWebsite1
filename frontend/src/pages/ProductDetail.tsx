import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Instagram, MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal'
import usePageMeta from '../hooks/usePageMeta'
import { categoryName, getProduct, products } from '../data/catalog'
import { productWhatsappLink } from '../data/whatsapp'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const product = id ? getProduct(id) : undefined
  const [activeImage, setActiveImage] = useState(0)

  usePageMeta({
    title: product ? `${product.name} — Minal's Art Corner` : "Creation — Minal's Art Corner",
    description: product ? product.caption.slice(0, 155) : undefined,
    image: product?.images[0]
  })

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-ink">Creation not found</h1>
        <Link to="/creations" className="mt-4 inline-block text-sm font-semibold text-rose-600">← Back to all creations</Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/creations"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft size={16} /> All creations
        </Link>

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-rose-50 shadow-xl">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                      i === activeImage ? 'border-rose-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-700 w-fit">
                {categoryName(product.category)}
              </div>
              
              <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <div className="rounded-2xl border border-rose-100/80 bg-white p-5 sm:p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2">In her own words (Instagram caption)</p>
                <p className="whitespace-pre-line text-sm leading-relaxed text-ink/80 sm:text-base">
                  {product.caption}
                </p>
                {product.posterDetails && (
                  <p className="mt-3 border-t border-rose-100 pt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                    {product.posterDetails}
                  </p>
                )}
                {product.imageText && (
                  <p className="mt-2 font-serif italic text-ink/70">"{product.imageText}"</p>
                )}
                <a
                  href={product.instagramPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <Instagram size={14} /> See the original post
                </a>
              </div>

              <div className="rounded-2xl border border-rose-100/80 bg-white p-5 sm:p-6 shadow-sm">
                <p className="text-sm font-semibold text-ink/60 mb-2">Pricing</p>
                {product.priceOptions ? (
                  <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {product.priceOptions.map((o) => (
                      <li
                        key={o.label}
                        className="rounded-xl border border-rose-100 bg-rose-50/50 px-3 py-2.5 text-sm"
                      >
                        <span className="text-ink/60">{o.label}</span>{' '}
                        <span className="font-semibold text-rose-600">{o.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-serif text-xl font-semibold text-rose-600">
                    {product.priceLabel} — DM for pricing
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={productWhatsappLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <MessageCircle size={17} /> Order on WhatsApp
                </a>
                <Link
                  to="/custom-orders"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-rose-600 px-7 py-3.5 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-50"
                >
                  Request customisation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 font-serif text-2xl font-bold text-ink">You may also like</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

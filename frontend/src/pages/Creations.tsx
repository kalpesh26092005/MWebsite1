import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import usePageMeta from '../hooks/usePageMeta'
import { categories, products } from '../data/catalog'

export default function Creations() {
  usePageMeta({
    title: "All Creations — Minal's Art Corner",
    description:
      'Browse every handmade creation: Mehandi, Embroidery, Rukhwat, Toran, gifts, platters — custom made to order.'
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'
  const [sortFeatured, setSortFeatured] = useState(false)

  const filtered = useMemo(() => {
    const list =
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.category === activeCategory)
    return sortFeatured
      ? [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
      : list
  }, [activeCategory, sortFeatured])

  function selectCategory(id: string) {
    if (id === 'all') setSearchParams({})
    else setSearchParams({ category: id })
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Collection"
          title="All Creations"
          subtitle="Every piece is handcrafted with love — from Mehandi and Embroidery to Rukhwat, Toran and custom gifts."
        />

        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-3 shadow-sm border border-rose-100/80">
            <SlidersHorizontal size={16} className="ml-3 text-ink/40" />
            <button
              onClick={() => selectCategory('all')}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                  : 'text-ink/60 hover:bg-rose-50 hover:text-ink'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => selectCategory(c.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === c.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                    : 'text-ink/60 hover:bg-rose-50 hover:text-ink'
                }`}
              >
                {c.name}
              </button>
            ))}
            <label className="ml-2 flex cursor-pointer items-center gap-2 text-sm text-ink/60 pl-4 border-l border-rose-100">
              <input
                type="checkbox"
                checked={sortFeatured}
                onChange={(e) => setSortFeatured(e.target.checked)}
                className="h-4 w-4 accent-rose-600"
              />
              Featured first
            </label>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="text-center text-sm text-ink/50 py-12">No creations in this category yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

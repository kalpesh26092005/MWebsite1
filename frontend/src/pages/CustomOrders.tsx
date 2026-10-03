import { Link } from 'react-router-dom'
import { Crown, Sparkles } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import InquiryForm from '../components/InquiryForm'
import usePageMeta from '../hooks/usePageMeta'
import { products } from '../data/catalog'
import { customOrderWhatsappLink } from '../data/whatsapp'

const customOptions = [
  'Custom bouquet',
  'Custom garland for Bappa',
  'Toran / door hanging',
  'Rukhwat decoration',
  'Mehandi design',
  'Embroidery item',
  'Gift platter',
  'Something else'
]

export default function CustomOrders() {
  usePageMeta({
    title: "Custom Orders — Minal's Art Corner",
    description:
      'Request a customised handmade bouquet, garland, toran, rukhwat or gift. Premium custom orders welcome.'
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bespoke Creations"
          title="Something Made Just For You"
          subtitle="Personalise colours, sizes and designs — DM us to create something uniquely yours."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-rose-100/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-700 mb-4">
                <Crown size={14} /> Custom Order Request
              </div>
              <h2 className="font-serif text-2xl font-bold text-ink">Request a custom order</h2>
              <p className="mb-5 mt-1 text-sm text-ink/60">
                Fill this in and Minal will reach out — or DM her directly on{' '}
                <a
                  href={customOrderWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-rose-600 hover:underline"
                >
                  WhatsApp
                </a>
                .
              </p>
              <InquiryForm
                typeLabel="What would you like customised?"
                typeOptions={customOptions}
                submitLabel="Send custom order request"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-5">
              <div className="rounded-2xl border border-rose-100/80 bg-gradient-to-br from-rose-50/80 to-white p-5 shadow-sm sm:p-6">
                <h3 className="font-serif text-xl font-bold text-ink">Ideas from her Instagram</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  Customisation is available on everything she makes — garlands, bouquets and gifts.
                  A few favourites you can ask to personalise:
                </p>
                <ul className="mt-4 space-y-2">
                  {products.slice(0, 4).map((p) => (
                    <li key={p.id} className="flex items-center gap-3 rounded-xl border border-rose-100/60 bg-white p-2 transition-all hover:shadow-sm">
                      <img
                        src={p.images[0]}
                        alt=""
                        loading="lazy"
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <Link
                        to={`/creations/${p.id}`}
                        className="text-sm font-medium text-ink hover:text-rose-600 transition-colors"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-100/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-700 mb-4">
                  <Sparkles size={14} /> What She Crafts
                </div>
                <h3 className="font-serif text-xl font-bold text-ink">Premium Handmade Creations</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  Mehandi · Embroidery · Rukhwat · Toran · Gifts · Platters — plus crochet garlands,
                  wool har, जास्वंद malas, pipe-cleaner bouquets and lace jewellery.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

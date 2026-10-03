import { Link } from 'react-router-dom'
import { ArrowRight, Instagram, Sparkles, Heart, Gift, Crown } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import usePageMeta from '../hooks/usePageMeta'
import {
  business,
  categories,
  featuredProducts,
  products,
  gallery
} from '../data/catalog'
import { whatsappLink, customOrderWhatsappLink } from '../data/whatsapp'

const processSteps = [
  {
    icon: Crown,
    title: 'Handcrafted Excellence',
    text: 'Every piece is meticulously handcrafted with premium materials — crochet, wool, hibiscus and more — ensuring lasting beauty and quality.'
  },
  {
    icon: Sparkles,
    title: 'Premium Materials',
    text: 'We use the finest eco-friendly, reusable and durable materials. Each creation is designed to stay vibrant forever.'
  },
  {
    icon: Gift,
    title: 'Bespoke & Customisable',
    text: 'From festive garlands to gift bouquets — personalise colours, sizes and designs. DM us to create something uniquely yours.'
  }
]

export default function Home() {
  usePageMeta({
    title: "Minal's Art Corner — Luxury Handmade Decoratives & Custom Gifts",
    description:
      'Discover bespoke handmade creations: Mehandi, Embroidery, Rukhwat, Toran, gifts, platters and custom decor by Minal Pravin Gurav. Order on WhatsApp.',
    image: '/images/products/crochet-garland-bappa.jpg'
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-marigold-50/30 isolate cursor-default">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/50 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-marigold-200/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-rose-100/10 blur-3xl" />
        
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-16 xl:gap-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-rose-200/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-700 mb-5">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              Handmade with Love · {business.instagramHandle}
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
              Where Art Meets
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-rose-600 to-marigold-500 bg-clip-text text-transparent"> Elegance</span>
              </span>
              <br />
              <span className="text-ink/70">in Every Detail</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Exquisite handmade decoratives — Mehandi, Embroidery, Rukhwat, Toran, gifts and platters. 
              Each creation is a masterpiece, crafted with devotion by {business.owner}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/creations"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-all hover:shadow-xl hover:shadow-rose-600/30 hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Collection <ArrowRight size={16} />
              </Link>
              <a
                href={customOrderWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-rose-300 bg-white/90 backdrop-blur px-7 py-3.5 text-sm font-semibold text-rose-700 transition-all hover:border-rose-400 hover:bg-rose-50 cursor-pointer"
              >
                Order on WhatsApp
              </a>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm text-ink/50">
              <div className="flex -space-x-2">
                {gallery.slice(0, 4).map((g, i) => (
                  <div key={i} className="h-11 w-11 rounded-full border-2 border-white bg-rose-100 bg-cover bg-center shadow-md" style={{ backgroundImage: `url(${g.image})` }} />
                ))}
              </div>
              <div>
                <p className="font-semibold text-ink/70">Trusted by 266+ clients</p>
                <p className="text-xs">Premium handmade creations</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-rose-200/40 to-marigold-200/40 blur-2xl" />
              <img
                src="/images/products/twisted-sunflowers.jpg"
                alt="Handmade sunflower bouquet twisted from pipe cleaners"
                className="relative w-full rounded-[2rem] border-4 border-white object-cover shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-rose-100 bg-white/95 backdrop-blur px-5 py-4 shadow-xl">
                <p className="text-xs text-ink/60 font-medium">Starting from</p>
                <p className="font-serif text-lg font-bold text-rose-600">₹100 onwards</p>
              </div>
              <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-br from-marigold-400 to-marigold-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                NEW
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured creations */}
      <section className="bg-white py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-50/50 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Curated Selection"
            title="Featured Creations"
            subtitle="Discover our most loved pieces — each one a unique expression of handmade artistry."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/creations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors"
            >
              View all {products.length} creations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-gradient-to-b from-white to-rose-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What We Create" title="Our Craft Categories" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                <Link
                  to={`/creations?category=${c.id}`}
                  className="group block h-full rounded-2xl border border-rose-100/80 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-marigold-100">
                    <Heart className="text-rose-600" size={20} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-ink group-hover:text-rose-700 transition-colors">{c.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{c.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-marigold-50/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="relative mx-auto w-40 lg:mx-0">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-rose-200/40 to-marigold-200/40 blur-xl" />
                <img
                  src={business.profileImage}
                  alt={`${business.owner}, creator of ${business.name}`}
                  className="relative h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-2 shadow-lg">
                  <Sparkles className="text-marigold-500" size={20} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-700 mb-4">
                The Artisan
              </div>
              <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
                Meet {business.owner.split(' ')[0]}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
                {business.name} is a dedicated handmade studio where artistry meets devotion. Specialising in 
                <strong> Mehandi, Embroidery, Rukhwat, Toran, gifts and platters </strong> — every piece is 
                meticulously crafted by hand, bringing elegance and tradition together.
              </p>
              <p className="mt-3 text-sm italic text-ink/60">"{business.bio}"</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Instagram size={16} /> {business.instagramHandle}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 bg-gradient-to-b from-white to-rose-50/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Promise"
            title="Crafted with Passion & Precision"
            subtitle="Every creation goes through a meticulous process to ensure unmatched quality and beauty."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-rose-100/80 bg-white p-6 text-center shadow-sm transition-all hover:shadow-lg hover:shadow-rose-100/30 hover:-translate-y-1">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-marigold-100">
                    <s.icon className="text-rose-600" size={24} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom creations CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-ink via-rose-900 to-ink py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-800/30 via-transparent to-transparent" />
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-rose-700/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-marigold-700/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 mb-5">
              <Crown size={14} className="text-marigold-400" /> Bespoke Creations
            </div>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Something Made Just For You
            </h2>
            <p className="mt-4 text-sm text-white/80 sm:text-base max-w-2xl mx-auto">
              Personalise colours, sizes and designs — DM us to create something uniquely yours. 
              From Mehandi to Embroidery, Rukhwat to Toran — every piece tells your story.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/custom-orders"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Request Custom Order
              </Link>
              <a
                href={customOrderWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
              >
                DM on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Instagram showcase */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Instagram Gallery"
            title={`Straight from ${business.instagramHandle}`}
            subtitle="Every image is a real creation from our Instagram feed."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {gallery.map((g, i) => (
              <Reveal key={g.image} delay={i * 0.05}>
                <a
                  href={g.instagramPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-rose-50 shadow-sm transition-all hover:shadow-lg"
                >
                  <img
                    src={g.image}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/20 group-hover:opacity-100">
                    <Instagram className="text-white" size={24} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <Instagram size={16} /> Follow {business.instagramHandle}
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kind Words"
            title="What Clients Say"
          />
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/50 to-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-marigold-100">
                  <Heart className="text-rose-600" size={24} />
                </div>
                <p className="font-serif text-lg italic leading-relaxed text-ink sm:text-xl">
                  "Thank you for purchasing my handmade crochet Garlands for your bappa And also thanks for appreciating my art."
                </p>
                <p className="mt-4 text-sm font-medium text-rose-600">— A Happy Client</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-rose-700 to-marigold-600 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 mb-5">
              Premium Handmade
            </div>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Bring Home a Bloom That Never Wilts
            </h2>
            <p className="mt-4 text-sm text-white/90 sm:text-base">
              Order on WhatsApp {business.phone} — garlands, bouquets and custom gifts made to order.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappLink(`Hi Minal! I'd like to place an order from ${business.name}. 🌸`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-rose-700 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Order on WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
              >
                Get in Touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

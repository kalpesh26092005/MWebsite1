import { Link } from 'react-router-dom'
import { Instagram, Phone, Heart } from 'lucide-react'
import { business } from '../data/catalog'

export default function Footer() {
  return (
    <footer className="border-t border-rose-100/80 bg-gradient-to-b from-white to-rose-50/30">
      <div className="relative mx-auto max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={business.profileImage}
                alt=""
                className="h-12 w-12 rounded-full border-2 border-rose-400 object-cover"
              />
              <div>
                <p className="font-serif text-lg font-bold text-ink">{business.name}</p>
                <p className="text-xs text-ink/50 font-medium">Handmade Decoratives</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-ink/60">
              Luxury handmade decoratives and custom gifts — each piece crafted with devotion by {business.owner}.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`tel:+${business.phoneRaw}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/80">Explore</p>
            <ul className="space-y-3 text-sm text-ink/60">
              <li><Link to="/creations" className="transition-colors hover:text-rose-600">All Creations</Link></li>
              <li><Link to="/custom-orders" className="transition-colors hover:text-rose-600">Custom Orders</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-rose-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/80">Connect</p>
            <ul className="space-y-3 text-sm text-ink/60">
              <li className="flex items-center gap-2">
                <Instagram size={16} className="text-rose-500" />
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-rose-600"
                >
                  {business.instagramHandle}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-rose-500" />
                <a href={`tel:+${business.phoneRaw}`} className="transition-colors hover:text-rose-600">
                  {business.phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/80">Crafts</p>
            <p className="text-sm leading-relaxed text-ink/60">{business.bio}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-rose-100/80 pt-8 sm:flex-row">
          <p className="text-xs text-ink/50">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-ink/50">
            Made with <Heart size={12} className="text-rose-500" /> by {business.owner}
          </p>
        </div>
      </div>
    </footer>
  )
}

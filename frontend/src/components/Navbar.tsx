import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Instagram, Phone } from 'lucide-react'
import { business } from '../data/catalog'

const links = [
  { to: '/', label: 'Home' },
  { to: '/creations', label: 'Creations' },
  { to: '/custom-orders', label: 'Custom Orders' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={business.profileImage}
            alt=""
            className="h-10 w-10 rounded-full border-2 border-rose-400 object-cover shadow-sm"
          />
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-bold text-ink tracking-tight">Minal's Art Corner</span>
            <span className="block text-xs text-ink/50 font-medium -mt-0.5">Handmade Decoratives</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  isActive
                    ? 'bg-rose-50 text-rose-700'
                    : 'text-ink/70 hover:text-rose-600 hover:bg-rose-50/60'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="ml-3 flex items-center gap-2 border-l border-rose-100 pl-4">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`tel:+${business.phoneRaw}`}
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-rose-50 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-rose-100/80 bg-white/95 backdrop-blur-md px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-rose-50 text-rose-700' : 'text-ink/80 hover:bg-rose-50/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2 border-t border-rose-100 pt-3">
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 py-3 text-sm font-medium text-rose-700"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href={`tel:+${business.phoneRaw}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 py-3 text-sm font-medium text-rose-700"
              >
                <Phone size={16} /> Call
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

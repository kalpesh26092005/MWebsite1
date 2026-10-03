import { Instagram, Phone, MessageCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import InquiryForm from '../components/InquiryForm'
import usePageMeta from '../hooks/usePageMeta'
import { business } from '../data/catalog'
import { whatsappLink } from '../data/whatsapp'

export default function Contact() {
  usePageMeta({
    title: "Contact — Minal's Art Corner",
    description: `Contact ${business.owner} on WhatsApp ${business.phone} or send a message for orders and enquiries.`
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Minal"
          subtitle="WhatsApp is the fastest way to reach her — or send a message below."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4">
              <a
                href={whatsappLink(`Hi Minal! I have an enquiry from your website. 🌸`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-rose-100/80 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-rose-100/30 hover:-translate-y-1"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle size={26} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">WhatsApp</span>
                  <span className="block text-sm text-ink/60">{business.phone} — DM for orders</span>
                </span>
              </a>
              <a
                href={`tel:+${business.phoneRaw}`}
                className="group flex items-center gap-5 rounded-2xl border border-rose-100/80 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-rose-100/30 hover:-translate-y-1"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <Phone size={26} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">Phone</span>
                  <span className="block text-sm text-ink/60">{business.phone}</span>
                </span>
              </a>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-rose-100/80 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-rose-100/30 hover:-translate-y-1"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-marigold-400/15 text-marigold-600">
                  <Instagram size={26} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">Instagram</span>
                  <span className="block text-sm text-ink/60">{business.instagramHandle}</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-rose-100/80 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-serif text-2xl font-bold text-ink mb-5">Send a message</h2>
              <InquiryForm
                typeLabel="Enquiry about"
                typeOptions={[
                  'Ordering a creation',
                  'Custom order',
                  'Festive garland booking',
                  'General question'
                ]}
                submitLabel="Send message"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

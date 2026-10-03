import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../data/whatsapp'

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi Minal! I found Minal's Art Corner and would like to know more. 🌸")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/40"
    >
      <MessageCircle size={26} />
    </a>
  )
}

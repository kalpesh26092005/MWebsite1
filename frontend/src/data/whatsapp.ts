import { business } from './catalog'

export function whatsappLink(message: string): string {
  return `https://wa.me/${business.phoneRaw}?text=${encodeURIComponent(message)}`
}

export function productWhatsappLink(productName: string): string {
  return whatsappLink(
    `Hi Minal! I saw "${productName}" on your website and I'd like to know more / place an order. 🌸`
  )
}

export function customOrderWhatsappLink(): string {
  return whatsappLink(
    "Hi Minal! I'd like to order a custom handmade creation from Minal's Art Corner. ✨"
  )
}

import { useEffect } from 'react'

interface PageMeta {
  title: string
  description?: string
  image?: string
}

export default function usePageMeta({ title, description, image }: PageMeta) {
  useEffect(() => {
    document.title = title
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description)
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    if (image) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', image)
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)
    }
  }, [title, description, image])
}

function setMeta(selector: string, attr: string, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

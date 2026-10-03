// @ts-expect-error virtual module provided by vite.config.ts
import data from 'virtual:site-data'
import type { SiteData, Product, Category } from '../types'

const site = data as SiteData

export const business = site.business
export const categories: Category[] = site.categories
export const products: Product[] = site.products
export const gallery = site.gallery

export const featuredProducts = products.filter((p) => p.featured)

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function categoryName(id: string): string {
  return getCategory(id)?.name ?? id
}

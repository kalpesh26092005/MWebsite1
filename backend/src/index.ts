import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { addEnquiry, listEnquiries } from './store.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const productsData = JSON.parse(
  readFileSync(join(__dirname, '..', '..', 'shared', 'products.json'), 'utf8')
)

const app = express()
const PORT = Number(process.env.PORT) || 4000

const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

app.use(cors({ origin: corsOrigins }))
app.use(express.json({ limit: '10kb' }))

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later or DM on WhatsApp.' }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/products', (_req, res) => {
  res.json({
    categories: productsData.categories,
    products: productsData.products,
    gallery: productsData.gallery
  })
})

app.get('/api/products/:id', (req, res) => {
  const product = productsData.products.find((p: { id: string }) => p.id === req.params.id)
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }
  res.json(product)
})

const MAX_LEN = { name: 80, contact: 120, kind: 40, interest: 80, message: 2000 }

function clean(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[<>]/g, '').trim().slice(0, maxLen)
}

app.post('/api/enquiries', formLimiter, (req, res) => {
  const name = clean(req.body?.name, MAX_LEN.name)
  const contact = clean(req.body?.contact, MAX_LEN.contact)
  const message = clean(req.body?.message, MAX_LEN.message)
  const kind = clean(req.body?.kind, MAX_LEN.kind) || 'general'
  const interest = clean(req.body?.interest, MAX_LEN.interest)

  if (name.length < 2) {
    res.status(400).json({ error: 'Please enter your name.' })
    return
  }
  if (contact.length < 3) {
    res.status(400).json({ error: 'Please enter a phone number or email so Minal can reply.' })
    return
  }
  const emailLike = contact.includes('@')
  const phoneLike = /^[+\d][\d\s-]{6,}$/.test(contact)
  if (emailLike ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) : !phoneLike) {
    res.status(400).json({ error: 'Please enter a valid phone number or email.' })
    return
  }
  if (message.length < 5) {
    res.status(400).json({ error: 'Please write a short message.' })
    return
  }

  const enquiry = addEnquiry({ kind, name, contact, interest: interest || undefined, message })
  res.status(201).json({ ok: true, id: enquiry.id })
})

app.get('/api/admin/enquiries', (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN
  if (!adminToken) {
    res.status(503).json({ error: 'Admin endpoint not configured.' })
    return
  }
  if (req.header('x-admin-token') !== adminToken) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  res.json(listEnquiries())
})

app.listen(PORT, () => {
  console.log(`Minal's Art Corner API listening on http://localhost:${PORT}`)
})

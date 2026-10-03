import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
// __dirname is backend/src (dev via tsx) or backend/dist (prod) — both one level
// under backend/, so data always resolves to backend/data/enquiries.json.
const DATA_FILE = join(__dirname, '..', 'data', 'enquiries.json')

export interface Enquiry {
  id: string
  createdAt: string
  kind: string
  name: string
  contact: string
  interest?: string
  message: string
}

function ensureFile(): Enquiry[] {
  if (!existsSync(DATA_FILE)) {
    mkdirSync(dirname(DATA_FILE), { recursive: true })
    writeFileSync(DATA_FILE, '[]', 'utf8')
    return []
  }
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8')) as Enquiry[]
  } catch {
    return []
  }
}

// JSON-file store, structured so it can be swapped for Prisma/PostgreSQL later
// by replacing these three functions with repository calls.
export function listEnquiries(): Enquiry[] {
  return ensureFile()
}

export function addEnquiry(input: Omit<Enquiry, 'id' | 'createdAt'>): Enquiry {
  const enquiries = ensureFile()
  const enquiry: Enquiry = {
    ...input,
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString()
  }
  enquiries.push(enquiry)
  writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2), 'utf8')
  return enquiry
}

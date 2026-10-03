# Minal's Art Corner — Website

A premium business website for **Minal's Art Corner** (Minal Pravin Gurav) — handmade decorative
products, crafts and customised gifts.

Every product photo and description on this site is taken **directly from her public Instagram
posts** ([@minals_art_corner_](https://www.instagram.com/minals_art_corner_/)). Nothing is
AI-generated or invented — captions appear verbatim, in her own words (Marathi and English).

## Structure

```
shared/products.json   Single source of truth: products, captions, prices, gallery
frontend/              Vite + React 18 + TypeScript + Tailwind + Framer Motion
backend/               Express + TypeScript API (enquiries, products, admin)
scripts/               Image download tooling used to fetch the real Instagram photos
```

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then set ADMIN_TOKEN to a long random string
npm run dev            # http://localhost:4000
```

The frontend dev server proxies `/api/*` to the backend on port 4000.

## API

| Method | Path                     | Description                                   |
| ------ | ------------------------ | --------------------------------------------- |
| GET    | `/api/health`            | Health check                                   |
| GET    | `/api/products`          | Categories, products, gallery                  |
| GET    | `/api/products/:id`      | Single product                                 |
| POST   | `/api/enquiries`         | Contact / custom-order form (validated, rate-limited) |
| GET    | `/api/admin/enquiries`   | Admin list — requires `x-admin-token` header   |

Enquiries are stored in `backend/data/enquiries.json` (the store is structured so it can be
swapped for Prisma/PostgreSQL later).

## Contact & orders

WhatsApp **+91 9307791258** is the primary conversion channel. The floating WhatsApp button and
every product page deep-link into a chat prefilled with the product name.

## Updating products

Edit `shared/products.json` and drop new images into `frontend/public/images/products/`. The
frontend and backend both read from this single file.

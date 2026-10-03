import { useState, type FormEvent } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface Props {
  typeLabel: string
  typeOptions: string[]
  submitLabel: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function InquiryForm({ typeLabel, typeOptions, submitLabel }: Props) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    type: typeOptions[0] ?? '',
    message: ''
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: typeLabel,
          name: form.name,
          contact: form.contact,
          interest: form.type,
          message: form.message
        })
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || `Request failed (${res.status})`)
      }
      setStatus('success')
      setForm({ name: '', contact: '', type: typeOptions[0] ?? '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or DM on WhatsApp.'
      )
    }
  }

  const inputCls =
    'w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-100'

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto text-green-600" size={36} />
        <h3 className="mt-3 font-serif text-xl font-semibold text-green-800">Thank you!</h3>
        <p className="mt-2 text-sm text-green-700">
          Your request has been received. Minal will get back to you soon. For a faster reply, DM
          her on WhatsApp.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 rounded-full border border-green-600 px-5 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="inq-name" className="mb-1 block text-sm font-medium text-ink/70">
          Your name *
        </label>
        <input
          id="inq-name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. Priya"
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="inq-contact" className="mb-1 block text-sm font-medium text-ink/70">
          Phone or email *
        </label>
        <input
          id="inq-contact"
          type="text"
          required
          maxLength={120}
          value={form.contact}
          onChange={(e) => set('contact', e.target.value)}
          placeholder="So Minal can reply to you"
          className={inputCls}
        />
      </div>
      {typeOptions.length > 1 && (
        <div>
          <label htmlFor="inq-type" className="mb-1 block text-sm font-medium text-ink/70">
            {typeLabel}
          </label>
          <select
            id="inq-type"
            value={form.type}
            onChange={(e) => set('type', e.target.value)}
            className={inputCls}
          >
            {typeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="inq-message" className="mb-1 block text-sm font-medium text-ink/70">
          Your message *
        </label>
        <textarea
          id="inq-message"
          required
          minLength={5}
          maxLength={2000}
          rows={4}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Tell Minal what you have in mind…"
          className={inputCls}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
        {status === 'loading' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}

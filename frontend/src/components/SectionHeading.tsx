interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: Props) {
  return (
    <div className={`mx-auto mb-8 max-w-2xl ${align === 'left' ? 'text-left' : 'text-center'}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
          {subtitle}
        </p>
      )}
      <div className={`mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-rose-500 to-marigold-400 ${align === 'left' ? 'mx-0' : ''}`} />
    </div>
  )
}

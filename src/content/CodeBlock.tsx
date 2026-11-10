import { useState, type ReactNode } from 'react'
import type { Element, ElementContent } from 'hast'
import { Check, Copy } from 'lucide-react'

const textOf = (n: ElementContent): string => (n.type === 'text' ? n.value : 'children' in n ? n.children.map(textOf).join('') : '')

const LANG_LABEL: Record<string, string> = { text: 'texto', txt: 'texto', pseudo: 'pseudocódigo', pseudocodigo: 'pseudocódigo' }

/** Bloque de código o pseudocódigo: tipografía mono, etiqueta de lenguaje y copiar. */
export function CodeBlock({ node, children }: { node?: Element; children: ReactNode }) {
  const [copied, setCopied] = useState(false)
  const code = node?.children.find((c): c is Element => c.type === 'element' && c.tagName === 'code')
  const lang = (code?.properties.className as string[] | undefined)?.find((c) => c.startsWith('language-'))?.slice(9)
  const text = code ? textOf(code) : ''

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* el portapapeles puede no estar disponible; no es crítico */
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface/80">
      <div className="flex items-center justify-between border-b border-line px-3.5 py-1.5">
        <span className="font-mono text-2xs uppercase tracking-wider text-ink-3">{lang ? (LANG_LABEL[lang] ?? lang) : 'código'}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copiado' : 'Copiar'}
          className="pressable inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-2xs text-ink-3 hover:text-ink"
        >
          {copied ? <Check size={12} aria-hidden className="text-done" /> : <Copy size={12} aria-hidden />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[0.84rem] leading-relaxed text-code-ink">{children}</pre>
    </div>
  )
}

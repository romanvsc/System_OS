import { memo, type ReactNode } from 'react'
import { Link } from 'react-router'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Element } from 'hast'
import { fileUrl } from '../lib/api.ts'
import { docRoute } from '../lib/subject.ts'
import { CodeBlock } from './CodeBlock.tsx'
import { DiagramFigure } from './DiagramFigure.tsx'
import { rehypeSections } from './rehypeSections.ts'
import { isExternal, isImagePath, resolveRelative } from './paths.ts'

/** Enlaces de un párrafo que solo enlaza diagramas ("[Ver SVG](x.svg) · [Ver PNG](x.png)"), o null. */
function diagramLinks(node: Element | undefined, docPath: string): string[] | null {
  if (!node) return null
  const paths: string[] = []
  for (const child of node.children) {
    if (child.type === 'text') {
      if (child.value.trim().replace(/[·|,\-–—/]/g, '').trim()) return null
    } else if (child.type === 'element' && child.tagName === 'a') {
      const href = String(child.properties.href ?? '')
      const p = !isExternal(href) && resolveRelative(docPath, href)
      if (!p || !isImagePath(p)) return null
      paths.push(p)
    } else return null
  }
  return paths.length ? paths : null
}

interface Props {
  subject: string
  docPath: string
  title: string
  markdown: string
}

/** Renderiza Markdown académico: enlaces internos navegables, recursos locales servidos por la API, diagramas integrados. */
export const MarkdownView = memo(function MarkdownView({ subject, docPath, title, markdown }: Props) {
  const components: Components = {
    a({ href = '', children }) {
      if (href.startsWith('#')) return <a href={href}>{children}</a>
      if (isExternal(href)) {
        return (
          <a href={href} target="_blank" rel="noreferrer noopener">
            {children}
          </a>
        )
      }
      const target = resolveRelative(docPath, href)
      if (!target) return <span>{children}</span>
      if (/\.md$/i.test(target)) return <Link to={docRoute(subject, target)}>{children}</Link>
      return (
        <a href={fileUrl(subject, target)} target="_blank" rel="noreferrer">
          {children}
        </a>
      )
    },
    img({ src = '', alt }) {
      const target = typeof src === 'string' && !isExternal(src) ? resolveRelative(docPath, src) : null
      return <img src={target ? fileUrl(subject, target) : String(src)} alt={alt ?? ''} loading="lazy" decoding="async" />
    },
    p({ node, children }) {
      const diagrams = diagramLinks(node, docPath)
      if (diagrams) return <DiagramFigure subject={subject} assets={diagrams} title={title} />
      return <p>{children as ReactNode}</p>
    },
    pre({ node, children }) {
      return <CodeBlock node={node}>{children}</CodeBlock>
    },
    table({ children }) {
      return <table>{children}</table>
    },
  }

  return (
    <div className="prose-read">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSections, [rehypeHighlight, { detect: false }]]} components={components}>
        {markdown}
      </Markdown>
    </div>
  )
})

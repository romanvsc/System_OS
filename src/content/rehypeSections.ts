import type { Element, ElementContent, Root, RootContent } from 'hast'
import { normalize } from '../lib/search.ts'

const textOf = (n: ElementContent | RootContent): string =>
  n.type === 'text' ? n.value : 'children' in n ? (n.children as ElementContent[]).map(textOf).join('') : ''

function roleOf(heading: string) {
  const h = normalize(heading.trim())
  if (h.startsWith('enunciado') || h.startsWith('consigna')) return 'consigna'
  if (h.startsWith('ejemplo')) return 'ejemplo'
  if (h.startsWith('supuesto')) return 'supuestos'
  return undefined
}

/**
 * Agrupa cada H2 con su contenido en un <section>. Si el título indica su función (Enunciado, Ejemplo, Supuestos)
 * la sección recibe data-role y se distingue visualmente. No altera el texto original.
 */
export function rehypeSections() {
  return (tree: Root) => {
    const out: RootContent[] = []
    let current: Element | null = null
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        const role = roleOf(textOf(node))
        current = { type: 'element', tagName: 'section', properties: role ? { dataRole: role } : {}, children: [node] }
        out.push(current)
      } else if (current) current.children.push(node as ElementContent)
      else out.push(node)
    }
    tree.children = out
  }
}

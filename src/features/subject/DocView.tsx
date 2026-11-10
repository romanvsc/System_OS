import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Download, ExternalLink } from 'lucide-react'
import type { DocNode } from '../../../shared/types.ts'
import { fileUrl, useMarkdown } from '../../lib/api.ts'
import { docRoute, locateDoc, subjectRoute } from '../../lib/subject.ts'
import { useSubjectContext } from '../../layouts/SubjectLayout.tsx'
import { MarkdownView } from '../../content/MarkdownView.tsx'
import { DiagramFigure } from '../../content/DiagramFigure.tsx'
import { linkedImages, stripLeadingTitle } from '../../content/paths.ts'
import { DelayedSkeleton, ErrorState, cx } from '../../ui/primitives.tsx'
import { ProgressToggle } from '../../study/ProgressToggle.tsx'
import { DocNotes } from '../../study/DocNotes.tsx'
import { useDocNeighbors } from './useDocNeighbors.ts'
import { GameLink } from '../../game/transition.tsx'

function MdBody({ subject, doc }: { subject: string; doc: DocNode }) {
  const md = useMarkdown(subject, doc.path)
  const body = useMemo(() => (md.data ? stripLeadingTitle(md.data, doc.title) : ''), [md.data, doc.title])
  // Diagramas del documento que el propio Markdown no enlaza: se muestran al final.
  const extra = useMemo(() => {
    const linked = new Set(md.data ? linkedImages(doc.path, md.data) : [])
    return doc.assets.filter((a) => !linked.has(a))
  }, [md.data, doc])

  if (md.isPending) return <DelayedSkeleton />
  if (md.isError) return <ErrorState title="No se pudo abrir el documento" message={md.error.message} onRetry={() => md.refetch()} />
  return (
    <>
      <MarkdownView subject={subject} docPath={doc.path} title={doc.title} markdown={body} />
      {extra.length > 0 && <DiagramFigure subject={subject} assets={extra} title={doc.title} />}
    </>
  )
}

/** Formatos que el navegador no muestra dentro de la app: se ofrece abrir o descargar el archivo local. */
function FileBody({ subject, doc }: { subject: string; doc: DocNode }) {
  const url = fileUrl(subject, doc.path)
  return (
    <div className="space-y-5">
      {doc.format === 'pdf' && <iframe src={url} title={doc.title} className="h-[78vh] w-full rounded-[var(--radius-card)] border border-line bg-surface" />}
      {doc.format === 'image' && <DiagramFigure subject={subject} assets={[doc.path]} title={doc.title} />}
      {doc.format === 'other' && (
        <p className="text-ink-2">Este formato todavía no se puede mostrar dentro de la app. Abrilo con el programa que corresponda en tu computadora.</p>
      )}
      <div className="flex flex-wrap gap-2">
        <a href={url} target="_blank" rel="noreferrer" className="pressable inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-sm text-ink hover:bg-surface-2">
          <ExternalLink size={15} aria-hidden /> Abrir en otra pestaña
        </a>
        <a href={fileUrl(subject, doc.path, true)} className="pressable inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-sm text-ink hover:bg-surface-2">
          <Download size={15} aria-hidden /> Descargar
        </a>
      </div>
    </div>
  )
}

function PrevNext() {
  const { prev, next, prevDoc, nextDoc } = useDocNeighbors()
  if (!prev && !next) return null
  const card = 'pressable group flex min-w-0 flex-1 flex-col gap-1 rounded-[var(--radius-card)] border border-line px-4 py-3.5 hover:border-line-strong hover:bg-surface/50'
  return (
    <nav aria-label="Documentos anterior y siguiente" className="mt-16 flex flex-col gap-3 sm:flex-row">
      {prev && prevDoc ? (
        <GameLink to={prev} exit={false} className={card}>
          <span className="flex items-center gap-1.5 text-xs text-ink-3">
            <ArrowLeft size={13} aria-hidden className="transition-transform group-hover:-translate-x-0.5" /> Anterior <span className="hidden sm:inline">· [</span>
          </span>
          <span className="truncate text-sm text-ink">{prevDoc.label}</span>
        </GameLink>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
      {next && nextDoc && (
        <GameLink to={next} exit={false} className={cx(card, 'sm:items-end sm:text-right')}>
          <span className="flex items-center gap-1.5 text-xs text-ink-3">
            <span className="hidden sm:inline">] ·</span> Siguiente <ArrowRight size={13} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="max-w-full truncate text-sm text-ink">{nextDoc.label}</span>
        </GameLink>
      )}
    </nav>
  )
}

export function DocView() {
  const { subject } = useSubjectContext()
  const path = useParams()['*'] ?? ''
  const loc = locateDoc(subject, path)
  if (!loc) {
    return (
      <ErrorState
        title="Este documento ya no existe"
        message="Puede que el archivo se haya movido o renombrado. Elegí otro desde la navegación."
      />
    )
  }
  const { doc, topic, practico } = loc
  const crumbs = [
    { label: subject.meta.nombre, to: subjectRoute(subject.id) },
    ...(topic ? [{ label: topic.title, to: topic.docs[0] ? docRoute(subject.id, topic.docs[0].path) : undefined }] : [{ label: 'Recursos' }]),
    ...(practico && practico.statement?.path !== doc.path
      ? [{ label: practico.title, to: practico.statement ? docRoute(subject.id, practico.statement.path) : undefined }]
      : []),
  ]

  return (
    <article className="mx-auto w-full max-w-[60rem] px-4 pb-24 pt-8 sm:px-8 sm:pt-12">
      <header className="mx-auto max-w-[var(--container-read)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Ubicación">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink-3">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {c.to ? (
                  <GameLink to={c.to} className="rounded hover:text-ink">
                    {c.label}
                  </GameLink>
                ) : (
                  <span>{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
          {doc.kind !== 'recurso' && <ProgressToggle subject={subject.id} path={doc.path} compact />}
        </div>
        <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-tight text-ink text-balance">{doc.title}</h1>
        <div className="mt-8 h-px bg-line" />
      </header>

      <div className="mt-10">{doc.format === 'md' ? <MdBody subject={subject.id} doc={doc} /> : <FileBody subject={subject.id} doc={doc} />}</div>

      {practico && practico.statement?.path === doc.path && practico.exercises.length > 0 && (
        <section aria-labelledby="ejercicios" className="mx-auto mt-14 max-w-[var(--container-read)]">
          <h2 id="ejercicios" className="mb-3 text-base font-semibold tracking-tight text-ink">
            Ejercicios resueltos
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {practico.exercises.map((e) => (
              <li key={e.path}>
                <Link to={docRoute(subject.id, e.path)} className="pressable flex min-h-11 items-center justify-between rounded-md border border-line px-3 py-2 text-sm text-ink-2 hover:border-line-strong hover:text-ink">
                  {e.label} <ArrowRight size={13} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mx-auto max-w-[var(--container-read)]">
        {doc.kind !== 'recurso' && (
          <div className="mt-14 flex flex-col items-start gap-3 rounded-[var(--radius-card)] border border-line bg-surface/40 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-2">¿Terminaste de estudiar este documento?</p>
            <ProgressToggle subject={subject.id} path={doc.path} />
          </div>
        )}
        <DocNotes subject={subject.id} docPath={doc.path} />
        <PrevNext />
      </div>
    </article>
  )
}

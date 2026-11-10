import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation, useMatch, useOutletContext, useParams } from 'react-router'
import { m, useReducedMotion } from 'motion/react'
import { fileUrl } from '../lib/api.ts'
import { SubjectIntro, introSeen } from '../game/SubjectIntro.tsx'
import { Backdrop } from '../game/Backdrop.tsx'
import { SuspenseSignal } from '../ui/RouteProgress.tsx'
import type { DocNode, Subject, Workspace } from '../../shared/types.ts'
import { useVisit } from '../lib/api.ts'
import { useUi } from '../lib/store.ts'
import { useSubjectData } from '../lib/subject.ts'
import { useCurrentDoc } from '../features/subject/useDocNeighbors.ts'
import { Sidebar } from '../navigation/Sidebar.tsx'
import { MobileDrawer } from '../navigation/MobileDrawer.tsx'
import { DelayedSkeleton, ErrorState } from '../ui/primitives.tsx'

export interface SubjectContext {
  subject: Subject
  docs: DocNode[]
  workspace?: Workspace
}
export const useSubjectContext = () => useOutletContext<SubjectContext>()

export function SubjectLayout() {
  const { subject: id } = useParams()
  const { subjects, subject, docs, workspace } = useSubjectData(id)
  const { path } = useCurrentDoc()
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const visit = useVisit()
  const setDrawer = useUi((s) => s.setDrawer)
  const introMode = useUi((s) => s.introMode)
  const isMenu = !!useMatch('/m/:subject')
  // La intro corre al llegar al menú de la materia: siempre, una vez por sesión o nunca. Con movimiento reducido, nunca.
  const [introFor, setIntroFor] = useState<string | null>(null)
  useEffect(() => {
    if (!subject || !isMenu || reduce || introMode === 'nunca') return
    if (introMode === 'siempre' || !introSeen(subject.id)) setIntroFor(subject.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject?.id])

  // Registra el último acceso (y el último documento, para "Continuar").
  useEffect(() => {
    if (subject) visit.mutate({ subject: subject.id, path })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject?.id, path])

  useEffect(() => setDrawer(false), [pathname, setDrawer])

  if (subjects.isPending) {
    return (
      <div className="mx-auto w-full max-w-[var(--container-read)] px-5 py-16">
        <DelayedSkeleton />
      </div>
    )
  }
  if (subjects.isError) return <ErrorState title="No se pudo cargar la materia" message={subjects.error.message} onRetry={() => subjects.refetch()} />
  if (!subject) return <ErrorState title="Materia no encontrada" message="Puede que su carpeta se haya renombrado o que le falte materia.json." />

  const context: SubjectContext = { subject, docs, workspace: workspace.data }
  return (
    <div className="flex flex-1">
      {introFor === subject.id && (
        <SubjectIntro
          subject={subject.id}
          name={subject.meta.nombre}
          lema={subject.meta.lema}
          image={subject.meta.fondo ? fileUrl(subject.id, subject.meta.fondo) : undefined}
          onDone={() => setIntroFor(null)}
        />
      )}
      {!isMenu && subject.meta.fondo && <Backdrop variant="eco" src={fileUrl(subject.id, subject.meta.fondo)} />}
      {!isMenu && <Sidebar {...context} />}
      {!isMenu && <MobileDrawer {...context} />}
      {/* En el menú, la salida la hacen sus piezas (no el fondo ni el título, que viajan); en el lector, todo el contenido. */}
      <main id="contenido" className={isMenu ? 'min-w-0 flex-1' : 'scene-exit min-w-0 flex-1'}>
        <m.div
          key={pathname}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<SuspenseSignal />}>
            <Outlet context={context} />
          </Suspense>
        </m.div>
      </main>
    </div>
  )
}

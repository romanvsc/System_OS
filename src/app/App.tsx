import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { AppShell } from '../layouts/AppShell.tsx'
import { SubjectLayout } from '../layouts/SubjectLayout.tsx'
import { Home } from '../features/home/Home.tsx'
import { ErrorState } from '../ui/primitives.tsx'
import { SuspenseSignal } from '../ui/RouteProgress.tsx'
import { loaders } from './loaders.ts'

// El lector de Markdown y el editor de apuntes se cargan recién al usarse: la Home arranca más liviana.
const SubjectOverview = lazy(() => loaders.overview().then((m) => ({ default: m.SubjectOverview })))
const DocView = lazy(() => loaders.doc().then((m) => ({ default: m.DocView })))
const NotesView = lazy(() => loaders.notes().then((m) => ({ default: m.NotesView })))

export function App() {
  return (
    <Suspense fallback={<SuspenseSignal />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="apuntes" element={<NotesView />} />
          <Route path="m/:subject" element={<SubjectLayout />}>
            <Route index element={<SubjectOverview />} />
            <Route path="d/*" element={<DocView />} />
            <Route path="apuntes" element={<NotesView />} />
          </Route>
          <Route path="*" element={<ErrorState title="Página no encontrada" message="Volvé al inicio con el logo de arriba." />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

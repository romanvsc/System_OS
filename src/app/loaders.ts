/** Chunks diferidos de las rutas. Los comparten `lazy()` y la precarga previa a navegar. */
export const loaders = {
  overview: () => import('../features/subject/SubjectOverview.tsx'),
  doc: () => import('../features/subject/DocView.tsx'),
  notes: () => import('../study/NotesView.tsx'),
}

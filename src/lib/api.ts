import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CorpusEntry, Note, ServerInfo, Subject, Workspace } from '../../shared/types.ts'

export class ApiError extends Error {}

async function request<T>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: init?.json !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: init?.json !== undefined ? JSON.stringify(init.json) : undefined,
  }).catch(() => {
    throw new ApiError('No se pudo contactar al servidor local. ¿Sigue corriendo "npm run dev"?')
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(body?.error ?? `Error ${res.status}`)
  }
  return res.json() as Promise<T>
}

/** URL de un archivo de una materia (rutas con espacios o acentos incluidas). */
export const fileUrl = (subject: string, path: string, download = false) =>
  `/api/file/${[subject, ...path.split('/')].map(encodeURIComponent).join('/')}${download ? '?download' : ''}`

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: true },
  },
})

// El servidor avisa cuando cambian los archivos de una materia: se recarga el índice sin reiniciar nada.
if (import.meta.hot) {
  import.meta.hot.on('content:changed', () => {
    queryClient.invalidateQueries({ queryKey: ['subjects'] })
    queryClient.invalidateQueries({ queryKey: ['corpus'] })
    queryClient.invalidateQueries({ queryKey: ['file'] })
  })
}

export const useSubjects = () => useQuery({ queryKey: ['subjects'], queryFn: () => request<Subject[]>('/api/subjects') })
export const useCorpus = (enabled = true) =>
  useQuery({ queryKey: ['corpus'], queryFn: () => request<CorpusEntry[]>('/api/corpus'), enabled })
export const useServerInfo = (enabled = true) =>
  useQuery({ queryKey: ['info'], queryFn: () => request<ServerInfo>('/api/info'), staleTime: Infinity, enabled })

/** Misma consulta para leer un documento y para precargarlo antes de navegar. */
export const markdownQuery = (subject: string, path: string) => ({
  queryKey: ['file', subject, path],
  queryFn: async () => {
    const res = await fetch(fileUrl(subject, path)).catch(() => null)
    if (!res) throw new ApiError('No se pudo contactar al servidor local.')
    if (!res.ok) throw new ApiError(res.status === 404 ? 'El archivo ya no existe.' : `Error ${res.status}`)
    return res.text()
  },
})

export const useMarkdown = (subject: string, path: string | undefined) =>
  useQuery({ ...markdownQuery(subject, path ?? ''), enabled: !!path })

export const useWorkspace = () =>
  useQuery({ queryKey: ['workspace'], queryFn: () => request<Workspace>('/api/workspace'), staleTime: Infinity })

function useWorkspaceMutation<V>(fn: (vars: V) => Promise<Workspace>) {
  const qc = useQueryClient()
  return useMutation({ mutationFn: fn, onSuccess: (ws) => qc.setQueryData(['workspace'], ws) })
}

export const useSetProgress = () =>
  useWorkspaceMutation((v: { key: string; done: boolean }) => request<Workspace>('/api/progress', { method: 'PUT', json: v }))

export const useVisit = () =>
  useWorkspaceMutation((v: { subject: string; path?: string }) => request<Workspace>('/api/visit', { method: 'POST', json: v }))

export function useCreateNote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: Pick<Note, 'title' | 'body' | 'subject' | 'docPath'>) =>
      request<{ workspace: Workspace; note: Note }>('/api/notes', { method: 'POST', json: v }),
    onSuccess: ({ workspace }) => qc.setQueryData(['workspace'], workspace),
  })
}

export function useUpdateNote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...patch }: { id: string; title?: string; body?: string }) =>
      request<{ workspace: Workspace; note: Note }>(`/api/notes/${id}`, { method: 'PUT', json: patch }),
    onSuccess: ({ workspace }) => qc.setQueryData(['workspace'], workspace),
  })
}

export const useDeleteNote = () => useWorkspaceMutation((id: string) => request<Workspace>(`/api/notes/${id}`, { method: 'DELETE' }))

export function downloadBlob(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

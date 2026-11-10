// Contrato entre el servidor local y la interfaz.

/** teoria: explicación (tema o subtema) · practico: enunciado de un TP · ejercicio · recurso: material suelto */
export type DocKind = 'teoria' | 'practico' | 'ejercicio' | 'recurso'
export type DocFormat = 'md' | 'pdf' | 'image' | 'other'

export interface DocNode {
  /** Ruta relativa (POSIX) dentro de la materia. Es el identificador estable del documento. */
  path: string
  title: string
  /** Nombre corto para la navegación. */
  label: string
  kind: DocKind
  format: DocFormat
  /** Archivos hermanos que acompañan al documento (diagramas SVG/PNG, etc.). Rutas relativas a la materia. */
  assets: string[]
}

export interface Practico {
  id: string
  title: string
  statement: DocNode | null
  exercises: DocNode[]
}

export interface Topic {
  id: string
  title: string
  /** Teoría primero, luego subtemas. */
  docs: DocNode[]
  practicos: Practico[]
}

export interface SubjectMeta {
  nombre: string
  descripcion: string
  acento: string
  icono?: string
  orden: number
  /** Ilustración de fondo (ruta relativa a la materia): fondo.webp por convención o "fondo" en materia.json. */
  fondo?: string
  /** Frase breve que acompaña la intro de la materia. */
  lema?: string
}

export interface Subject {
  id: string
  meta: SubjectMeta
  topics: Topic[]
  resources: DocNode[]
  /** Problemas al leer materia.json; la materia sigue visible con datos por defecto. */
  warnings: string[]
}

export interface CorpusEntry {
  subject: string
  path: string
  title: string
  kind: DocKind
  text: string
}

export interface Note {
  id: string
  title: string
  body: string
  subject?: string
  docPath?: string
  createdAt: number
  updatedAt: number
}

export interface Workspace {
  version: 1
  notes: Note[]
  /** clave `${materia}/${ruta}` → fecha en que se marcó completado */
  progress: Record<string, number>
  /** id de materia → última visita */
  lastVisit: Record<string, number>
  /** id de materia → último documento abierto (para "Continuar") */
  lastDoc?: Record<string, string>
}

export interface ServerInfo {
  contentRoot: string
  dataFile: string
}

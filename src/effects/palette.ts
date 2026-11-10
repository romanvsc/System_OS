/** WebGL no entiende variables CSS: los shaders leen los colores de tokens.css en tiempo de ejecución. */
export const token = (name: string, fallback: string) =>
  (typeof document !== 'undefined' && getComputedStyle(document.documentElement).getPropertyValue(name).trim()) || fallback

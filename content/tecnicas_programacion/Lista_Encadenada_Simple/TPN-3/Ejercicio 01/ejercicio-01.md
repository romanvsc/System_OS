# Trabajo práctico 3 — Ejercicio 1

## Enunciado y objetivo

Imprimir los elementos de una estructura tipo lista encadenada simple a cuyo inicio apunta la variable ↑C.

**Objetivo:** Imprimir los elementos.

## Supuestos y función de las variables

↑C conserva la cabeza y ↑A recorre hasta NIL; la lista no se modifica.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la lista existente`; `↑A ← ↑C`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Documento de salida:** `↑A.dato`.
  - **Rectángulo:** `↑A ← ↑A.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.

## Ejemplo

Con 3 → 8 → NIL se muestran 3 y 8.

[Ver diagrama SVG](ejercicio-01.svg) · [Ver diagrama PNG](ejercicio-01.png)

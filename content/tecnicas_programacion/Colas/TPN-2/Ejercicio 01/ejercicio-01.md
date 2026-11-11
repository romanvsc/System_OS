# Trabajo práctico 2 — Ejercicio 1

## Enunciado y objetivo

Secuenta con una estructura tipo cola a cuyo inicio apunta ^A. Se deben imprimir todos
sus elementos y la cantidad de nodos que posee.

**Objetivo:** Imprimir los valores y la cantidad.

## Supuestos y variables

↑A conserva el primero, ↑B recorre y cantidad cuenta. Una cola vacía muestra cantidad 0.

**Función de las variables:** `↑A` es el primero original; `↑B` recorre y `cantidad` cuenta los nodos.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑A ← primero de la cola existente`; `↑B ← ↑A`; `cantidad ← 0`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑B <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Documento de salida:** `↑B.dato`.
  - **Rectángulo:** `cantidad ← cantidad + 1`; `↑B ← ↑B.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Documento de salida:** `cantidad`.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑B <> NIL`.

## Ejemplo

Con 4 → 7 se muestran 4, 7 y 2.

[Ver diagrama SVG](ejercicio-01.svg) · [Ver diagrama PNG](ejercicio-01.png)

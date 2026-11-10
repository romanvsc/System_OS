# Trabajo práctico 1 — Ejercicio 4

## Enunciado

Se tiene una pila llamada pilita ya cargada con valores a cuyo tope apunta ↑O. Imprimir el contenido de la pila y la cantidad de elementos de la misma.

## Supuestos y variables

Se muestra cada valor en orden desde el tope; si está vacía, se muestra cantidad 0.

↑O conserva el tope; ↑A recorre; cantidad cuenta los nodos.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑O ← tope de pilita existente`; `↑A ← ↑O`; `cantidad ← 0`.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Documento de salida:** `↑A.dato`.
  - **Rectángulo:** `cantidad ← cantidad + 1`; `↑A ← ↑A.PS`.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.
- **Documento de salida:** `cantidad`.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `↑A <> NIL`.

## Ejemplo

Para `[7] → [4] → NIL` se muestran 7, 4 y cantidad 2.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-04.svg) · [Ver PNG](ejercicio-04.png)

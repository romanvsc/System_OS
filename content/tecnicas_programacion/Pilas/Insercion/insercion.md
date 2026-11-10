# Inserción en una pila enlazada

## Objetivo y supuesto

Ingresar un dato e insertarlo en el tope de una pila existente, que puede estar vacía. Suponemos nodos con campos `dato` y `PS`, y usamos `New(PILA)` como notación didáctica para crear un nodo de pila; si la profesora enseña otro tipo o sintaxis, se adapta. `↑C` es el tope, `↑P` el nodo nuevo y `DATO` el valor ingresado.

## Cómo dibujar el diagrama completo

Los números siguientes solo identifican pasos de esta explicación; **no son conectores dibujados**. Todas las ramas Sí salen a la derecha y las No a la izquierda.

1. Dibujá un óvalo con `Inicio`.
2. Debajo, un único rectángulo inicial con `↑C ← tope de la pila existente`, `↑P ← NIL` y `DATO ← 0`. No reemplaces el tope existente por `NIL`.
3. Dibujá un paralelogramo con `DATO` y después un rectángulo con `↑P ← New(PILA)`.
4. Dibujá un rombo con `↑P <> NIL`. Por **Sí**, a la derecha, dibujá un rectángulo con `↑P.dato ← DATO`, `↑P.PS ← ↑C` y `↑C ← ↑P`, en ese orden. El enlace conserva el tope anterior antes de actualizarlo.
5. Por **No**, a la izquierda, dibujá una salida con forma de documento que diga `“No hay lugar”`. Esta rama saltea todas las operaciones sobre el nodo nuevo.
6. Uní físicamente ambas ramas debajo de sus bloques y conectá la unión con un único óvalo `Fin`.

No hay ciclos ni conectores numerados.

## Ejemplo

Si la pila es `↑C → [20] → [10] → NIL` e ingresamos 30, luego de crear y enlazar el nodo queda `↑C → [30] → [20] → [10] → NIL`. Si estaba vacía, `↑P.PS` queda en `NIL` y el nuevo nodo es el único. Si falla la creación, se informa y la pila original no cambia.

[Diagrama SVG](insercion.svg) · [Diagrama PNG](insercion.png)

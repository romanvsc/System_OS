# Extracción del tope de una pila enlazada

## Objetivo y supuesto

Extraer y mostrar el dato del tope de una pila existente, sin acceder a un nodo si la pila está vacía. Suponemos nodos con campos `dato` y `PS`. `↑C` es el tope y `↑A` conserva temporalmente el nodo retirado.

## Cómo dibujar el diagrama completo

Los números siguientes solo identifican pasos de esta explicación; **no son conectores dibujados**. Todas las ramas Sí salen a la derecha y las No a la izquierda.

1. Dibujá un óvalo con `Inicio`.
2. Debajo, un único rectángulo inicial con `↑C ← tope de la pila existente` y `↑A ← NIL`.
3. Dibujá un rombo con `↑C <> NIL`.
4. Por **Sí**, a la derecha, dibujá un rectángulo con `↑A ← ↑C` y `↑C ← ↑A.PS`, en ese orden. Luego dibujá una salida con forma de documento con `↑A.dato`. Por último, un rectángulo con `↑A.PS ← NIL`: el nodo extraído queda desconectado de la pila.
5. Por **No**, a la izquierda, dibujá una salida con forma de documento que diga `“Pila vacía”`. Esta rama no accede a campos de nodos.
6. Uní físicamente ambas ramas debajo de sus bloques y conectá la unión con un único óvalo `Fin`.

No hay ciclos ni conectores numerados. Desconectar el nodo no libera su memoria. Si la clase exige liberarla, hay que añadir la instrucción enseñada por la profesora después de mostrar el dato; aquí no suponemos cuál es.

## Ejemplo

De `↑C → [30] → [20] → NIL` se muestra y retira 30; queda `↑C → [20] → NIL`. Si solo había un nodo, su `PS` era `NIL`, por lo que el nuevo tope queda en `NIL`. Si ya estaba vacía, se muestra el mensaje y no se modifica.

[Diagrama SVG](extraccion.svg) · [Diagrama PNG](extraccion.png)

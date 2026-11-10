# Búsqueda en una pila enlazada

## Objetivo y supuesto

Ingresar un dato y comprobar si aparece en una pila existente, sin retirar ni modificar sus nodos. Suponemos que está permitido recorrer los enlaces de esta representación con un puntero auxiliar; si la profesora exige usar solo operaciones de pila, deberá adaptarse al método enseñado. `↑C` es el tope, `↑A` recorre, `DATO` es el valor buscado y `b` indica el resultado: `0` significa que todavía no se encontró y `1` que se encontró.

## Cómo dibujar el diagrama completo

Los números siguientes solo identifican pasos de esta explicación; **no son conectores dibujados**. Todas las ramas Sí salen a la derecha y las No a la izquierda.

1. Dibujá un óvalo con `Inicio`.
2. Debajo, un único rectángulo inicial con `↑C ← tope de la pila existente`, `↑A ← ↑C`, `DATO ← 0` y `b ← 0`.
3. Dibujá un paralelogramo con `DATO` y debajo el **círculo 1**, punto de entrada del ciclo.
4. Dibujá el rombo del **WHILE** con `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, se entra al cuerpo. Por **No**, a la izquierda, se sale del ciclo hacia el paso 7.
5. En el cuerpo, dibujá un rombo con `↑A.dato = DATO`. Se puede acceder al dato porque la condición del ciclo ya comprobó que `↑A <> NIL`. Por **Sí**, a la derecha, dibujá un rectángulo con `b ← 1`. Por **No**, a la izquierda, dibujá un rectángulo con `↑A ← ↑A.PS`.
6. Uní físicamente las ramas del rombo interior debajo de esos rectángulos. Desde la unión llegá a otro **círculo 1**: representa el retorno al círculo 1 situado justo antes del rombo del WHILE. Cada vuelta encuentra el dato o avanza; la búsqueda termina.
7. Desde la salida **No** del WHILE, dibujá un rombo con `b = 1`. Por **Sí**, a la derecha, dibujá una salida con forma de documento que diga `“Dato encontrado”`. Por **No**, a la izquierda, otra que diga `“Dato no encontrado”`.
8. Uní físicamente estas ramas debajo de las salidas y conectá la unión con un único óvalo `Fin`.

## Conector real

- **Círculo 1:** retorna justo antes del rombo `↑A <> NIL Y b = 0`. Es el único conector numerado del diagrama.

## Ejemplo

En `↑C → [30] → [20] → [10] → NIL`, buscamos 20. Primero `↑A` señala 30 y avanza; luego compara 20, asigna `b ← 1` y sale del ciclo para informar que lo encontró. `↑C` y todos los enlaces permanecen iguales. Con una pila vacía, el ciclo no entra; con un único nodo, lo compara una vez y termina tanto si coincide como si no.

[Diagrama SVG](busqueda.svg) · [Diagrama PNG](busqueda.png)

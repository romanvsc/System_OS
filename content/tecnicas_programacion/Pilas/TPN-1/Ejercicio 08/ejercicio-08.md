# Trabajo práctico 1 — Ejercicio 8

## Enunciado

Se cuenta con una pila llamada "registro" a cuyo inicio apunta ↑L, cargada con valores de edades de alumnos de un grado. Se debe imprimir la cantidad de alumnos, el promedio de edades, el mayor alumno y el menor.

## Supuestos y variables

Solo se dispone de edades, por lo que «mayor alumno» y «menor» se interpretan como mayor y menor edad. Con pila vacía se informa cantidad 0 y no se calcula promedio ni extremos.

↑A recorre; cantidad y suma acumulan; mayor y menor guardan edades; promedio es suma dividido por cantidad.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑L ← tope de registro existente`; `↑A ← ↑L`; `cantidad ← 0`; `suma ← 0`; `promedio ← 0`; `mayor ← 0`; `menor ← 0`.
- **Rombo IF:** `↑A <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `cantidad`.
    - **Documento de salida:** `“Pila vacía”`.
  - **Sí (derecha):**
    - **Rectángulo:** `mayor ← ↑A.dato`; `menor ← ↑A.dato`.
    - **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutar el cuerpo:
      - **Rectángulo:** `cantidad ← cantidad + 1`; `suma ← suma + ↑A.dato`.
      - **Rombo IF:** `↑A.dato > mayor`.
        - **No (izquierda):** seguir directamente hasta la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `mayor ← ↑A.dato`.
        - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
      - **Rombo IF:** `↑A.dato < menor`.
        - **No (izquierda):** seguir directamente hasta la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `menor ← ↑A.dato`.
        - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
      - **Rectángulo:** `↑A ← ↑A.PS`.
      - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.
    - **Rectángulo:** `promedio ← suma / cantidad`.
    - **Documento de salida:** `cantidad`; `promedio`; `mayor`; `menor`.
  - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `↑A <> NIL`.

## Ejemplo

Para edades 8, 10 y 9: cantidad 3, promedio 9, mayor 10 y menor 8.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-08.svg) · [Ver PNG](ejercicio-08.png)

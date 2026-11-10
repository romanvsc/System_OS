# Trabajo práctico 1 — Ejercicio 9

## Enunciado

Se cuenta con una pila llamada "Palla" a cuyo inicio apunta ↑T, cargada con valores numéricos. Se ingresa por teclado dos números. Se debe imprimir la cantidad de números que existen entre ambos.

## Supuestos y variables

Los extremos no se incluyen. Si ambos son iguales, el resultado es 0.

↑A recorre; menor y mayor ordenan los límites; cantidad cuenta los valores estrictamente interiores.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑T ← tope de Palla existente`; `↑A ← ↑T`; `NUM1 ← 0`; `NUM2 ← 0`; `menor ← 0`; `mayor ← 0`; `cantidad ← 0`.
- **Paralelogramo de entrada:** `NUM1, NUM2`.
- **Rombo IF:** `NUM1 < NUM2`.
  - **No (izquierda):**
    - **Rectángulo:** `menor ← NUM2`; `mayor ← NUM1`.
  - **Sí (derecha):**
    - **Rectángulo:** `menor ← NUM1`; `mayor ← NUM2`.
  - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Rombo IF:** `↑A.dato > menor Y ↑A.dato < mayor`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `cantidad ← cantidad + 1`.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rectángulo:** `↑A ← ↑A.PS`.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.
- **Documento de salida:** `cantidad`.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `↑A <> NIL`.

## Ejemplo

Para `[2] → [5] → [8]` y límites 8 y 2, se cuenta solo 5: cantidad 1.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-09.svg) · [Ver PNG](ejercicio-09.png)

# Trabajo práctico 1 — Ejercicio 2

## Enunciado

Se cuenta con una pila a cuyo inicio apunta ↑Y, se ingresan por teclado pares de valores, contiene nombre y edad de pacientes del doctor Francis. El fin viene dado por un cero.

## Supuestos y variables

La edad 0 termina el ingreso; ese par no se inserta. Cada nodo contiene `nombre`, `edad` y `PS`. `New(PILA)` es una notación didáctica.

↑Y es el tope; ↑P es el nodo nuevo; seguir = 0 detiene la carga por falta de memoria.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑Y ← tope de pila existente`; `↑P ← NIL`; `NOMBRE ← ""`; `EDAD ← 0`; `seguir ← 1`.
- **Paralelogramo de entrada:** `NOMBRE, EDAD`.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `EDAD <> 0 Y seguir = 1`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Rectángulo:** `↑P ← New(PILA)`.
  - **Rombo IF:** `↑P <> NIL`.
    - **No (izquierda):**
      - **Documento de salida:** `“No hay lugar”`.
      - **Rectángulo:** `seguir ← 0`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P.nombre ← NOMBRE`; `↑P.edad ← EDAD`; `↑P.PS ← ↑Y`; `↑Y ← ↑P`.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Paralelogramo de entrada:** `NOMBRE, EDAD`.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `EDAD <> 0 Y seguir = 1`.

## Ejemplo

Con pila vacía, al ingresar Ana, 20 y luego la edad 0, queda `↑Y → [Ana, 20] → NIL`.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-02.svg) · [Ver PNG](ejercicio-02.png)

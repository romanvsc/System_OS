# Trabajo práctico 1 — Ejercicio 3

## Enunciado

Teniendo la pila cargada anteriormente, se ingresa por teclado un nombre y se debe imprimir la edad correspondiente a ese paciente.

## Supuestos y variables

La pila tiene los campos `nombre`, `edad` y `PS` del ejercicio 2. Si hay nombres repetidos, se muestra la primera coincidencia desde el tope.

↑A recorre; b = 1 indica que se encontró el nombre.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑Y ← tope de pila existente`; `↑A ← ↑Y`; `NOMBRE ← ""`; `b ← 0`.
- **Paralelogramo de entrada:** `NOMBRE`.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Rombo IF:** `↑A.nombre = NOMBRE`.
    - **No (izquierda):**
      - **Rectángulo:** `↑A ← ↑A.PS`.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 1`.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“Paciente no encontrado”`.
  - **Sí (derecha):**
    - **Documento de salida:** `↑A.edad`.
  - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `↑A <> NIL Y b = 0`.

## Ejemplo

En `[Ana, 20] → [Luis, 40]`, buscar Luis muestra 40; la pila queda igual.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-03.svg) · [Ver PNG](ejercicio-03.png)

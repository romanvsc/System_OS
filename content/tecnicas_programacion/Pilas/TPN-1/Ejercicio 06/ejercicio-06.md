# Trabajo práctico 1 — Ejercicio 6

## Enunciado

Se cuenta con dos pilas a cuyos inicios apuntan las variables ↑U y ↑I, se deben intercalar los elementos de ambas en una tercer pila a cuyo inicio apuntará ↑O. Es decir, el primer elemento de ↑U, el primer elemento de ↑I y así sucesivamente.

## Supuestos y variables

Desde el tope del resultado se pide U1, I1, U2, I2 y luego sobrantes. Se copian datos y los originales se conservan. `New(PILA)` es didáctico. Si falla una reserva, se informa y se devuelve solo la parte ya copiada, en orden, como resultado incompleto.

↑A y ↑B recorren los originales; ↑H es pila auxiliar; ↑O es el resultado; ↑P crea o mueve nodos; seguir indica si se pudo seguir reservando memoria.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑U ← tope de primera pila`; `↑I ← tope de segunda pila`; `↑A ← ↑U`; `↑B ← ↑I`; `↑O ← NIL`; `↑H ← NIL`; `↑P ← NIL`; `seguir ← 1`.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `(↑A <> NIL O ↑B <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Rombo IF:** `↑A <> NIL`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(PILA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑A.dato`; `↑P.PS ← ↑H`; `↑H ← ↑P`; `↑A ← ↑A.PS`.
        - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rombo IF:** `↑B <> NIL Y seguir = 1`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(PILA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑B.dato`; `↑P.PS ← ↑H`; `↑H ← ↑P`; `↑B ← ↑B.PS`.
        - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.
- **WHILE, círculo 2:** colocar el primer círculo 2 justo antes del rombo `↑H <> NIL`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑H.PS`; `↑P.PS ← ↑O`; `↑O ← ↑P`.
  - Al terminar el cuerpo, llegar al segundo círculo 2, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `(↑A <> NIL O ↑B <> NIL) Y seguir = 1`.
- Círculo 2: vuelve justo antes del rombo `↑H <> NIL`.

## Ejemplo

Con U = `[1] → [2]` e I = `[8]`, resulta O = `[1] → [8] → [2]`; las dos pilas originales no cambian.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-06.svg) · [Ver PNG](ejercicio-06.png)

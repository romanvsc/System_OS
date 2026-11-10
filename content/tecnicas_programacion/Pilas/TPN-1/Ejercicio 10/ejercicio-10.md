# Trabajo práctico 1 — Ejercicio 10

## Enunciado

Se cuenta con una pila llamada "nombres" a cuyo inicio apunta ↑U. Dicha pila se encuentra cargada con distintos nombres de una agenda, cada nombre se encuentra separado por un carácter "+", se deben imprimir la totalidad de los nombres allí ingresados.

## Supuestos y variables

Cada nodo contiene un carácter; el recorrido desde el tope ya presenta las letras en orden de lectura. `+` separa nombres. `nombre ← nombre + ↑A.dato` concatena texto; `""` es texto vacío. Se ignoran separadores consecutivos y no se muestran nombres vacíos.

↑A recorre; nombre acumula caracteres del nombre actual.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑U ← tope de nombres existente`; `↑A ← ↑U`; `nombre ← ""`.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Rombo IF:** `↑A.dato = "+"`.
    - **No (izquierda):**
      - **Rectángulo:** `nombre ← nombre + ↑A.dato`.
    - **Sí (derecha):**
      - **Rombo IF:** `nombre <> ""`.
        - **No (izquierda):** seguir directamente hasta la unión.
        - **Sí (derecha):**
          - **Documento de salida:** `nombre`.
        - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
      - **Rectángulo:** `nombre ← ""`.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rectángulo:** `↑A ← ↑A.PS`.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.
- **Rombo IF:** `nombre <> ""`.
  - **No (izquierda):** seguir directamente hasta la unión.
  - **Sí (derecha):**
    - **Documento de salida:** `nombre`.
  - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `↑A <> NIL`.

## Ejemplo

Para caracteres `A → n → a → + → L → u → i → s`, se muestran Ana y Luis.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-10.svg) · [Ver PNG](ejercicio-10.png)

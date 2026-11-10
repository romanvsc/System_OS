# Trabajo práctico 1 — Ejercicio 1

## Enunciado

Se cuenta con una pila cargada con valores numéricos, se deben imprimir todos aquellos que sean impares.

## Supuestos y variables

Los valores son enteros; `MOD` es el resto entero. Se usa `MOD 2 <> 0` para incluir también impares negativos.

↑C conserva el tope; ↑A recorre.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑C ← tope de pila existente`; `↑A ← ↑C`.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Rombo IF:** `↑A.dato MOD 2 <> 0`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Documento de salida:** `↑A.dato`.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rectángulo:** `↑A ← ↑A.PS`.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `↑A <> NIL`.

## Ejemplo

Para `↑C → [3] → [4] → [-5] → NIL`, se muestran 3 y -5.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-01.svg) · [Ver PNG](ejercicio-01.png)

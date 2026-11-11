# Lista doblemente enlazada circular: teoría básica

## ¿Qué es una LDESC?

Una lista doblemente enlazada circular tiene nodos con un dato y dos enlaces: `PA` al anterior y `PS` al siguiente. La cabeza `↑C` apunta al primero. El último apunta al primero por `PS`, y el primero apunta al último por `PA`. En este práctico, **LDEC y LDESC** nombran la misma estructura.

```text
           ↑C
            ↓
          [10] ⇄ [20] ⇄ [30]
            ↑             │
            └──── PS ─────┘
            └──── PA ────→ último
```

Las flechas representan enlaces entre los mismos nodos; no hay copias adicionales al cerrar el círculo.

- **Vacía:** `↑C = NIL`.
- **Un solo nodo:** `↑C.PA = ↑C` y `↑C.PS = ↑C`.
- **Varios nodos:** `↑C.PA` es el último y su `PS` apunta a `↑C`; cada pareja de vecinos queda enlazada en ambos sentidos.

## Operaciones básicas

- **Recorrer:** si no está vacía, procesar desde la cabeza y seguir `PS` hasta volver a ella. Para ir hacia atrás se puede empezar en `↑C.PA` y seguir `PA` hasta regresar al último. [Ver recorridos](Recorrido/recorrido.md).
- **Buscar:** comparar cada dato y detenerse al encontrarlo o completar una vuelta. Nunca esperar llegar a `NIL` siguiendo enlaces de una lista circular no vacía. [Ver búsqueda](Busqueda/busqueda.md).
- **Insertar al principio:** en una lista vacía, el nuevo nodo apunta a sí mismo. Si hay nodos, enlazarlo entre el último y el primero, actualizar ambos sentidos y hacer que la cabeza apunte al nuevo. [Ver inserción al principio](Insercion_principio/insercion_principio.md).
- **Insertar al final:** enlazar entre último y primero, manteniendo la cabeza actual. En una lista vacía el nuevo nodo es la cabeza y apunta a sí mismo. [Ver inserción al final](Insercion_final/insercion_final.md).
- **Eliminar:** distinguir si el nodo es el único. Si hay más, enlazar entre sí su anterior y su siguiente; si se retira la cabeza, actualizarla. Después desconectar el nodo retirado. [Ver eliminación](Eliminacion/eliminacion.md).

Antes de acceder a campos, comprobá que el puntero no sea `NIL`. Al crear con `↑P ← New(LDESC)`, verificá `↑P <> NIL` antes de usarlo. Si una transferencia requiere retirar un dato del origen, asegurá primero que su copia quedó guardada en destino.

Desconectar un nodo no equivale a liberar su memoria. Las guías no inventan la instrucción de liberación de la profesora. La notación es didáctica y se ajustará si se proporcionan ejemplos de clase distintos.

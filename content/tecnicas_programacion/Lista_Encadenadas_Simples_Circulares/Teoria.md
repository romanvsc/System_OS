# Listas simplemente enlazadas circulares: teoría básica

## ¿Qué son?

Una lista simplemente enlazada circular tiene nodos con un dato y un enlace `PS` al siguiente. La cabeza señala al primero y **el último apunta nuevamente a la cabeza**. En este práctico, las siglas **LEC y LESC** se refieren a la misma estructura.

```text
↑C → [10] → [20] → [30]
      ↑               │
      └───────────────┘
```

La flecha del último vuelve al nodo 10; no hay otro 10 guardado al final. En una LEC no vacía no se llega a `NIL` siguiendo sus enlaces.

- **Vacía:** `↑C = NIL`.
- **Un nodo:** `↑C.PS = ↑C`; el nodo apunta a sí mismo.
- **Varios nodos:** el `PS` del último apunta a `↑C`.

## Operaciones básicas

- **Recorrer:** comprobar primero que no esté vacía, empezar en la cabeza y avanzar; después de procesar cada nodo, detenerse cuando el auxiliar regrese a la cabeza. Así se revisa también el último y el caso de un nodo. [Ver recorrido](Recorrido/recorrido.md).
- **Buscar:** comparar los datos hasta encontrar el valor o regresar a la cabeza. Una búsqueda ausente también termina. [Ver búsqueda](Busqueda/busqueda.md).
- **Insertar al principio:** si está vacía, el nuevo nodo apunta a sí mismo. Si ya tiene nodos, localizar el último, enlazar el nuevo a la cabeza anterior, hacer que el último apunte al nuevo y actualizar la cabeza. [Ver inserción al principio](Insercion_principio/insercion_principio.md).
- **Insertar al final:** si está vacía, el nuevo nodo apunta a sí mismo. Si no, localizar el último, enlazar el nuevo a la cabeza y el último anterior al nuevo; la cabeza permanece igual. [Ver inserción al final](Insercion_final/insercion_final.md).
- **Eliminar:** buscar conservando el anterior; distinguir único nodo, cabeza, nodo intermedio y último. Si cambia la cabeza, el último debe apuntar a la nueva; si se retira el único, la cabeza queda en `NIL`. [Ver eliminación](Eliminacion/eliminacion.md).

Antes de acceder a `↑A.dato` o `↑A.PS`, comprobá que `↑A <> NIL`. Al crear `↑P ← New(LESC)`, comprobá `↑P <> NIL` antes de cargarlo o enlazarlo. Desconectar un nodo no es liberar su memoria; no inventamos una instrucción de liberación de la profesora.

## Diferencia con la lista simple no circular

En una lista simple no circular, el último `PS` es `NIL` y recorrer hasta `NIL` permite terminar. En una circular no vacía, se controla el regreso a la cabeza o se usa otra condición de finalización segura.

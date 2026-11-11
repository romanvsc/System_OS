# Lista doblemente enlazada simple: teoría básica

## ¿Qué es una LDES?

Una lista doblemente enlazada simple es una lista **no circular**. Cada nodo tiene un dato y dos enlaces: `PA` apunta al nodo anterior y `PS` al siguiente. La cabeza `↑C` señala al primero.

```text
NIL ← [10] ⇄ [20] ⇄ [30] → NIL
       ↑C
```

El `PA` del primer nodo es `NIL` y el `PS` del último es `NIL`. Si el nodo 20 sigue al 10, ambos enlaces deben coincidir: el `PS` de 10 apunta a 20 y el `PA` de 20 apunta a 10.

- **Lista vacía:** `↑C = NIL`.
- **Un nodo:** `↑C` señala al nodo; sus campos `PA` y `PS` son `NIL`.
- **Varios nodos:** cada par vecino queda enlazado en ambos sentidos.

## Operaciones básicas

- **Recorrer hacia adelante:** comenzar en la cabeza y avanzar por `PS` hasta `NIL`. Para recorrer hacia atrás, conservar o encontrar primero el último y avanzar por `PA` hasta `NIL`. [Ver recorridos](Recorrido/recorrido.md).
- **Buscar:** comparar desde la cabeza y detenerse al encontrar el dato o llegar a `NIL`. [Ver búsqueda](Busqueda/busqueda.md).
- **Insertar al principio:** cargar el nuevo nodo con `PA ← NIL` y `PS ← ↑C`. Si la cabeza anterior existe, actualizar su `PA`; después cambiar `↑C`. [Ver inserción al principio](Insercion_principio/insercion_principio.md).
- **Insertar al final:** ubicar el último; el `PA` del nuevo apunta al último, su `PS` es `NIL` y el último anterior pasa a apuntarlo. Si la lista estaba vacía, el nuevo es la cabeza. [Ver inserción al final](Insercion_final/insercion_final.md).
- **Eliminar:** conservar anterior y siguiente; reconectar a los vecinos en ambos sentidos y actualizar la cabeza si se retira el primero. Contemplar lista vacía, único nodo y último. [Ver eliminación](Eliminacion/eliminacion.md).

Antes de acceder a `↑A.dato`, `↑A.PA` o `↑A.PS`, comprobá que `↑A <> NIL`. Al crear con `↑P ← New(LDES)`, comprobá `↑P <> NIL` antes de cargarlo o enlazarlo.

Desconectar un nodo no equivale a liberar su memoria. Las guías no inventan la instrucción de liberación de la profesora. La notación debe ajustarse si se proporcionan ejemplos de clase distintos.

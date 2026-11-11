# Listas simplemente enlazadas: teoría básica

## ¿Qué es una lista?

Una lista simplemente enlazada guarda elementos en **nodos**. Cada nodo contiene un dato y un enlace al nodo siguiente. La **cabeza** es el puntero al primer nodo.

```text
↑C → [dato: 10 | PS] → [dato: 20 | PS] → [dato: 30 | NIL]
```

En estos ejemplos, `↑C` apunta al primer nodo y el campo `PS` apunta al siguiente. El `PS` del último vale `NIL`. Para recorrer una LES solo se sigue `PS`: no hay enlace al nodo anterior.

- **Lista vacía:** `↑C = NIL`.
- **Un nodo:** `↑C` apunta al nodo y su `PS = NIL`.
- **Varios nodos:** la cabeza sigue apuntando al primero y el último termina en `NIL`.

## Operaciones básicas

- **Recorrer:** usar un auxiliar `↑A ← ↑C` y avanzar con `↑A ← ↑A.PS` mientras `↑A <> NIL`. Esto conserva la cabeza. [Ver recorrido](Recorrido/recorrido.md).
- **Buscar:** recorrer comparando los datos. Si se encuentra, se puede detener la búsqueda; si se llega a `NIL`, el dato no estaba. [Ver búsqueda](Busqueda/busqueda.md).
- **Insertar al principio:** crear un nodo, guardar el dato, hacer que su `PS` apunte a la cabeza anterior y actualizar `↑C` al nuevo. [Ver inserción al principio](Insercion_principio/insercion_principio.md).
- **Insertar al final:** crear un nodo con `PS ← NIL`; si la lista está vacía es la nueva cabeza. Si no, recorrer hasta el último y enlazarlo al nuevo. [Ver inserción al final](Insercion_final/insercion_final.md).
- **Eliminar:** buscar el nodo y conservar también el anterior. Si se elimina el primero se actualiza la cabeza; si no, el anterior se enlaza con el siguiente. Después se desconecta el retirado. [Ver eliminación](Eliminacion/eliminacion.md).

Antes de acceder a `↑A.dato` o `↑A.PS`, hay que comprobar que `↑A <> NIL`. Al crear con `↑P ← New(LES)`, se verifica `↑P <> NIL` antes de usar el nodo. Si falla, se informa y no se modifican enlaces usando `↑P`.

**Desconectar** un nodo y **liberar su memoria** son acciones distintas. Aquí no inventamos la instrucción de liberación de la profesora. La representación y sintaxis son supuestos didácticos y pueden ajustarse a los ejemplos de clase.

## Comparación con pila y cola

Una pila usa el tope para insertar y extraer; una cola agrega al final y extrae al principio. En una lista simplemente enlazada, según el ejercicio, se puede recorrer y trabajar al principio, en el medio o al final, conservando los enlaces correctos.

# Pilas: teoría básica

## ¿Qué es una pila?

Una **pila** guarda elementos de manera que el último en entrar es el primero en salir. A esta regla se la conoce como **LIFO** (*Last In, First Out*). Pensá en una pila de platos: agregás un plato arriba y también retirás el de arriba.

El **tope** es el lugar desde el que se inserta, se consulta y se extrae. Por ejemplo, si insertamos 10, después 20 y finalmente 30, la pila queda:

```text
TOPE → [30] → [20] → [10] → NIL
```

Si extraemos un elemento, sale 30 y el nuevo tope pasa a ser 20. Si hay un único elemento y lo extraemos, la pila queda vacía. Una pila vacía tiene su puntero al tope en `NIL`.

## Cómo la representamos en estos ejemplos

**Supuesto didáctico:** usamos una pila implementada con nodos enlazados. Cada nodo tiene un campo `dato` y un enlace `PS` al nodo que quedó debajo. `↑C` señala el tope; el `PS` del nodo del fondo es `NIL`. La profesora podría usar otra representación u operaciones propias: si aparecen sus ejemplos, habrá que adaptar la sintaxis a la de clase.

Un puntero indica dónde está un nodo; no es el dato guardado. Así, `↑C.dato` es el dato del nodo del tope y `↑C.PS` indica el nodo siguiente. No se accede a esos campos si `↑C = NIL`.

## Operaciones básicas

- **Insertar:** crear un nodo, guardar el dato, enlazarlo al tope anterior y actualizar `↑C` para que señale al nuevo. Con 20 en el tope, insertar 30 da `↑C → [30] → [20] → NIL`. Si no hay memoria, se informa y la pila queda igual. Ver [inserción](Insercion/insercion.md).
- **Extraer:** retirar el nodo del tope y hacer que `↑C` señale al siguiente. En `↑C → [30] → [20] → NIL`, se extrae 30 y queda `↑C → [20] → NIL`. Si la pila está vacía no hay elemento que extraer. Ver [extracción](Extraccion/extraccion.md).
- **Consultar el tope:** primero comprobar que `↑C <> NIL`; si es así, mostrar `↑C.dato` sin cambiar enlaces ni retirar el nodo. Si `↑C = NIL`, informar que la pila está vacía.
- **Buscar:** para este ejemplo de pila enlazada se puede recorrer desde el tope con un puntero auxiliar, comparando cada dato. Buscar 20 en `[30] → [20] → [10]` encuentra el segundo nodo y deja intacta la pila. Esta lectura de enlaces es una posibilidad de la representación elegida; si en clase solo se permiten operaciones de pila, el método debe adaptarse a las operaciones enseñadas. Ver [búsqueda](Busqueda/busqueda.md).

## No confundir

**Consultar** muestra el dato sin retirarlo; **extraer** lo retira. **Recorrer** con un auxiliar no cambia el tope ni los enlaces; no implica vaciar la pila. **Desconectar** un nodo y **liberar su memoria** son acciones distintas: en estos ejemplos no inventamos la instrucción de liberación de la profesora.

Los diagramas son ejercicios didácticos de operaciones individuales sobre una pila existente. Para cada uno, la cabeza inicial se conserva como `↑C ← tope de la pila existente`, incluso si ese tope resulta ser `NIL`.

# Colas: teoría básica

## ¿Qué es una cola?

Una **cola** guarda elementos siguiendo la regla **FIFO** (*First In, First Out*): el primero que entra es el primero que sale. Es como una fila para comprar entradas: quien llegó primero es atendido primero y quien llega se agrega al final.

```text
primero ↑C → [10] → [20] → [30] → NIL
                                  ↑U último
```

Aquí 10 es el primero en salir y 30 es el último que ingresó. Si agregamos 40, queda después de 30. Si quitamos el primero, sale 10 y 20 pasa a ser el primero.

## Representación de los ejemplos

Suponemos una cola de nodos enlazados: cada nodo guarda `dato` y `PS`, un enlace al siguiente. `↑C` indica el primero y `↑U` el último; `↑U.PS` es `NIL`.

- **Cola vacía:** `↑C = NIL` y `↑U = NIL`.
- **Un solo nodo:** `↑C` y `↑U` apuntan al mismo nodo; su `PS` es `NIL`.
- **Varios nodos:** `↑C` señala al primero y `↑U` al último.

El campo de un nodo se consulta solo si el puntero que lo señala no es `NIL`. Si el enunciado solo da el primero y se necesita el último, se puede recorrer con un auxiliar hasta encontrarlo.

## Operaciones básicas

- **Insertar al final:** crear un nodo con `New(COLA)`, cargarlo y poner su `PS` en `NIL`. Si estaba vacía, el primero pasa a ser el nuevo; si no, el último anterior lo enlaza. Finalmente el último pasa a ser el nuevo. Si no hay memoria, se informa y la cola no cambia. [Ver ejemplo](Insercion/insercion.md).
- **Extraer el primero:** si la cola no está vacía, guardar el primero, avanzar el puntero al siguiente y mostrar el dato retirado. Si quedó vacía, actualizar también el último a `NIL`. [Ver ejemplo](Extraccion/extraccion.md).
- **Consultar el primero:** comprobar que el primero no sea `NIL` y mostrar su dato sin modificar la cola; si está vacía, informarlo.
- **Buscar:** con esta representación puede recorrerse mediante un puntero auxiliar, sin cambiar los enlaces ni los extremos. Si solo se permiten operaciones FIFO en clase, habrá que adaptar el procedimiento usando las operaciones enseñadas. [Ver ejemplo](Busqueda/busqueda.md).

Para quitar un valor que no es el primero, los ejercicios de este práctico usan una cola auxiliar: se van retirando nodos del frente y agregando al final de la auxiliar, salvo la primera coincidencia. Así se conserva el orden de los demás. Desconectar un nodo no es lo mismo que liberar su memoria.

## Cola y pila

En una **cola** se inserta al final y se extrae del primero: FIFO. En una **pila** se inserta y se extrae por el tope: LIFO, el último en entrar es el primero en salir.

La representación y `New(COLA)` se usan como supuestos didácticos; se ajustarán si los ejemplos de la profesora usan una sintaxis distinta.

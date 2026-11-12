# Final: ejercicios combinados

Un ejercicio combinado trabaja con dos o más estructuras en un mismo problema. Por ejemplo, puede pedir recorrer una pila y copiar algunos datos en una lista, o buscar nombres en una lista y transferirlos a una cola. Para resolverlo hay que respetar las reglas de **cada estructura** y también la relación entre ellas.

## ¿Pueden aparecer en el final?

Los trabajos prácticos de la materia sí incluyen ejercicios combinados: por ejemplo, el [TP 3, ejercicio 7](../Lista_Encadenada_Simple/TpN3.md) combina una cola y una lista simple; el [TP 4, ejercicio 3](../Lista_Encadenadas_Simples_Circulares/TpN4.md) combina una pila y una lista circular; y el [TP 6, ejercicios 2 y 3](../Lista_doblemente_enlazada_circular/TpN6.md) combina listas dobles circulares con una cola o una pila. Son material pertinente para practicar, pero estos archivos no confirman qué ejercicios tomará la profesora en el final.

Las carpetas siguientes reúnen **copias de soluciones ya existentes en los prácticos**, cada una con su explicación, SVG y PNG. Sus supuestos son parte de la resolución propuesta, no indicaciones confirmadas de la profesora. Ante diferencias, priorizá el enunciado y las correcciones de clase.

## Ejercicios para practicar

| N.º | Combinación y tarea | Qué practicar | Resolución |
|---|---|---|---|
| 1 | Pila → cola: copiar los números impares | Selección y agregado al final de una cola, sin vaciar la pila | [TP 2, ejercicio 4](01%20-%20Pila%20a%20cola/ejercicio-04.md) |
| 2 | Cola → pila: copiar valores y luego borrar la cola | Inversión del orden, copia y eliminación posterior | [TP 2, ejercicio 10](02%20-%20Cola%20a%20pila/ejercicio-10.md) |
| 3 | Cola → lista simple: agregar datos que no están | Búsqueda de duplicados e inserción en una lista existente | [TP 3, ejercicio 7](03%20-%20Cola%20a%20lista%20simple/ejercicio-07.md) |
| 4 | Lista simple → lista circular: copiar posiciones alternadas | Recorrido lineal y construcción de una circular | [TP 4, ejercicio 2](04%20-%20Lista%20simple%20a%20circular/ejercicio-02.md) |
| 5 | Pila → lista circular: copiar valores sin duplicados | Búsqueda en una circular y cierre del último nodo | [TP 4, ejercicio 3](05%20-%20Pila%20a%20lista%20circular/ejercicio-03.md) |
| 6 | Cola → lista doble: copiar trabajos | Inserción en una LDES y mantenimiento de `PA` y `PS` | [TP 5, ejercicio 5](06%20-%20Cola%20a%20lista%20doble/ejercicio-05.md) |
| 7 | Dos listas simples → lista doble: intercalar | Alternancia y tratamiento de los nodos sobrantes | [TP 5, ejercicio 7](07%20-%20Dos%20listas%20a%20lista%20doble/ejercicio-07.md) |
| 8 | Lista doble circular → cola: transferir nombres | Búsqueda, inserción en cola y eliminación en circular | [TP 6, ejercicio 2](08%20-%20Lista%20doble%20circular%20a%20cola/ejercicio-02.md) |
| 9 | Pila → lista doble circular: copiar desaprobados | Filtrado y construcción de una circular doble | [TP 6, ejercicio 3](09%20-%20Pila%20a%20lista%20doble%20circular/ejercicio-03.md) |

## Cómo encarar uno nuevo

1. **Identificá origen y destino.** Anotá qué puntero señala cada estructura y si ya existe o se crea vacía.
2. **Marcá la acción pedida.** Copiar o generar no significa borrar el origen; transferir o eliminar sí exige modificarlo. Si hay que retirar un dato y crear un nodo de destino, asegurá primero la inserción de la copia; si falla la memoria, conservá el dato original.
3. **Definí el orden.** Una pila incorpora al tope; una cola incorpora al final. Por ejemplo, recorrer `1 → 2 → 3` y apilar cada valor produce `3 → 2 → 1` desde el tope. Si se encolan en ese orden, quedan `1 → 2 → 3` desde el primero.
4. **Elegí cómo termina el recorrido.** En estructuras lineales enlazadas se puede llegar a `NIL`; en una circular no vacía hay que detectar el regreso al inicio u otro límite equivalente.
5. **Revisá los enlaces y casos especiales.** Considerá estructura vacía, un solo nodo y cambios de cabeza o de último. En las dobles, conservá ambos sentidos; en las circulares, el cierre.
6. **Comprobá las reglas adicionales.** Si pide filtrar, evitar duplicados, intercalar o conservar un orden, incorporá esas condiciones expresamente. La falta de memoria debe detener o manejar la operación sin acceder a un nodo `NIL`.

Para dibujar, seguí [pautas.md](../pautas.md): un rectángulo inicial, **Sí a la derecha y No a la izquierda**, uniones físicas y conectores numerados solo para retornos de `WHILE`.

**Siglas:** LES es lista encadenada simple; LEC o LESC es lista simple circular en el TP 4; LDES es lista doble no circular; LDEC o LDESC es lista doble circular en el TP 6.

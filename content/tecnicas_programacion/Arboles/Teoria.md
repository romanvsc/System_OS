# Árboles: teoría básica

## Nodos y relaciones

Un árbol es una estructura formada por nodos unidos por relaciones de padre e hijo. La **raíz** es el nodo inicial; una **hoja** es un nodo sin hijos. Los nodos que cuelgan de un hijo forman un **subárbol**. Un nodo puede ser padre de uno o más hijos y, salvo la raíz, tiene un padre.

```text
       8             nivel 0: raíz
      / \
     3   10          nivel 1: hijos de 8
      \
       6             nivel 2: hijo de 3
```

En este ejemplo 6 y 10 son hojas, 3 es padre de 6 y 3 es hijo de 8. Elegimos que la raíz esté en **nivel 0**: el nivel es la cantidad de enlaces desde la raíz. El nivel máximo del ejemplo es 2; una raíz sola tiene nivel máximo 0 y un árbol vacío no tiene nivel máximo.

## Árbol binario y árbol binario de búsqueda

Un **árbol binario** tiene como máximo dos hijos por nodo: izquierdo y derecho. Esto por sí solo no garantiza que los datos estén ordenados.

En un **árbol binario de búsqueda** como el que suponemos en estos ejercicios, los valores menores van al subárbol izquierdo y los mayores al derecho. Para insertar buscamos un enlace vacío; si el valor ya existe, lo informamos sin insertarlo. Una referencia ausente se representa con `NIL`. [Ver búsqueda](Busqueda/busqueda.md) y [ver inserción](Insercion/insercion.md).

## Recorrido IRD

**IRD** significa visitar primero el subárbol izquierdo, después la raíz del subárbol y luego el subárbol derecho. En el dibujo anterior el orden es 3, 6, 8, 10. Si el árbol binario no es de búsqueda, IRD no asegura que la salida esté ordenada. [Ver diagrama IRD](Recorrido_IRD/recorrido_ird.md).

Para hacer los recorridos sin recursión, las guías usan una pila auxiliar de referencias: un nodo de pila guarda la referencia a un nodo del árbol y un enlace al siguiente elemento de la pila. Cada reserva se comprueba. Si falla, se informa que el recorrido quedó incompleto; no se presenta una cuenta o máximo parcial como definitivo. Desconectar un nodo auxiliar no equivale a liberar memoria.

## Árbol general y árbol genealógico

Un árbol general puede tener más de dos hijos. Para los ejercicios que no limitan la cantidad de hijos suponemos dos enlaces: `HIJO` al primer hijo y `HERMANO` al siguiente hermano. Una única raíz tiene `HERMANO = NIL`. Un nodo es hoja si `HIJO = NIL`. [Ver conteo de hojas](Contar_hojas/contar_hojas.md).

En un árbol genealógico, los descendientes de una persona son sus hijos, nietos y generaciones siguientes. No incluyen a la propia persona ni a sus hermanos. [Ver nivel máximo de un árbol binario](Nivel_maximo/nivel_maximo.md).

Los nombres `IZQ`, `DER`, `HIJO`, `HERMANO`, `ref` y las operaciones `New(ARBOL)` y `New(PILA)` son **supuestos didácticos**, no una sintaxis atribuida a la profesora. Si se reciben sus ejemplos, deberán adaptarse. Ningún campo se consulta cuando su puntero puede ser `NIL`.

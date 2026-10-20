# Desarrollo del backend de empleados

## Objetivo

Este proyecto ofrece una API HTTP sencilla para practicar consultas `GET` con datos locales de empleados. No modifica el fichero de datos ni necesita una base de datos.

## Proceso y decisiones

1. **Inspeccionar los datos existentes.** `empleados.js` exporta el array `empleados` como módulo ES. Cada registro incluye `dni`, `nombre`, `apellido` y `categoria`, además de otros datos personales y laborales.
2. **Elegir una tecnología pequeña y didáctica.** Se usa Express 5 para que cada endpoint quede declarado de forma explícita. Node.js 18 o superior permite ejecutar las pruebas con `fetch` nativo.
3. **Mantener los datos como única fuente de verdad.** La API importa el array directamente. Las categorías se calculan a partir de los empleados y se eliminan duplicados con `Set`, en lugar de mantener otra lista manual.
4. **Separar la aplicación de su arranque.** `app.js` define y exporta la aplicación para reutilizarla en pruebas; `index.js` la inicia en el puerto indicado por `PORT` o, si no se define, en el `3000`.
5. **Proyectar solo la información solicitada.** La lista general devuelve únicamente DNI, nombre y apellido; la lista por categoría devuelve valores DNI, no objetos completos.
6. **Definir errores previsibles.** Un DNI o una categoría desconocidos devuelven estado HTTP `404` con un objeto JSON `error`. Las rutas que no existen también responden `404` en JSON.
7. **Probar el contrato HTTP.** `app.test.js` inicia la aplicación en un puerto efímero y usa el módulo de pruebas integrado de Node. Así las pruebas no dependen del puerto `3000` ni requieren una biblioteca adicional de testing.

## Estructura

- `empleados.js`: datos locales; no se modifica desde la API.
- `app.js`: definición de rutas y respuestas JSON.
- `index.js`: inicio del servidor.
- `app.test.js`: pruebas de rutas, proyecciones y errores.
- `package.json`: dependencias, requisito de Node.js y comandos del proyecto.

## Endpoints

| Método | Ruta | Respuesta correcta |
| --- | --- | --- |
| `GET` | `/empleados` | Array de objetos con `dni`, `nombre` y `apellido`. |
| `GET` | `/empleados/:dni` | Objeto completo del empleado identificado por DNI. |
| `GET` | `/categorias` | Array de categorías únicas presentes en los datos. |
| `GET` | `/categorias/:categoria/empleados` | Array de DNI de los empleados de esa categoría. |

Todas las respuestas correctas tienen estado `200` y formato JSON. Para las rutas que buscan un DNI o una categoría, si no hay coincidencia se devuelve `404`, por ejemplo:

```json
{ "error": "Empleado no encontrado" }
```

Los DNI del fichero están almacenados como números; la ruta compara su representación textual con el parámetro de URL. Se verificó que los 582 registros actuales tienen DNI únicos, condición necesaria para identificar un empleado concreto.

## Ejecutar y probar

Desde la carpeta del proyecto, con Node.js 18 o superior:

```bash
npm install
npm test
npm start
```

El servidor queda disponible en `http://localhost:3000`. Para cambiar el puerto, define la variable `PORT`, por ejemplo `PORT=4000 npm start`.

Consultas de ejemplo:

```bash
curl http://localhost:3000/empleados
curl http://localhost:3000/empleados/23274294
curl http://localhost:3000/categorias
curl http://localhost:3000/categorias/informatico/empleados
```

Las pruebas cubren la selección de campos de la lista general, la recuperación completa por DNI, las categorías únicas, los DNI filtrados por categoría y los `404` para DNI y categoría inexistentes.
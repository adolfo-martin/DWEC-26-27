import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { app } from "./app.js";
import { empleados } from "./empleados.js";

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("API de empleados", () => {
  it("devuelve todos los empleados solo con DNI, nombre y apellido", async () => {
    const response = await fetch(`${baseUrl}/empleados`);
    const resultado = await response.json();

    assert.equal(response.status, 200);
    assert.equal(resultado.length, empleados.length);
    assert.deepEqual(resultado[0], {
      dni: empleados[0].dni,
      nombre: empleados[0].nombre,
      apellido: empleados[0].apellido,
    });
    assert.ok(resultado.every((empleado) =>
      Object.keys(empleado).every((campo) =>
        ["dni", "nombre", "apellido"].includes(campo),
      ),
    ));
  });

  it("devuelve toda la información del empleado solicitado por DNI", async () => {
    const empleado = empleados[0];
    const response = await fetch(`${baseUrl}/empleados/${empleado.dni}`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), empleado);
  });

  it("devuelve 404 si el DNI no existe", async () => {
    const response = await fetch(`${baseUrl}/empleados/no-existente`);

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Empleado no encontrado" });
  });

  it("devuelve las categorías sin repetir", async () => {
    const response = await fetch(`${baseUrl}/categorias`);
    const resultado = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(resultado, [...new Set(empleados.map((empleado) => empleado.categoria))]);
  });

  it("devuelve solo los DNI de los empleados de una categoría", async () => {
    const categoria = encodeURIComponent(empleados[0].categoria);
    const response = await fetch(`${baseUrl}/categorias/${categoria}/empleados`);
    const resultado = await response.json();
    const esperado = empleados
      .filter((empleado) => empleado.categoria === empleados[0].categoria)
      .map((empleado) => empleado.dni);

    assert.equal(response.status, 200);
    assert.deepEqual(resultado, esperado);
  });

  it("devuelve 404 si la categoría no existe", async () => {
    const response = await fetch(`${baseUrl}/categorias/categoria-inexistente/empleados`);

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: "Categoría no encontrada" });
  });
});
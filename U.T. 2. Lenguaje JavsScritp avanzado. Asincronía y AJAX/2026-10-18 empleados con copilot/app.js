import express from "express";
import { empleados } from "./empleados.js";

export const app = express();

const categorias = [...new Set(empleados.map((empleado) => empleado.categoria))];

app.get("/empleados", (req, res) => {
  const resultado = empleados.map(({ dni, nombre, apellido }) => ({
    dni,
    nombre,
    apellido,
  }));

  res.json(resultado);
});

app.get("/empleados/:dni", (req, res) => {
  const empleado = empleados.find(
    (registro) => String(registro.dni) === req.params.dni,
  );

  if (!empleado) {
    return res.status(404).json({ error: "Empleado no encontrado" });
  }

  res.json(empleado);
});

app.get("/categorias", (req, res) => {
  res.json(categorias);
});

app.get("/categorias/:categoria/empleados", (req, res) => {
  const { categoria } = req.params;

  if (!categorias.includes(categoria)) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  const dnis = empleados
    .filter((empleado) => empleado.categoria === categoria)
    .map((empleado) => empleado.dni);

  res.json(dnis);
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
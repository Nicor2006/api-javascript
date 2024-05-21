const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

const mongoUri = process.env.MONGODB_URI;

try {

  mongoose.connect(mongoUri);

  console.log("Conectado a MongoDB");

} catch (error) {

  console.error("Error de conexión", error);

}

const libroSchema = new mongoose.Schema({

  titulo: String,

  autor: String,

});

const Libro = mongoose.model("Libro", libroSchema);

// Crear nuevo libro
app.post("/libros", async (req, res) => {
  const libro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor,
  });

  try {
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(500).send("Error al guardar libro");
  }
});

//Traer un listado de todos los libros

app.get("/libros", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).send("Error al obtener libros");
  }
});

app.get("/libros/:id", async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al buscar el libro");
  }
});

app.put("/libros/:id", async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(
      req.params.id,
      {
        titulo: req.body.titulo,
        autor: req.body.autor,
      },
      { new: true } // Esta opción hará que se devuelva el documento actualizado
    );

    if (libro) {
      res.json(libro);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al actualizar el libro");
  }
});

app.delete("/libros/:id", async (req, res) => {
  try {
    const libro = await Libro.findByIdAndRemove(req.params.id);
    if (libro) {
      res.status(204).send();
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el libro");
  }
});
module.exports = app;
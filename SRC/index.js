const app = require ("./app");

const PORT = process.env.PORT;

app.listen(3000, () => {

  console.log("Servidor ejecutandose en http://localhost:3000/");

});
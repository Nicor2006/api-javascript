const app = require ("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {

  console.log("Servidor ejecutandose en http://localhost:3000/");

});
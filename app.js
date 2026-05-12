const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.use(express.json());
const port = 8000;

const routesPath = path.join(__dirname, "src", "routes"); // array of files in the routes directory
console.log("Rotas disponíveis:", fs.readdirSync(routesPath)); // log the available routes



fs.readdirSync(routesPath).forEach((file) => {
  const route = require(`./src/routes/${file}`);
  const routeName = file.replace(".route.js", "");
  app.use(`/${routeName}`, route);
});


app.listen(port, () => {
  console.log(`Escutando a porta http://localhost:${port}`);
});

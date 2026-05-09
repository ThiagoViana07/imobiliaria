const express = require("express");

const app = express();
app.use(express.json());
const port = 8000;

const routesPath = path.join(__dirname, "routes"); // array of files in the routes directory

fs.readdirSync(routesPath).forEach((file) => {
  const route = require(`./routes/${file}`);
  const routeName = file.replace(".route.js", "");
  app.use(`/${routeName}`, route);
});

app.listen(port, () => {
  console.log(`Escutando a porta http://localhost:${port}`);
});

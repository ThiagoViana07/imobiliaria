import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const port = 8000;

const routesPath = path.join(__dirname, 'src', 'routes'); // array of files in the routes directory
console.log('Rotas disponíveis:', fs.readdirSync(routesPath)); // log the available routes

fs.readdirSync(routesPath).forEach(async (file) => {
  const route = await import(`./src/routes/${file}`);
  const routeName = file.replace('.route.js', '');
  app.use(`/${routeName}`, route.default);
});

app.listen(port, () => {
  console.log(`Escutando a porta http://localhost:${port}`);
});

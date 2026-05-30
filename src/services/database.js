import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', '..', 'data');

const getCollectionFile = (collectionName) => {
  return path.join(dataPath, `${collectionName}.json`);
};

const readData = (collectionName) => {
  console.log(dataPath);
  const file = getCollectionFile(collectionName);
  const data = fs.readFileSync(file, 'utf-8');
  return JSON.parse(data);
};

const saveData = (collectionName, data) => {
  const file = getCollectionFile(collectionName);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

export { readData, saveData };

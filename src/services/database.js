const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data");

const getCollectionFile = (collectionName) => {
  return path.join(dataPath, `${collectionName}.json`);
};

const readData = (collectionName) => {
  const file = getCollectionFile(collectionName);
  const data = fs.readFileSync(file, "utf-8");
  return JSON.parse(data);
};

const saveData = (collectionName, data) => {
  const file = getCollectionFile(collectionName);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = {
  readData,
  saveData,
};

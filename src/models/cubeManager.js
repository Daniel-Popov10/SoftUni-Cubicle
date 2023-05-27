const fs = require("fs/promises");
let db = fs.readFile("./config/database.json");
console.log(db);

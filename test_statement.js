// import { statement } from "./statement_v1.js";
const { statement } = require("./statement_v2.js");
const fs = require("fs").promises;

async function fetchJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to read ${filePath}:`, error);
  }
}

(async () => {
  const invoice = await fetchJSON("invoices.json");
  const plays = await fetchJSON("plays.json");
  if (invoice && plays) {
    const result = statement(invoice, plays);
    console.log(result);
  }
})();

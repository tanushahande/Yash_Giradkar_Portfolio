const fs = require("fs");

async function extract() {
  const pdfParse = require("pdf-parse");
  const buffer = fs.readFileSync("public/resume/Yash_Giradkar_Analyst.pdf");
  const fn = pdfParse.default || pdfParse;
  const data = await fn(buffer);
  console.log(data.text);
}

extract().catch(console.error);

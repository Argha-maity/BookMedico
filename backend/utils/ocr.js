import Tesseract from "tesseract.js";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractTextFromFile = async (filePath) => {
  try {
    //PDF
    if (filePath.endsWith(".pdf")) {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    }

    //Image
    const result = await Tesseract.recognize(filePath, "eng");

    return result.data.text;

  } catch (error) {
    console.error("OCR Error:", error);
    return "";
  }
};
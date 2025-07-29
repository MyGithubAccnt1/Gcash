import Tesseract from "tesseract.js";

export default function Ocr({ number }) {
  const extract = async (file) => {
    try {
      if (!file) return;

      const result = await Tesseract.recognize(file, "eng");
      const ocrText = result.data.text;

      return {
        number: extractMobile(ocrText),
        amount: extractAmount(ocrText),
        reference: extractReference(ocrText),
        date: extractDate(ocrText),
        type: extractType({
          ocrText: ocrText,
          number: number,
        }),
      };
    } catch (error) {
      console.error("OCR error:", error);
    }
  };

  return {
    extract: extract,
  };
}

function extractType({ ocrText, number }) {
  return ocrText.includes(number) ? "Received" : "Sent";
}

function extractAmount(ocrText) {
  return ocrText.match(/Amount\s+([\d,.]+)/i)?.[1] ?? "";
}

function extractMobile(ocrText) {
  return ocrText.match(/\+63\s\d{3}\s\d{3}\s?\d{4}/)?.[0] ?? "";
}

function extractReference(ocrText) {
  return ocrText.match(/Ref\s*No\.?\s*([\d\s]+)/i)?.[1] ?? "";
}

function extractDate(ocrText) {
  return (
    ocrText.match(
      /([A-Z][a-z]{2}\s\d{1,2},\s\d{4}\s\d{1,2}:\d{2}\s[AP]M)/g
    )?.[0] ?? ""
  );
}

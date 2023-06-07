import * as XLSX from "xlsx/xlsx";
import axios from "axios";

const ConvertXLSXtoJson = async (e, url) => {
  e.preventDefault();
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const data = new Uint8Array(response.data);
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    return json;
  } catch (error) {
    throw new Error("Error converting XLSX to JSON:", error);
  }
};
export default ConvertXLSXtoJson;

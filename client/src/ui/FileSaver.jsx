import { saveAs } from "file-saver";
import Button from "./Button";

function FileSaver({ filePath }) {
  const path = `img/patient/prescriptions/${filePath}`;
  const ext = filePath.split(".").pop();
  const downloadImage = () => {
    saveAs(path, `image.${ext}`); // Put your image URL here.
  };
  return <Button onClick={downloadImage}>Download</Button>;
}

export default FileSaver;

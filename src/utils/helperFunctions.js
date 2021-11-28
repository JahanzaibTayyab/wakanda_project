import { v4 as uuidv4 } from "uuid";
import { generatedUrl } from "../constants/Common";
import generator from "generate-password";

const generateCode = () => {
  const timestamp = Date.now();
  const id = uuidv4();
  const code = `${id}-${timestamp}`;
  return code;
};

const generateUrl = () => {
  return generatedUrl.LINK + generateCode();
};

const generatePinCode = () => {
  return generator.generate({
    length: 8,
    numbers: true,
    lowercase: true,
    uppercase: false,
    excludeSimilarCharacters: true,
  });
};
export { generateUrl, generatePinCode };

import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;

// Encrypt data
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
export const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

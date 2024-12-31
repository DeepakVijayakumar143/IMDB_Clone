import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;

// Encrypt data
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

import CryptoJS from "crypto-js";
const secretPass = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const encryptData = (text) => {
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    secretPass
  ).toString();
  return cipherText;
};

export const decryptedData = (ciphertext) => {
  const plainText = JSON.parse(
    CryptoJS.AES.decrypt(ciphertext, secretPass).toString(CryptoJS.enc.Utf8)
  );
  return plainText;
};

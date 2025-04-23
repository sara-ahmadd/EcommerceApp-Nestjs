import * as CryptoJS from 'crypto-js';
import { config } from 'dotenv';

config();

export const encryptText = (text: string) => {
  const encryptedText = CryptoJS.AES.encrypt(
    text,
    process.env.ENCRYPTION_KEY!,
  ).toString();
  return encryptedText;
};

export const decrypt = ({ cypherText }) => {
  const decryptedText = CryptoJS.AES.decrypt(
    cypherText,
    process.env.ENCRYPTION_KEY!,
  ).toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

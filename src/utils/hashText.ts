import { compareSync, hashSync } from 'bcrypt';
import { config } from 'dotenv';
config();

export const hashText = (text: string, saltRound = process.env.SALT_ROUND!) => {
  return hashSync(text, Number(saltRound));
};

export const compareHash = (text: string, hashedText: string) => {
  return compareSync(text, hashedText);
};

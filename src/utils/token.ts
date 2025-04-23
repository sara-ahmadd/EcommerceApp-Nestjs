import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const generateToken = (payload: any, expirationTime: string) => {
  //create access token
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expirationTime,
  });
  return token;
};
export const verifyToken = (token: string) => {
  //verify access token
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return payload;
};

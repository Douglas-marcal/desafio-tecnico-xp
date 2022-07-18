import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GenerateToken } from '../../interface';

dotenv.config();

export function generateToken(clientCreated: GenerateToken): string {
  const payload = {
    CodCliente: clientCreated.CodCliente,
    email: clientCreated.email,
  };

  const options = {
    expiresIn: '1h',
  };

  const PRIVATE_KEY = <string>process.env.PRIVATE_KEY;

  const token = jwt.sign(payload, PRIVATE_KEY, options);

  return token;
}

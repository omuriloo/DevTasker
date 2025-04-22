import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

if(!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env file');
}

const secret: Secret = JWT_SECRET;

export function geraToken(payload: JwtPayload): string {
    return jwt.sign(payload, secret, { expiresIn: "15min" })
}

export function verificaToken(token: string) {
    return jwt.verify(token, secret);
}
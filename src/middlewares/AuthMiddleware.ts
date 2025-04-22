import { Request, Response, NextFunction } from "express";
import { verificaToken } from "../Auth";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export class AuthMiddleware {
    async validaToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Token não fornecido" });
            return;
        }
        
        try {
            const user = verificaToken(token);
            req.user = user;
            next();
        } catch (error) {
            res.status(403).json({ message: "Token inválido ou expirado" });
            return;
        }
    }
}
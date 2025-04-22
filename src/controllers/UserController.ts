import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";

const repo = new UserRepository();

export class UserController {

  // Registro 
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, creationDate} = req.body;

      const existing = await repo.findUserByEmail(email);
      if (existing) {
        res.status(400).json({ message: "Email já em uso." });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
      const user = await repo.createUser(name, email, hashedPassword, creationDate);

      res.status(201).json(user);
      return;
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário", details: error });
      return;
    }
  }

  // Atualização do User
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      let { name, email, password, creationDate} = req.body;

      if (password) {
        password = await bcrypt.hash(password, 10);
      }

      const fieldsToUpdate = { name, email, password, creationDate};
      const updated = await repo.updateUser(id, fieldsToUpdate);

      if (!updated) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }      

      res.json({ message: "Usuário atualizado com sucesso.", updated });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário", details: error });
      return;
    }
  }

  // Deletar
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await repo.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.json({ message: "Usuário deletado com sucesso." });
      return;
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário", details: error });
      return;
    }
  }

    // Buscar todos
    static async getAll(req: Request, res: Response) {
        try {
          const users = await repo.findAllUsers();
          res.json(users);
          return;
        } catch (error) {
          res.status(500).json({ message: "Erro ao buscar usuários", details: error });
          return;
        }
      }
    
      // Buscar por ID
      static async getById(req: Request, res: Response) {
        try {
          const id = parseInt(req.params.id);
          const user = await repo.findUserById(id);
          if (!user) {
            res.status(404).json({ message: "Usuário não encontrado." });
            return;
          }
    
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: "Erro ao buscar usuário", details: error });
          return;
        }
      }
    
}

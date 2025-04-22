import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { geraToken } from "../Auth";
import bcrypt from "bcryptjs";

const repo = new UserRepository();

export class UserController {

 
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone} = req.body;

      const existing = await repo.findUserByEmail(email);
      if (existing) return res.status(400).json({ message: "Email já em uso." });

      const user = await repo.createUser(name, email, password, phone);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário", details: error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await repo.findUserByEmail(email);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: "Senha inválida." });

      const token = geraToken({ id: user.id, email: user.email });

      res.json({ message: "Login autorizado" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login", details: error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const users = await repo.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários", details: error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await repo.findUserById(id);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", details: error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name, email, password, phone, role } = req.body;

      const fieldsToUpdate = { name, email, password, phone, role };
      const updated = await repo.updateUser(id, fieldsToUpdate);

      if (!updated) return res.status(404).json({ message: "Usuário não encontrado." });

      res.json({ message: "Usuário atualizado com sucesso.", updated });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário", details: error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await repo.deleteUser(id);

      if (!deleted) return res.status(404).json({ message: "Usuário não encontrado." });

      res.json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário", details: error });
    }
  }

}
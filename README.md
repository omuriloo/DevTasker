# DevTasker 

O projeto **DevTasker** consiste em um sistema backend completo voltado para a **gestão de tarefas de equipes de desenvolvimento**.
A aplicação tem como principal objetivo **gerenciar usuários, tarefas e projetos**. A estrutura implementa funcionalidades de cadastro, autenticação e gerenciamento de usuários, utilizando autenticação JWT.

#### Funcionalidades:
- Registro de novos usuários com validações
- Autenticação via JWT
- Consulta, atualização e remoção de usuários
- Proteção de rotas por middleware de autenticação

## 👥 Integrantes

- Otto Machado  
- Henrique  
- Murilo  

## 🛠 Tecnologias utilizadas

- TypeScript
- Node.js
- Express
- TypeORM
- JWT (JSON Web Token)

## 🚀 Como rodar o projeto

#### Clone o repositório:

```bash
git clone https://github.com/OttoMachado/DevTasker.git
cd DevTasker
```
#### Inicie o servidor:
```
npm run dev
```
E o servidor estará disponível em:
http://localhost:3000

## 📡 Endpoints da API

#### Autenticação
- `POST /api/register` – Registro de novo usuário  
- `POST /api/login` – Autenticação de usuário  

#### Usuários
- `GET /api/users` – Listar todos os usuários 
- `GET /api/users/:id` – Buscar usuário por ID 
- `PUT /api/users/:id` – Atualizar informações do usuário 
- `DELETE /api/users/:id` – Deletar usuário 


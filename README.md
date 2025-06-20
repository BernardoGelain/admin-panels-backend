# 🛠️ Backend Marcante

Este é o backend do projeto **Marcante**, construído com **NestJS**, **TypeORM** e **PostgreSQL**.

---

## ✅ Passo a passo para rodar o projeto

### 1. Clone o repositório e instale as dependências

```bash
git clone https://github.com/bernardogelain/backend-marcante.git
cd backend-marcante
npm install
```

---

### 2. Configure o ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```ini
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=pass
DATABASE_NAME=marcante
JWT_SECRET=sua_chave_secreta
```

> 🔐 Você pode gerar uma chave JWT em sites como [jwt.io](https://jwt.io) ou usar um UUID como valor.

---

### 3. Instale e configure o PostgreSQL

#### 🔵 macOS (via Homebrew)

```bash
brew install postgresql
brew services start postgresql
createdb marcante
```

#### 🟢 Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb marcante
```

#### 🟠 Windows

Baixe o instalador oficial:  
👉 https://www.postgresql.org/download/windows  
Depois, crie o banco de dados chamado `marcante`.

---

### 4. Execute as migrations

```bash
npm run typeorm migration:run -- -d src/ormconfig.ts
```

---

### 5. Execute as seeds

```bash
npm run seed
```

> Isso irá popular o banco com usuários e painéis fictícios para testes.

---

### 6. Inicie o servidor

```bash
npm run start:dev
```

Servidor rodando em:  
➡️ `http://localhost:3000`

---

## 🔐 Autenticação

A autenticação é baseada em **JWT**.

Após o login, inclua o token nas requisições protegidas como:

```http
Authorization: Bearer <seu_token>
```

#### 🔎 Exemplo de rota protegida:

```http
GET http://localhost:3000/users/whoami
```

---

## 📁 Estrutura do Projeto

```
src/
├── auth/         # Autenticação JWT
├── users/        # Usuários e perfis
├── panels/       # Painéis georreferenciados
├── locations/    # Localizações com coordenadas
├── seeds/        # Arquivos de seed para popular o banco
├── migrations/   # Migrations TypeORM
└── ormconfig.ts  # Configuração do TypeORM
```

---

## 🧪 Comandos úteis

| Comando                                                | Descrição                      |
| ------------------------------------------------------ | ------------------------------ |
| `npm run start:dev`                                    | Inicia a aplicação em modo dev |
| `npm run seed`                                         | Executa os seeds               |
| `npm run typeorm migration:run -d src/ormconfig.ts`    | Roda as migrations             |
| `npm run typeorm migration:revert -d src/ormconfig.ts` | Reverte a última migration     |

---

## ✅ Pronto!

Agora você já pode desenvolver, testar e interagir com a API REST de forma segura, organizada e com dados simulados 🎯

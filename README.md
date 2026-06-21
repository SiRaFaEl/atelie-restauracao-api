# Ateliê Restauração - Monorepo

Sistema completo para gerenciamento de ateliês e projetos de móveis com autenticação JWT, desenvolvido com NestJS e Angular 20 em uma estrutura de monorepo com Turborepo.

## 🚀 Funcionalidades

- **Autenticação JWT**: Login seguro com Bearer tokens
- **Controle de Acesso**: Admin pode gerenciar ativação de usuários
- **CRUD de Atelies**: Criar, ler, atualizar e deletar atelies
- **CRUD de Projetos**: Gerenciar projetos associados aos atelies
- **Validações de Negócio**: Regras de domínio robustas no backend
- **Dashboard**: Interface responsiva com Tailwind CSS
- **Monorepo**: Backend e frontend em um único repositório

## 📋 Pré-requisitos

- Node.js 18+ (via nvm recomendado)
- pnpm 8+ (instale via `npm install -g pnpm`)
- Git

## 🛠️ Instalação e Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/atelie-restauracao-monorepo.git
cd atelie-restauracao-monorepo
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e configure:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
# Backend
BACKEND_PORT=3000
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRATION=60m

# Database
DATABASE_TYPE=sqlite
DATABASE_PATH=data/tema9.db

# Frontend
FRONTEND_URL=http://localhost:4200
```

### 3. Instalar dependências

```bash
pnpm install
```

### 4. Rodar o projeto

**Desenvolvimento** (ambos os servidores em paralelo):

```bash
pnpm dev
```

O backend estará disponível em `http://localhost:3000/api`
O frontend estará disponível em `http://localhost:4200`

**Produção**:

```bash
pnpm build
pnpm start:prod
```

## 📚 Usuários Padrão

### Admin
- **E-mail**: `admin@atelie.com`
- **Senha**: `admin123`
- **Papel**: Administrador (pode gerenciar usuários)

## 🏗️ Estrutura do Projeto

```
monorepo-ueg/
├── apps/
│   ├── backend/              # NestJS API
│   │   ├── src/
│   │   │   ├── auth/         # Módulo de autenticação
│   │   │   ├── application/  # Services
│   │   │   ├── infrastructure/
│   │   │   ├── presentation/ # Controllers
│   │   │   └── shared/
│   │   └── package.json
│   └── frontend/             # Angular 20
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/     # Guards, interceptors, services
│       │   │   ├── features/ # Componentes por domínio
│       │   │   └── app.routes.ts
│       │   └── environments/
│       └── package.json
├── packages/
│   ├── utils/                # Tipos compartilhados
│   ├── typescript-config/    # tsconfig base
│   └── eslint-config/        # ESLint compartilhado
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```

## 📡 API Endpoints

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Registrar novo usuário |
| POST | `/auth/login` | Fazer login |
| GET | `/auth/users` | Listar usuários (admin) |
| PATCH | `/auth/users/:id/activate` | Ativar/desativar usuário (admin) |

### Atelies

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/atelies` | Listar atelies |
| GET | `/atelies/:id` | Buscar atelie |
| GET | `/atelies/:id/com-projetos` | Buscar atelie com projetos |
| POST | `/atelies` | Criar atelie |
| PATCH | `/atelies/:id` | Atualizar atelie |
| DELETE | `/atelies/:id` | Deletar atelie |

### Projetos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/projetos` | Listar projetos |
| GET | `/projetos/:id` | Buscar projeto |
| POST | `/projetos` | Criar projeto |
| PATCH | `/projetos/:id` | Atualizar projeto |
| DELETE | `/projetos/:id` | Deletar projeto |

## 🔑 Autenticação no Frontend

O token JWT é armazenado em **sessionStorage** (não em localStorage por segurança). O interceptor HTTP adiciona automaticamente o Bearer token em todas as requisições autenticadas.

Para acessar o token manualmente:

```typescript
const token = sessionStorage.getItem('auth_token');
```

## 🎨 Estilização

O projeto utiliza **Tailwind CSS** v3 com configuração customizada em `apps/frontend/tailwind.config.js`.

## 📊 Documentação da API (Swagger)

Acesse em `http://localhost:3000/docs` para visualizar a documentação interativa da API.

## 🧪 Testes

```bash
# Backend
pnpm run test

# Frontend
pnpm run test
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Rodar ambos em paralelo
pnpm build        # Compilar para produção
pnpm test         # Rodar testes
pnpm lint         # Verificar linting
pnpm format       # Formatar código
```

## 🤝 Integrantes do Grupo

- Rafael Oliveira Alves

## 📄 Licença

Este projeto é fornecido para fins educacionais.

## 🆘 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

##  Tema
Tema 9 – Estúdio de Restauração de Móveis Antigos

##  Descrição

API desenvolvida com NestJS para gerenciamento de ateliês de restauração e seus projetos de móveis.

O sistema permite cadastrar ateliês, criar projetos vinculados a eles e aplicar regras de negócio conforme especificado na atividade.

---

## Arquitetura

O projeto segue uma arquitetura em camadas:

- **presentation** → Controllers e DTOs  
- **application** → Services e regras de negócio  
- **infrastructure** → Persistência com TypeORM  
- **shared** → Configurações globais e tratamento de exceções  

---

## Tecnologias utilizadas

- NestJS  
- TypeORM  
- SQLite  
- Swagger  
- class-validator  

---

## Entidades

### Ateliê

- especialidadeEra (string)  
- dataFundacao (date)  
- equipadoCompleto (boolean)  
- areaOficinaM2 (number)  

### ProjetoMovel

- tipoMovel (string)  
- dataInicioTrab (date)  
- restaurado (boolean)  
- horasHomem (number)  
- atelieId (FK)  

Relacionamento: **1:N**  

Um ateliê pode possuir vários projetos de móveis.

---
## Principais EndPoints

Ateliê

- POST /atelies → Criar ateliê
- GET /atelies → Listar todos
- GET /atelies/:id → Buscar por ID
- PATCH /atelies/:id → Atualizar
- DELETE /atelies/:id → Remover
- GET /atelies/:id/com-projetos → Buscar ateliê com projetos

Projeto de Móvel

- POST /projetos → Criar projeto
- GET /projetos → Listar todos
- GET /projetos/:id → Buscar por ID
- PATCH /projetos/:id → Atualizar
- DELETE /projetos/:id → Remover

---
## Banco de Dados

O projeto utiliza SQLite.

Arquivo:

data/tema9.db

Contém dados de teste para validação dos endpoints.

---

## Regras de negócio implementadas

- Todos os campos são obrigatórios  
- Data de fundação não pode ser futura  
- Área mínima do ateliê: 50m²  
- Projeto deve estar vinculado a um ateliê existente  
- Data do projeto não pode ser anterior à fundação do ateliê  
- Horas de trabalho entre 10 e 1000  
- Se restaurado = true → mínimo de 40 horas  
- Não permitir duplicidade de projeto em aberto para o mesmo tipo de móvel  

---

## Divisão de Tarefas

Desenvolvimento realizado individualmente por:

Rafael Oliveira Alves

Responsável por:

- Modelagem das entidades
- Implementação do CRUD
- Regras de negócio
- Integração com banco de dados
- Documentação e testes via Swagger

---
## Swagger

Acesse a documentação interativa da API em:
http://localhost:3000/docs

---
## Como executar o projeto

```bash
npm install
npm run start:dev





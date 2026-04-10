# Ateliê de Restauração API

##  Integrante(s)
Rafael Oliveira Alves

---

##  Tema
Tema 9 – Estúdio de Restauração de Móveis Antigos

---

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
- GET /atelies/:id/projetos → Buscar ateliê com projetos

Projeto de Móvel

- POST /projetos → Criar projeto
- GET /projetos → Listar todos
- GET /projetos/:id → Buscar por ID
- PATCH /projetos/:id → Atualizar
- DELETE /projetos/:id → Remover

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

## Como executar o projeto

```bash
npm install
npm run start:dev

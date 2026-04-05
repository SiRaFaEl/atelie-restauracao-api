# 🪑 Ateliê de Restauração API

## 📌 Descrição

API desenvolvida com NestJS para gerenciamento de ateliês de restauração e seus projetos de móveis.

O sistema permite cadastrar ateliês, criar projetos vinculados a eles e aplicar regras de negócio conforme o Tema 9 da atividade.

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

- **presentation** → controllers e DTOs
- **application** → services e regras de negócio
- **infrastructure** → persistência com TypeORM
- **shared** → configurações globais e filtros

---

## ⚙️ Tecnologias utilizadas

- NestJS
- TypeORM
- SQLite
- Swagger
- class-validator

---

## 🧱 Entidades

### Ateliê
- especialidadeEra
- dataFundacao
- equipadoCompleto
- areaOficinaM2

### ProjetoMovel
- tipoMovel
- dataInicioTrab
- restaurado
- horasHomem
- atelieId

Relacionamento: **1:N (um ateliê possui vários projetos)**

---

## 📊 Regras de negócio implementadas

- Campos obrigatórios
- Data de fundação não pode ser futura
- Área mínima de 50 m²
- Projeto deve estar vinculado a um ateliê existente
- Data do projeto não pode ser anterior à fundação
- Horas entre 10 e 1000
- Se restaurado = true → mínimo 40 horas
- Não permitir duplicidade de projeto em aberto

---

## 🚀 Como executar o projeto

```bash
npm install
npm run start:dev

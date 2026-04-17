# 🎟️ TycketSystem

Sistema web para gerenciamento de eventos, permitindo que usuários criem contas, explorem eventos disponíveis e se inscrevam de forma simples e intuitiva.

---

## 🚀 Sobre o projeto

O **TycketSystem** é um projeto acadêmico que simula uma plataforma de gerenciamento de eventos online.  
A proposta é centralizar a experiência do usuário em um único ambiente, oferecendo:

- Cadastro e autenticação de usuários  
- Visualização de eventos disponíveis  
- Inscrição em eventos  
- Acesso a descrições detalhadas  
- Painel administrativo com autenticação via JWT  

Além disso, o sistema possui uma arquitetura moderna com separação entre frontend e backend.

---

## 🛠️ Tecnologias utilizadas

### Frontend
- React  
- TypeScript  
- Vite  
- Outras bibliotecas de UI e gerenciamento de estado  

### Backend
- Node.js  
- Express  
- MongoDB  
- JWT (autenticação e autorização)  

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para controle de acesso, incluindo:

- Login de usuários  
- Proteção de rotas  
- Acesso administrativo com dashboard próprio  

---

## 📦 Estrutura do projeto
```bash
TycketSystem/                                  <br>
│                                              <br>
├── backend/ # API (Node + Express)            <br>
├── frontend/ # Interface (React + TypeScript) <br>
└── README.md                                  <br>
```
---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório
```bash
git clone https://github.com/KSelyson/TycketSystem.git
cd TycketSystem
```
### 2. Backend
```bash
cd backend
npm install
npm run dev
```
### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Funcionalidades principais

✅ Cadastro e login de usuários  <br>
✅ Listagem de eventos           <br>
✅ Inscrição em eventos          <br>
✅ Visualização de detalhes      <br>
✅ Autenticação com JWT          <br>
✅ Dashboard administrativo      <br>

---

## 📌 Status do projeto

🚧 Em desenvolvimento

### Futuras melhorias:

- Deploy da aplicação
- Melhorias de UI/UX
- Novas funcionalidades administrativas
- Integração com pagamentos (opcional)

---

## 🤝 Contribuição

Este é um projeto acadêmico, mas sugestões e melhorias são sempre bem-vindas.

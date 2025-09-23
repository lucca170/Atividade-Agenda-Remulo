# TaskHub
TaskHub: É uma aplicação web full stack para gestão de tarefas pessoais ou de pequenos times. Permite cadastrar, organizar e acompanhar atividades de forma simples, acessível e responsiva. Conta com autenticação via JWT, categorização de tarefas e um painel visual de status (pendente, em andamento, concluída).


# Pré-requisitos:
Node.js
 >= 18

Python
 >= 3.11

MySQL
 >= 8

Git

# Instalação:
Backend (Django + DRF)

Criar ambiente virtual:
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

Instalar dependências:
pip install -r requirements.txt

Rodar migrações:
python manage.py migrate

Iniciar servidor:
python manage.py runserver

# Frontend (React + Vite + Tailwind)
Instalar dependências:
npm install

Iniciar servidor local:
npm run dev


# Testes:
Backend
pytest

Frontend
npm test


# Implantação:
Backend: Railway

Frontend: Vercel

Banco de Dados: PlanetScale

Pipeline: Push no GitHub → Deploy automático no Railway/Vercel → Banco conectado ao PlanetScale.


# Construído com:
Frontend: React, Vite, Tailwind CSS

Backend: Django, Django REST Framework

Banco de Dados: MySQL (PlanetScale)

Deploy: Railway + Vercel


# Autores:
Raick Miranda

Gustavo Luca

Henrique Joaquim

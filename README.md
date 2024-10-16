<div align="center">
    <!-- <img width="500" alt="Logo Locar" src="https://your-logo-url-here" /> -->
    <h3>Locar - Containerized Car Rental Backend Service 🚗</h3>
</div>

<div align="center">  
  <img alt="Node.js badge" src="https://img.shields.io/badge/Node.js-43853d?style=flat&logo=node.js&logoColor=white" />
  <img alt="Express.js badge" src="https://img.shields.io/badge/Express.js-404d59?style=flat&logo=express&logoColor=white" />
  <img alt="PostgreSQL badge" src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" />
  <img alt="Prisma badge" src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white" />
  <img alt="Redis badge" src="https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white" />
</div>

<div align="center">
   <a href="https://www.linkedin.com/in/aronreis/">
      <img alt="Aron Reis" src="https://img.shields.io/badge/-AronReis-0A66C2?style=flat&logo=Linkedin&logoColor=white" />
   </a>

  <img alt="Languages" src="https://img.shields.io/github/languages/count/aronreisx/locar?color=%4d0000">

  <img alt="Repo size" src="https://img.shields.io/github/repo-size/aronreisx/locar?color=orange">

  <a href="https://github.com/aronreisx/README-locar/commits/master">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/aronreisx/locar?color=ff69b4">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-8622f8">
   <a href="https://github.com/aronreisx/budget/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/aronreisx/locar?style=social">
  </a>
</div>
<br>

<div align="center">
  <a href="#-technologies">🚀 Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">📃 Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-execute">💻 How to execute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">📝 License</a>
</div>

<div align="center">
  <img alt="project banner" src="https://github.com/aronreisx/locar/blob/master/.github/banner.png">
</div>

## 🚀 Technologies

This project was developed using the following technologies:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Rate Limiter Flexible](https://www.npmjs.com/package/rate-limiter-flexible)

## 📃 Project

Locar is a backend service for car rental platforms, built using Node.js and Express.js. It includes essential features like user authentication, authorization, and rate limiting, with database support via PostgreSQL and Redis caching. Prisma is used for database migrations and seedings.

Key features include:
- JWT-based authentication
- User roles and permissions for authorization
- Rate limiting to protect against brute force attacks
- Database migrations and seeding with Prisma

## 💻 How to execute

### Requirements

To follow the instructions below, you will need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/) installed.

### Setting up the application

```bash
# Clone the repository
git clone https://github.com/yourusername/locar.git

# Access the project folder
cd locar

# Install all dependencies
yarn install

# Set up environment variables
cp .env.example .env
```

###  Database Setup

```bash
# Run database migrations
yarn db:migrate:dev

# Seed the database
yarn db:seed:dev
```

### Starting the Application

```bash
# Start the application in development mode
yarn app:serve:dev
```

### Accessing the Application
The server will start on http://localhost:3000 by default. You can use a tool like Postman to interact with the API endpoints.

## 📝 License

This repository are under **MIT LICENSE**. For detailed informations, read the file [LICENSE](LICENSE). 

---
<h4 align="center">Final Considerations</h4> <p align="center">If you find any issue, please report it in the <a href="https://github.com/aronreisx/locar/issues">Issues section</a>.</p> <p align="center">Feel free to contribute by making a <a href="https://github.com/aronreisx/locar/pulls">Pull request</a>!</p> <br> <p align="center">Made by Aron Reis</p> <div align="center"> <a href="https://www.linkedin.com/in/aronreis/"> <img src="https://github.com/aronreisx/budget/blob/master/.github/aronreis-logo.png" width="4%"> </a> </div>

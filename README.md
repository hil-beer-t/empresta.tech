<br>

<p align="center">
  <a href="" rel="noopener">
 <img src="https://user-images.githubusercontent.com/52302576/192434506-25f89576-c7dd-4ffd-bb8f-93e84fb4b839.png" alt="Project logo"></a>
</p>
<h1 align="center"><a href="https://empresta.tech/">Empresta.tech</a></h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/hil-beer-t/caatinga-api.svg)](https://github.com/hil-beer-t/caatinga-api/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ed9f5d44-3832-47b1-9d42-0d39cd76699c/deploy-status)](https://app.netlify.com/sites/caatinga/deploys)

</div>

<p align="center"> Projeto Angular/Spring de uma aplicação que simula um processo de obtenção de empréstimo
    <br> 
</p>

## 📝 Conteúdos

- [Motivação](#problem_statement)
- [O que aprendi](#idea)
- [Mapa do Maroto](#map)
- [Feito com](#tech_stack)
- [Executando na sua máquina](#exec)
- [Funcionalidades](#func)
- [Autores](#authors)
- [Crédito literário](#credits)

## 🧐 Motivação <a name = "problem_statement"></a>

Revisitar um desafio do início do ano e implementar com uma maior expertise.

## 💡 O que eu aprendi/melhorei ? <a name = "idea"></a>

- Confirmation email (smtp/[sendinblue](https://www.sendinblue.com/))
- Angular canActivate
- Spring security (roles)
- Usar um serviço third-party para autenticação como o Firebase, por exemplo, pode ser mais rápido e seguro do que fazer o seu próprio.

## 🗺️ Mapa do Maroto <a name = "map"></a>

- Interação do usuário ✔️
- Backoffice
- Contrato

![temp](https://user-images.githubusercontent.com/52302576/185675366-7f9e4d43-6d81-46cd-8ad9-3480f8abe170.png)

## ⛏️ Feito com: <a name = "tech_stack"></a>

- [Spring](https://spring.io/)
- PostgreSQL
- [Angular](https://angular.io/) + [Tailwindcss](https://tailwindcss.com/)
- SMTP [Sendinblue](https://www.sendinblue.com/)
- Produção:
  - [Heroku](heroku.com)
  - [Vercel](https://vercel.com)
  - DNS: [.TECH domains](https://get.tech/)

## 🏁 Executando na sua máquina <a name = "exec"></a>

### Prerequisites

- Backend
  - [Maven](https://maven.apache.org/download.cgi)
  - [Docker](https://docs.docker.com/get-docker/)
- Frontend
  - [Npm](https://www.npmjs.com/package/download)

```bash
git clone git@github.com:hil-beer-t/empresta.tech.git
```

### Backend

Entrando na pasta `Backend`

```bash
cd empresta.tech && cd backend
```

Instalalando dependências

```bash
mvn clean install
```

O pacote será gerado dentro da pasta `target`.

<br> Profile `test`

É usado o banco de dados H2, sem necessidade do Postgres.

Escolha o profile no arquivo `application.properties`

```
spring.profiles.active=${APP_PROFILE:test}
```

Dentro da pasta `target`, basta executá-lo com o comando abaixo.

Executando o Spring

```bash
java -jar -Dserver.port=443 empresta-tech-0.0.1-SNAPSHOT.jar
```

<br> Profile `dev`

É usado o banco de dados Postgres.

Instalando o banco de dados. Execute dentro da pasta `./backend`

```bash
docker compose up
```

Escolha o profile no arquivo `application.properties`

```
spring.profiles.active=${APP_PROFILE:dev}
```

Dentro da pasta `target`, basta executá-lo com o comando abaixo.

Executando o Spring

```bash
java -jar -Dserver.port=443 caatinga-api-0.0.1-SNAPSHOT.jar
```

### Frontend

Instalalando dependências

```bash
npm install
```

Iniciando o serviço

```bash
npm start
```

ou

```bash
ng s
```

Rota local padrão do Angular

[http://localhost:4200/](http://localhost:4200/)

# 💻 Funcionalidades <a name = "funcs"></a>

- Rotas públicas
  - Home [empresta.tech](https://empresta.tech)
  - Login/Signup
  - Sobre [empresta.tech/about](https://empresta.tech/about)
  - 404 [empresta.tech/xxx](https://empresta.tech/xxx)
- Rotas privadas (precisar ativar o email / token válido no local storage)
  - Meus empréstimos [empresta.tech/manage](https://empresta.tech/manage)
    - Não é permitido criar um novo empréstimo se houver algum com status não finalizado.
    - Máx. 3 meses para a primeira parcela.
  - Detalhes do empréstimo [empresta.tech/manage-account](https://empresta.tech/manage-account)
  - Minha conta [empresta.tech/manage](https://empresta.tech/manage)

## ✍️ Autores <a name = "authors"></a>

- [@hilbert](https://github.com/hil-beer-t)

## 📖 Licença

[MIT](#LICENCE)

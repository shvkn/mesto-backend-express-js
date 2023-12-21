# mesto-backend-express-js
> [!NOTE] 
> Для работы приложения необходимо предустановить MongoDB или использовать docker (см. ниже).

#### 1. Установка

```bash
git clone git@github.com:shvkn/mesto-backend-express-js.git

cd mesto-backend-express-js
```

#### 2. Зависимости

```bash
npm run ci
```

#### 3. Запуск

.env.example

```bash
cat << EOF > .env
EXPRESS_PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_NAME=mongo
DATABASE_USERNAME=root
DATABASE_PASSWORD=secret
EOF
```
Запуск
```bash
npm run start
```
#### Docker compose (API + Mongo)
Собрать и запустить API (http://localhost:3000)
```bash
docker compose up
```

##### Только Mongo
```bash
docker run -d -p 27017:27017 --name mongo mongo:latest
```
### Технологии
- [Typescript](https://expressjs.com) - Strongly typed programming language
- [Node.js](https://nodejs.org/en) - JavaScript runtime environment
- [Express.js](https://expressjs.com) - Web framework for Node.js
- [Mongodb](https://www.mongodb.com/) - The world's most popular document database
- [Mongoose](https://expressjs.com) - Mongodb ODM
- [Eslint](https://eslint.org) -  Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
- [Prettier](https://prettier.io) - Code formatter
- [JWT](https://jwt.io) - 
JSON Web Token
- [Docker](https://www.docker.com/)

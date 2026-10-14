# WHAT2DO  APP

Todo app to keep track of daily things.

## Tech stack used
- React
- Express
- Prisma
- Eslinter
- Bun js
- jwt Authentication
- Typescript
- React Router
- PostgreSql

## User

```
name: admin
email: a@gmail.com
password: 123456
```

## How to setup & run the project

` set up the environment`
```
cp .env.example .env
```
(inside what2do-frontend & what2do-backend)

` install the dependancies: `
```
bun install
```

(inside what2do-frontend & what2do-backend)

` seed the database`:
```
cd what2do-backend && bun run db:seed

# bun run db:migrate - to generate the db
# bun run db:generate - to generate the client instance
```

` run the application:`
```
bun run dev
```
(inside what2do-frontend(PORT:5173) & what2do-backend(PORT:3000))

## Endpoints

### Authentication

`POST auth/register` - registers a user into the database \
`POST auth/login` - logins a user into the system and returns a token

### Business

`GET todo/` - returns the todos of the user\
`POST todo/` - adds a new todo\
`PATCH todo/:id` - updates a todo\
`DELETE todo/:id` - deletes a todo\
`PATCH todo/:id/:status` - updates the status of the user\

(note:the Authorization is done by sending the Token as ` Authorization` header as `Bearer ${TOKEN}`)
import express from 'express'
import dotenv from 'dotenv'
import todoRouter from './router/todo.router.js'

export const app = express()

dotenv.config()

app.use('/todo', todoRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running on port:${process.env.PORT}`)
})
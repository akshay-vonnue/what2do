import express from 'express'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.js'

const router = express.Router()

router.get('/todo', getTodos)
router.post('/todo', createTodo)
router.put('/todo', updateTodo)
router.delete('/todo', deleteTodo)

export default router
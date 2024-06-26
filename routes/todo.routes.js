const express = require("express")
const todoController = require("../controllers/todo.controllers")
const router = express.Router()


router.post('/',todoController.createTodo)
router.get('/',todoController.getTodo)
router.get('/:id',todoController.getTodoById)
router.put('/:todoId',todoController.updateTodo)
router.delete('/:todoId',todoController.deleteTodo)

module.exports = router
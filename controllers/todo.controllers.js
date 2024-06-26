const TodoModel = require("../models/todo.models")

exports.createTodo= async(req,res,next)=>{
    try {
        const createData = await TodoModel.create(req.body)
         res.status(201).json(createData)        
    } catch (error) {
        next(error)
    }

}

exports.getTodo = async(req,res,next)=>{
    try {
        const getTodo = await TodoModel.find({})
        res.status(200).json(getTodo)
    } catch (error) {
        next(error)
    }
}

exports.getTodoById = async (req,res,next)=>{
    try {
        const getTodoById = await TodoModel.findById(req.params.id)

        if (getTodoById) {
            res.status(200).json(getTodoById)   
        } else {
            res.status(404).json({message: `Todo with ${req.params.id} is not found`})
        }
        
    } catch (error) {
        next(error)
    }
}

exports.updateTodo = async (req,res,next)=>{
    try {
        const updateTodo = await TodoModel.findByIdAndUpdate(req.params.todoId,req.body,{
            new: true,
            useFindAndModify:false })

        if (updateTodo) {
            res.status(200).json(updateTodo)   
        }else {
            res.status(404).json({message: `Todo with ${req.params.id} is not found`})
        }
    } catch (error) {
        next(error)
    }
}

exports.deleteTodo = async (req,res,next)=>{
    try {
        const deleteTodo = await TodoModel.findByIdAndDelete(req.params.todoId)
        if (deleteTodo) {
            res.status(200).json({message:`Todo with ${req.params.todoId} has been deleted`})    
        } else {
            res.status(404).json({message:`Todo with ${req.params.todoId} not found`})
        }
            
    } catch (error) {
        next(error)   
    }
    
}
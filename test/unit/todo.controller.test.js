const todoController = require("../../controllers/todo.controllers")
const TodoModel = require("../../models/todo.models")
const httpMocks = require("node-mocks-http")
const newTodo = require("../mock-data/new-todo-data.json")
const allTodos = require("../mock-data/all-todos.json")

// TodoModel.create= jest.fn()
// TodoModel.find= jest.fn()
// TodoModel.findById= jest.fn()
// TodoModel.findByIdAndUpdate= jest.fn()
// TodoModel.findByIdAndDelete= jest.fn()
jest.mock("../../models/todo.models")


let req,res,next
let todoId = "6671279fde28715d6ab945f5"
beforeEach(()=>{
   
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe("TodoController.getTodoById",()=>{

    it("Should have getTodo function",()=>{
        expect(typeof todoController.getTodoById).toBe("function")
    })
    it("Should have findById() function", async()=>{
      req.params.id = todoId
      await todoController.getTodoById(req,res,next)
     expect(TodoModel.findById).toBeCalledWith(todoId)
    })
    it("Should return 200 response with all todos list",async ()=>{
        TodoModel.findById.mockReturnValue(newTodo)
        await todoController.getTodoById(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it("Should return errors",async()=>{
        const errmessage = {message: "Error finding"}
        const rejectPromise = Promise.reject(errmessage)
        TodoModel.findById.mockReturnValue(rejectPromise)
        await todoController.getTodoById(req,res,next)
        expect(next).toBeCalledWith(errmessage)
    })

    it("Should return 404 if not found by Id",async()=>{
        TodoModel.findById.mockReturnValue(null)
        await todoController.getTodoById(req,res,next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})

describe("TodoController.getTodo",()=>{

    it("Should have getTodo function",()=>{
        expect(typeof todoController.getTodo).toBe("function")
    })

    it("Should have find({}) function", async()=>{
        await todoController.getTodo(req,res,next)
        expect(TodoModel.find).toHaveBeenCalledWith({})
    })

    it("Should return 200 response with all todos list",async ()=>{
        TodoModel.find.mockReturnValue(allTodos)
        await todoController.getTodo(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(allTodos)
    })

    it("Should return errors",async()=>{
        const errmessage = {message: "Error finding"}
        const rejectPromise = Promise.reject(errmessage)
        TodoModel.find.mockReturnValue(rejectPromise)
        await todoController.getTodo(req,res,next)
        expect(next).toBeCalledWith(errmessage)
    })
})
describe("TodoController.createTodo",()=>{

    beforeEach(()=>{
        req.body = newTodo
    })
    it("Should have createTodo function",()=>{
        expect(typeof todoController.createTodo).toBe("function")
    })

    it("Should call createTodo function",()=>{
       
        todoController.createTodo(req,res,next)
        expect(TodoModel.create).toBeCalledWith(newTodo)
    })

    it("should have status code as 201", async()=>{
    
        await todoController.createTodo(req,res,next)
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it("Should be JSON format body in response",async()=>{

        TodoModel.create.mockReturnValue(newTodo)
        await todoController.createTodo(req,res,next)
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it("Should handle errors", async ()=>{
        const errmessage = {message: "All properties were required"}
        const rejectPromise = Promise.reject(errmessage)
        TodoModel.create.mockReturnValue(rejectPromise)
        await todoController.createTodo(req,res,next)
        expect(next).toBeCalledWith(errmessage)
    })
})

describe("todoController.updateTodo",()=>{

    it("Should have function",()=>{
        expect(typeof todoController.updateTodo).toBe("function")
    })

    it("Should call updateTodo function",async()=>{
       req.params.todoId = todoId
       req.body = newTodo
       await todoController.updateTodo(req,res,next)
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId,newTodo,{
            new: true,
            useFindAndModify:false })
    })

    it("Should send response with http status 200",async()=>{
        req.params.todoId =todoId
        req.body = newTodo
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo)
        await todoController.updateTodo(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(newTodo)
     })

     it("Should handle errors", async ()=>{
        const errmessage = {message: "All properties were required"}
        const rejectPromise = Promise.reject(errmessage)
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectPromise)
        await todoController.updateTodo(req,res,next)
        expect(next).toBeCalledWith(errmessage)
    })

    it("Should return 404 if not found by Id",async()=>{
        TodoModel.findByIdAndUpdate.mockReturnValue(null)
        await todoController.updateTodo(req,res,next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})

describe("todoController.deleteTodo",()=>{

    it("Should have function",()=>{
        expect(typeof todoController.deleteTodo).toBe("function")
    })

    it("Should call deleteTodo function",async()=>{
       req.params.todoId = todoId
       await todoController.deleteTodo(req,res,next)
        expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(todoId)
    })

    it("Should send response with http status 200",async()=>{
    
        TodoModel.findByIdAndDelete.mockReturnValue(newTodo)
        await todoController.deleteTodo(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
     })

     it("Should handle errors", async ()=>{
        const errmessage = {message: "All properties were required"}
        const rejectPromise = Promise.reject(errmessage)
        TodoModel.findByIdAndDelete.mockReturnValue(rejectPromise)
        await todoController.deleteTodo(req,res,next)
        expect(next).toBeCalledWith(errmessage)
    })

    it("Should return 404 if not found by Id",async()=>{
        TodoModel.findByIdAndDelete.mockReturnValue(null)
        await todoController.deleteTodo(req,res,next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})
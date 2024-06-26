const express = require("express")
const todoRoutes = require('./routes/todo.routes')
const app = express()
const mongodb = require("./mongodb/mongodb.conn")

mongodb.connect()

app.use(express.json())

app.use('/todos',todoRoutes)

app.use((error,req,res,next)=>{
    res.status(500).send({message:error.message})
})

app.get('/',(req,res)=>{
    res.json("Hello")
})

module.exports = app


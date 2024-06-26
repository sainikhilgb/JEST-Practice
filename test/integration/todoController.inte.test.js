const supertest = require("supertest")
const app = require("../../app")
const newTodo = require("../mock-data/new-todo-data.json")


const endUrl= "/todos/"
let firstTodo,newTodoId
const testData = {title: "test put",done: false}
const noExsistingId = "6671279fde28715d6ab945f6"
describe(endUrl,()=>{

    it("GET "+endUrl,async()=>{
        const res = await supertest(app).get(endUrl)

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body[0].title).toBeDefined()
        expect(res.body[0].done).toBeDefined()
        firstTodo = res.body[0]
    })

    it("GET byId"+ endUrl+ ":todoId", async()=>{
        const res = await supertest(app).get(endUrl + firstTodo._id)

        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(firstTodo.title)
        expect(res.body.done).toBe(firstTodo.done)

    })

    it("GET byId does not exsist"+ endUrl+ ":todoId", async()=>{
        const res = await supertest(app).get(endUrl + noExsistingId)

        expect(res.statusCode).toBe(404)

    })
    it("POST "+ endUrl, async()=>{
        const res = await supertest(app)
        .post(endUrl)
        .send(newTodo)

        expect(res.statusCode).toBe(201)
        expect(res.body.title).toBe(newTodo.title)
        expect(res.body.done).toBe(newTodo.done)
        newTodoId=res.body._id
    })

    it("Should return 500 on missing property" +endUrl, async ()=>{
        const res = await supertest(app)
        .post(endUrl)
        .send({title: "Missing properties"})

        expect(res.statusCode).toBe(500)
        expect(res.body).toStrictEqual({
            message: "Todo validation failed: done: Path `done` is required."
        })
    })

    it("PUT " + endUrl, async()=>{
        
        const res = await supertest(app)
        .put(endUrl+newTodoId)
        .send(testData)

        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(testData.title)
        expect(res.body.done).toBe(testData.done)
    })

    it("DELETE " + endUrl, async()=>{
        
        const res = await supertest(app)
        .delete(endUrl+newTodoId)
        .send()

        expect(res.statusCode).toBe(200)
    })

    it("DELETE byId does not exsist"+ endUrl+ ":todoId", async()=>{
        const res = await supertest(app).delete(endUrl + noExsistingId).send()

        expect(res.statusCode).toBe(404)

    })
})
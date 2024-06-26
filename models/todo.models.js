const mongoose = require("mongoose")

const todoModel = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
}) 


module.exports = mongoose.model("Todo",todoModel) 
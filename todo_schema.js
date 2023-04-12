const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  }, 
  completed: {
    type: Boolean,
    required: false
  }
});
const todo = (module.exports = mongoose.model("todo", todoSchema));

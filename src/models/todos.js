import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Why the todo is like your life"],
    unique: true,
  },
  priority: {
    type: String,
    default: "low",
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
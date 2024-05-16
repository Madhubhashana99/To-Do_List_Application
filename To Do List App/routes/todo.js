const router = require("express").Router();
const Todo = require("../models/Todo");

// routes
router
  .post("/add/todo", (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({ todo });

    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

  .put("/edit/todos/:id", async (req, res) => {
    const { id } = req.params;
    const updatedTodo = req.body;
    try {
      const todo = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating todo" });
    }
  })


  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });

module.exports = router;

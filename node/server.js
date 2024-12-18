const expr = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const app = expr();
const port = 8080
let db = ''
app.use(cors())
app.use(bodyParser.json()).use(bodyParser.text());
const MySQL = async () => {
    db = await mysql.createConnection({
    host: "localhost",
    user: "pxng_admin",
    password: "Admin132",
    database: "pxng_db"
  });
};
app.get("/", async (req, res) => {
  res.json({
    status: 200,
    message: "Hello World"
  });
});
app.get("/users", async (req, res) => {
  let result = await db.query("SELECT * FROM users") 
  res.json({
    status: 200,
    message: "This is the users route",
    data: result[0]
  });
});
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const  query = req.query.q;
  console.log(query);
  let result = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  res.json({
    status: 200, 
    message: "This is the users route with id",id,query
  });
});
app.post("/users", async (req, res) => {
  let userData = req.body;
  let result = await db.query("INSERT INTO users SET ?", userData);
  let user = await db.query("SELECT * FROM users WHERE id = ?", [result[0].insertId]);
  res.json({
    status: 200,
    message: "This is the create user route",
    data: user[0][0]
  });
});
app.put("/users/:id", async (req, res) => {
  const query = req.query.q;
console.log(query);
const id = req.params.id;
console.log(id);
  let dataUpdate = req.body;
  const oldData = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  let result = await db.query("UPDATE users SET ? WHERE id = ?", [dataUpdate, id]);
  const newData = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  res.json({
    status: 200,
    message: "updated successfully",
    old: oldData[0],
    new: newData[0]
  });
});

app.get("/todolist", async (req, res) => {
  let result = await db.query("SELECT * FROM todoList") 
  res.json({
    status: 200,
    message: "This is the users route",
    data: result[0]
  });
});
app.post("/todolist", async (req, res) => {
  let newTodo = req.body;
  let result = await db.query("INSERT INTO todoList SET ?", newTodo);
  let todo = await db.query("SELECT * FROM todoList WHERE id = ?", [result[0].insertId]);
  res.json({
    status: 200,
    message: "This is the create user route",
    data: todo[0][0]
  });
});
app.put("/todolist/:id", async (req, res) => {
const id = req.params.id;
console.log(id);
  let dataUpdate = req.body;
  const oldData = await db.query("SELECT * FROM todoList WHERE id = ?", [id]);
  let result = await db.query("UPDATE todoList SET ? WHERE id = ?", [dataUpdate, id]);
  const newData = await db.query("SELECT * FROM todoList WHERE id = ?", [id]);
  res.json({
    status: 200,
    message: "updated successfully",
    old: oldData[0],
    new: newData[0]
  });
});
app.delete("/todolist/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let oldData = await db.query("SELECT * FROM todoList WHERE id = ?", [id]);
  let results = await db.query("DELETE FROM todoList WHERE `id` = ?", [id]);
  res.json({
    status: 200, 
    message: "Delete successfully",
    data: oldData[0][0],
    result: results
  });
});
app.listen(port, async () => {
  await MySQL();
  console.log(`Server running on port ${port}`);
});

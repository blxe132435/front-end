const expr = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const app = expr();
const port = 8080
app.use(bodyParser.json()).use(bodyParser.text()).use(cors());
const MySQL = async () => {
  const db = await mysql.connection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users_db"
  });
};
app.get("/", async (req, res) => {
  res.json({
    status: 200,
    message: "Hello World"
  });
});
app.get("/users", async (req, res) => {
  res.json({
    status: 200,
    message: "This is the users route without id"
  });
});
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const  query = req.query.q;
  console.log(query);
  // let result = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  res.json({
    status: 200, 
    message: "This is the users route with id",id,query
  });
});
app.post("/users", async (req, res) => {
  res.json({
    status: 200,
    message: "This is the create user route"
  });
});
app.put("/users/:id", async (req, res) => {
  const query = req.query.q;
console.log(query);
const id = req.params.id;
console.log(id);
  // let dataUpdate = req.body;
  // const oldData = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  // let result = await db.query("UPDATE users SET ? WHERE id = ?", [dataUpdate, id]);
  // const newData = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  res.json({
    status: 200,
    message: "This is the update user route with id ",id,query
  });
});
app.listen(port, async () => {
  // await MySQL();
  console.log(`Server running on port ${port}`);
});
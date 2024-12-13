const express = require('express');
const cors = require('cors');
const mysql = require("mysql/promise");
const bodyParser = require('body-parser');
const app = express();
const port = 9999;

app.use(bodyParser.json()).use(bodyParser.text()).use(cors());

const db = async () => {
  var myDB = mysql.createconnection({
    host: "localhost",
    user: "pxng_db",
    password: "admin132",
    database: "pxng_db"
  });
};

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Server is running"
  });
});
app.get("/api/users", async (req, res) => {
  try {
    await myDB.querySelector
  } catch (err) {
    res.json({
      status: 500,
      err: err.message
    })
  }
});

app.listen(port, async () => {
  await db();
  console.log("Server is running on port " + port);
});
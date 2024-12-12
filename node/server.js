const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 9999;

app.use(bodyParser.json()).use(bodyParser.text()).use(cors());

app.get("/", (req, res) => {
      res.json({
            status: 200,
            message: "Server is running"
      })
})

app.listen(port, () => {})
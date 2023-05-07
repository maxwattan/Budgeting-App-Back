const express = require("express");
const app = express();
const cors = require("cors")
const logger = require("morgan")
const transactionsController = require("./controllers/transactionsControllers.js")


app.use(express.json());
app.use(cors())
app.use(logger('dev'))

app.use("/transactions", transactionsController)



app.get("/", (req, res) => {
    res.send("Welcome to the Budgeting App");
  })
  
  //404 page
  app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
  })
  
  module.exports = app;
const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transactions.js")
const {validateURL} = require("../models/validations.js")

// GET, all the entries in the database
transactions.get("/", (req, res) => {
    res.json(transactionsArray)
  })

//SHOW
transactions.get("/:id", (req, res) => {
    const {id} = req.params
    if (transactionsArray[id]) {
      res.json(transactionsArray[id]);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

//CREATE
transactions.post("/", (req, res) => {
    transactionsArray.push(req.body);
    res.json(transactionsArray[transactionsArray.length - 1]);
  });


//DELETE
transactions.delete('/:id', (req, res) => {
    const { id } = req.params

    if (transactionsArray[id]) {
        const deletedTransactions = transactionsArray.splice(id, 1)
        res.status(202).json( deletedTransactions)
    } else {
        res.status(404).json({error: `There was no transaction with the id of ${id}`})
    }
})


//UPDATE OR PUT
transactions.put("/:id", validateURL, async (req, res) => {
    const { id } = req.params
    if (transactionsArray[id]) {
      transactionsArray[id] = req.body;
      console.log("PUT route successful", req.body )
      res.status(200).json(transactionsArray[id]);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

  module.exports = transactions
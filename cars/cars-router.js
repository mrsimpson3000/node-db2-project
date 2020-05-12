const express = require("express");
const knex = require("knex");

const db = require("../data/dbConnection");

const router = express.Router();

// GETS a list of all accounts from the DB
router.get("/", (req, res) => {
  db.select("*")
    .from("cars")
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

// GETS an account from the DB based on ID
router.get("/:id", (req, res) => {
  db("cars")
    .where({
      id: req.params.id,
    })
    .first()
    .then((car) => {
      if (car) {
        res.status(200).json({ data: car });
      } else {
        res
          .status(404)
          .json({
            message: `No cars with the id of ${req.params.id}. Please try another id.`,
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;

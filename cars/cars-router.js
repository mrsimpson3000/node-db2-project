const express = require("express");
const knex = require("knex");

const db = require("../data/dbConnection");

const router = express.Router();

// GETS a list of all cars from the DB
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

// GETS a car from the DB based on ID
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
        res.status(404).json({
          message: `No cars with the id of ${req.params.id}. Please try another id.`,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

// Creates a new car in the database. isValidCar insures all required fields are included.
router.post("/", (req, res) => {
  const car = req.body;
  if (isValidCar(car)) {
    db("cars")
      .insert(account, "id")
      .then((ids) => {
        res.status(201).json({ data: ids });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "VIN, make, model, and mileage are all required. Please include them all and try again.",
    });
  }
});

// Makes a change/update to an existing car record
router.put("/:id", (req, res) => {
  const changes = req.body;
  if (isValidCar(changes)) {
    db("cars")
      .where({ id: req.params.id })
      .update(changes)
      .then((count) => {
        if (count) {
          res
            .status(200)
            .json({ message: "The car details were updated successfully." });
        } else {
          res.status(404).json({
            message: `There are no cars with the id of ${req.params.id}. Please try another id.`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "VIN, make, model, and mileage are all required. Please include them all and try again.",
    });
  }
});

// Delete a car record based on id
router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count) {
        res.status(200).json({
          message: `The car with the id of ${req.params.id} was successfully deleted.`,
        });
      } else {
        res.status(404).json({
          message: `No cars with the id of ${req.params.id} were found. Please choose another id and try again.`,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

// Checks to see if all required data is included in the request
function isValidCar(car) {
  return Boolean(car.VIN && car.make && car.model && car.mileage);
}

module.exports = router;

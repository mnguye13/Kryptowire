const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Info = require("../models/info");
const Controller = require("../controllers/controller");
const infoController = new Controller(Info);

router.get("/", (req, res, next) => {
  infoController.getAll((error, result) => {
    handleCallback(error, result, res);
  });
});
router.post("/", (req, res, next) => {
  infoController.create(req.body, (error, result) => {
    handleCallback(error, result, res);
  });
});

router.get("/:id", (req, res, next) => {
  infoController.find(req.params.id, (error, result) => {
    handleCallback(error, result, res);
  });
});

router.patch("/:id", (req, res, next) => {
  infoController.update(req.params.id, req.body, (error, result) => {
    handleCallback(error, result, res);
  });
});
router.delete("/:id", (req, res, next) => {
  infoController.delete(req.params.id, (error, result) => {
    handleCallback(error, result, res);
  });
});

let handleCallback = (error, result, response) => {
  console.log("error: " + JSON.stringify(error));
  console.log("result:" + JSON.stringify(result));

  if (error) return response.status(500).json({ error: error });
  return response.status(200).json({ data: result });
};

module.exports = router;

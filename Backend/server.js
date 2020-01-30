const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./Data/data");

const API_PORT = 3001;
const app = express();

app.use(cors());

const router = express.Router();

//This is MongoDB

const dbRoute =
  "mongodb+srv://kevin:26nhan03@cluster0-hfcgn.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compa";

//Connect backend code with database

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to DB"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// only made for logging and
// bodyParser, parses the request body to be a readable json format

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//GET READ METHOD - fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data, message: "get" });
  });
});

//POST UPDATE METHOD
router.post("/updateData", (req, res) => {
  const { id, fullname, email } = req.body;
  Data.findByIdAndUpdate(id, fullname, email, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ sucess: true, message: "update" });
  });
});

//DELETE METHOD

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ sucess: true, message: "delete" });
  });
});

//POST CREATE METHOD

router.post("/createData", (req, res) => {
  let data = new Data();
  const { id, fullname, email } = req.body;

  if ((!id && id != 0) || !fullname || !email) {
    return res.json({
      success: false,
      error: "Invalid input"
    });
  }
  data.id = id;
  data.fullname = fullname;
  data.email = email;

  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, message: "create" });
  });
});

//Append /api for http requests

app.use("/api", router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

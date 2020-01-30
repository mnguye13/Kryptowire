const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Database schema structure

const DataSchema = new Schema(
  {
    id: Number,
    fullname: String,
    email: String
  },
  { timestamps: true }
);
module.exports = mongoose.model("InfoData", DataSchema);

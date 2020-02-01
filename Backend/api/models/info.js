const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Database schema structure

const InfoSchema = new Schema(
  {
    id: { type: Number, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);
module.exports = mongoose.model("InfoData", InfoSchema);

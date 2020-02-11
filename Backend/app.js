const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { config } = require("./api/config/env");
const infoRoutes = require("./api/routes/info");
const userRoutes = require("./api/routes/users");
const Cars = require("./api/models/cars");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const passport = require("passport");
var cors = require("cors");

mongoose
  .connect(config.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() =>
    console.log(`connected to database, listening on PORT ${config.PORT} `)
  )
  .catch(err => console.log(err));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});*/
app.use("/infos", infoRoutes);
//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./api/config/passport")(passport);

//Routes
app.use("/users", userRoutes);

//GraphQL endpoints

app.use("/graphql", graphqlExpress({ schema: Cars }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

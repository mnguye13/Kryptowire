const { makeExecutableSchema } = require("graphql-tools");
const cars = [
  {
    brand: "Audi",
    model: "S3"
  },
  {
    brand: "BMW",
    model: "M3"
  },
  {
    brand: "Mercedes",
    model: "CL45"
  }
];

const typeDefs = `type Query {cars: [Car]}
type Car {brand: String, model: String}`;

const resolvers = {
  Query: { cars: () => cars }
};

module.exports = Cars = makeExecutableSchema({
  typeDefs,
  resolvers
});

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

const typeDefs = `
type Query 
{
    info: String,
    cars: [Car]
}
type Car {
    brand: String, 
    model: String
}
type Mutation{
    addCar(brand: String, model: String): Car
}

`;

const resolvers = {
  Query: {
    info: () => "This is the api for Cars",
    cars: () => cars
  },
  Mutation: {
    addCar: (parent, args) => {
      const car = {
        brand: args.brand,
        model: args.model
      };
      return car;
    }
  }
};

module.exports = Cars = makeExecutableSchema({
  typeDefs,
  resolvers
});

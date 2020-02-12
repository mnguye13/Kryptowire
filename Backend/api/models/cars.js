const { makeExecutableSchema } = require("graphql-tools");
const { find, filter } = require("lodash");

const brands = [
  {
    name: "Audi",
    origin: " German"
  },
  {
    name: "BMW",
    origin: " German"
  },
  {
    name: "Mercedes",
    origin: " German"
  }
];

const models = [
  {
    label: "S3",
    brandName: "Audi",
    year: "2020",
    price: 43000
  },
  {
    label: "M3",
    brandName: "BMW",
    year: "2020",
    price: 70000
  },
  {
    label: "RS7",
    brandName: "Audi",
    year: "2020",
    price: 2020
  },
  {
    label: "CLA45",
    brandName: "Mercedes",
    year: "2020",
    price: 54800
  },
  {
    label: "GT63s",
    brandName: "Mercedes",
    year: "2020",
    price: 136500
  },
  {
    label: "C300",
    brandName: "Mercedes",
    year: "2020",
    price: 41400
  }
];
const typeDefs = `
type Brand
{
    name: String!
    origin: String
    models: [Model]
}

type Model
{
    label: String!
    year: String
    price: Int
    brand: Brand
}

type Query 
{
    info: String
    models: [Model]
    brand(name: String!): Brand
    brands: [Brand]
}

type Mutation{
    addBrand(name: String!, origin: String!): Brand
    addModel(label: String!, brandName: String!,  year: String!, price: Int!  ): Model
    updateCarPrice(label: String!, price: Int!): Model 
}

`;

const resolvers = {
  Query: {
    info: () => "This is the api for Cars",
    models: () => models,
    brands: () => brands,
    brand: (_, { name }) => find(brands, { name })
  },
  //Filter model by brands
  Brand: { models: brand => filter(models, { brandName: brand.name }) },
  //Find brand by model
  Model: { brand: model => find(brands, { name: model.brandName }) },
  Mutation: {
    addBrand: (parent, args) => {
      const brand = find(brands, { name: args.name });
      if (brand) {
        throw new Error(`This brand ${args.name} already exits `);
      } else {
        const brand = {
          name: args.name,
          origin: args.origin
        };
        brands.push(brand);
        return brand;
      }
    },

    addModel: (parent, args) => {
      const model = {
        label: args.label,
        brandName: args.brandName,
        year: args.year,
        price: args.price
      };
      models.push(model);
      return model;
    },

    updateCarPrice: (parent, args) => {
      const car = find(models, { label: args.label });
      if (!car) {
        throw new Error(`Couldn't find model with label ${args.label}`);
      }
      car.price = args.price;
      return car;
    }
  }
};
module.exports = Cars = makeExecutableSchema({
  typeDefs,
  resolvers
});

import React from "react";
import ApolloClient, { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { findAllByTitle } from "@testing-library/react";

export const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/swapi"
});

const actorData = gql`
  {
    allPersons {
      name
      gender
      height
      mass
      films {
        title
        director
      }
    }
  }
`;

export default function Settings() {
  const { loading, error, data } = useQuery(actorData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:</p>;

  return (
    <div style={{ marginLeft: "25%" }}>
      <h1>Actor Info</h1>
      {data.allPersons.map(({ name, films }) =>
        films.map(({ title, director }) => (
          <div key={name}>
            <p>
              {name} is in {title} by {director}
            </p>
          </div>
        ))
      )}
    </div>
  );

  /*
  client
    .query({
      query: gql`
        {
          allPersons {
            name
            films {
              title
            }
          }
        }
      `
    })
    .then(result => console.log(result));
  return <div></div>;
  */
}

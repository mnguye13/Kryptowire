import React, { useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { findAllByTitle } from "@testing-library/react";
import { config } from "../config/env";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  FormGroup,
  InputGroup,
  TextArea
} from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    const token = config.githubToken;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});
const githubData = gql`
  {
    user(login: "mnguye13") {
      name
      bio
      avatarUrl
      repositories(last: 10) {
        edges {
          node {
            nameWithOwner
          }
        }
      }
      repository(name: "kryptowire") {
        name
        id
        url
        owner {
          id
          login
        }
        createdAt
        forkCount
        isPrivate
      }
    }
  }
`;
const createIssue = gql`
  mutation AddIssue($repositoryId: ID!, $title: String!, $body: String) {
    createIssue(
      input: { repositoryId: $repositoryId, title: $title, body: $body }
    ) {
      issue {
        title
        body
      }
    }
  }
`;

export default function Settings() {
  const [issueTitle, setIssueTitle] = useState();
  const [issueBody, setIssueBody] = useState();
  const [repoID, setRepoID] = useState();
  const { loading, error, data } = useQuery(githubData);
  const [addIssue, { issueData }] = useMutation(createIssue);
  let data2;
  if (data) {
    data2 = Object.values(data);
    /*

    data2.map(dat => {
      console.log(dat.repositories.edges.map(e => e));
    });*/
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:</p>;

  function submitIssue(repoID) {
    if (!issueTitle || !issueBody) {
      alert("Invalid Input");
    } else {
      addIssue({
        variables: { repositoryId: repoID, title: issueTitle, body: issueBody }
      });
    }
    setIssueTitle("");
    setIssueBody("");
  }

  return (
    <div>
      {data2.length <= 0 ? (
        <div>
          <p>Loading..</p>
        </div>
      ) : (
        data2.map(dat => (
          <div>
            <p>Name: {dat.name}</p>
            <p>Bio: {dat.bio}</p>
            <h1>Last 10 repositories</h1>
            {dat.repositories.edges.map(e => (
              <p>{e.node.nameWithOwner}</p>
            ))}
            <h2>Repository: {dat.repository.name}</h2>
            <p>ID: {dat.repository.id}</p>
            <p>URL: {dat.repository.url}</p>
            <p>OwnerID: {dat.repository.owner.id}</p>
            <p>CreateAt: {dat.repository.createdAt}</p>
            <h3>Issue Report for {dat.repository.name} repository</h3>
            <div style={{ width: "50%" }}>
              <InputGroup
                value={issueTitle}
                onChange={e => setIssueTitle(e.target.value)}
                placeholder="Enter issue title"
              ></InputGroup>
              <TextArea
                fill
                value={issueBody}
                onChange={e => setIssueBody(e.target.value)}
                placeholder="Enter issue body"
              ></TextArea>
            </div>
            <Button
              text="Create Issue"
              onClick={() => submitIssue(dat.repository.id)}
            />
          </div>
        ))
      )}
    </div>
  );
}

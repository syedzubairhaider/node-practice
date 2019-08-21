import "dotenv/config";

import cors from "cors";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import models, { sequelize } from "./models";

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch1"
  },
  2: {
    id: "2",
    username: "Dave Davids"
  }
};

const me = users[1];

const resolvers = {
  Query: {
    me: () => {
      return me;
    },

    user: (parent, { id }) => {
      return users[id];
    },

    users: () => {
      return Object.values(users);
    }
  },

  User: {
    username: () => "Hans"
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: process.env.PORT }, () => {
  console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
});

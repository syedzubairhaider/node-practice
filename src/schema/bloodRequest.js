import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    bloodRequests: [BloodRequest!]!
    bloodRequest(id: ID!): BloodRequest!
  }

  extend type Mutation {
    createBloodRequest(bloodGroup: String!): BloodRequest!
    deleteBloodRequest(id: ID!): Boolean!
  }

  type BloodRequest {
    id: ID!
    bloodGroup: String!
    user: User!
  }
`;

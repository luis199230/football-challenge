import gql from "graphql-tag";

const mutation = gql`
  type ImportResponse {
    status: Boolean!
    message: String!
  }
  
  type Mutation {
    importCompetition(code: String!): ImportResponse!
  }
`;

export default mutation;

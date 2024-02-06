import gql from "graphql-tag";

const model = gql`
  type Coach {
    id: Int!
    name: String!
    firstName: String
    lastName: String
    dateOfBirth: Date
    nationality: String
    contract: Contract
  }
`;

export default model;

import gql from "graphql-tag";

const model = gql`
  type Area {
    id: Int!
    name: String!
    code: String!
    flag: String
  }
`;

export default model;

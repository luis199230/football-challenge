import gql from "graphql-tag";

const model = gql`
  type Contract {
    start: String
    until: String
  }
`;

export default model;

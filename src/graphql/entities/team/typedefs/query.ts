import gql from "graphql-tag";

const query = gql`
  type Query {
    showTeam(name: String!): Team
  }
`;

export default query;

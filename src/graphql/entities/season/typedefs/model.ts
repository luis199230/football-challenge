import gql from "graphql-tag";

const model = gql`
  type Season {
    id: Int!
    startDate: Date
    endDate: Date
    currentMatchday: Int
    winner: Team
  }
`;

export default model;

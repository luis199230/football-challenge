import gql from "graphql-tag";

const query = gql`
  type Query {
    listPlayers(competitionCode: String!, teamName: String): [Player]
  }
`;

export default query;

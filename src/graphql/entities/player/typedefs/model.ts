import gql from "graphql-tag";

const model = gql`
  type Player {
    id: Int!
    name: String!
    firstName: String
    lastName: String
    dateOfBirth: Date
    nationality: String
    section: String
    position: String
    shirtNumber: Int
    lastUpdated: DateTime
    currentTeam: Team
  }
`;

export default model;

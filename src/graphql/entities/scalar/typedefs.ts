import { DocumentNode } from "graphql";
import gql from "graphql-tag";

const typeDefs: DocumentNode[] = [
  gql`
  """
  An ISO 8601 format Date without a time component.
  """
  scalar Date
  """
  An ISO 8601 format Date with a time component.
  """
  scalar DateTime
  `
];

export default typeDefs;

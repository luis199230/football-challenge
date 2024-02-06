import { DocumentNode } from "graphql";
import model from "./model";
import query from "./query";

const typeDefs: DocumentNode[] = [model, query];

export default typeDefs;

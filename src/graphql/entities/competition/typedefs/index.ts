import { DocumentNode } from "graphql";
import model from "./model";
import mutation from "./mutation";

const typeDefs: DocumentNode[] = [model, mutation];

export default typeDefs;

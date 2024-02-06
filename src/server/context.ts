import { BaseContext } from "@apollo/server";
import { Services } from "../services";

export interface FootballContext extends BaseContext {
    services: Services;
}
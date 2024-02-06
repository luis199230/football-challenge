import * as FootballService from "../generated/openAPI";

export const setupOpenAPIServices = () => {
    FootballService.OpenAPI.BASE = process.env.FOOTBALL_SERVICE;
    FootballService.OpenAPI.HEADERS = {
        'X-Auth-Token': process.env.FOOTBALL_TOKEN
    };
};

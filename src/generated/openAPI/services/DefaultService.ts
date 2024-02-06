/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Area
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Areas({
        area,
    }: {
        area: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/areas/{area}',
            path: {
                'area': area,
            },
        });
    }
    /**
     * Area List
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Areas1(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/areas',
        });
    }
    /**
     * Competition
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Competitions({
        competition,
    }: {
        competition: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/competitions/{competition}',
            path: {
                'competition': competition,
            },
        });
    }
    /**
     * Competition List
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Competitions1(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/competitions',
        });
    }
    /**
     * Competition / Standings
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4CompetitionsStandings({
        competition,
        season,
        matchday,
    }: {
        competition: string,
        season?: number,
        matchday?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/competitions/{competition}/standings',
            path: {
                'competition': competition,
            },
            query: {
                'season': season,
                'matchday': matchday,
            },
        });
    }
    /**
     * Competition / Matches
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4CompetitionsMatches({
        competition,
        matchday,
    }: {
        competition: string,
        matchday?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/competitions/{competition}/matches',
            path: {
                'competition': competition,
            },
            query: {
                'matchday': matchday,
            },
        });
    }
    /**
     * Competition / Teams
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4CompetitionsTeams({
        competition,
    }: {
        competition: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/competitions/{competition}/teams',
            path: {
                'competition': competition,
            },
        });
    }
    /**
     * Competition / Scorer
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4CompetitionsScorers({
        competition,
    }: {
        competition: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/competitions/{competition}/scorers',
            path: {
                'competition': competition,
            },
        });
    }
    /**
     * Team
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Teams({
        team,
    }: {
        team: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/teams/{team}',
            path: {
                'team': team,
            },
        });
    }
    /**
     * Team List
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Teams1({
        limit,
        offset,
    }: {
        limit?: number,
        offset?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/teams',
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }
    /**
     * Team / Matches
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4TeamsMatches({
        team,
    }: {
        team: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/teams/{team}/matches',
            path: {
                'team': team,
            },
        });
    }
    /**
     * Person
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Persons({
        person,
    }: {
        person: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/persons/{person}',
            path: {
                'person': person,
            },
        });
    }
    /**
     * Person / Matches
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4PersonsMatches({
        person,
        limit,
    }: {
        person: number,
        limit?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/persons/{person}/matches',
            path: {
                'person': person,
            },
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * Match
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Matches({
        match,
    }: {
        match: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/matches/{match}',
            path: {
                'match': match,
            },
        });
    }
    /**
     * Match List
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4Matches1({
        xUnfoldLineups,
        xUnfoldGoals,
    }: {
        xUnfoldLineups?: boolean,
        xUnfoldGoals?: boolean,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/matches',
            headers: {
                'X-Unfold-Lineups': xUnfoldLineups,
                'X-Unfold-Goals': xUnfoldGoals,
            },
        });
    }
    /**
     * Match / Head2Head
     * @returns any Successful response
     * @throws ApiError
     */
    public static getV4MatchesHead2Head({
        match,
        limit,
    }: {
        match: number,
        limit?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v4/matches/{match}/head2head',
            path: {
                'match': match,
            },
            query: {
                'limit': limit,
            },
        });
    }
}

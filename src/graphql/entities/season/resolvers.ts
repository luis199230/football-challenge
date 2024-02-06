import { SeasonResolvers, Team } from "src/generated/graphql"
import { SeasonEntity } from "src/sql/entities/season";

const Season: SeasonResolvers = {
    async winner(parent, arg, {services}) {
        if(!(parent as unknown as SeasonEntity).winnerId){
            return null;
        }
        const data = await services.team.showTeamById((parent as unknown as SeasonEntity).winnerId);
        return { ...data, id: data.externalId, externalId: data.id } as unknown as Team;
    }
}

export default {
    Season,
}
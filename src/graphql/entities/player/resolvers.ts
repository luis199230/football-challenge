import { PlayerEntity } from "../../../sql/entities/player";
import { PlayerResolvers, QueryResolvers, Team } from "../../../generated/graphql";

const Player: PlayerResolvers = {
  async currentTeam(parent, arg, {services}){
    const data = await services.team.showCurrentTeamByPlayer((parent as PlayerEntity).externalId);
    return { ...data, id: data.externalId, externalId: data.id } as unknown as Team;
  }
}

const Query: QueryResolvers = {
  async listPlayers(root, {competitionCode, teamName}, {services}) {
    const competition = await services.competition.showCompetition(competitionCode);
    if(!competition){
      return [];
    }
    let team;
    if(teamName){
      team = await services.team.showTeam(teamName);
    }
    const data = await services.player.listPlayers(competition.id, team ? team.id : null);
    return data.map(d => ({...d, id: d.externalId, externalId: d.id}));
  },
};

export default {
  Player,
  Query,
};

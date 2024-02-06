import { QueryFailedError } from "typeorm";
import { CompetitionEntity } from "../../../sql/entities/competition";
import {
  CompetitionResolvers,
  MutationResolvers,
  Season,
} from "../../../generated/graphql";


const Competition: CompetitionResolvers = {
  async area(parent, arg, {services}){
    const data = await services.area.showArea((parent as unknown as CompetitionEntity).areaId);
    return {...data, id: data.externalId};
  },
  async currentSeason(parent, arg, {services}) {
    const data = await services.season.showCurrentSeason((parent as unknown as CompetitionEntity).externalId);
    return { ...data, id: data.externalId } as unknown as Season;
  },
  async seasons(parent, arg, {services}) {
    const data = await services.season.listSeasons((parent as unknown as CompetitionEntity).externalId);
    return data.map(d => ({ ...d, id: d.externalId })) as unknown as Season[];
  }
}

const Mutation: MutationResolvers = {
  async importCompetition(root, {code}, {services}) {
    try{
      const [competitionResponse, teamsResponse] = await services.competition.importCompetition(code);

      const area = await services.area.saveIfNotExistArea(competitionResponse);
      const competition = await services.competition.saveIfNotExistCompetition(code, competitionResponse, area.id);

      const seasons = await services.season.saveIfNotExistSeasons(competitionResponse.seasons, competition.id);
      const lastSeason = await services.season.showSeason(teamsResponse.season.id);
  
      await services.team.saveIfNotExistTeams(teamsResponse.teams, area.id);

      const teamExternalIds = teamsResponse.teams.map(t => t.id);
      const teams = await services.team.listTeams(teamExternalIds);

      await services.season.saveIfExistWinners(competitionResponse.seasons, seasons, teams);
      await services.competitionTeam.saveIfNotExistCompetitionTeam(competition.id, lastSeason.id, teams);
  
      const players = await services.player.saveIfNotExistPlayers(teamsResponse.teams);
      await services.playerTeam.saveIfNotExistPlayerTeam(teamsResponse.teams, lastSeason.id, players, teams);
  
      await services.coach.saveIfNotExistCoach(teamsResponse.teams, teams);
    }catch(e: unknown){
      let message: string;

      if(e instanceof Error && !(e instanceof QueryFailedError)){
        message = e.message;
      }else{
        message = "Couldn't import data"
      }
      console.log(e);
      return {
        status: false,
        message 
      };
    }
    return {
      status: true,
      message: "Imported data with success"
    };
  },
};

export default {
  Competition,
  Mutation,
};

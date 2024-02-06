import { TeamEntity } from "../../../sql/entities/team";
import { Competition, QueryResolvers, Team, TeamResolvers } from "../../../generated/graphql";


const Team: TeamResolvers = {
  async area(parent, arg, {services}) {
    const data = await services.area.showArea((parent as unknown as TeamEntity).areaId);
    return {...data, id: data.externalId};
  },
  async coach(parent, arg, {services}){
    const data = await services.coach.showCoach((parent as unknown as TeamEntity).externalId);
    return {...data, id: data.externalId};
  },
  async squad(parent, arg, {services}) {
    const data = await services.player.listPlayersByTeam((parent as unknown as TeamEntity).externalId);
    return data.map(d => ({...d, id: d.externalId, externalId: d.id}));
  },
  async runningCompetitions(parent, arg, {services}) {
    const data = await services.competition.listCompetitions((parent as unknown as TeamEntity).externalId);
    return data.map(d => ({ ...d, id: d.externalId, externalId: d.id })) as unknown as Competition[]; 
  }
};

const Query: QueryResolvers = {
  async showTeam(root, {name}, {services}) {
    let team;
    try{
      const data = await services.team.showTeam(name);
      if(data){
        team = {...data, id: data.externalId, externalId: data.id};
      }
    }catch(e){
      console.log(e);
    }
    return team;
  },
};

export default {
  Team,
  Query,
};

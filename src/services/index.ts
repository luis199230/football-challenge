import competitionService from "./competitionService";
import PlayerService from "./playerService";
import TeamService from "./teamService";
import AreaService from "./areaService";
import CoachService from "./coachService";
import SeasonService from "./seasonService";
import CompetitionTeamService from "./competitionTeamService";
import PlayerTeamService from "./playerTeamService";

const servicesCreator = () => {
    return Object.freeze({
        competition: new competitionService(),
        competitionTeam: new CompetitionTeamService(),
        player: new PlayerService(),
        team: new TeamService(), 
        playerTeam: new PlayerTeamService(),
        area: new AreaService(),
        coach: new CoachService(),
        season: new SeasonService(),
    })
};

export type Services = ReturnType<typeof servicesCreator>;

export default servicesCreator;
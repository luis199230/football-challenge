import { Repository } from "typeorm";
import AppDataSource from "../server/database";
import { CompetitionTeamEntity } from "../sql/entities/competitionTeam";
import { TeamEntity } from "../sql/entities/team";

export default class CompetitionTeamService {
    private competitionTeamRepository: Repository<CompetitionTeamEntity>;
    
    constructor() {
        this.competitionTeamRepository = AppDataSource.getRepository(CompetitionTeamEntity);
    }

    public async saveIfNotExistCompetitionTeam (competitionId: number, seasonId: number, teams: TeamEntity[])  {
        for(const team of teams) {
            await this.competitionTeamRepository.save({competitionId, seasonId, teamId: team.id });
        }
    }
}

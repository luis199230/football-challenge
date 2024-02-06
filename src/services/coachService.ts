import { In, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

import AppDataSource from "../server/database";
import { CoachEntity } from "../sql/entities/coach";
import { TeamEntity } from "../sql/entities/team";

export default class CoachService {
    private coachRepository: Repository<CoachEntity>;

    constructor() {
       this.coachRepository = AppDataSource.getRepository(CoachEntity);
    }

    public showCoach (teamId: number): Promise<CoachEntity> {
        return this.coachRepository.findOneBy({teamId});
    }

    public async saveIfNotExistCoach (teamsFromResponse, teams: TeamEntity[]) {
        const coachExternalIds = teamsFromResponse.map(s => s.coach.id);

        const coaches = await this.coachRepository.findBy({ externalId: In(coachExternalIds) })
        const coachIds = coaches.map(coach => coach.externalId);
        const teamsToSave = teamsFromResponse.filter(s => s.coach.id && !coachIds.includes(s.coach.id));

        for(const teamToSave of teamsToSave) {
            const team = teams.find(t => t.externalId === teamToSave.id);
            const coach = plainToInstance(
                CoachEntity, 
                {...teamToSave.coach, externalId: teamToSave.coach.id, teamId: team.id}, 
                {excludeExtraneousValues: true}
            );
            await this.coachRepository.save(coach);
        }
    }
}

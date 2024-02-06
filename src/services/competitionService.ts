import { plainToInstance } from "class-transformer";

import { CompetitionEntity } from "../sql/entities/competition";
import { DefaultService as FootballService } from "../generated/openAPI";
import AppDataSource from "../server/database";
import { Repository } from "typeorm";

export default class CompetitionService {
    private competitionRepository: Repository<CompetitionEntity>;

    constructor(){
        this.competitionRepository = AppDataSource.getRepository(CompetitionEntity);
    }

    public async saveIfNotExistCompetition (code: string, competitionResponse, areaId: number) {
        let competition =  await this.competitionRepository.findOneBy({code});
        
        const competitionData = plainToInstance(CompetitionEntity, {
            ...competitionResponse, externalId: competitionResponse.id, areaId
        }, {excludeExtraneousValues: true});
        
        if (!competition){
            competition = await this.competitionRepository.save(competitionData);
        }else{
            await this.competitionRepository.update({id: competition.id}, competitionData);
        }
        return competition;
    }
    
    public async importCompetition (code: string) {
        let data = [];
        try{
            data = await Promise.all([
                FootballService.getV4Competitions({competition: code}),
                FootballService.getV4CompetitionsTeams({competition: code})
            ]);
        }catch(e){
            console.log(e);
            throw new Error('Couldn\'t connect to FootballService');
        }
        return data;
    };
    
    public async listCompetitions (teamId: number): Promise<CompetitionEntity[]> {
        return this.competitionRepository
          .createQueryBuilder('competition')
          .innerJoin('competitions_teams', 't', 't.competitionId = competition.id')
          .where('t.teamId = :teamId', { teamId })
          .getMany();
    }
    
    public async showCompetition (code: string) {
        return this.competitionRepository.findOneBy({code});
    }
}

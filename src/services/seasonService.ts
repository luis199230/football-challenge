import { plainToInstance } from "class-transformer";
import { In, Repository } from "typeorm";
import AppDataSource from "../server/database";
import { TeamEntity } from "../sql/entities/team";
import { SeasonEntity } from "../sql/entities/season";

export default class SeasonService {
    private seasonRepository: Repository<SeasonEntity>;

    constructor()  {
        this.seasonRepository = AppDataSource.getRepository(SeasonEntity);
    }

    public async listSeasons (competitionId: number): Promise<SeasonEntity[]> {
        return this.seasonRepository.findBy({competitionId});
    }
    
    public async showCurrentSeason (competitionId: number): Promise<SeasonEntity> {
        return this.seasonRepository.findOne({where: {competitionId}, order: {
            endDate: 'DESC'
        }});
    }
    
    public async showSeason (externalId: number) {
        return this.seasonRepository.findOneBy({externalId});
    }
    
    public async saveIfExistWinners (seasonsFromResponse, seasons: SeasonEntity[], teams: TeamEntity[]) {
        for(const season of seasons){
            const seasonFound = seasonsFromResponse.find(s => s.id === season.externalId);
            const teamFound = teams.find(t => seasonFound.winner && t.externalId === seasonFound.winner.id);
            if(teamFound){
                season.winner = {id: teamFound.id} as TeamEntity
                await this.seasonRepository.save(season);    
            }
        }
    }

    public async saveIfNotExistSeasons (seasonsFromResponse, competitionId: number): Promise<SeasonEntity[]> {
        const seasonsToExport = [];
        const seasonExternalIds = seasonsFromResponse.map((s) => s.id);
        
        const seasons = await this.seasonRepository.findBy({ externalId: In(seasonExternalIds) });
        const seasonIds = seasons.map(season => season.externalId);
        const seasonsToSave = seasonsFromResponse.filter(s => !seasonIds.includes(s.id));
    
        for(const seasonToSave of seasonsToSave){
            const season = plainToInstance(
                SeasonEntity, 
                {...seasonToSave, externalId: seasonToSave.id, competitionId}, 
                {excludeExtraneousValues: true}
            );
            seasonsToExport.push(await this.seasonRepository.save(season));
        }
        return seasonsToExport;
    }
}

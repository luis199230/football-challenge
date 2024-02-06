import { plainToInstance } from "class-transformer";
import { In, Repository } from "typeorm";
import { PlayerEntity } from "../sql/entities/player";
import AppDataSource from "../server/database";

export default class PlayerService {
    private playerRepository: Repository<PlayerEntity>;
    
    constructor() {
        this.playerRepository = AppDataSource.getRepository(PlayerEntity);
    }

    private removeDuplicates (array: []) {
        return Array.from(new Set(array.map((a) => JSON.stringify(a))))
            .map((d: string) => JSON.parse(d));
    }
    
    public async listPlayers (competitionId: number, teamId?: number) {
        const query = this.playerRepository.createQueryBuilder('player')
        .innerJoin('players_teams', 'p', 'p.playerId = player.id')
        .innerJoin('competitions_teams', 'c', 'c.teamId = p.teamId')
        .where('c.competitionId = :competitionId', {competitionId});
    
        if(teamId){
            query.where('c.teamId = :teamId', {teamId})
        }    return query
        .getMany();
    }
    
    public async listPlayersByTeam (teamId: number) {
        return this.playerRepository
          .createQueryBuilder('player')
          .innerJoin('players_teams', 'p', 'p.playerId = player.id')
          .where('p.teamId = :teamId', { teamId })
          .getMany();
    }
    
    public async saveIfNotExistPlayers (teamsFromResponse) {
        const playersToExport: PlayerEntity[] = [];
    
        const playersFromResponse = this.removeDuplicates(teamsFromResponse.flatMap(team => team.squad));
        const playerExternalIds = playersFromResponse.map(s => s.id);
        
        const players = await this.playerRepository.findBy({ externalId: In(playerExternalIds) });
        const playerIds = players.map(player => player.externalId);
            
        const playersToSave = playersFromResponse.filter(s => !playerIds.includes(s.id));
    
        for(const playerToSave of playersToSave){
            const player = plainToInstance(
                PlayerEntity, 
                {...playerToSave, externalId: playerToSave.id}, 
                {excludeExtraneousValues: true}
            );
            playersToExport.push(await this.playerRepository.save(player));
        }
        return playersToExport;
    }
}

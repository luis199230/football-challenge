import { TeamEntity } from "../sql/entities/team";
import AppDataSource from "../server/database";
import { plainToInstance } from "class-transformer";
import { In, Repository } from "typeorm";

export default class TeamService {
    private teamRepository: Repository<TeamEntity>;

    constructor() {
        this.teamRepository = AppDataSource.getRepository(TeamEntity); 
    }

    public async showTeam (name: string): Promise<TeamEntity> {
        return this.teamRepository.findOneBy({name});
    }
    
    public async showTeamById (id: number): Promise<TeamEntity> {
        return this.teamRepository.findOneBy({id});
    }
    
    public async showCurrentTeamByPlayer (playerId: number): Promise<TeamEntity> {
        return this.teamRepository.createQueryBuilder('team')
            .innerJoin('players_teams', 't', 't.teamId = team.id')
            .innerJoinAndSelect('seasons', 's', 's.id = t.seasonId')
            .where('t.playerId = :playerId', { playerId })
            .orderBy('s.startDate', 'DESC') 
            .take(1)
            .getOne();
    }
    
    public async listTeams (externalIds: number[]) {
        return this.teamRepository.findBy({externalId: In(externalIds)})
    }
    
    public async saveIfNotExistTeams (teamsFromResponse, areaId: number) {
        const teamExternalIds = teamsFromResponse.map(t => t.id);
        const teams = await this.teamRepository.findBy({externalId: In(teamExternalIds) });
        const teamIds = teams.map(team => team.externalId);
        const teamsToSave = teamsFromResponse.filter(s => !teamIds.includes(s.id));
    
        for(const teamToSave of teamsToSave) {
            const teamData = plainToInstance(
                TeamEntity, 
                {...teamToSave, externalId: teamToSave.id, areaId}, 
                {excludeExtraneousValues: true}
            );
            await this.teamRepository.save(teamData);  
        }
    }
}
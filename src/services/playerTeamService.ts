import { Repository } from "typeorm";

import AppDataSource from "../server/database";
import { PlayerTeamEntity } from "../sql/entities/playerTeam";
import { TeamEntity } from "../sql/entities/team";
import { PlayerEntity } from "../sql/entities/player";

export default class PlayerTeamService {
    private playerTeamRepository: Repository<PlayerTeamEntity>;
    
    constructor() {
        this.playerTeamRepository = AppDataSource.getRepository(PlayerTeamEntity);
    }
    
    public async saveIfNotExistPlayerTeam (teamsFromResponse, seasonId: number, players: PlayerEntity[], teams: TeamEntity[]) {
        const playerTeams = teamsFromResponse.reduce((result: Record<number, number>, team) => {
            const teamFound = teams.find(t => t.externalId === team.id);
            team.squad.forEach((player) => {
                result[player.id] = teamFound.id;
            });
            return result;
        }, {});
    
        for(const player of players) {
            await this.playerTeamRepository.save(
                {teamId: playerTeams[player.externalId], seasonId, playerId: player.id}
            );
        }
    }
}
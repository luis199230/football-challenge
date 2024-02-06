import { plainToInstance } from 'class-transformer';
import PlayerTeamService from './playerTeamService';
import { PlayerEntity } from '../sql/entities/player';
import { TeamEntity } from '../sql/entities/team';

describe('PlayerTeamService', () => {

  let playerTeamService: PlayerTeamService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn()
    };

    playerTeamService = new PlayerTeamService();
    playerTeamService['playerTeamRepository'] = mockRepository;
  });

  describe('saveIfNotExistPlayerTeam', () => {

    it('should save player-team records', async () => {
      const teamsResponse = [
        {
          id: 1, 
          squad: [
            {id: 1}, 
            {id: 2}
          ]
        }
      ];
      const seasonId = 2022;
      const players = [
        plainToInstance(PlayerEntity,{id: 1, externalId: 1}),
        plainToInstance(PlayerEntity,{id: 2, externalId: 2})  
      ];
      const teams = [
        plainToInstance(TeamEntity,{id: 1, externalId: 1})
      ];

      await playerTeamService.saveIfNotExistPlayerTeam(teamsResponse, seasonId, players, teams);

      expect(mockRepository.save).toHaveBeenCalledTimes(2);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          playerId: 1,
          teamId: 1,
          seasonId: 2022
        })  
      );
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          playerId: 2,
          teamId: 1,
          seasonId: 2022
        })
      );
    });

  });

});
import { plainToInstance } from 'class-transformer';
import CompetitionTeamService from './competitionTeamService'; 
import { TeamEntity } from '../sql/entities/team';

describe('CompetitionTeamService', () => {

  let competitionTeamService: CompetitionTeamService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn()
    };

    competitionTeamService = new CompetitionTeamService();
    competitionTeamService['competitionTeamRepository'] = mockRepository;
  });

  describe('saveIfNotExistCompetitionTeam', () => {

    it('should save new competition-team records', async () => {
      const competitionId = 1;
      const seasonId = 2022;
      const teams = [
        plainToInstance(TeamEntity, {id: 1, name: 'Team 1'}),
        plainToInstance(TeamEntity, {id: 2, name: 'Team 2'})  
      ];

      await competitionTeamService.saveIfNotExistCompetitionTeam(competitionId, seasonId, teams);

      expect(mockRepository.save).toHaveBeenCalledTimes(2);
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        competitionId: 1,
        teamId: 1,
        seasonId: 2022
      }));
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        competitionId: 1,
        teamId: 2,
        seasonId: 2022  
      }));
    });
  });
});
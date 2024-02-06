import { plainToInstance } from 'class-transformer';
import TeamService from './teamService';
import { TeamEntity } from '../sql/entities/team';

describe('TeamService', () => {

  let teamService: TeamService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findBy: jest.fn(),
      save: jest.fn()
    };

    teamService = new TeamService(); 
    teamService['teamRepository'] = mockRepository;
  });

  describe('saveIfNotExistTeams', () => {

    it('should save new team if not found', async () => {
      mockRepository.findBy.mockResolvedValueOnce([]);

      const response = [
        {
            id: 1,
            name: 'Team 1'
        }
      ];

      await teamService.saveIfNotExistTeams(response, 1);

      expect(mockRepository.save).toHaveBeenCalledWith(
        plainToInstance(TeamEntity, {
        externalId: 1,
        name: 'Team 1',
        areaId: 1
        })
      );
    });
  });
});

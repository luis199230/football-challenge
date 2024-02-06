import CoachService from './CoachService';
import { TeamEntity } from '../sql/entities/team';

jest.mock('../sql/entities/coach');

describe('CoachService', () => {
  let coachService: CoachService;

  beforeEach(() => {
    coachService = new CoachService();
  });

  describe('showCoach', () => {

    it('calls coachRepository.findOneBy with teamId', async () => { 
       const teamId = 1;

       const mockFindOneBy = jest.fn();
       coachService['coachRepository'].findOneBy = mockFindOneBy;
 
       await coachService.showCoach(teamId);

       expect(mockFindOneBy).toHaveBeenCalledWith({ teamId });
    });

  });

  describe('saveIfNotExistCoach', () => {

    it('saves new coaches', async () => {
        const teamsFromResponse = [
          { id: 1, coach: { id: 1 } },
          { id: 2, coach: { id: 2 } }  
        ];
  
        const teams = [
          { externalId: 1 } as TeamEntity,
          { externalId: 2 } as TeamEntity
        ];
  
        const mockFindBy = jest.fn();
        coachService['coachRepository'].findBy = mockFindBy;
        mockFindBy.mockResolvedValue([]);
        
        const mockSave = jest.fn();
        coachService['coachRepository'].save = mockSave;
  
        await coachService.saveIfNotExistCoach(teamsFromResponse, teams);
  
        expect(mockSave).toHaveBeenCalledTimes(2);
      });

  });
});
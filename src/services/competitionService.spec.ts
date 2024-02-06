import { plainToInstance } from 'class-transformer';
import { CompetitionEntity } from '../sql/entities/competition';
import CompetitionService from './competitionService';

describe('CompetitionService', () => {

  let competitionService: CompetitionService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn()
    };

    competitionService = new CompetitionService();
    competitionService['competitionRepository'] = mockRepository;
  });

  describe('saveIfNotExistCompetition', () => {

    it('should create new competition if not found', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      
      const code = 'CL';
      const competitionResponse = {id: 1, name: 'Champions League'};
      const area = {id: 1, name: 'Europe'};

      await competitionService.saveIfNotExistCompetition(code, competitionResponse, area.id);

      expect(mockRepository.save).toHaveBeenCalledWith(
        plainToInstance(CompetitionEntity, {
            ...competitionResponse, externalId: 1,
            areaId: area.id
        }, {excludeExtraneousValues: true})
      );
    });

    it('should update existing competition', async () => {
      const existing = new CompetitionEntity();
      existing.id = 1;
      mockRepository.findOneBy.mockResolvedValueOnce(existing);

      const code = 'CL';
      const competitionResponse = {id: 1, name: 'Champions League 2022/23'};
      const area = {id: 2, name: 'Europe'};

      await competitionService.saveIfNotExistCompetition(code, competitionResponse, area.id);

      expect(mockRepository.update).toHaveBeenCalledWith({id: 1}, plainToInstance(CompetitionEntity, {
        name: 'Champions League 2022/23',
        areaId: area.id,
        externalId: 1
      }, {excludeExtraneousValues: true}));
    });

  });

});
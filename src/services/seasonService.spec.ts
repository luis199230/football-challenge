import { SeasonEntity } from '../sql/entities/season';
import SeasonService from './seasonService';

describe('SeasonService', () => {
  let seasonService: SeasonService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    seasonService = new SeasonService();
    seasonService['seasonRepository'] = mockRepository;
  });

  describe('saveIfNotExistSeasons', () => {
    it('should save new seasons if not found', async () => {
      mockRepository.findBy.mockResolvedValueOnce([]);

      const competitionId = 1;

      await seasonService.saveIfNotExistSeasons([{id: 1}], competitionId);

      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          competitionId: 1
        })
      );
    });
  });

});
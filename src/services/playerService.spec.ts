import PlayerService from './playerService';

describe('PlayerService', () => {

  let playerService: PlayerService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findBy: jest.fn(),
      save: jest.fn()  
    };
    
    playerService = new PlayerService();
    playerService['playerRepository'] = mockRepository;
  });

  describe('saveIfNotExistPlayers', () => {
    
    it('should save new players', async () => {
      const teamsResponse = [
        { 
          id: 1,
          squad: [
            {id: 101, name: 'Player 1'},
            {id: 102, name: 'Player 2'}
          ]
        }
      ];

      mockRepository.findBy.mockResolvedValueOnce([]);

      await playerService.saveIfNotExistPlayers(teamsResponse);

      expect(mockRepository.save).toHaveBeenCalledTimes(2);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          externalId: 101,
          name: 'Player 1'
        })
      );
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          externalId: 102, 
          name: 'Player 2'
        })
      );
    });

  });

});
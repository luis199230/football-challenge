import AreaService from './areaService';
import { AreaEntity } from '../sql/entities/area';

jest.mock('../sql/entities/area');

describe('areaService', () => {
  let areaService: AreaService;

  beforeEach(() => {
    areaService = new AreaService();
  });
  
  describe('showArea', () => {
    
    it('calls findOneBy on repository', async () => {
      const mockFindOneBy = jest.fn();
      areaService['areaRepository'].findOneBy = mockFindOneBy;

      await areaService.showArea(1);

      expect(mockFindOneBy).toHaveBeenCalledWith({ id: 1 });
    });

  });

  describe('saveIfNotExistArea', () => {

    it('saves new area if not found', async () => {
      const mockFindOneBy = jest.fn().mockResolvedValueOnce(null); 
      areaService['areaRepository'].findOneBy = mockFindOneBy;
      
      const mockSave = jest.fn().mockResolvedValue({ id: 1 } as AreaEntity);
      areaService['areaRepository'].save = mockSave;

      const result = await areaService.saveIfNotExistArea({
        area: { id: 1, name: 'New Area' }  
      });

      expect(mockSave).toHaveBeenCalled();
      expect(result.id).toEqual(1);
    });

    it('returns existing area if found', async () => {
      const existingArea = { id: 1, name: 'Existing' };
      const mockFindOneBy = jest.fn().mockResolvedValueOnce(existingArea);
      areaService['areaRepository'].findOneBy = mockFindOneBy;

      const result = await areaService.saveIfNotExistArea({
        area: { id: 1, name: 'New Name' }
      });

      expect(result).toEqual(existingArea);
    });

  });

});

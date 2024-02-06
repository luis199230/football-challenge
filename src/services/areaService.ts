import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

import AppDataSource from "../server/database";
import { AreaEntity } from "../sql/entities/area";

export default class AreaService {
    private areaRepository: Repository<AreaEntity>;

    constructor() {
        this.areaRepository = AppDataSource.getRepository(AreaEntity);
    }

    public showArea (id: number): Promise<AreaEntity> {
        return this.areaRepository.findOneBy({id});
    }
    
    public async saveIfNotExistArea (competitionResponse) {
        const areaData = plainToInstance(AreaEntity, competitionResponse.area, {excludeExtraneousValues: true});    
        let area = await this.areaRepository.findOneBy({externalId: competitionResponse.area.id});  
        if (!area){
            area = await this.areaRepository.save({...areaData, externalId: competitionResponse.area.id});
        } 
        return area; 
    }
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

import { CompetitionEntity } from "./competition";

@Entity({name: 'areas'})
export class AreaEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Expose()
    @Column({unique: true})
    externalId: number;
    
    @Expose()
    @Column()
    name: string;

    @Expose()
    @Column()
    code: string;

    @Expose()
    @Column({nullable: true})
    flag: string;

    @OneToMany(() => CompetitionEntity, (competition) => competition.area)
    competitions: CompetitionEntity[];
}
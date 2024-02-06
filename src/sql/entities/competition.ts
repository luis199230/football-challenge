import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { AreaEntity } from "./area";
import { SeasonEntity } from "./season";
import { TeamEntity } from "./team";
import { CompetitionTeamEntity } from "./competitionTeam";

@Entity({name: 'competitions'})
export class CompetitionEntity {
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
    @Column()
    type: string;
    
    @Expose()
    @Column()
    emblem: string;

    @Expose()
    @Column()
    lastUpdated: Date;

    @Expose()
    @Column()
    areaId: number;
    
    @ManyToOne(() => AreaEntity, (area) => area.competitions)
    area: AreaEntity;

    @OneToMany(() => SeasonEntity, (season) => season.competition)
    seasons: SeasonEntity[];

    @OneToMany(() => CompetitionTeamEntity, (team) => team.competition)
    teams: TeamEntity[]
}
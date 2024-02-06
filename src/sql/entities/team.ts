import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { SeasonEntity } from "./season";
import { CoachEntity } from "./coach";
import { CompetitionEntity } from "./competition";
import { PlayerTeamEntity } from "./playerTeam";
import { CompetitionTeamEntity } from "./competitionTeam";

@Entity({name: 'teams'})
export class TeamEntity {
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
    shortName: string;
    
    @Expose()
    @Column({nullable:true})
    tla: string;
    
    @Expose()
    @Column()
    crest: string;
    
    @Expose()
    @Column()
    address: string;
    
    @Expose()
    @Column({nullable: true})
    website: string;
    
    @Expose()
    @Column({nullable: true})
    founded: number;
    
    @Expose()
    @Column({nullable: true})
    clubColors: string;
    
    @Expose()
    @Column({nullable: true})
    venue: string;
    
    @Expose()
    @Column()
    lastUpdated: Date;

    @Expose()
    @Column()
    areaId: number;

    @OneToMany(() => SeasonEntity, (season) => season.winner)
    seasonsWon: SeasonEntity[];

    @OneToOne(() => CoachEntity, (coach) => coach.team)
    coach: CoachEntity;

    @OneToMany(() => CompetitionTeamEntity, (ct) => ct.team)
    competitions: CompetitionEntity[]

    @OneToMany(() => PlayerTeamEntity, (pt) => pt.team)
    players: PlayerTeamEntity[]
}

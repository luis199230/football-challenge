import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeamEntity } from "./team";
import { Expose } from "class-transformer";
import { CompetitionEntity } from "./competition";

@Entity({name: 'seasons'})
export class SeasonEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Expose()
    @Column({unique: true})
    externalId: number;

    @Expose()
    @Column()
    startDate: string;
    
    @Expose()
    @Column()
    endDate: string;

    @Expose()
    @Column({ nullable: true })
    currentMatchday?: number;
    
    @Expose()
    @Column({ nullable: true })
    winnerId?: number;

    @Expose()
    @Column()
    competitionId?: number;

    @ManyToOne(() => TeamEntity)
    winner: TeamEntity;

    @ManyToOne(() => CompetitionEntity, (competition) => competition.seasons)
    competition: CompetitionEntity;
}
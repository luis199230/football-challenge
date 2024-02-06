import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TeamEntity } from "./team"
import { Expose } from "class-transformer"
import { CompetitionEntity } from "./competition"
import { SeasonEntity } from "./season"

@Entity({name: 'competitions_teams'})
export class CompetitionTeamEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Expose()    
    competitionId: number

    @Column()
    @Expose()
    teamId: number

    @Column()
    @Expose()
    seasonId: number

    @ManyToOne(() => CompetitionEntity, (competition) => competition.teams)
    competition: CompetitionEntity

    @ManyToOne(() => TeamEntity, (team) => team.competitions)
    team: TeamEntity
}
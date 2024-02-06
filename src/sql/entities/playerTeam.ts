import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TeamEntity } from "./team"
import { PlayerEntity } from "./player"
import { Expose } from "class-transformer"

@Entity({name: 'players_teams'})
export class PlayerTeamEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Expose()    
    playerId: number

    @Column()
    @Expose()
    teamId: number

    @Column()
    @Expose()
    seasonId: number

    @ManyToOne(() => PlayerEntity, (player) => player.teams)
    player: PlayerEntity

    @ManyToOne(() => TeamEntity, (team) => team.players)
    team: TeamEntity
}
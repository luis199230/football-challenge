import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { PlayerTeamEntity } from "./playerTeam";

@Entity({name: 'players'})
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({unique: true})
    externalId: number;

    @Expose()
    @Column()
    name: string;

    @Expose()
    @Column({nullable:true})
    firstName?: string;
    
    @Expose()
    @Column({nullable:true})
    lastName?: string;
    
    @Expose()
    @Column({nullable:true})
    dateOfBirth?: string;
    
    @Expose()
    @Column({ nullable: true})
    nationality?: string;
    
    @Expose()
    @Column({nullable:true})
    section?: string;
    
    @Expose()
    @Column()
    position: string;
    
    @Expose()
    @Column({nullable:true})
    shirtNumber?: number
    
    @Expose()
    @Column({nullable:true})
    lastUpdated?: Date;

    @OneToMany(() => PlayerTeamEntity, (pt) => pt.player)
    teams: PlayerTeamEntity[];
}
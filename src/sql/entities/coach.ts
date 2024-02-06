import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

import { TeamEntity } from "./team";

@Entity({name: 'coaches'})
export class CoachEntity {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Expose()
    @Column({unique: true})
    externalId: number;

    @Expose()
    @Column({nullable: true})
    firstName?: string;

    @Expose()
    @Column({nullable:true})
    lastName?: string;

    @Expose()
    @Column()
    name: string;

    @Expose()
    @Column({nullable: true})
    dateOfBirth?: string;

    @Expose()
    @Column({ nullable: true})
    nationality?: string;
    
    @Expose()
    @Column('simple-json', {nullable: true})
    contract?: {
        start: string,
        until: string
    };

    @Expose()
    @Column()
    teamId: number;

    @OneToOne(() => TeamEntity, (team) => team.coach)
    @JoinColumn()
    team: TeamEntity;
}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { name: 'status_name', length: 255, nullable: false })
  status!: string;

  @Column('varchar', { name: 'status_description', length: 1000, nullable: true })
  description!: string;
}

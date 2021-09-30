import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { Multimedia } from './multimedia.entity';

@Entity()
export class Files extends BaseEntity {
  @Column('varchar', { name: 'file_name', length: 3000, nullable: false })
  fileName!: string;

  @ManyToOne(() => Multimedia, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'multimedia_album_id', referencedColumnName: 'id' })
  album!: string;
}

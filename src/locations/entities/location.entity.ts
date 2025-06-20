import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  lat: string;

  @Column()
  long: string;
}

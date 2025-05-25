import { Column, Entity, OneToMany } from 'typeorm';
import { AppBaseEntity, ResultsEntity } from '.';

const TABLE_NAME = 'users';

@Entity(TABLE_NAME)
export class UsersEntity extends AppBaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => ResultsEntity, ({ user }) => user)
  results!: ResultsEntity[];
}

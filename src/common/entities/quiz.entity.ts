import { Column, Entity, OneToMany } from 'typeorm';
import { AppBaseEntity, QuestionsEntity } from '.';

const TABLE_NAME = 'quiz';

@Entity(TABLE_NAME)
export class QuizEntity extends AppBaseEntity {
  @Column()
  title!: string;

  @OneToMany(() => QuestionsEntity, ({ quiz }) => quiz)
  questions!: QuestionsEntity[];
}

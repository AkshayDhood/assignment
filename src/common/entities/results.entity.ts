import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { AnswersEntity, AppBaseEntity, QuizEntity, UsersEntity } from '.';

const TABLE_NAME = 'results';

@Entity(TABLE_NAME)
@Index(['userId', 'quizId'], { unique: true })
export class ResultsEntity extends AppBaseEntity {
  @Column()
  userId!: number;
  @ManyToOne(() => UsersEntity, ({ results }) => results)
  user!: UsersEntity;

  @Column()
  quizId!: number;
  @ManyToOne(() => QuizEntity)
  quiz!: QuizEntity;

  @Column({ default: 0 })
  score!: number;

  @OneToMany(() => AnswersEntity, ({ result }) => result)
  answers!: AnswersEntity[];
}

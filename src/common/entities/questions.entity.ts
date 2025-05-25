import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AppBaseEntity, OptionsEntity, QuizEntity } from '.';

const TABLE_NAME = 'questions';

@Entity(TABLE_NAME)
export class QuestionsEntity extends AppBaseEntity {
  @Column()
  text!: string;

  @Column()
  quizId!: number;
  @ManyToOne(() => QuizEntity, ({ questions }) => questions)
  quiz!: QuizEntity;

  @Exclude()
  @Column({ nullable: true })
  correctOptionId?: number;
  @OneToOne(() => OptionsEntity, ({ question }) => question)
  correctOption?: OptionsEntity;

  @OneToMany(() => OptionsEntity, ({ question }) => question)
  options!: OptionsEntity[];
}

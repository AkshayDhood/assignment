import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AppBaseEntity, OptionsEntity, QuestionsEntity, ResultsEntity } from '.';

const TABLE_NAME = 'answers';

@Entity(TABLE_NAME)
export class AnswersEntity extends AppBaseEntity {
  @Column()
  questionId!: number;
  @ManyToOne(() => QuestionsEntity)
  question!: QuestionsEntity;

  @Column()
  selectedOptionId!: number;
  @JoinColumn({ name: 'selectedOptionId' })
  @ManyToOne(() => OptionsEntity)
  selectedOption!: OptionsEntity;

  @Column()
  resultId!: number;
  @ManyToOne(() => ResultsEntity, ({ answers }) => answers)
  result!: ResultsEntity;

  @Column()
  isCorrect!: boolean;
}

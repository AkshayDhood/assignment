import { Column, Entity, ManyToOne } from 'typeorm';
import { AppBaseEntity, QuestionsEntity } from '.';

const TABLE_NAME = 'options';

@Entity(TABLE_NAME)
export class OptionsEntity extends AppBaseEntity {
  @Column()
  option!: string;

  @Column()
  questionId!: number;
  @ManyToOne(() => QuestionsEntity, ({ options }) => options)
  question!: QuestionsEntity;
}

import { ModelName } from "../declarations";
import { CharacterModel } from "./characters.model";
import { Model, Column, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import SessionModel from "./sessions.model";
@Table({
  tableName: ModelName.ROLL,
  modelName: ModelName.ROLL,
  timestamps: true,
})
export class RollModel extends Model<RollModel> {
  @Column
  faces!: number;

  @BelongsTo(() => CharacterModel)
  character!: CharacterModel;

  @ForeignKey(() => CharacterModel)
  @Column
  characterId!: number;

  @BelongsTo(() => SessionModel)
  session!: SessionModel;

  @ForeignKey(() => SessionModel)
  @Column
  sessionId!: number;
}

export default RollModel;

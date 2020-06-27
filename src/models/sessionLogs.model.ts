import { ModelName } from "../declarations";
import { SessionModel } from "./sessions.model";
import { BelongsTo, Column, Table, Model, ForeignKey } from "sequelize-typescript";
@Table({
  tableName: ModelName.SESSION_LOG,
  modelName: ModelName.SESSION_LOG,
  timestamps: true,
})
export class SessionLogModel extends Model<SessionLogModel> {
  @Column
  type!: string;

  @Column
  content!: string;

  @BelongsTo(() => SessionModel)
  session!: SessionModel;

  @ForeignKey(() => SessionModel)
  @Column
  sessionId!: number;
}

export default SessionLogModel;

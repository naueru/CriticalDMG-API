import { ModelName } from "../declarations";
import { SessionModel } from "./sessions.model";
import { CharacterModel } from "./characters.model";
import { Model, Column, Table, BelongsTo, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: ModelName.CHAT_MESSAGE,
  modelName: ModelName.CHAT_MESSAGE,
  timestamps: true,
})
export class ChatMessageModel extends Model<ChatMessageModel> {
  @Column
  message!: string;

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

export default ChatMessageModel;

import { ModelName } from "../declarations";
import { CharacterModel } from "./characters.model";
import { Table, Column, Model, HasMany, Unique } from "sequelize-typescript";

@Table({
  tableName: ModelName.USER,
  modelName: ModelName.USER,
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
  @Unique
  @Column
  public email!: string;

  @Unique
  @Column
  public userName!: string;

  @Column
  public alterEgo!: string;

  @Column
  public picture!: string;

  @Column
  public icon!: string;

  @Column
  public password!: string;

  @HasMany(() => CharacterModel)
  characters!: CharacterModel[];
}

export default UserModel;

import { ModelName } from "../declarations";
import { CharacterModel } from "./characters.model";
import {
  Table,
  Column,
  Model,
  HasMany,
  BeforeCount,
} from "sequelize-typescript";

@Table({
  tableName: ModelName.USER,
  modelName: ModelName.USER,
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
  @Column
  public email!: string;

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

  @BeforeCount
  static setToRaw(options: any) {
    options.raw = true;
  }
}

export default UserModel;

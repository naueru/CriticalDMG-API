import { DataTypes, BelongsToGetAssociationMixin, Association } from "sequelize";
import { ModelName, SettingName, CriticalDMGModel, Application } from "../declarations";
import { UserModel } from "./users.model";

export class CharacterModel extends CriticalDMGModel {
  name!: string;

  public getUser!: BelongsToGetAssociationMixin<UserModel>;

  public static associations: {
    user: Association<CharacterModel, UserModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof CharacterModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  CharacterModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.CHARACTER,
      modelName: ModelName.CHARACTER,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  CharacterModel.associate = function (models) {
    this.belongsTo(models[ModelName.CAMPAIGN]);

    this.belongsTo(models[ModelName.USER]);
  };

  return CharacterModel;
}

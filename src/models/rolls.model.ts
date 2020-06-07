import { DataTypes, Association } from "sequelize";
import { ModelName, SettingName, CriticalDMGModel, Application } from "../declarations";
import { CharacterModel } from "./characters.model";

export class RollModel extends CriticalDMGModel {
  faces!: number;

  static associations: {
    characters: Association<RollModel, CharacterModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof RollModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  RollModel.init(
    {
      faces: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.ROLL,
      modelName: ModelName.ROLL,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  RollModel.associate = function (models) {
    this.belongsTo(models[ModelName.CHARACTER], {
      as: "character",
    });
  };

  return RollModel;
}

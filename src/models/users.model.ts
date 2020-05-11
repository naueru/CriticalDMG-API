import { DataTypes } from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";

export class UserModel extends CriticalDMGModel {
  public email!: string;
  public userName!: string;
  public alterEgo!: string;
  public picture!: string;
  public icon!: string;

  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof UserModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  UserModel.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      alterEgo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.USER,
      modelName: ModelName.USER,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  UserModel.associate = function (models) {
    this.belongsToMany(models[ModelName.SESSION], {
      through: ModelName.SESSION_SUBSCRIPTION,
    });
  };

  return UserModel;
}

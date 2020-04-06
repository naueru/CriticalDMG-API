// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { DataTypes, Model } from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";

export class UserModel extends CriticalDMGModel {
  public email!: string;
  public username!: string;
  public alterEgo!: string;

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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      alterEgo: {
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
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  UserModel.associate = function (models) {
    // Define associations here
  };

  return UserModel;
}

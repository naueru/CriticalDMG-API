// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { ModelName, SettingName } from "../declarations";
import { Application } from "../declarations";

export class UserModel extends Model {
  public email!: string;
  public username!: string;
  public alterEgo!: string;

  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function(app: Application): typeof UserModel {
  const sequelize: Sequelize = app.get(SettingName.SEQUELIZE);
  UserModel.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: ModelName.USERS,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  UserModel.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // And http://sequelize.org/master/manual/typescript.html
  };

  return UserModel;
}

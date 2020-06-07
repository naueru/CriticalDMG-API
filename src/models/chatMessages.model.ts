import { DataTypes, Association } from "sequelize";
import { ModelName, SettingName, CriticalDMGModel, Application } from "../declarations";
import { SessionModel } from "./sessions.model";
import { CharacterModel } from "./characters.model";

export class ChatMessageModel extends CriticalDMGModel {
  message!: string;

  static associations: {
    character: Association<ChatMessageModel, CharacterModel>;
    session: Association<ChatMessageModel, SessionModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof ChatMessageModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  ChatMessageModel.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.CHAT_MESSAGE,
      modelName: ModelName.CHAT_MESSAGE,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  ChatMessageModel.associate = function (models) {
    this.belongsTo(models[ModelName.CHARACTER], {
      as: "character",
    });
    this.belongsTo(models[ModelName.SESSION], {
      as: "session",
    });
  };

  return ChatMessageModel;
}

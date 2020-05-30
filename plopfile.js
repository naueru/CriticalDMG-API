const IMPORT_PLACEHOLDER_COMMENT = "// Don't remove this comment. It's needed to format import lines nicely.";
const FEATHERS_IMPORT_TEMPLATE = 
`import { {{properCase name}}DTO } from "../services/{{camelCase pluralName}}/{{camelCase pluralName}}.dto";
import { {{properCase name}}Service } from "../services/{{camelCase pluralName}}/{{camelCase pluralName}}.class";
// Don't remove this comment. It's needed to format import lines nicely.`;

const SERVICE_NAMES_PLACEHOLDER_COMMENT = "// Don't remove this comment. It's needed to add service names names nicely.";
const SERVICE_NAMES_TEMPLATE = 
  `{{constantCase pluralName}} = "{{camelCase pluralName}}",
  // Don't remove this comment. It's needed to add service names names nicely.`;

const SERVICE_TYPES_PLACEHOLDER_COMMENT = "// Don't remove this comment. It's needed to add service types names nicely.";
const SERVICE_TYPES_TEMPLATE = 
`[ServiceName.{{constantCase pluralName}}]: {{properCase name}}Service & ServiceAddons<{{properCase name}}DTO>;

// Don't remove this comment. It's needed to add service types names nicely.`;

const SEQUELIZE_IMPORT_TEMPLATE = 
`import { {{properCase name}}Model } from "../models/{{camelCase pluralName}}.model";
// Don't remove this comment. It's needed to format import lines nicely.`;


const MODEL_NAMES_PLACEHOLDER_COMMENT = "// Don't remove this comment. It's needed to add model names nicely."
const MODEL_NAMES_TEMPLATE = 
`{{constantCase name}} = "{{snakeCase name}}",
  // Don't remove this comment. It's needed to add model names nicely.`;

const MODELS_PLACEHOLDER_COMMENT = "// Don't remove this comment. It's needed to add models nicely."
const MODELS_TEMPLATE = 
`[ModelName.{{constantCase name}}]: ModelCtor<{{properCase name}}Model>;
  // Don't remove this comment. It's needed to add models nicely.`;

const SERVICE_CONFIGURATION_IMPORT_TEMPLATE = 
`import {{camelCase pluralName}} from "./{{camelCase pluralName}}/{{camelCase pluralName}}.service";
// Don't remove this comment. It's needed to format import lines nicely.`;

const SERVICE_CONFIGURATION_PLACEHOLDER = "// Don't remove this comment. It's needed to format configure service nicely."
const SERVICE_CONFIGURATION_TEMPLATE = 
`app.configure({{camelCase pluralName}});
// Don't remove this comment. It's needed to format configure service nicely.`;

const addService = {
  type: "add",
  path: "src/services/{{camelCase pluralName}}/{{camelCase pluralName}}.service.ts",
  templateFile: "templates/service.hbs",
};
const addHooks = {
  type: "add",
  path: "src/services/{{camelCase pluralName}}/{{camelCase pluralName}}.hooks.ts",
  templateFile: "templates/hooks.hbs",
};
const addDto = {
  type: "add",
  path: "src/services/{{camelCase pluralName}}/{{camelCase pluralName}}.dto.ts",
  templateFile: "templates/dto.hbs",
};
const addClass = {
  type: "add",
  path: "src/services/{{camelCase pluralName}}/{{camelCase pluralName}}.class.ts",
  templateFile: "templates/class.ts.hbs",
};
const addModel = {
  type: "add",
  path: "src/models/{{camelCase pluralName}}.model.ts",
  templateFile: "templates/model.ts.hbs",
};

const modifyFeathersImport = {
  type: "modify",
  path: "src/declarations/feathers.ts",
  pattern: IMPORT_PLACEHOLDER_COMMENT,
  template: FEATHERS_IMPORT_TEMPLATE
}
const modifyFeathersServiceName = {
  type: "modify",
  path: "src/declarations/feathers.ts",
  pattern: SERVICE_NAMES_PLACEHOLDER_COMMENT,
  template: SERVICE_NAMES_TEMPLATE
}
const modifyFeathersServiceTypes = {
  type: "modify",
  path: "src/declarations/feathers.ts",
  pattern: SERVICE_TYPES_PLACEHOLDER_COMMENT,
  template: SERVICE_TYPES_TEMPLATE
}

const modifySequelizeImport = {
  type: "modify",
  path: "src/declarations/sequelize.ts",
  pattern: IMPORT_PLACEHOLDER_COMMENT,
  template: SEQUELIZE_IMPORT_TEMPLATE
}
const modifySequelizeModelNames = {
  type: "modify",
  path: "src/declarations/sequelize.ts",
  pattern: MODEL_NAMES_PLACEHOLDER_COMMENT,
  template: MODEL_NAMES_TEMPLATE
}
const modifySequelizeModels = {
  type: "modify",
  path: "src/declarations/sequelize.ts",
  pattern: MODELS_PLACEHOLDER_COMMENT,
  template: MODELS_TEMPLATE
}

const modifyServiceConfigurationImport = {
  type: "modify",
  path: "src/services/index.ts",
  pattern: IMPORT_PLACEHOLDER_COMMENT,
  template: SERVICE_CONFIGURATION_IMPORT_TEMPLATE
}
const modifyServiceConfiguration = {
  type: "modify",
  path: "src/services/index.ts",
  pattern: SERVICE_CONFIGURATION_PLACEHOLDER,
  template: SERVICE_CONFIGURATION_TEMPLATE
}

module.exports = function (plop) {
  plop.setGenerator("service", {
    description:
      "Create a new entity with a model , service, hooks, types and route configurated",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "service name",
      },
      {
        type: "input",
        name: "pluralName",
        message: "service plural name",
      },
    ],
    actions: [
      addClass, 
      addService, 
      addHooks, 
      addDto, 
      addModel, 

      modifyFeathersImport,
      modifyFeathersServiceName,
      modifyFeathersServiceTypes,

      modifySequelizeImport,
      modifySequelizeModelNames,
      modifySequelizeModels,

      modifyServiceConfigurationImport,
      modifyServiceConfiguration
    ],
  });
};
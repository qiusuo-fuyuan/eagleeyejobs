import { DocumentSchemaDefinitionType } from "./BaseTypes.js";

// Create table
export const PermissionDocumentSchemaDefinition: DocumentSchemaDefinitionType = {
  name: "Permission",
  tableName: "permission",
  schemaDefinition: {
    role: {
      type: String,
      unique: true,
      required: true,
    },
    actions: {
      type: [String],
      required: true 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
};

export class Permission {
  id: String;
  role: String;
  actions?:  Array<String>;
  createdAt: Date;
  updatedAt?: Date;

  constructor(role: String, actions?:  Array<String>) {
    this.role = role;
    this.actions = actions;
  }
}

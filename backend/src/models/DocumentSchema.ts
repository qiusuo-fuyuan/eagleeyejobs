import { DocumentSchemaDefinitionType } from "./BaseTypes.js";
import { JobDocumentSchemaDefinition } from "./Job.js";
import { UserDocumentSchemaDefinition } from "./User.js";




const AllDocumentSchemaDefinitions: Array<DocumentSchemaDefinitionType> = []
AllDocumentSchemaDefinitions.push(JobDocumentSchemaDefinition, UserDocumentSchemaDefinition)

export { AllDocumentSchemaDefinitions }
import { DocumentSchemaDefinitionType } from "./BaseTypes.js";
import { JobDocumentSchemaDefinition } from "./Job.js";




const AllDocumentSchemaDefinitions: Array<DocumentSchemaDefinitionType> = []
AllDocumentSchemaDefinitions.push(JobDocumentSchemaDefinition)

export { AllDocumentSchemaDefinitions }
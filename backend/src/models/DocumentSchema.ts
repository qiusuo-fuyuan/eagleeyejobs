import { DocumentSchemaDefinitionType } from "./BaseTypes.js";
import { JobDocumentSchemaDefinition } from "./Job.js";
import { QuestionDocumentSchemaDefinition } from "./Question.js";




const AllDocumentSchemaDefinitions: Array<DocumentSchemaDefinitionType> = []
AllDocumentSchemaDefinitions.push(JobDocumentSchemaDefinition, QuestionDocumentSchemaDefinition)

export { AllDocumentSchemaDefinitions }
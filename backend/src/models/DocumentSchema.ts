import { DocumentSchemaDefinitionType } from "./BaseTypes.js";
import { JobDocumentSchemaDefinition } from "./Job.js";
import { MembershipDocumentSchemaDefinition, UserMembershipStatusDocumentSchemaDefinition } from "./Membership.js";
import { QuestionDocumentSchemaDefinition } from "./Question.js";
import { UserDocumentSchemaDefinition } from "./User.js";
MembershipDocumentSchemaDefinition



const AllDocumentSchemaDefinitions: Array<DocumentSchemaDefinitionType> = []

AllDocumentSchemaDefinitions.push(
    JobDocumentSchemaDefinition,
    QuestionDocumentSchemaDefinition,
    UserDocumentSchemaDefinition,
    MembershipDocumentSchemaDefinition,
    UserMembershipStatusDocumentSchemaDefinition)

export { AllDocumentSchemaDefinitions }
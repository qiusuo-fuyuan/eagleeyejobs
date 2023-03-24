import { BaseRepository } from "./BaseRepository.js"
import { Membership, MembershipDocumentSchemaDefinition } from "../models/Membership.js"

export class MembershipRepository extends BaseRepository<Membership>{
    private MembershipDocumentModel: any

    constructor() {
        super(MembershipDocumentSchemaDefinition.name)
    }
}
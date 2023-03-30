import { BaseRepository } from './BaseRepository';
import { Membership, MembershipDocumentSchemaDefinition } from '../models/Membership';

export class MembershipRepository extends BaseRepository<Membership> {
    constructor() {
        super(MembershipDocumentSchemaDefinition.name);
    }

    // Add any additional methods specific to MembershipRepository here.
}

export default new MembershipRepository();

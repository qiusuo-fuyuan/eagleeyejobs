import { User, UserDocumentSchemaDefinition } from "../models/User.js"
import { BaseRepository } from "./BaseRepository.js"

export class UserRepository extends BaseRepository<User> {

    constructor() {
        super(UserDocumentSchemaDefinition.name)
    }

    createUser(user: User): Promise<User> {
        let userDocument = new this.documentModel(user)
        return userDocument.save()
    }
}


export default new UserRepository()

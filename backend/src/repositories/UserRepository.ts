import { User, UserDocumentSchemaDefinition } from "../models/User.js"
import { BaseRepository } from "./BaseRepository.js"

export class UserRepository extends BaseRepository{
    public UserDocumentModel: any

    constructor() {
        super()
        this.UserDocumentModel = this.getDocumentModel(UserDocumentSchemaDefinition.name)
    }

    findUserById(userId: string): Promise<User> {
        return this.UserDocumentModel.findById(userId)
    }

    createUser(user: User): Promise<User> {
        let userDocument = new this.UserDocumentModel(user)
        return userDocument.save()
    }
}

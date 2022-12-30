import { User } from "../../models/User.js"
import userRepository, { UserRepository } from "../../repositories/UserRepository.js"
import { copyMatchingKeyValues } from "../../utils/Utils.js"

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = userRepository
    }

    /**
     * ToDo:
     * We need to achieve just call save(obj). This save(obj) will internally
     * check if we should do update or create new. Normally this should be achieved by 
     * the ORM. But mongoose does not provide this functionality. We can implement this 
     * in BaseRepository. 
     * 
     * @param user
     * @returns 
     */
    async addUser(user: User): Promise<User> {
        let existingUser = await this.getUserByUserId(user.userId)
        if(existingUser == null) {
            return this.userRepository.save(user)
        }
        copyMatchingKeyValues(user, existingUser);
        (existingUser as any).save()
    }

    getUserById(id: string): Promise<User> {
        return this.userRepository.findById(id)
    }

    getUserByUserId(userId: string): Promise<User> {
        return this.userRepository.findOne({userId: userId})
    }

    getAnonymousUser(): Promise<User> {
        return this.userRepository.findOne({userId: "anonymous"});
    }

    getAdminUser(): Promise<User> {
        return this.userRepository.findOne({userId: "admin"});
    }
}

export default new UserService()
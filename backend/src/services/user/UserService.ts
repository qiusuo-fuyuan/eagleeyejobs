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
        if (existingUser == null) {
            return this.userRepository.save(user)
        }
        copyMatchingKeyValues(user, existingUser);
        (existingUser as any).save()
        return existingUser;
    }

    async registerUser(user: User): Promise<User> {
        let existUser = await this.getUserByEmail(user.email)
        if (existUser == null) {
            return this.userRepository.save(user)
        }
        if (!user.userId) {
            user.userId = user.email;
        }
        copyMatchingKeyValues(user, existUser);
        (existUser as any).save()
        return existUser;
    }

    getUserById(id: string): Promise<User> {
        return this.userRepository.findById(id)
    }

    getUserByUserId(userId: string): Promise<User> {
        return this.userRepository.findOne({ userId: userId })
    }

    getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email })
    }

    getAnonymousUser(): Promise<User> {
        return this.userRepository.findOne({ userId: "anonymous" });
    }

    getAdminUser(): Promise<User> {
        return this.userRepository.findOne({ userId: "admin" });
    }

    async getAllUser(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}

export default new UserService()
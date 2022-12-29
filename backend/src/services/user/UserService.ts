import { User } from "../../models/User.js"
import userRepository, { UserRepository } from "../../repositories/UserRepository.js"

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = userRepository
    }

    async addUser(user: User): Promise<User> {
        return this.userRepository.save(user)
    }

    async getUserById(userId: string): Promise<User> {
        return this.userRepository.findById(userId)
    }

    async getAnonymousUser(): Promise<User> {
        return this.userRepository.findOne({name: "Anonymous"});
    }

    async getAdminUser(): Promise<User> {
        return this.userRepository.findOne({name: "Admin"});
    }
}

export default new UserService()
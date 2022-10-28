import { User } from "../../models/User.js"
import { UserRepository } from "../../repositories/UserRepository.js"

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async addUser(user: User): Promise<User> {
        return this.userRepository.createUser(user)
    }

    async queryUserDetail(userId: string): Promise<User> {
        return this.userRepository.findUserById(userId)
    }
}
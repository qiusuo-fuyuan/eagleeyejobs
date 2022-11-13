import userRepository, { UserRepository } from '../../repositories/UserRepository.js';
import * as JwtUtil from '../../utils/jwt/JwtUtil.js';

class JwtTokenValidator {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = userRepository
    }
    
    async isTokenValid(jwtToken: string ): Promise<boolean> {
        const userId = JwtUtil.decodeJwtToken(jwtToken)
        const existingUserInDB = await userRepository.findById(userId)
        return existingUserInDB != null
    }
}

export default new JwtTokenValidator()
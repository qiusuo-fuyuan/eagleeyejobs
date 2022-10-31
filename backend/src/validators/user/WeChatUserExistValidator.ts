import userRepository, { UserRepository } from "../repositories/UserRepository";
import { UserExistValidator } from "./UserExistValidator.js";


class WeChatUserExistValidator implements UserExistValidator {
    private userRepository: UserRepository

    async doesUserExist(id: string): Promise<boolean> {
        const wechatUser = await userRepository.findOne({openid: id})
        return wechatUser != null
    }
    
}
import { Request } from "express";
import crypto from 'crypto';
import { WeChatUserInfo } from "../../../core/thirdparty/wechat/DataTypes.js";
import wechatGateway, { WeChatAPIGateway } from "../../../core/thirdparty/wechat/WeChatAPIGateway.js";
import { User, UserType } from "../../../models/User.js";
import userRepository, {UserRepository} from "../../../repositories/UserRepository.js";
import { ThirdPartyUserLoginStrategy } from "./ThirdPartyUserLoginStrategy.js";


export class WeChatUserLoginStrategy implements ThirdPartyUserLoginStrategy {
    private userRepository: UserRepository
    private wechatGateway: WeChatAPIGateway

    constructor() {
        this.userRepository = userRepository
        this.wechatGateway = wechatGateway
    }

    
    getLoginUrl(): string {
        const sessionState = crypto.randomUUID()
        return this.wechatGateway.getOpenConnectUrl(sessionState)
    }


    async authorizeUser(authorizationCode: string, state: string): Promise<User> {
        const accessTokenResponse = await this.wechatGateway.requestAccessToken(authorizationCode, state)

        const wechatUserInfo = await this.wechatGateway.requestUserInfo(accessTokenResponse.access_token, accessTokenResponse.openid)

        return this.getOrCreateWeChatUser(wechatUserInfo);
    }


    private async getOrCreateWeChatUser(wechatUserInfo: WeChatUserInfo): Promise<User> {
        let wechatUserInDB = await this.userRepository.findOne({openid: wechatUserInfo.openid})
        if (wechatUserInDB == null) {
            const newWeChatUser = new User()
            newWeChatUser.platform = "wechat"
            newWeChatUser.userId = wechatUserInfo.openid
            newWeChatUser.openid = wechatUserInfo.openid
            newWeChatUser.gender = wechatUserInfo.sex
            newWeChatUser.role = UserType.NORMAL_USER
            newWeChatUser.nickName = wechatUserInfo.nickname
            wechatUserInDB = await this.userRepository.save(newWeChatUser)
        }
        return wechatUserInDB
    }
}

export default new WeChatUserLoginStrategy()
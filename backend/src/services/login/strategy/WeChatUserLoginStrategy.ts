import { Request } from "express";
import crypto from 'crypto';
import { WeChatAuthorizationSessionData, WeChatUserInfo } from "../../../core/thirdparty/wechat/DataTypes.js";
import wechatGateway, { WeChatAPIGateway } from "../../../core/thirdparty/wechat/WeChatAPIGateway.js";
import { User } from "../../../models/User.js";
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


    async authorizeUser(req: Request): Promise<User> {
        const authorizationCode = req.query.code as string
        const state = req.query.state as string

        const accessTokenResponse = await this.wechatGateway.requestAccessToken(authorizationCode, state)

        const wechatUserInfo = await this.wechatGateway.requestUserInfo(accessTokenResponse.access_token, accessTokenResponse.openid)

        return this.getOrCreateWeChatUser(wechatUserInfo);
    }


    private async getOrCreateWeChatUser(wechatUserInfo: WeChatUserInfo): Promise<User> {
        const wechatUserInDB = await userRepository.findOne({openid: wechatUserInfo.openid})
        if (wechatUserInDB == null) {
            const newWeChatUser = new User()
            newWeChatUser.platform = "wechat"
            newWeChatUser.openid = wechatUserInfo.openid
            newWeChatUser.gender = wechatUserInfo.sex.toString()
            newWeChatUser.nickName = wechatUserInfo.nickname
            userRepository.save(newWeChatUser)
        }
        return wechatUserInDB
    }
}

export default new WeChatUserLoginStrategy()
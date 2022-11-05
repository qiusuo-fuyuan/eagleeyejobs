import { WeChatAuthorizationSessionData, WeChatUserInfo } from "./DataTypes.js"
import { WeChatAPIGateway } from "./WeChatAPIGateway.js"
import userRepository, { UserRepository }  from "../../../repositories/UserRepository.js";
import { ThirdPartyApiProvider } from "../ThirdPartyApiProvider.js";


class WeChatApiProvider implements ThirdPartyApiProvider {
    private wechatGateway: WeChatAPIGateway

    constructor() {
        this.wechatGateway = new WeChatAPIGateway()
    }


    getLoginUrl(): string {
        return this.wechatGateway.getOpenConnectUrl()
    }

    async getUserInfo(authorizationCode: string): Promise<WeChatUserInfo> {
        await this.wechatGateway.requestAccessToken(authorizationCode)
        return this.wechatGateway.requestUserInfo()
    }
}

export default new WeChatApiProvider()
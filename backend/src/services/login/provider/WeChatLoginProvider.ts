import { WeChatAuthorizationSessionData } from "../../../core/thirdparty/wechat/DataTypes.js";
import { WeChatAPIGateway } from "../../../core/thirdparty/wechat/WeChatAPIGateway.js";
import { UserService } from "../../user/UserService.js";


class WeChatLoginProvider implements OAuth2LoginProvider {
    private authorizationState: WeChatAuthorizationSessionData
    private userService: UserService
    private wechatGateway: WeChatAPIGateway

    constructor() {
        this.userService = new UserService()
        this.wechatGateway = new WeChatAPIGateway()
    }


    getLoginUrl(): string {
        return this.wechatGateway.getOpenConnectUrl()
    }

    async loginByAuthorizationCode(authorizationCode: string): Promise<string> {
        await this.wechatGateway.requestAccessToken(authorizationCode)
        const wechatUserInfo = await this.wechatGateway.requestUserInfo()


        this.userService
    }
}

export default new WeChatLoginProvider()
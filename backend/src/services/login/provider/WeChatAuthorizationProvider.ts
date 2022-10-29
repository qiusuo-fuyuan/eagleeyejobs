import { WeChatAuthorizationSessionData } from "../../../core/thirdparty/wechat/DataTypes.js";
import { WeChatAPIGateway } from "../../../core/thirdparty/wechat/WeChatAPIGateway.js";
import { UserService } from "../../user/UserService.js";


export class WeChatAuthorizationProvider implements OAuth2AuthorizationProvider {
    private authorizationState: WeChatAuthorizationSessionData
    private userService: UserService
    private wechatGateway: WeChatAPIGateway

    constructor() {
        this.userService = new UserService()
        this.wechatGateway = new WeChatAPIGateway()
    }

    async acceptAuthorizationCode(authorizationCode: string): string {
        await this.wechatGateway.requestAccessToken(authorizationCode)
        const wechatUserInfoResponse = await this.wechatGateway.requestUserInfo()

        this.userService.
    }


}
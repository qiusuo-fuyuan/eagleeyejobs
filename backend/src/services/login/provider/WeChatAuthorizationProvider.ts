import { WeChatAPIGateway } from "../../../core/thirdparty/wechat/WeChatAPIGateway.js";
import { UserService } from "../../user/UserService.js";


export class WeChatAuthorizationProvider implements OAuth2AuthorizationProvider {
    private userService: UserService
    private wechatGateway: WeChatAPIGateway

    constructor() {
        this.userService = new UserService()
        this.wechatGateway = new WeChatAPIGateway()
    }

    async acceptAuthorizationCode(authorizationCode: string): string {
        await this.wechatGateway.requestAccessToken(authorizationCode)
        await this.wechatGateway.requestUserInfo()
    }
}
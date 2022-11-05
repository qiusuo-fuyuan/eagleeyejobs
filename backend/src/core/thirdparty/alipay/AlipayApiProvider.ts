import { User } from "../../../models/User";
import { ThirdPartyApiProvider } from "../provider/ThirdPartyApiProvider";
import { WeChatUserInfo } from "../wechat/DataTypes";

class AlipayApiProvider implements ThirdPartyApiProvider{
    getLoginUrl(): string {
        throw new Error("Method not implemented.");
    }
    
    getUserInfo(authorizationCode: string): Promise<WeChatUserInfo> | Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default new AlipayApiProvider() 
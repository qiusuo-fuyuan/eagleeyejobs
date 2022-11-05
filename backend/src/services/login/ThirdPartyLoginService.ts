import thirdPartyApiProviderFactory, { PROVIDER_TYPE_STRINGS } from '../../core/thirdparty/ThirdPartyApiProviderFactory.js'
import { User } from '../../models/User.js'
import userRepository, { UserRepository } from '../../repositories/UserRepository.js'

class ThirdPartyLoginService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = userRepository
    }

    public getLoginUrl(providerType: PROVIDER_TYPE_STRINGS): string {
        return thirdPartyApiProviderFactory.getProvider(providerType).getLoginUrl()
    }

    public async loginUserByAuthorizationCode(providerType: PROVIDER_TYPE_STRINGS, authorizationCode: string): Promise<String> {
        const wechatUserInfo = await thirdPartyApiProviderFactory.getProvider(providerType).getUserInfo(authorizationCode)
        const wechatUserInDB = await userRepository.findOne({openid: wechatUserInfo.openid})
        if (wechatUserInDB) {

        } else {
            const user = new User()
            user.platform = "wechat"
            user.openid = wechatUserInfo.openid
            user.gender = wechatUserInfo.sex.toString()
            user.nickName = wechatUserInfo.nickname
        }
    }
}

export default  new ThirdPartyLoginService()
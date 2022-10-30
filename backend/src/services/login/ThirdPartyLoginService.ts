import authorizationProviderFactory, { PROVIDER_TYPE_STRINGS } from '../../services/login/provider/LoginProviderFactory.js'


class ThirdPartyLoginService {

    public getLoginUrl(providerType: PROVIDER_TYPE_STRINGS): string {
        return authorizationProviderFactory.getProvider(providerType).getLoginUrl()
    }

    public loginUserByAuthorizationCode(providerType: PROVIDER_TYPE_STRINGS, authorizationCode: string): Promise<String> {
        return authorizationProviderFactory.getProvider(providerType).loginByAuthorizationCode(authorizationCode)

    }
}

export default  new ThirdPartyLoginService()
import alipayLoginProvider from "./AlipayLoginProvider.js"
import weChatLoginProvider from "./WeChatLoginProvider.js"

export enum PROVIDER_TYPE {
    WECHAT = "wechat",
    ALIPAY = "alipay"
}

export type PROVIDER_TYPE_STRINGS = keyof typeof PROVIDER_TYPE

class LoginProviderFactory {
    private loginProviders: { [providerType: string]: OAuth2LoginProvider}

    constructor() {    
        this.loginProviders = {}
        this.loginProviders[PROVIDER_TYPE.ALIPAY] = alipayLoginProvider
        this.loginProviders[PROVIDER_TYPE.WECHAT] = weChatLoginProvider
    }

    public getProvider(providerType: PROVIDER_TYPE_STRINGS) {
        return this.loginProviders[providerType]
    }
}

export default new LoginProviderFactory()
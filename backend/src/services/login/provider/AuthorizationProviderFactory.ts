import { AlipayAuthorizationProvider } from "./AlipayAuthorizationProvider.js"
import { WeChatAuthorizationProvider } from "./WeChatAuthorizationProvider.js"

export enum PROVIDER_TYPE {
    WECHAT = "wechat",
    ALIPAY = "alipay"
}

export class AuthorizationProviderFactory {
    authorizationProviders: { [providerType: string]: OAuth2AuthorizationProvider}

    constructor() {    
        this.authorizationProviders = {}
        this.authorizationProviders[PROVIDER_TYPE.ALIPAY] = new AlipayAuthorizationProvider()
        this.authorizationProviders[PROVIDER_TYPE.WECHAT] = new WeChatAuthorizationProvider()
    }

    getProvider(providerType: PROVIDER_TYPE) {
        return this.authorizationProviders[providerType]
    }
}
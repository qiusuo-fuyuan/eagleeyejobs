import alipayApiProvider from "./alipay/AlipayApiProvider.js"
import { ThirdPartyApiProvider } from "./ThirdPartyApiProvider.js"
import weChatApiProvider from "./wechat/WeChatLoginProvider.js"

export enum PROVIDER_TYPE {
    WECHAT = "wechat",
    ALIPAY = "alipay"
}

export type PROVIDER_TYPE_STRINGS = keyof typeof PROVIDER_TYPE

class ThirdPartyApiProviderFactory {
    private apiProviders: { [providerType: string]: ThirdPartyApiProvider}

    constructor() {    
        this.apiProviders = {}
        this.apiProviders[PROVIDER_TYPE.ALIPAY] = alipayApiProvider
        this.apiProviders[PROVIDER_TYPE.WECHAT] = weChatApiProvider
    }

    public getProvider(providerType: PROVIDER_TYPE_STRINGS) {
        return this.apiProviders[providerType]
    }
}

export default new ThirdPartyApiProviderFactory()
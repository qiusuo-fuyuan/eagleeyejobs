import { ThirdPartyUserLoginStrategy } from "./ThirdPartyUserLoginStrategy.js"
import weChatUserLoginStrategy, {WeChatUserLoginStrategy} from "./WeChatUserLoginStrategy.js"
import alipayUserLoginStrategy, {AlipayUserLoginStrategy} from "./AlipayUserLoginStrategy.js"



enum LONG_PROVIDER_TYPE {
    WECHAT = "wechat",
    ALIPAY = "alipay"
}

export type PROVIDER_TYPE_STRINGS = keyof typeof LONG_PROVIDER_TYPE


export class ThirdPartyUserLoginStrategyFactory {
    private userLoginStrategies: { [providerType: string]: ThirdPartyUserLoginStrategy}

    constructor() {    
        this.userLoginStrategies = {}
        this.userLoginStrategies[LONG_PROVIDER_TYPE.ALIPAY] = alipayUserLoginStrategy
        this.userLoginStrategies[LONG_PROVIDER_TYPE.WECHAT] = weChatUserLoginStrategy
    }

    public getLoginStrategy(providerType: string) {
        return this.userLoginStrategies[providerType]
    }
}

export default new ThirdPartyUserLoginStrategyFactory()
import { ThirdPartyUserLoginStrategy } from "./ThirdPartyUserLoginStrategy.js"
import weChatUserLoginStrategy, {WeChatUserLoginStrategy} from "./WeChatUserLoginStrategy.js"
import alipayUserLoginStrategy, {AlipayUserLoginStrategy} from "./AlipayUserLoginStrategy.js"



enum PROVIDER_TYPE {
    WECHAT = "wechat",
    ALIPAY = "alipay"
}

export type PROVIDER_TYPE_STRINGS = keyof typeof PROVIDER_TYPE


export class ThirdPartyUserLoginStrategyFactory {
    private userLoginStrategies: { [providerType: string]: ThirdPartyUserLoginStrategy}

    constructor() {    
        this.userLoginStrategies = {}
        this.userLoginStrategies[PROVIDER_TYPE.ALIPAY] = alipayUserLoginStrategy
        this.userLoginStrategies[PROVIDER_TYPE.WECHAT] = weChatUserLoginStrategy
    }

    public getLoginStrategy(providerType: string) {
        return this.userLoginStrategies[providerType]
    }
}

export default new ThirdPartyUserLoginStrategyFactory()
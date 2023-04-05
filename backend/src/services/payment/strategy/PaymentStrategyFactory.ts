import alipayPaymentStrategy, { AlipayPaymentStrategy } from './AlipayPaymentStrategy.js';

import { ThirdPartyPaymentStrategy } from './ThirdPartyPaymentStrategy.js';

import wechatPaymentStrategy, { WechatPaymentStrategy } from './WechatPaymentStrategy.js';

enum PAYMENT_PROVIDER_TYPE {
    WECHAT = 'wechat',
    ALIPAY = 'alipay',
}

export type PAYMENT_PROVIDER_TYPE_STRINGS = keyof typeof PAYMENT_PROVIDER_TYPE;

export class PaymentStrategyFactory {
    private paymentStrategies: { [providerType: string]: ThirdPartyPaymentStrategy };

    constructor() {
        this.paymentStrategies = {};
        this.paymentStrategies[PAYMENT_PROVIDER_TYPE.ALIPAY] = alipayPaymentStrategy;
        this.paymentStrategies[PAYMENT_PROVIDER_TYPE.WECHAT] = wechatPaymentStrategy;
    }

    public getPaymentStrategy(providerType: string): ThirdPartyPaymentStrategy {
        return this.paymentStrategies[providerType];
    }
}

export default new PaymentStrategyFactory();

import alipayPaymentStrategy, { AlipayPaymentStrategy } from './AlipayPaymentStrategy';

import { PaymentStrategy } from './PaymentStrategy';

import wechatPaymentStrategy, { WechatPaymentStrategy } from './WechatPaymentStrategy';

enum PAYMENT_PROVIDER_TYPE {
    WECHAT = 'wechat',
    ALIPAY = 'alipay',
}

export type PAYMENT_PROVIDER_TYPE_STRINGS = keyof typeof PAYMENT_PROVIDER_TYPE;

export class PaymentStrategyFactory {
    private paymentStrategies: { [providerType: string]: PaymentStrategy };

    constructor() {
        this.paymentStrategies = {};
        this.paymentStrategies[PAYMENT_PROVIDER_TYPE.ALIPAY] = alipayPaymentStrategy;
        this.paymentStrategies[PAYMENT_PROVIDER_TYPE.WECHAT] = wechatPaymentStrategy;
    }

    public getPaymentStrategy(providerType: PAYMENT_PROVIDER_TYPE_STRINGS): PaymentStrategy {
        return this.paymentStrategies[providerType];
    }
}

export default new PaymentStrategyFactory();

import { ThirdPaymentStrategy } from './ThirdPartyPaymentStrategy';

export class ThirdPartyPaymentStrategyFactory {
  private readonly paymentStrategies: Map<string, ThirdPaymentStrategy>;

  constructor(paymentStrategies: Map<string, ThirdPaymentStrategy>) {
    this.paymentStrategies = paymentStrategies;
  }

  public getStrategy(providerType: string): ThirdPaymentStrategy {
    const strategy = this.paymentStrategies.get(providerType);
    if (!strategy) {
      throw new Error(`Payment provider '${providerType}' not supported.`);
    }
    return strategy;
  }
}

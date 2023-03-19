export type AlipayTradePrecreateRequest = {
    app_id: string;
    method: 'alipay.trade.precreate';
    charset: 'utf-8';
    sign_type: 'RSA2';
    timestamp: string;
    version: '1.0';
    notify_url: string;
    biz_content: {
      subject: string;
      out_trade_no: string;
      total_amount: string;
    };
};

  
export type AlipayTradePrecreateResponse = {
    alipay_trade_precreate_response: {
      code: string;
      msg: string;
      out_trade_no: string;
      qr_code: string;
    };
    sign: string;
};
  
  
class PaymentTransaction {
    public readonly id: string;
    public readonly userId: string;
    public readonly amount: number;
    public status: PaymentStatus;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
  
    constructor(id: string, userId: string, amount: number, status: PaymentStatus, createdAt: Date, updatedAt: Date) {
      this.id = id;
      this.userId = userId;
      this.amount = amount;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  enum PaymentStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILURE = 'failure',
  }
  
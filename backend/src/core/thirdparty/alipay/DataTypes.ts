export type AlipayTradePrecreateRequest = {
    notify_url: string;
    bizContent: {
      subject: string;
      out_trade_no: string;
      total_amount: string;
    };
};

export type AlipayTradeQueryRequest = {
  bizContent: {
    out_trade_no: string;
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

export enum AlipayTradeStatus {
  WAIT_BUYER_PAY = "WAIT_BUYER_PAY",
  TRADE_CLOSED = "TRADE_CLOSED",
  TRADE_SUCCESS = "TRADE_SUCCESS",
  TRADE_FINISHED = "TRADE_FINISHED",
}

export type AlipayTradeQueryResponse = {
  code: string;
  msg: string;
  sub_code?: string;
  sub_msg?: string;
  sign: string;
  out_trade_no: string;
  trade_no: string;
  trade_status: string;
  trans_currency?: string;
  settle_currency?: string;
  settle_amount?: number;
  pay_currency?: string;
  pay_amount?: number;
  settle_trans_rate?: string;
  trans_pay_rate?: string;
  buyer_logon_id: string;
  buyer_user_id: string;
  total_amount: number;
  terminal_id?: string;
  store_name?: string;
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
  
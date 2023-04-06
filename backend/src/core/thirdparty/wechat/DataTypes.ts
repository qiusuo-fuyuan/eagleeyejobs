export type WechatServerResponse = {
    access_token: string 
    expires_in: number 
    refresh_token: string
    openid: string 
    scope: string
    unionid: string
}

export type WeChatURLParams = {
    appId?: string
    secret?: string
    code?: string
    scope?: string
    state?: string
    response_type?: string
    redirect_url?: string
    grant_type?: string
    access_token?: string
    refresh_token?: string
    openid?: string
    lang?: string
}

export type WeChatUserInfo = {
    openid: string
    nickname: string
    sex: number
    province: string
    city: string
    headimgurl: string
    priviledge: string[]
    unionid: string
    errcode: string
    errmsg: string
}

export type WeChatAuthorizationSessionData = {
    state?: string
    accessToken?: string
    refreshToken?: string
    openId?: string
}

export type TRADE_TYPE = 'JSAPI' | 'NATIVE' | 'APP';
export type FEE_TYPE = 'CNY' | 'EUR'

export type WeChatUnifiedOrderRequest = {
    appid: string;
    mch_id: string;
    body: string;
    nonce_str: string;
    notify_url: string;
    out_trade_no: string;
    sub_mch_id: string
    total_fee: number;
    trade_type: TRADE_TYPE
    fee_type: FEE_TYPE;
    sign?: string;
}

export type WeChatUnifiedOrderResponse = {
    return_code: string;
    return_msg: string;
    result_code?: string;
    mch_id?: string;
    appid?: string;
    sub_mch_id?: string;
    device_info?: string;
    nonce_str?: string;
    sign?: string;
    prepay_id?: string;
    trade_type?: TRADE_TYPE;
    code_url?: string;
};

export type WeChatQueryOrderRequest = {
    appid: string;
    mch_id: string;
    nonce_str: string;
    out_trade_no: string;
    sign?: string;
    sub_mch_id?: string;
};

export type WeChatQueryOrderResponse = {
    return_code: string;
    return_msg: string;
    result_code: string;
    mch_id: string;
    appid: string;
    sub_mch_id: string;
    nonce_str: string;
    sign: string;
    openid: string;
    is_subscribe: string;
    trade_type: string;
    bank_type: string;
    fee_type: string;
    total_fee: number;
    cash_fee_type: string;
    cash_fee: number;
    transaction_id: string;
    out_trade_no: string;
    attach: string;
    time_end: string;
    rate: string;
  };
  
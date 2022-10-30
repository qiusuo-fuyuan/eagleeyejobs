
interface OAuth2LoginProvider {
    
    /**
     * get the login url for third party. 
     * 
     * For wechat, the login url is the link 
     * https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect
     * 
     * 
     * 
     * For alipay, its possibly another link
     */
    getLoginUrl(): string

    /**
     * Login the user by the authorizationCode. The steps involved are
     * 
     * 1. use authorizationCode to get access_token
     * 2. use the access_token to get the UserInfo from the third pary
     *      if the user already exist DB, then generate JWT token for the user, then return
     *      if the user does not exist, then persist the user information in DB. Create JWT token for user, return
     */
    loginByAuthorizationCode(authorizationCode: string): Promise<String>
}
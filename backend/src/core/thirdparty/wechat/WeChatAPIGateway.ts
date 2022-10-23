/**
 * WeChat API Gateway contains all the APIs we will use for calling wechat API
 */


const REQUEST_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
const REQUEST_REFRESH_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN";
const CHECK_ACCESS_TOKEN_VALIDITY = "/sns/auth";
const REQUEST_USER_INFO_URL = "/sns/userinfo";
class WeChatAPIGateway {

    /**
     * send request access token
     */
     requestAccessToken() {
    }


    /**
     * send refresh access token request
     */
    refreshAccessToken() {

    }

    /**
     * request the user info
     */
    requestUserInfo() {

    }


    requestPayment() {
        
    }
}
import express from "express";
import { WechatServerResponse, WeChatUserInfo } from "../core/thirdparty/wechat/DataTypes.js";
import { CHECK_ACCESS_TOKEN_VALIDITY_PATH, REQUEST_ACCESS_TOKEN_PATH, REQUEST_REFRESH_TOKEN_PATH, REQUEST_USER_INFO_PATH } from "../core/thirdparty/wechat/WeChatConstants.js";

const accessToken: WechatServerResponse = { 
    access_token:"234ljdflöajflödsafd", 
    expires_in:7200, 
    refresh_token:"dalfjdslaöjfdlösajfdsa",
    openid:"OPENID", 
    scope:"SCOPE",
    unionid: "o6_bmasdasdsad6_2sgVt7hMZOPfL"
}

const refreshToken:WechatServerResponse = {
    access_token:"234ljdflöajflödsafd", 
    expires_in:7200, 
    refresh_token:"dalfjdslaöjfdlösajfdsa",
    openid:"OPENID", 
    scope:"SCOPE",
    unionid: "o6_bmasdasdsad6_2sgVt7hMZOPfL"
}


const wechatUserInfo: WeChatUserInfo = {
  openid: "sfdlajfdasfd",
  nickname: "yu",
  sex: 1,
  province: "sichuan",
  city: "chengdu",
  headimgurl: "url",
  priviledge: [],
  unionid: "dfadafda",
  errcode: "dfadsdf",
  errmsg: null
}

const weChatMockServerRouter = express.Router();

weChatMockServerRouter.use(REQUEST_ACCESS_TOKEN_PATH, function (req, res) {
    const appId = req.query.appid;
    const appSecret = req.query.secret; 
    const authorizationCode = req.query.code
    const grant_type = req.query.authorization_code
  res.json(accessToken)
});

weChatMockServerRouter.use(REQUEST_REFRESH_TOKEN_PATH, function (req, res) {
    res.json(refreshToken)
});

weChatMockServerRouter.use(CHECK_ACCESS_TOKEN_VALIDITY_PATH, function (req, res) {
  res.json(refreshToken)
});

weChatMockServerRouter.use(REQUEST_USER_INFO_PATH, function (req, res) {
  res.json(refreshToken)
});

export default weChatMockServerRouter



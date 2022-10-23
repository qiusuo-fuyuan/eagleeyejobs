  // apply wechat router

import express from "express";
import { WechatServerResponse } from "../core/thirdparty/wechat/DataTypes.js";
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


export const getWechatRouter = () => {
    const wechatRouter = express.Router();
    wechatRouter.use(REQUEST_ACCESS_TOKEN_PATH, function (req, res) {
        const appId = req.query.appid;
        const appSecret = req.query.secret; 
        const authorizationCode = req.query.code
        const grant_type = req.query.authorization_code
      res.json(accessToken)
    });

    wechatRouter.use(REQUEST_REFRESH_TOKEN_PATH, function (req, res) {
        res.json(refreshToken)
      });

    wechatRouter.use(CHECK_ACCESS_TOKEN_VALIDITY_PATH, function (req, res) {
    res.json(refreshToken)
    });

    wechatRouter.use(REQUEST_USER_INFO_PATH, function (req, res) {
    res.json(refreshToken)
    });
}





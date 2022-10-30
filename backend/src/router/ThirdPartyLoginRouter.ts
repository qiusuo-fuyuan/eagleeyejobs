import express, { Request, Response } from "express";
import { PROVIDER_TYPE_STRINGS } from "../services/login/provider/LoginProviderFactory";
import thirdPartyLoginService from "../services/login/ThirdPartyLoginService";

const thirdPartyLoginRouter = express.Router();

thirdPartyLoginRouter.use("requestLoginUrl", function (req: Request, res: Response) {
      const providerType = (req.query.provider as string).toUpperCase() as PROVIDER_TYPE_STRINGS
      res.send(thirdPartyLoginService.getLoginUrl(providerType))
});

thirdPartyLoginRouter.use("authorizationCallback", function (req: Request, res: Response) {
    const providerType = (req.query.provider as string).toUpperCase() as PROVIDER_TYPE_STRINGS
    const authorizationCode = req.query.code as string
    
    res.send(thirdPartyLoginService.loginUserByAuthorizationCode(providerType, authorizationCode))
})

export default thirdPartyLoginRouter
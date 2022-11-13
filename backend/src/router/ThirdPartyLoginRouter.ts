import express, { Request, Response } from "express";
import { PROVIDER_TYPE_STRINGS } from "../services/login/strategy/ThirdPartyUserLoginStrategyFactory.js";
import thirdPartyLoginService from "../services/login/ThirdPartyLoginService.js";

export const thirdPartyLoginRouter = express.Router();

thirdPartyLoginRouter.use("/:provider/requestLoginUrl", function (req: Request, res: Response) {
      const providerType = req.params.provider as string
      res.send(thirdPartyLoginService.getLoginUrl(providerType))
});

thirdPartyLoginRouter.use("/:provider/authorizationCallback", function (req: Request, res: Response) {
    const providerType = req.params.provider as string
    
    res.send(thirdPartyLoginService.loginUserByAuthorizationCode(providerType, req))
})


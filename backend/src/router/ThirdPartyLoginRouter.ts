import express, { Request, Response } from "express";
import { PROVIDER_TYPE_STRINGS } from "../core/thirdparty/ThirdPartyApiProviderFactory.js";
import thirdPartyLoginService from "../services/login/ThirdPartyLoginService.js";

const thirdPartyLoginRouter = express.Router();

thirdPartyLoginRouter.use("/:provider/requestLoginUrl", function (req: Request, res: Response) {
      const providerType = (req.params.provider as string).toUpperCase() as PROVIDER_TYPE_STRINGS
      res.send(thirdPartyLoginService.getLoginUrl(providerType))
});

thirdPartyLoginRouter.use("/:provider/authorizationCallback", function (req: Request, res: Response) {
    const providerType = (req.params.provider as string).toUpperCase() as PROVIDER_TYPE_STRINGS
    
    res.send(thirdPartyLoginService.loginUserByAuthorizationCode(providerType, req))
})

export default thirdPartyLoginRouter
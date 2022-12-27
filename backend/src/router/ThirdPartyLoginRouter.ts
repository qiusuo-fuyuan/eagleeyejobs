import express, { Request, Response } from "express";
import thirdPartyLoginService from "../services/login/ThirdPartyLoginService.js";

export const thirdPartyLoginRouter = express.Router();

thirdPartyLoginRouter.use("/:provider/requestLoginUrl", function (req: Request, res: Response) {
      const providerType = req.params.provider as string
      res.send(thirdPartyLoginService.getLoginUrl(providerType))
});

thirdPartyLoginRouter.use("/:provider/authorizationCallback",async function (req: Request, res: Response) {
    const providerType = req.params.provider as string
    const jwtToken =  await thirdPartyLoginService.loginUserByAuthorizationCode(providerType, req)
    res.send(jwtToken)
})

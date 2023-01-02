import express, { Request, Response } from "express";
import thirdPartyLoginService from "../services/login/ThirdPartyLoginService.js";

export const thirdPartyLoginRouter = express.Router();

thirdPartyLoginRouter.use("/:provider/requestLoginUrl", function (req: Request, res: Response) {
      const providerType = req.params.provider as string
      res.send(thirdPartyLoginService.getLoginUrl(providerType))
});

/**
 * we need to redirect the user to home page. Add the authorization header. We have to configure the frontend url in config file.
 * With this approach, the frontend does not have to see 
 */
thirdPartyLoginRouter.use("/:provider/authorizationCallback",async function (req: Request, res: Response) {
    const providerType = req.params.provider as string
    const jwtToken =  await thirdPartyLoginService.loginUserByAuthorizationCode(providerType, req)
    await sleep(10000)
    res.header('Authorization', 'Bearer '+ jwtToken)
    res.redirect('http://localhost:4173');
})

function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}


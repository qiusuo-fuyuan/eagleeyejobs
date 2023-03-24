import { Request, Response } from "express";
import  {JsonWebTokenError, JwtPayload, TokenExpiredError }  from "jsonwebtoken";
import { User } from "../models/User.js";
import { HttpHeaderInvalid, JwtTokenInvalid } from "../services/exceptions/Exceptions.js";
import jwtTokenService from "../services/jwt/JwtTokenService.js";
import userService from "../services/user/UserService.js";
import logger from "../utils/Logger.js";
import { isIntrospectionQuery } from "../utils/Utils.js";

export async function getAuthenticatedUserFromToken(req: Request, res: Response) {
    /*introspection query is only used during development. For PROD, introspection is turned off. This if is used to 
      make local development easier
    */
    if(isIntrospectionQuery(req)) {
      return await userService.getAnonymousUser()
    }
    
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
        // Split the header into an array containing the type and the token
        const parts = authorizationHeader.split(' ');
        const type = parts[0];
        const jwtToken = parts[1];    
        if (type === 'Bearer') {
          /**
           * there are multiple exceptions that could be thrown from getUserFromJwtAccessToken
           */
         return await jwtTokenService.getUserFromJwtAccessToken(jwtToken)
        } 
        else {
          throw new HttpHeaderInvalid("Authorization header does not start with Bearer")
        }
    } 
    else {
        return await userService.getAnonymousUser()
    }
}
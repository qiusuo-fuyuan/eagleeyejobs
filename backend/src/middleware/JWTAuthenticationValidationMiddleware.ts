import { Request, Response } from "express";
import  JsonWebTokenError, { JwtPayload }  from "jsonwebtoken";
import userService, { UserService } from "../services/user/UserService.js";
import { BackendError, ErrorCodeEnum } from "../utils/error/ErrorCode.js";
import * as JwtUtil from "../utils/jwt/JwtUtil.js";
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
           * there are multiple exceptions this verify function might throw. Please refer to this file
           * /node_modules/jsonwebtoken/verify.js
           */
          let jwtPayload: JwtPayload =  JwtUtil.verifyJwtToken(jwtToken) as JwtPayload
          
          if(jwtPayload['userId'] ) {
            return  await userService.getUserById(jwtPayload['userId']);   
          } 
          else {
            return Promise.reject(new BackendError(ErrorCodeEnum.JWT_TOKEN_INVALID, "invalid jwt token"))
          }
        } 
        else {
            return Promise.reject(new BackendError(ErrorCodeEnum.JWT_TOKEN_INVALID, "invalid jwt token"))
        }
    } 
    else {
        return await userService.getAnonymousUser()
    }
}
import { Request, Response } from "express";
import  JsonWebTokenError, { JwtPayload }  from "jsonwebtoken";
import userService, { UserService } from "../services/user/UserService.js";
import { BackendError, ErrorCodeEnum } from "../utils/error/ErrorCode.js";
import * as JwtUtil from "../utils/jwt/JwtUtil.js";
import { isIntrospectionQuery } from "../utils/Utils.js";

//https://github.com/apollographql/apollo-server/issues/3600
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
        let userId;
    
        if (type === 'Bearer') {
          // If the type is "Bearer", extract the token
          let jwtPayload: JwtPayload | string =  JwtUtil.verifyJwtToken(jwtToken)
          
          if(userId === undefined) {
            return Promise.reject(new BackendError(ErrorCodeEnum.JWT_TOKEN_INVALID, "invalid jwt token"))
          }
          return  await userService.getUserById(userId);   
        } else {
            return Promise.reject(new BackendError(ErrorCodeEnum.JWT_TOKEN_INVALID, "invalid jwt token"))
        }
    } else {
        return await userService.getAnonymousUser()
    }
}
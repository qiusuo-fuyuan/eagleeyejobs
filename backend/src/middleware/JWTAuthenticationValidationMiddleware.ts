import { Request, Response } from "express";
import  JsonWebTokenError, { JwtPayload }  from "jsonwebtoken";
import { User } from "../models/User.js";
import { HttpHeaderInvalid, JwtTokenInvalid } from "../services/exceptions/Exceptions.js";
import userService from "../services/user/UserService.js";
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
           * ToDo: There are multiple exceptions this verify function might throw. Please refer to this file
           * /node_modules/jsonwebtoken/verify.js later to fix all the exceptions
           */
          try {
              let { userId } =  JwtUtil.verifyJwtToken(jwtToken) as JwtPayload
              let user: User =  await userService.getUserByUserId(userId);  
              return user; 
          }
          catch(error) {
            throw new JwtTokenInvalid("jwt token invalid")
          }
        } 
        else {
          throw new HttpHeaderInvalid("Authorization header does not start with Bearer")
        }
    } 
    else {
        return await userService.getAnonymousUser()
    }
}
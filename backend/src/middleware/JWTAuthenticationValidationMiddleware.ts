import { Request, Response } from "express";
import userService, { UserService } from "../services/user/UserService.js";
import { BackendError, ErrorCodeEnum } from "../utils/error/ErrorCode.js";
import * as JwtUtil from "../utils/jwt/JwtUtil.js";

export async function getAuthenticatedUserFromToken(req: Request, res: Response) {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
        // Split the header into an array containing the type and the token
        const parts = authorizationHeader.split(' ');
        const type = parts[0];
        const jwtToken = parts[1];
    
        if (type === 'Bearer') {
          // If the type is "Bearer", extract the token
          JwtUtil.verifyJwtToken(jwtToken)
          const userId = JwtUtil.decodeJwtToken(jwtToken)

          if(userId === undefined) {
              throw new BackendError(ErrorCodeEnum.JWT_TOKEN_INVALID, "invalid jwt token")
          }
          return  await userService.getUserById(userId);   
        } else {
            throw new BackendError(ErrorCodeEnum.JWT_TOKEN_INVALID, "invalid token type")
        }
    } else {
        return await userService.getAnonymousUser()
    }
}
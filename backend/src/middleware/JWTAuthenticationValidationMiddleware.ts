import { NextFunction, Request, Response } from "express";
import { BackendError, ErrorCodeEnum } from "../utils/error/ErrorCode.js";
import jwtTokenValidator from "../validators/jwt/JwtTokenValidator.js";

export async function jwtAuthenticationValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.headers.authorization
    const isTokenValid = await jwtTokenValidator.isTokenValid(jwtToken)
    
    if(isTokenValid) {
        next()
    } else {
        next(new BackendError(ErrorCodeEnum.JWT_TOKEN_INVALID, "invalid jwt token"))
    }
}
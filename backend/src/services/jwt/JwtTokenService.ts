import { JwtToken } from "./JwtToken.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../../models/User.js";
import { UserService } from "../user/UserService.js";

class JwtTokenService {
    private userService: UserService
    constructor() {
        this.userService = this.userService
    }

    /**
     * jwt.verify might throw the following exceptions
     * JsonWebTokenError
     * NotBeforeError
     * TokenExpiredError
     * @param jwtToken 
     * @returns 
     */
    public async getUserFromJwtAccessToken(jwtAccessToken: string): Promise<User> {
         let jwtAccessTokenPayload: JwtPayload  = jwt.verify(jwtAccessToken, process.env.JWT_TOKEN_SECRET) as JwtPayload
         return await this.userService.getUserById(jwtAccessTokenPayload.userId)
    }

    public generateJwtToken(userId: string): JwtToken {
        let jwtToken: JwtToken = new JwtToken()

        jwtToken.jwtAccessToken =  jwt.sign({userId: userId}, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRE_IN });
        jwtToken.jwtRefreshToken = jwt.sign({userId: userId}, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_SECRET }); 

        return jwtToken
    }

    /**
     * jwt.verify might throw the following exceptions
     * JsonWebTokenError
     * NotBeforeError
     * TokenExpiredError
     * @param jwtToken 
     * @returns 
     */
    public refreshJwtToken(jwtRefreshToken: string): JwtToken {
        let jwtRefreshTokenPayload: JwtPayload  = jwt.verify(jwtRefreshToken, process.env.JWT_REFRESH_TOKEN_SECRET) as JwtPayload

        let jwtToken: JwtToken = new JwtToken()
        jwtToken.jwtAccessToken =  jwt.sign({userId: jwtRefreshTokenPayload.userId}, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRE_IN });
        jwtToken.jwtRefreshToken = jwtRefreshToken

        return jwtToken
    }
}

export default new JwtTokenService()
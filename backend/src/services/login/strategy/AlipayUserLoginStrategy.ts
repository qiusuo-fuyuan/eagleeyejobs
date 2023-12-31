import { Request } from "express";
import { User } from "../../../models/User.js";
import { ThirdPartyUserLoginStrategy } from "./ThirdPartyUserLoginStrategy";


export class AlipayUserLoginStrategy implements ThirdPartyUserLoginStrategy {
    getLoginUrl(): string {
        throw new Error("Method not implemented.");
    }
    authorizeUser(authorizationCode: string, state: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}

export default new AlipayUserLoginStrategy()
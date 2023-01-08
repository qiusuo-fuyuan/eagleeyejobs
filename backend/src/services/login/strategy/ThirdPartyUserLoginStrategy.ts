import { Request } from "express";
import { User } from "../../../models/User.js";

export interface ThirdPartyUserLoginStrategy {

    getLoginUrl(): string

    authorizeUser(authorizationCode: string, state: string): Promise<User>
}
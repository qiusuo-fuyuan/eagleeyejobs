import { Request } from "express";
import { User } from "../../../models/User.js";

export interface ThirdPartyUserLoginStrategy {

    getLoginUrl(): string

    authorizeUser(req: Request): Promise<User>
}
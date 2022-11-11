import { Request } from 'express'
import { User } from '../../models/User.js'
import userRepository, { UserRepository } from '../../repositories/UserRepository.js'
import thirdPartyUserLoginStrategyFactory, {ThirdPartyUserLoginStrategyFactory, PROVIDER_TYPE_STRINGS } from './strategy/ThirdPartyUserLoginStrategyFactory.js'
import {generateJwtToken} from '../../utils/jwt/JwtUtil.js'


class ThirdPartyLoginService {
    private  thirdPartyUserLoginStrategyFactory: ThirdPartyUserLoginStrategyFactory

    constructor() {
        this.thirdPartyUserLoginStrategyFactory = thirdPartyUserLoginStrategyFactory
    }

    public getLoginUrl(providerType: PROVIDER_TYPE_STRINGS): string {
        return thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).getLoginUrl()
    }

    public async loginUserByAuthorizationCode(providerType: PROVIDER_TYPE_STRINGS, req: Request): Promise<string> {
        const authorizedUser =  await thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).authorizeUser(req)
        return generateJwtToken(authorizedUser._id)
    }
}

export default  new ThirdPartyLoginService()


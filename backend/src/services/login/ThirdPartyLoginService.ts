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

    public getLoginUrl(providerType: string): string {
        return thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).getLoginUrl()
    }

    public async loginUserByAuthorizationCode(providerType: string, authorizationCode: string, state: string): Promise<string> {
        const authorizedUser =  await thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).authorizeUser(authorizationCode, state)
        return generateJwtToken(authorizedUser.userId)
    }
}

export default  new ThirdPartyLoginService()


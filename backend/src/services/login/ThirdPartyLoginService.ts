import { Request } from 'express'
import { User } from '../../models/User.js'
import userRepository, { UserRepository } from '../../repositories/UserRepository.js'
import thirdPartyUserLoginStrategyFactory, {ThirdPartyUserLoginStrategyFactory, PROVIDER_TYPE_STRINGS } from './strategy/ThirdPartyUserLoginStrategyFactory.js'
import jwtTokenService from '../jwt/JwtTokenService.js'
import { JwtToken } from '../jwt/JwtToken.js'

class ThirdPartyLoginService {
    private thirdPartyUserLoginStrategyFactory: ThirdPartyUserLoginStrategyFactory

    constructor() {
        this.thirdPartyUserLoginStrategyFactory = thirdPartyUserLoginStrategyFactory
    }

    public getLoginUrl(providerType: string): string {
        return thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).getLoginUrl()
    }

    public async loginUserByAuthorizationCode(providerType: string, authorizationCode: string, state: string): Promise<JwtToken> {
        const authorizedUser =  await this.thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).authorizeUser(authorizationCode, state)
        const jwtToken = jwtTokenService.generateJwtToken(authorizedUser.userId)
        return jwtToken
    }
}

export default new ThirdPartyLoginService()


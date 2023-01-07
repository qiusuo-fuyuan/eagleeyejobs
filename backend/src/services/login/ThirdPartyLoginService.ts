import { Request } from 'express'
import { User } from '../../models/User.js'
import userRepository, { UserRepository } from '../../repositories/UserRepository.js'
import thirdPartyUserLoginStrategyFactory, {ThirdPartyUserLoginStrategyFactory, PROVIDER_TYPE_STRINGS } from './strategy/ThirdPartyUserLoginStrategyFactory.js'
import {generateJwtToken} from '../../utils/jwt/JwtUtil.js'
import { AuthorizationResponse } from './DataTypes.js'

class ThirdPartyLoginService {
    private  thirdPartyUserLoginStrategyFactory: ThirdPartyUserLoginStrategyFactory

    constructor() {
        this.thirdPartyUserLoginStrategyFactory = thirdPartyUserLoginStrategyFactory
    }

    public getLoginUrl(providerType: string): string {
        return thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).getLoginUrl()
    }

    public async loginUserByAuthorizationCode(providerType: string, authorizationCode: string, state: string): Promise<AuthorizationResponse> {
        const authorizedUser =  await thirdPartyUserLoginStrategyFactory.getLoginStrategy(providerType).authorizeUser(authorizationCode, state)
        const jwtToken = await generateJwtToken(authorizedUser.userId)
        return { jwtToken: jwtToken }
    }
}

export default  new ThirdPartyLoginService()


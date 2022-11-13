import { Request, Response } from 'express'
import thirdPartyApiProviderFactory,  {ThirdPartyApiProviderFactory,  PROVIDER_TYPE_STRINGS } from '../core/thirdparty/ThirdPartyApiProviderFactory.js'

class AuthorizationRequestHandler {
    thirdPartyApiProviderFactory: ThirdPartyApiProviderFactory


    constructor() {
        this.thirdPartyApiProviderFactory =  thirdPartyApiProviderFactory
    }

    public handleRequest(req: Request, res: Response) {
        const authorizationCode = req.query.code as string
        const providerType = req.query.provider
        this.acceptAuthorizationCode(authorizationCode, providerType as PROVIDER_TYPE_STRINGS)
    }

    private acceptAuthorizationCode(authorizationCode: string, provider: PROVIDER_TYPE_STRINGS) {  
        this.thirdPartyApiProviderFactory.getProvider(provider).getUserInfo(authorizationCode)
    }

}
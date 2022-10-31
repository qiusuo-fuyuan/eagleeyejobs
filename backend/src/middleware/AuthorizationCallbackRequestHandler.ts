import { Request, Response } from 'express'
import { AuthorizationProviderFactory, PROVIDER_TYPE } from '../services/login/provider/LoginProviderFactory.js'

class AuthorizationRequestHandler {
    authorizationProviderFactory: AuthorizationProviderFactory


    constructor() {
        this.authorizationProviderFactory = new AuthorizationProviderFactory()
    }

    public handleRequest(req: Request, res: Response) {
        const authorizationCode = req.query.code as string
        const providerType = req.query.provider
        this.acceptAuthorizationCode(authorizationCode, providerType as PROVIDER_TYPE)
    }

    private acceptAuthorizationCode(authorizationCode: string, provider: PROVIDER_TYPE) {  
        this.authorizationProviderFactory.getProvider(provider).acceptAuthorizationCode(authorizationCode)
    }

}
import { AuthorizationProviderFactory, PROVIDER_TYPE } from '../services/login/provider/AuthorizationProviderFactory.js'

class AuthorizationRequestHandler {
    authorizationProviderFactory: AuthorizationProviderFactory

    constructor() {
        this.authorizationProviderFactory = new AuthorizationProviderFactory()
    }

    acceptAuthorizationCode(authorizationCode: string, provider: PROVIDER_TYPE) {  
        this.authorizationProviderFactory.getProvider(provider).acceptAuthorizationCode(authorizationCode)
    }

}
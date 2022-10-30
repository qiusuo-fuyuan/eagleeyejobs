class AlipayLoginProvider implements OAuth2LoginProvider{
    getLoginUrl(): string {
        throw new Error("Method not implemented.");
    }
    
    loginByAuthorizationCode(authorizationCode: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

export default new AlipayLoginProvider() 
export class AlipayAuthorizationProvider implements OAuth2AuthorizationProvider{
    
    acceptAuthorizationCode(authorizationCode: string): string {
        throw new Error("Method not implemented.");
    }

}
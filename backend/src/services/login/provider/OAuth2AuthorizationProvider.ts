
interface OAuth2AuthorizationProvider {

    /**
     * accept the authorization code
     */
    acceptAuthorizationCode(authorizationCode: string): string
}
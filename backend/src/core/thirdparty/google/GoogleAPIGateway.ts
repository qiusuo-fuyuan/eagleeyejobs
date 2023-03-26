import { GoogleLoginResponse, GoogleLoginUser } from 'react-google-login'

export class GmailLoginGateway {
    private GOOGLE_CLIENT_ID: string

    constructor() {
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    }

    /**
     * Returns a Google Sign-In URL that can be used to initiate the authentication flow.
     */
    getSignInUrl(): string {
        return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&response_type=code&scope=openid%20email%20profile`
    }

    https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?operation=login&state=google-%7Chttps%3A%2F%2Fmedium.com%2F%3Fsource%3Dlogin--------------------------lo_home_nav-----------%7Clogin&access_type=online&client_id=216296035834-k1k6qe060s2tp2a2jam4ljdcms00sttg.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fmedium.com%2Fm%2Fcallback%2Fgoogle&response_type=id_token%20token&scope=email%20openid%20profile&nonce=935b91c82a65b84bec5d83c84d77f1c9fde5c5e85807c4bae1209f91f5b30159&service=lso&o2v=1&flowName=GeneralOAuthFlow
    /**
     * Exchanges an authorization code for an access token and user information.
     * Returns a Promise that resolves with a `GoogleLoginResponse` object containing the access token and user information.
     */
    async exchangeCodeForToken(code: string): Promise<GoogleLoginResponse> {
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `code=${code}&client_id=${this.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&grant_type=authorization_code`,
        })

        const json = await response.json()

        const userResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${json.access_token}`)
        const userJson = await userResponse.json()

        const result: GoogleLoginResponse = {
            tokenId: json.id_token,
            accessToken: json.access_token,
            expiresIn: json.expires_in,
            user: {
                googleId: userJson.id,
                name: userJson.name,
                givenName: userJson.given_name,
                familyName: userJson.family_name,
                imageUrl: userJson.picture,
                email: userJson.email,
            },
        }

        return result
    }

    /**
     * Parses a token ID and returns the user information associated with it.
     * Returns a Promise that resolves with a `GoogleLoginUser` object containing the user information.
     */
    async getUserInfo(tokenId: string): Promise<GoogleLoginUser> {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`)
        const json = await response.json()

        const result: GoogleLoginUser = {
            googleId: json.sub,
            name: json.name,
            givenName: json.given_name,
            familyName: json.family_name,
            imageUrl: json.picture,
            email: json.email,
        }

        return result
    }
}



import type { GraphQLRequest } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const authEvent = new Event('auth');

export function getAuthToken(): string | null {
    try {
        return localStorage.getItem('token');
    } catch {
        return null;
    }
}

export function setAuthToken(jwtAccessToken: string, jwtRefreshToken: string) {
    localStorage.setItem('token', jwtAccessToken);
    localStorage.setItem('refreshToken', jwtRefreshToken)
    //dispatchEvent(authEvent);
}

export function removeAuthToken() {
    localStorage.removeItem('token');
    // dispatchEvent(authEvent);
}

export function clearStorage(): void {
    localStorage.clear();
    dispatchEvent(authEvent);
}

export function isLoggedIn(): boolean {
    return !!getAuthToken();
}

/**
 * request is graphql operation
 * previousContext contains the previous data
 */
export const authLink = setContext((request: GraphQLRequest, { headers }) => {
    const authToken = getAuthToken();
    if (authToken) {
        return {
            headers: {
                ...headers,
                Authorization: authToken ? `Bearer ${authToken}` : null,
            }
        };
    } return {};
});

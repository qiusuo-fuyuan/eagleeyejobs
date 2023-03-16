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

export function isTokenAvailable(): boolean {
    return !!getAuthToken();
}

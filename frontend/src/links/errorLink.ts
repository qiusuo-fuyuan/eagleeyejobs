import { onError } from '@apollo/client/link/error';
import { useMutation } from '@vue/apollo-composable';
import { CurrentUserDetail, RefreshJwtToken } from '@/graphql/queries';
import { removeAuthToken } from '@/services/accessToken';

import { isJwtTokenExpiredError, isJwtTokenInvalidError, triggerRefreshTokenMutation } from '@/services/graphqlErrorHandler';

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (const { message, locations, path, extensions } of graphQLErrors) {
            if (isJwtTokenInvalidError(extensions)) {
                console.log('[GraphQL error]: Invalid JWT token');
                removeAuthToken();
            } else if (isJwtTokenExpiredError(extensions)) {
                removeAuthToken();
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    triggerRefreshTokenMutation(refreshToken, operation, forward)
                } else {
                    // TODO: handle case when refresh token is not available
                }
            }
        }
    }
    else if (networkError) console.log(`[Network error]: ${networkError}`);
});

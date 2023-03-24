import { getAuthToken } from '@/services/accessToken';
import type { GraphQLRequest } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
                Authorization: `Bearer ${authToken}`,
            }
        };
    }
    return {};
});

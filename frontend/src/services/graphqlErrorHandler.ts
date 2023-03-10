import apolloClient from "@/apolloClient";
import type { RefreshJwtTokenMutation, RefreshJwtTokenMutationVariables } from "@/generated/graphql";
import { CurrentUserDetail, RefreshJwtToken } from "@/graphql/queries";
import type { NextLink, Operation, ServerError, ServerParseError } from "@apollo/client";
import type { ApolloError, GraphQLErrors } from "@apollo/client/errors";
import { useMutation } from "@vue/apollo-composable";
import type { GraphQLErrorExtensions } from "graphql/error";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";
import { ServerErrorCode } from "./serverErrors";

function handleErrorWithNotification(error: Ref<ApolloError>) {
    const apolloError = error.value

    if (apolloError.networkError) {
        const networkError = apolloError.networkError
        if (networkError.name) {

        }
    }
}


function handleNetworkError(networkError: Error | ServerParseError | ServerError) {
}

function handleGraphQLError(graphQLErrors: GraphQLErrors) {

}


/**
 * For JwtToken error, we should remove the token in local storage, and
 * redirect user to /loginPage
 */
function handleInvalidJwtTokenError() {
    const message = useI18n().t("error.network.jwt_token_invalid")
    return message
}

export async function triggerRefreshTokenMutation(refreshToken: string, operation: Operation, forward: NextLink) {
    const result = await apolloClient.mutate<RefreshJwtTokenMutation, RefreshJwtTokenMutationVariables>({
        mutation: RefreshJwtToken,
        variables: {
            jwtRefreshToken: refreshToken
        },
        refetchQueries: [{ query: CurrentUserDetail }]
    })

    //TODO: need to find a better solution instead of using as 
    const { jwtAccessToken, jwtRefreshToken } = result?.data?.refreshJwtToken as { jwtAccessToken: string, jwtRefreshToken: string }
    // update the access token and refresh token in local storage
    localStorage.setItem('jwtAccessToken', jwtAccessToken);
    localStorage.setItem('jwtRefreshToken', jwtRefreshToken);
    // update the authorization header in the operation context
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            Authorization: `Bearer ${jwtAccessToken}`,
        },
    }));
    // retry the original operation with the new authorization header
    return forward(operation);
}

function handleJwtTokenExpiredError() {

}

export function isJwtTokenInvalidError(extensions: GraphQLErrorExtensions): boolean {
    return extensions && extensions.code === ServerErrorCode.JWT_TOKEN_INVALID
}

export function isJwtTokenExpiredError(extensions: GraphQLErrorExtensions): boolean {
    return extensions && extensions.code === ServerErrorCode.JWT_TOKEN_EXPIRED
}

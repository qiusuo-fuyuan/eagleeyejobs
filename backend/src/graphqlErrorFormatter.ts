import { unwrapResolverError } from '@apollo/server/errors';
import { GraphQLError } from 'graphql/error';
import { ErrorCode, HttpHeaderInvalid, JwtTokenInvalid, PermissionDenied } from './services/exceptions/Exceptions.js';

export function formatServerError(error: GraphQLError) {
    const originalError = unwrapResolverError(error)

    if (originalError instanceof HttpHeaderInvalid) {
        error.extensions.code = ErrorCode.HTTP_HEADER_INVALID.toString()
    }

    if (originalError instanceof JwtTokenInvalid) {
        error.extensions.code = ErrorCode.JWT_TOKEN_INVALID.toString()
    }

    if (originalError instanceof PermissionDenied) {
        error.extensions.code = ErrorCode.PERMISSION_DENIED.toString()
    }

    return error
}
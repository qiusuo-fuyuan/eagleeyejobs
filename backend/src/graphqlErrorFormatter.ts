import { unwrapResolverError } from '@apollo/server/errors';
import { GraphQLError } from 'graphql/error';
import jsonwebtokan_pkg from 'jsonwebtoken';
import { ErrorCode, HttpHeaderInvalid, PermissionDenied } from './services/exceptions/Exceptions.js';

const { JsonWebTokenError, TokenExpiredError } = jsonwebtokan_pkg

export function formatServerError(error: GraphQLError) {
    const originalError = unwrapResolverError(error)

    if (originalError instanceof HttpHeaderInvalid) {
        error.extensions.code = ErrorCode.HTTP_HEADER_INVALID
    }

    if (originalError instanceof JsonWebTokenError) {
        error.extensions.code = ErrorCode.JWT_TOKEN_INVALID        
    }

    if (originalError instanceof TokenExpiredError) {
        error.extensions.code = ErrorCode.JWT_TOKEN_EXPIRED                
    }

    if (originalError instanceof PermissionDenied) {
        error.extensions.code = ErrorCode.PERMISSION_DENIED
    }

    return error
}
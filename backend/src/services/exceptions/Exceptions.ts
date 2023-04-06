export enum ErrorCode {
    JWT_TOKEN_INVALID,
    JWT_TOKEN_EXPIRED,
    PERMISSION_DENIED,
    HTTP_HEADER_INVALID,
    TransactionCreationError,
}

class BaseException extends Error{
    public errorCode: number
    public message: string
    public constructor(errorCode: number, message: string) {
        super()
        this.errorCode = errorCode
        this.message = message
    }
}


export class JwtTokenInvalid extends BaseException {
    public constructor(message: string) {
        super(ErrorCode.JWT_TOKEN_INVALID, message)
    }
}

export class HttpHeaderInvalid extends BaseException {
    public constructor(message: string) {
        super(ErrorCode.HTTP_HEADER_INVALID, message)
    }
}

export class PermissionDenied extends BaseException {
    public constructor(message: string) {
        super(ErrorCode.PERMISSION_DENIED, message)
    }
}


export class TransactionCreationError extends BaseException {
    private paymentProvider: string
    private reason: string

    public constructor(paymentProvider: string, message: string) {
        super(ErrorCode.TransactionCreationError, message)
        this.reason = message
        this.paymentProvider = paymentProvider
    }
}

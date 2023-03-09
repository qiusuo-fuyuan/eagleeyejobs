export enum ErrorCode {
    JWT_TOKEN_INVALID,
    JWT_TOKEN_EXPIRED,
    PERMISSION_DENIED,
    HTTP_HEADER_INVALID
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


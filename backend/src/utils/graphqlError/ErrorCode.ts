export class BackendError {
    errCode: number
    errMessage: string

    constructor(errCode: number, errMessage: string) {
        this.errCode = errCode
        this.errMessage = errMessage
    } 
}
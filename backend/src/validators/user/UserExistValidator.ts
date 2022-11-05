export interface UserExistValidator {
    doesUserExist(id: string): Promise<boolean>
}
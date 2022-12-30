import * as fs from 'fs';

export type UserPermission = {
    [role: string]: string[];
}
  
export function readUserPermissions(filePath: string): UserPermission {
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
}
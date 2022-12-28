import * as fs from 'fs';

type UserPermission = {
    [role: string]: string[];
}
  
function readUserPermissions(filePath: string): UserPermission {
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
}

export { UserPermission, readUserPermissions };
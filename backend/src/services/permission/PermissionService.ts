import { UserPermission, readUserPermissions } from './UserPermissions.js'

export class PermissionService {
    private userPermissions: UserPermission;

    constructor() {
      this.userPermissions = readUserPermissions('./permissions.json');
    };

    hasPermission(user: any, targetFunction: any) {
      console.log("🦕==========")
      const role = user.role;
      console.log("role: " + role)
      const permissions = this.userPermissions[role];
  
      console.log("hasPermission", permissions)

      if (!permissions.includes(targetFunction)) {
        throw new Error(`Permission denied: user does not have "${targetFunction}" permission`);
      }
      else {
        return "okay";
      }
    } 
}

export default new PermissionService()
    
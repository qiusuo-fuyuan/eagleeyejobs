import { UserPermission, readUserPermissions } from './UserPermissions.js'
import { User } from '../../models/User.js'
export class PermissionService {
    private userPermissions: UserPermission;

    constructor() {
      this.userPermissions = readUserPermissions('src/services/permission/permissions.json');
    };

    hasPermission(user: User, targetFunction: string) {
      console.log("checking user:"+ user._id + " having permission to call function:" + targetFunction)
      const role = user.role;
      const permissions = this.userPermissions[role];

      if (!permissions.includes(targetFunction)) {
        throw new Error(`Permission denied: user "${user._id}" does not have "${targetFunction}" permission`);
      }
    } 
}

export default new PermissionService()
    
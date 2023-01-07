import { UserPermission, readUserPermissions } from './UserPermissions.js'
import { User } from '../../models/User.js'
import logger from '../../utils/Logger.js';
export class PermissionService {
    private userPermissions: UserPermission;

    constructor() {
      this.userPermissions = readUserPermissions('src/services/permission/permissions.json');
    };

    hasPermission(user: User, targetFunction: string) {
      logger.info("checking whether user:"+ user.userId + " name: "+user.name + " role: "+ user.role + " has permission to call function:" + targetFunction)
      const role = user.role;
      const permissions = this.userPermissions[role];

      if (!permissions.includes(targetFunction)) {
        throw new Error(`Permission denied: user "${user._id}" does not have "${targetFunction}" permission`);
      }
    } 
}

export default new PermissionService()
    
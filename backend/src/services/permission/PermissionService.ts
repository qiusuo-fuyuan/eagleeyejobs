import { Permission } from "../../models/Permission.js";
import { User } from "../../models/User.js";
import permissionRepo, { PermissionRepository } from "../../repositories/PermissionRepository.js";
import logger from "../../utils/Logger.js";
import { PermissionDenied } from "../exceptions/Exceptions.js";

class PermissionService {
  private permissionRepo: PermissionRepository
  
  constructor() {
    this.permissionRepo = permissionRepo
  }

  async createPermission(permission: Permission): Promise<Permission> {
    return this.permissionRepo.save(permission);
  }

  async updatePermission(permission: Permission): Promise<Permission> {
    return this.permissionRepo.updatePermission(permission);
  }

  async deletePermission(permissionId: string): Promise<boolean> {
    return this.permissionRepo.deletePermission(permissionId);
  }

  async getAllPermissions(): Promise<Permission[]> {
    return this.permissionRepo.findAll();
  }

  async getPermissionById(permissionId: string): Promise<Permission | null> {
    return this.permissionRepo.findById(permissionId);
  }

  async hasPermission(user: User, targetFunction: string): Promise<void> {
    logger.info("checking whether user:"+ user.userId + " name: "+user.name + " role: "+ user.role + " has permission to call function:" + targetFunction)

    const role = user.role;
    const permissions = await this.permissionRepo.findOne({ role });

    if (!permissions.actions.includes(targetFunction)) {
      throw new PermissionDenied(`Permission denied: user "${user.name}" does not have "${targetFunction}" permission`);
    }
  }
}

export default new PermissionService();

    
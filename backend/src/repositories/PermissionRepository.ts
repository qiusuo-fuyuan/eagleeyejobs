import { BaseRepository } from "./BaseRepository.js";
import { Permission, PermissionDocumentSchemaDefinition } from "../models/Permission.js";

export class PermissionRepository extends BaseRepository<Permission> {
  constructor() {
    super(PermissionDocumentSchemaDefinition.name);
  }

  async updatePermission(permission: Permission): Promise<Permission> {
    const filter = { _id: permission.id };
    const update = { ...permission };

    return this.documentModel.findOneAndUpdate(filter, update, { new: true });
  }

  async deletePermission(permissionId: string): Promise<boolean> {
    const deletedPermission = await this.documentModel.findByIdAndDelete(permissionId);
    return !!deletedPermission;
  }
}

export default new PermissionRepository();

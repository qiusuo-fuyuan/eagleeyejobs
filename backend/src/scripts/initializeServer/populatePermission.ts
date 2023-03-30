
import { Permission } from '../../models/Permission.js';
import { PermissionRepository } from '../../repositories/PermissionRepository.js';

const permissionsJSON:{ [key: string]: string[] } = {
  "ANONYMOUS": ["searchJobs", "wechatLoginUrl", "wechatAuthorizationCallback", "currentUserDetail","refreshJwtToken","searchUser","registerNewUser","addJob", "allQuestions"],
  "ADMIN": ["create", "update", "delete"],
  "NORMAL_USER": ["addJob","searchJobs", "delete", "allQuestions", "questionDetail"],
  "ENTRY_MEMBERSHIP": ["searchJobs","jobDetail", "searchJobs","allQuestions","questionDetail", "createQuestion", "createAnswer"],
  "INTERMEDIATE_MEMBERSHIP": ["searchJobs","jobDetail", "allQuestions","questionDetail", "createQuestion","createAnswer"],
  "ADVANCED_MEMBERSHIP": ["searchJobs","jobDetail","allQuestions", "questionDetail", "createQuestion","createAnswer"],
  "RECRUITER": ["addJob", "updateJob", "allQuestions","questionDetail"]
};

export async function migratePermissions() {
  const permissionRepo = new PermissionRepository();

  for (const role in permissionsJSON) {
    const rolePermissions = permissionsJSON[role];
    
    const permission = new Permission(role, rolePermissions);
    await permissionRepo.save(permission);
  }
}

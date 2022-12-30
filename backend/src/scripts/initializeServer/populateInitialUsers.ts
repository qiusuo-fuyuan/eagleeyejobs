import { User, UserType } from "../../models/User.js";
import * as fs from 'fs';
import userService  from "../../services/user/UserService.js";


const readUsersFromFile = (usersJsonFile: string): User[] => {
    const users: User[] = [];
  
    const data = fs.readFileSync(usersJsonFile, 'utf8');
    const json = JSON.parse(data);
  
    for (const user of json.users) {
      users.push({
        id: user["id"] as string,
        email: user["email"] as string,
        gender: user.gender as number,
        name: user.name as string,
        role: user.role as UserType
      });
    }
  
    return users;
};


export const populateInitialUsers = async (usersJsonFile: string) => {
    const users: User[] = readUsersFromFile(usersJsonFile)
    for (const user of users) {
      await userService.addUser(user);
    }
};
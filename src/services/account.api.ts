import { LoginRequest } from "../model/login-request";
import { User } from "../model/user";
import { ProfileRequest } from "../model/profile-request";

export abstract class AccountApi {
  abstract createUser(user: User): Promise<string>;
 abstract editUser(user: User): Promise<string>;
  //  abstract editUser(userId: string, request: ProfileRequest): Promise<string>;
  abstract login(request: LoginRequest): Promise<string>;
  abstract getUserBiometric(userId: String): Promise<string>;
}

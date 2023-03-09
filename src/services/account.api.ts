import { LoginRequest } from "../model/login-request";
import { User } from "../model/user";

export abstract class AccountApi {
  abstract createUser(user: User): Promise<any>;
  abstract editUser(user: User): Promise<any>;
  abstract login(request: LoginRequest): Promise<any>;
}

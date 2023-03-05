export abstract class AccountApi {
  abstract getUsers(): Promise<any>;
  abstract createUser(user: any): Promise<any>;
  abstract getUserById(userId: any): Promise<any>;
  abstract editUserById(userId: any): Promise<any>;
}

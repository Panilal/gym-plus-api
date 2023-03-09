import { AccountApi } from './account.api';
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";
import { LoginRequest } from '../model/login-request';
import { User } from '../model/user';

export class AccountService implements AccountApi {
    logger: LoggerApi;

    constructor(
        @Inject
        logger: LoggerApi,
    ) {
        this.logger = logger.child('AccountService');
    }
    
    async getUserById(user: User): Promise<any> {
        const response = 
                await db.maybeOne<any>(sql`SELECT * FROM public.accounts WHERE user_id= ${user.userId};`);
        return response;
    }
    
    async editUser(user: User): Promise<any> {
        const response = 
            await db.maybeOne<any>(sql`UPDATE public.users SET first_name = ${user.firstName}, last_name= ${user.lastName}, 
            email= ${user.email}, phone_number= ${user.phoneNumber}, password= ${user.password}, confirm_password= ${user.confirmPassword} WHERE user_id = ${user.userId};`);
            return response;
    }
   
    async createUser(user: User): Promise<any> {
        const response = await db.maybeOne<any>(sql`INSERT INTO public.users (first_name, last_name, email, phone_number, password, confirm_password)
        VALUES (${user.firstName}, ${user.lastName}, ${user.email},  ${user.phoneNumber },  ${user.password}, ${user.confirmPassword})`);
       return response;
    }

    async login(request: LoginRequest): Promise<any> {
        const response = db.maybeOne<any>(sql`SELECT * FROM public.users WHERE email=${request.email} AND password=${request.password}`);
        this.logger.info(`This is response: ${response}`);
        if (await response === null){
            return "User does not exist";
        }
        else{
            return true;
        }
          
    }
}

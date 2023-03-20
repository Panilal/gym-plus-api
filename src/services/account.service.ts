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
    
    /*async getUserById(user: User): Promise<any> {
        const response = 
                await db.maybeOne<any>(sql`SELECT * FROM public.accounts WHERE user_id= ${user.userId};`);
        return response;
    }*/

    async editUser(user: User): Promise<string> {
        const response = 
            await db.maybeOne<any>(sql`UPDATE public.users SET first_name = ${user.firstName}, last_name= ${user.lastName}, 
            email= ${user.email}, phone_number= ${user.phoneNumber}, password= ${user.password} WHERE user_id = ${user.userId} RETURNING user_id;`);
            this.logger.info(`This is edited response: ${response}`);
            return response;
    }
   
    async createUser(user: User): Promise<string> {
        const response = await db.maybeOne<string>(sql`INSERT INTO public.users (first_name, last_name, email, phone_number, password)
        VALUES (${user.firstName}, ${user.lastName}, ${user.email},  ${user.phoneNumber },  ${user.password}) RETURNING user_id;`);
        this.logger.info(`This is created response: ${response}`);
       return response;
    }

    async login(request: LoginRequest): Promise<string> {
        const response = db.maybeOne<string>(sql`SELECT * FROM public.users WHERE email=${request.email} AND password=${request.password};`);
        this.logger.info(`This is response: ${response}`);
        if (await response === null){
            return "User does not exist";
        }
        else{
            return "true";
        }
    }

}

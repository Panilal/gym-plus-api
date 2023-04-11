import { AccountApi } from './account.api';
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";
import { LoginRequest } from '../model/login-request';
import { User } from '../model/user';
import { ProfileRequest } from "../model/profile-request";

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


    //  await db.maybeOne<any>(sql`UPDATE public.users SET 
    //         height= ${request.height}, weight=${request.weight}, gender=${request.gender}, 
    //         age=${request.age}, weight_loss=${request.weightLoss} , muscle_gain=${request.muscleGain} WHERE 
    //         user_id=${userId} 
    //         RETURNING user_id;`);

    // async editUser(userId: string, request:ProfileRequest): Promise<string> {
    //     const response =
    //         await db.maybeOne<any>(sql`UPDATE public.users SET first_name = ${request.first_name}, last_name= ${request.last_name}, 
    //         email= ${request.email}, phone_number= ${request.phone_number}, password= ${request.password} WHERE user_id = ${userId}  RETURNING user_id;`);
    //     this.logger.info(`This is edited response: ${response}`);
    //     return response;
    // }

 async editUser(user: User): Promise<string> {
        const response = 
            await db.maybeOne<any>(sql`UPDATE public.users SET first_name = ${user.firstName}, last_name= ${user.lastName}, 
             phone_number= ${user.phoneNumber}, password= ${user.password} WHERE user_id = ${user.userId} RETURNING user_id;`);
            this.logger.info(`This is edited response: ${response}`);
            return response;
    }




    async createUser(user: User): Promise<string> {
        const response = await db.maybeOne<string>(sql`INSERT INTO public.users (first_name, last_name, email, phone_number, password)
        VALUES (${user.firstName}, ${user.lastName}, ${user.email},  ${user.phoneNumber},  ${user.password}) RETURNING user_id;`);
        this.logger.info(`This is created response: ${response}`);
        return response;
    }

    async login(request: LoginRequest): Promise<any> {
        const response = await db.maybeOne(sql`SELECT user_id, first_name, last_name, email, phone_number, height, weight, gender, age, weight_loss, muscle_gain FROM public.users WHERE email=${request.email} AND password=${request.password};`);
        this.logger.info(`This is response: ${response}`);
       
        return response;
    }
    async getUserBiometric(userId: string): Promise<any> {
        const userDataPromise = await db.maybeOne<any>(sql`SELECT * FROM public.users WHERE user_id=${userId}`);
        return userDataPromise;
    }
}

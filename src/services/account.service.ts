import { AccountApi } from './account.api';
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";

export class AccountService implements AccountApi {
    logger: LoggerApi;

    constructor(
        @Inject
        logger: LoggerApi,
    ) {
        this.logger = logger.child('AccountService');
    }
    async editUserById(userId: any): Promise<any> {
        const response = 
                await db.maybeOne<any>(sql`SELECT * FROM public.accounts WHERE id= ${userId};`);
           
        return response;
    }
    async getUserById(userId: any): Promise<any> {
        const response = await db.many<any>(sql`SELECT * FROM public.accounts WHERE id= {userId};`);

        return response;
    }
    async getUsers(): Promise<any> {
        const response = await db.many<any>(sql`SELECT * FROM public.accounts;`);

        return response;
    }
    async createUser(user: any): Promise<any> {
        const response = await (await db).transaction(async (trxConnection) => {
            const records =
                await trxConnection.many<any>(sql`SELECT * FROM public.accounts;`);
            return records;
        });

        return response;
    }
}

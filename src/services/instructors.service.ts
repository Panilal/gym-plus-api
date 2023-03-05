import { InstructorsApi } from './instructors.api';
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";

export class InstructorsService implements InstructorsApi {
    logger: LoggerApi;

    constructor(
        @Inject
        logger: LoggerApi,
    ) {
        this.logger = logger.child('InstructorsService');
    }
   async getInstructors(): Promise<any> {
        const response = await (await db).transaction(async (trxConnection) => {
            const records =
                await trxConnection.many<any>(sql`SELECT * FROM public.instructors;`);
            return records;
        });

        return response;
    }
    
}

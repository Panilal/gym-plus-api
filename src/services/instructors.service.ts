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
        const instructorResponse = await db.many<any>(sql`SELECT * FROM public.instructors;`);
        return instructorResponse;
    }
    
}

import { TrainingApi } from './training.api';
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";

export class TriningService implements TrainingApi {
    logger: LoggerApi;

    constructor(
        @Inject
        logger: LoggerApi,
    ) {
        this.logger = logger.child('TriningService');
    }
    async createBiometric(biometric: any): Promise<any> {
        const response = await (await db).transaction(async (trxConnection) => {
            const records =
                await trxConnection.many<any>(sql`INSERT INTO public.biometric;`);
            return records;
        });

        return response;
    }
    async getTrainingInfo(bioid: string): Promise<any> {
        const response = await (await db).transaction(async (trxConnection) => {
            const records =
                await trxConnection.many<any>(sql`INSERT INTO public.biometric;`);
            return records;
        });
    }

}

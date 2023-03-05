import { HelloWorldApi } from './hello-world.api';
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";

export class HelloWorldService implements HelloWorldApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('HelloWorldService');
  }

  async greeting(name: string = 'World'): Promise<any> {
    const response = await (await db).transaction(async (trxConnection) => {
      const records =
        await trxConnection.many<any>(sql`SELECT * FROM public.accounts;`);
      return records;
    });

    return response;
  }
}

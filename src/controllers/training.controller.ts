import { GET, Path, PathParam, POST, PUT } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { TrainingApi } from '../services';
import { LoggerApi } from '../logger';
import { User } from '../model/user';


@Path('/training')
export class TrainingController {

    @Inject
    service: TrainingApi;
    @Inject
    _baseLogger: LoggerApi;

    get logger() {
        return this._baseLogger.child('TrainingController');
    }

    @Path('/create-biometric')
    @PUT
    async createBiometric(user: User): Promise<any> {
        this.logger.info(`Post biometric data`);
        return this.service.createBiometric(user);
    }
}

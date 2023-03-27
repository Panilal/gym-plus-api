import { GET, Path, PathParam, POST, PUT } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { TrainingApi } from '../services';
import { LoggerApi } from '../logger';
import { User } from '../model/user';
import { BiometricRequest} from '../model/biometric-request';
import { string } from '@pact-foundation/pact/src/dsl/matchers';
import { TrainingRequest } from 'src/model/training-request';


@Path('/training')
export class TrainingController {

    @Inject
    service: TrainingApi;
    @Inject
    _baseLogger: LoggerApi;

    get logger() {
        return this._baseLogger.child('TrainingController');
    }

    @Path(':userId')
    @PUT
    async createBiometric(@PathParam('userId') userId: string, request: BiometricRequest): Promise<string> {
        this.logger.info(`Post biometric data`);
        return this.service.createBiometric(userId, request);
    }

    @Path(':userId')
    @GET
    async getTraining(@PathParam('userId') userId: string): Promise<string> {
        this.logger.info(`Get Training data`);
        return this.service.getTraining(userId);
    }
}


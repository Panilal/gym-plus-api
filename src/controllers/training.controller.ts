import { GET, Path, PathParam, POST } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { TrainingApi } from '../services';
import { LoggerApi } from '../logger';

@Path('/biometric')
export class TrainingController {

    @Inject
    service: TrainingApi;
    @Inject
    _baseLogger: LoggerApi;

    get logger() {
        return this._baseLogger.child('TrainingController');
    }

    @POST
    async createBiometric(biometric: any): Promise<any> {
        this.logger.info(`saving biometric details of ${name}`);
        return this.service.createBiometric(biometric);
    }

    @Path(':bioid')
    @GET
    async getTrainingInfo(@PathParam('bioid') bioid: string): Promise<any> {
      this.logger.info(`Getting training instructions to ${name}`);
      return this.service.getTrainingInfo(bioid);
    }
}

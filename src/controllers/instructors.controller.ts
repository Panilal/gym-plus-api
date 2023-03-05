import { GET, Path, PathParam, POST } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { InstructorsApi } from '../services';
import { LoggerApi } from '../logger';

@Path('/instructor')
export class InstructorsController {

    @Inject
    service: InstructorsApi;
    @Inject
    _baseLogger: LoggerApi;

    get logger() {
        return this._baseLogger.child('InstructorsController');
    }

    @GET
    async getInstructors(): Promise<any> {
        this.logger.info('Loading instructors');
        return this.service.getInstructors();
    }

}

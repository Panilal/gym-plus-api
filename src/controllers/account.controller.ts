import { GET, Path, PathParam, POST, PUT } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { AccountApi } from '../services';
import { LoggerApi } from '../logger';

@Path('/account')
export class AccountController {

    @Inject
    service: AccountApi;
    @Inject
    _baseLogger: LoggerApi;

    get logger() {
        return this._baseLogger.child('AccountController');
    }

    @GET
    async getUsers(): Promise<any> {
        this.logger.info('Getting all users');
        return this.service.getUsers();
    }

    @Path(':userId')
    @GET
    async getUserById(@PathParam('userId') userId: string): Promise<any> {
        this.logger.info('Getting user by id');
        return this.service.getUserById(userId);
    }


    @POST
    async createUser(user: any): Promise<any> {
        this.logger.info(`Creating user account`);
        return this.service.createUser(user);
    }

    @Path(':userId')
    @PUT
    async editUserById(@PathParam('userId') userId: string): Promise<any> {
        this.logger.info(`Edit user account`);
        return this.service.createUser(userId);
    }
}

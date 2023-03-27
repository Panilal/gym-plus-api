import { GET, Path, PathParam, POST, PUT } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { AccountApi } from '../services';
import { LoggerApi } from '../logger';
import { User } from '../model/user';
import { LoginRequest } from '../model/login-request';

@Path('/account')
export class AccountController {

    @Inject
    service: AccountApi;
    @Inject
    _baseLogger: LoggerApi;

    get logger() {
        return this._baseLogger.child('AccountController');
    }

    @POST
    async createUser(user: User): Promise<any> {
        this.logger.info(`Post user data`);
        return this.service.createUser(user);
    }

    @Path(':userId')
    @GET
    async getUserBiometric(@PathParam('userId') userId: string): Promise<any> {
        this.logger.info(`Get user biometric data`);
        return this.service.getUserBiometric(userId);
    }

    @PUT
    async editUser(user: User): Promise<any> {
        this.logger.info(`Edit user account`);
        return this.service.editUser(user);
    }

    @Path('/login')
    @POST
    async login(request: LoginRequest): Promise<any> {
        this.logger.info(`Login`);
        return this.service.login(request);
    }

    
}

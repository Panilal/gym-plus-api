import { Application } from 'express';
import { LoginRequest } from 'src/model/login-request';
import { User } from '../../src/model/user';
import { default as request } from 'supertest';
import { Container, Scope } from 'typescript-ioc';

import { AccountApi } from '../../src/services';
import { buildApiServer } from '../helper';

class MockAccountService implements AccountApi {
    createUser = jest.fn().mockName('createUser');
    editUser = jest.fn().mockName('editUser');
    login = jest.fn().mockName('login');
    getUserBiometric = jest.fn().mockName('getUserBiometric');
}

// Your code that uses Slonik

// Your Jest test
jest.mock('slonik', () => {
    return {
        createPool: jest.fn(),
    };
});



describe('account.controller', () => {

    let app: Application;
    let mockCreateUser: jest.Mock;
    let mockEditUser: jest.Mock;
    let mockLogin: jest.Mock;

    beforeEach(() => {
        const apiServer = buildApiServer();

        app = apiServer.getApp();

        Container.bind(AccountApi).scope(Scope.Singleton).to(MockAccountService);

        const mockService: AccountApi = Container.get(AccountApi);
        mockCreateUser = mockService.createUser as jest.Mock;
        mockEditUser = mockService.editUser as jest.Mock;
        mockLogin = mockService.login as jest.Mock;
    });

    test('canary validates test infrastructure', () => {
        expect(true).toBe(true);
    });

    describe('Given /account', () => {
        const user: User = {
            userId: "",
            firstName: "preenu",
            lastName: "Rahul",
            email: "preenu@gmail.com",
            phoneNumber: "5432167890",
            password: "789",
            height: null,
            weight: null,
            gender: null,
            age: null,
            muscleGain: null,
            weightLoss: null
        }

        const expectedResult: string = "22"


        beforeEach(() => {
            mockCreateUser.mockImplementation((user) => "22");
        });

        test('should create user and return userId', done => {
            request(app).post('/account').send(user).expect(200).expect(expectedResult, done);
        });
    });

    describe('Given /account', () => {

        const user: User = {
            userId: "22",
            firstName: "preenu",
            lastName: "Rahul",
            email: "ppreenu@gmail.com",
            phoneNumber: "5432167890",
            password: "789",
            height: null,
            weight: null,
            gender: null,
            age: null,
            muscleGain: null,
            weightLoss: null
        }
        const expectedResult: string = "22"
        beforeEach(() => {
            mockEditUser.mockImplementation(user => "22");
        });

        test('should return "null"', done => {
            request(app).put('/account').send(user).expect(200).expect(expectedResult, done);
        });
    });

   

    describe('Given /account/login', () => {

        const requestBody = {
            email: "preenu",
            password: "preenu",
        };
        const expectedResult = ["22", 
                                "preenu",
                            "Rahul",
                            "preenu@getMaxListeners.com", "5432167890", "153", "53", "female","27", 
                            "true", "false"
                        ] 
        beforeEach(() => {
            mockLogin.mockReturnValueOnce(Promise.resolve(expectedResult));
        });

        test('should return user entire data', done => {
            request(app).post('/account/login').send(requestBody).expect(200).expect(expectedResult, done);
        });
    });

    describe('Given /account/getUserBiometric', () => {

        const requestBody = {
           userId : "22"
        };
        const expectedResult = ["22", 
                                "preenu",
                            "Rahul",
                            "preenu@getMaxListeners.com", "5432167890", "153", "53", "female","27", 
                            "true", "false"
                        ] 
        beforeEach(() => {
            mockLogin.mockReturnValueOnce(Promise.resolve(expectedResult));
        });

        test('should return user entire data', done => {
            request(app).post('/account/login').send(requestBody).expect(200).expect(expectedResult, done);
        });
    });


});

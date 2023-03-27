import { Application } from 'express';
import { User } from '../../src/model/user';
import { default as request } from 'supertest';
import { Container, Scope } from 'typescript-ioc';

import { TrainingApi } from '../../src/services';
import { buildApiServer } from '../helper';

class MockTrainingService implements TrainingApi {    
    createBiometric = jest.fn().mockName('createBiometric');
    getTraining = jest.fn().mockName('getTraining');
}

// Your code that uses Slonik

// Your Jest test
jest.mock('slonik', () => {
    return {
        createPool: jest.fn(),
    };
});



describe('training.controller', () => {

    let app: Application;
    let mockCreateBiometric: jest.Mock;


    beforeEach(() => {
        const apiServer = buildApiServer();

        app = apiServer.getApp();

        Container.bind(TrainingApi).scope(Scope.Singleton).to(MockTrainingService);

        const mockService: TrainingApi = Container.get(TrainingApi);
        mockCreateBiometric = mockService.createBiometric as jest.Mock;
    });

    test('canary validates test infrastructure', () => {
        expect(true).toBe(true);
    });

    describe('Given /training/create-biometric', () => {

        const user: User = {
            userId: "22",
            firstName: "preenu",
            lastName: "Rahul",
            email: "ppreenu@gmail.com",
            phoneNumber: "5432167890",
            password: "789",
            height: "1.65",
            weight:"150" ,
            gender: "female",
            age: "35",
            muscleGain: "false",
            weightLoss: "true"
        }
        const expectedResult = ["Fitness Blenders 40 Minute Cardio HIIT Workout", 
                                "https://www.youtube.com/watch?v=ml6cT4AZdqI"] 
       
        beforeEach(() => {
            mockCreateBiometric.mockImplementation(user => expectedResult);
        });

        test('should return video url and video title', done => {
            request(app).put('/training/create-biometric').send(user).expect(200).expect(expectedResult, done);
        });
    });


});
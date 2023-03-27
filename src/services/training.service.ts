
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";
import {  User } from '../model/user';
import { BiometricRequest } from '../model/biometric-request';
import { TrainingApi } from './training.api';
import { TrainingRequest } from 'src/model/training-request';

export class TrainingService implements TrainingApi {
    logger: LoggerApi;

    constructor(
        @Inject
        logger: LoggerApi,
    ) {
        this.logger = logger.child('TrainingService');
    }
    async getTraining(userId: string): Promise<string> {
        const userDataPromise = db.maybeOne<any>(sql`SELECT * FROM public.users WHERE user_id=${userId}`);
        const userData = await userDataPromise;
        var bmiCategory = "";
        var bmi = parseInt( (userData.weight))/((userData.height)*(userData.height));
        console.log(bmi);
        if(bmi <= 18.5)

        {
            bmiCategory = "Under weight";
        }
        if(bmi >= 18.5 && bmi <= 24.9)
        {
            bmiCategory = "Normal weight";
        }
        if(bmi >= 25 && bmi <= 29.9)
        {
            bmiCategory = "Over weight";
        }
        if(bmi >= 30)
        {
            bmiCategory = "Obesity";
        }
        this.logger.info(`This is current user response: ${userData}`);
        const responseTrainingPromise = db.maybeOne<any>(sql`SELECT video_title, video_url FROM public.workoutplan
        WHERE gender=${userData.gender} AND bmi_categories=${bmiCategory} AND weight_loss=${userData.weightLoss} AND 
        muscle_gain=${userData.muscleGain} ;`);
        const responseTraining = await responseTrainingPromise;
        this.logger.info(`This is current user training response: ${responseTraining}`);
        return responseTraining;
      }

    
    async createBiometric(userId: string, request:BiometricRequest): Promise<string> {
        var bmiCategory = "";
        var bmi = parseInt(request.weight)/(parseInt(request.height)*parseInt(request.height));
        console.log(bmi);
        if(bmi <= 18.5)

        {
            bmiCategory = "Under weight";
        }
        if(bmi >= 18.5 && bmi <= 24.9)
        {
            bmiCategory = "Normal weight";
        }
        if(bmi >= 25 && bmi <= 29.9)
        {
            bmiCategory = "Over weight";
        }
        if(bmi >= 30)
        {
            bmiCategory = "Obesity";
        }
        const response = await db.maybeOne<any>(sql`UPDATE public.users SET 
            height= ${request.height}, weight=${request.weight}, gender=${request.gender}, 
            age=${request.age}, weight_loss=${request.weightLoss} , muscle_gain=${request.muscleGain} WHERE 
            user_id=${userId} 
            RETURNING user_id;`);
            this.logger.info(`This is created biometric response: ${response}`);
            // const responseTraining = db.maybeOne<string>(sql`SELECT video_title, video_url FROM public.workoutplan
            // WHERE gender=${request.gender} AND bmi_categories=${bmiCategory} AND weight_loss=${request.weightLoss} AND 
            // muscle_gain=${request.muscleGain} ;`);
            // this.logger.info(`This is training response: ${responseTraining}`);
        
       return response.userId;
    }
}

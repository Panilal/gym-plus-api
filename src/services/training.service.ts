
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import db, { sql } from "./init-database";
import { User } from '../model/user';
import { TrainingApi } from './training.api';

export class TrainingService implements TrainingApi {
    logger: LoggerApi;

    constructor(
        @Inject
        logger: LoggerApi,
    ) {
        this.logger = logger.child('TrainingService');
    }

    
    async createBiometric(user:User): Promise<string> {
        var bmiCategory = "";
        var bmi = parseInt(user.weight)/(parseInt(user.height)*parseInt(user.height));
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
            height= ${user.height}, weight=${user.weight}, gender=${user.gender}, 
            age=${user.age}, weight_loss=${user.weightLoss} , muscle_gain=${user.muscleGain} WHERE 
            user_id=${user.userId} 
            RETURNING user_id;`);
            this.logger.info(`This is created biometric response: ${response}`);
        const responseTraining = db.maybeOne<string>(sql`SELECT video_title, video_url FROM public.workoutplan
         WHERE gender=${user.gender} AND bmi_categories=${bmiCategory} AND weight_loss=${user.weightLoss} AND 
         muscle_gain=${user.muscleGain} ;`);
         this.logger.info(`This is training response: ${responseTraining}`);
        
       return responseTraining;
    }
}

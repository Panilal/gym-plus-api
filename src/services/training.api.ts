import { User } from "../model/user";
import { BiometricRequest } from "../model/biometric-request";
import { TrainingRequest } from "src/model/training-request";

export abstract class TrainingApi {
  abstract createBiometric(userId: string, request: BiometricRequest): Promise<string>;
  abstract getTraining(userId: string): Promise<string>;
  
}
  
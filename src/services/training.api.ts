export abstract class TrainingApi {
    abstract createBiometric(biometric: any): Promise<any>;
    abstract getTrainingInfo( bioid: string): Promise<any>;
  }
  
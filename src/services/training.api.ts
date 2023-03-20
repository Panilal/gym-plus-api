import { User } from "../model/user";

export abstract class TrainingApi {
  abstract createBiometric(user: User): Promise<any>;
}
  
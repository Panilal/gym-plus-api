import {ContainerConfiguration, Scope} from 'typescript-ioc';
import { AccountApi } from './account.api';
import { AccountService } from './account.service';
import {HelloWorldApi} from './hello-world.api';
import {HelloWorldService} from './hello-world.service';
import { TrainingApi } from './training.api';
import { TrainingService } from './training.service';
import { InstructorsApi } from './instructors.api';
import { InstructorsService } from './instructors.service';

const config: ContainerConfiguration[] = [
  {
    bind: HelloWorldApi,
    to: HelloWorldService,
    scope: Scope.Singleton
  },
  {
    bind: AccountApi,
    to: AccountService,
    scope: Scope.Singleton
  },
  {
    bind: TrainingApi,
    to: TrainingService,
    scope: Scope.Singleton
  },
  {
    bind: InstructorsApi,
    to: InstructorsService,
    scope: Scope.Singleton
  }
];

export default config;
import { Container } from "typescript-ioc";

export * from './hello-world.api';
export * from './hello-world.service';
export * from './account.api';
export * from './account.service';
export * from './instructors.api';
export * from './instructors.service';
export * from './training.api';
//export * from './training.service';

import config from './ioc.config';

Container.configure(...config);
import { Express } from 'express';
import authV1 from './auth';

const v1 = (app: Express) => authV1(app);

export default v1;

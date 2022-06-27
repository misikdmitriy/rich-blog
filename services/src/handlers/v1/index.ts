import { Express } from 'express';
import postsV1 from './posts';
import authV1 from './auth';

const v1 = (app: Express) => authV1(postsV1(app));

export default v1;

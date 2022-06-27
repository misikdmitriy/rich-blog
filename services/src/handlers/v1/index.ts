import { Express } from 'express';
import postsV1 from './posts';
import authV1 from './auth';
import imagesV1 from './images';

const v1 = (app: Express) => imagesV1(authV1(postsV1(app)));

export default v1;

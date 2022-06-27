import { Express } from 'express';
import v1 from './v1';

const api = (app: Express) => (v1(app));

export default api;

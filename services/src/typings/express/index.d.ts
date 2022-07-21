// ./src/typings/express/index.d.ts
import 'express';

declare global {
    declare namespace Express {
        export interface User {
            externalId: string
            email?: string
            provider: string;
            roles: string[]
        }
    }
}

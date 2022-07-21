// ./src/typings/express-session/index.d.ts
import 'express-session';

declare module 'express-session' {
    interface SessionData {
        redirectUrl?: string
    }
}

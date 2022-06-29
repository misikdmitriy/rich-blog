import './config-enrich';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { graphqlHTTP } from 'express-graphql';
import api from './handlers';
import { mongoUrl } from './db';
import { AppUser } from './types/users';
import RootSchema from './graphql';

const {
	SESSION_SECRET = '',
	SESSION_COLLECTION = 'session',
	MONGO_DB,
} = process.env;

const app = express();

app.use(express.json());
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: SESSION_SECRET,
	store: MongoStore.create({
		mongoUrl,
		collectionName: SESSION_COLLECTION,
		autoRemove: 'native',
		dbName: MONGO_DB,
	}),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphqlHTTP({
	schema: RootSchema,
	graphiql: true,
}));
api(app);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj as AppUser));

const port = Number(process.env.PORT || 80);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

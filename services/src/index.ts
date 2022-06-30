import './config-enrich';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core';
import fs from 'fs';
import api from './handlers';
import { mongoUrl } from './db';
import { AppUser } from './types/users';
import resolvers from './graphql';

const {
	SESSION_SECRET = '',
	SESSION_COLLECTION = 'session',
	MONGO_DB,
} = process.env;

(async () => {
	const schemaDef = fs.readFileSync('./schema.graphql').toString('utf8');

	const app = express();

	app.use(express.static('public'));
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

	api(app);

	passport.serializeUser((user, cb) => cb(null, user));
	passport.deserializeUser((obj, cb) => cb(null, obj as AppUser));

	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs: gql(schemaDef),
		resolvers,
		csrfPrevention: true,
		cache: 'bounded',
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		context: ({ req }) => ({
			user: req.user,
			isAuthenticated: req.isAuthenticated(),
		}),
	});

	await server.start();
	server.applyMiddleware({ app });

	const port = Number(process.env.PORT || 80);
	httpServer.listen({ port }, () => console.log(`Server ready at port ${port}`));
})();

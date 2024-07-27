require('dotenv').config();
const databaseURL = process.env.DATABASE_URL;
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./schemas/resolvers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

async function startServer() {
    await mongoose.connect(databaseURL);

    const AventonesGraphQL = express();
    const db = mongoose.connection;

    db.on('error', (error) => {
        console.log(error)
    })

    db.once('connected', () => {
        console.log('Database Connected');
    })

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    AventonesGraphQL.use(bodyParser.json({ limit: '2mb' }));
    AventonesGraphQL.use(cookieParser());
    AventonesGraphQL.use(cors({
        methods: 'GET,POST,DELETE,PATCH',
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    await server.start();
    server.applyMiddleware({ app: AventonesGraphQL, path: '/graphql', cors: true });

    AventonesGraphQL.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
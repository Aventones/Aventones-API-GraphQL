require('dotenv').config();
const databaseURL = process.env.DATABASE_URL;
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./schemas/resolvers');

async function startServer() {
    await mongoose.connect(databaseURL);

    const db = mongoose.connection;
    const AventonesGraphQL = express();

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
    await server.start();
    server.applyMiddleware({ app: AventonesGraphQL });
    AventonesGraphQL.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
require('dotenv').config();
const databaseURL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./schemas/resolvers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

async function startServer() {
    await mongoose.connect(databaseURL);

    const AventonesGraphQL = express();
    const db = mongoose.connection;

    db.on('error', (error) => {
        console.log(error);
    });

    db.once('connected', () => {
        console.log('Database Connected');
    });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    AventonesGraphQL.use(bodyParser.json({ limit: '2mb' }));
    AventonesGraphQL.use(cookieParser());
    AventonesGraphQL.use(cors({
        methods: 'POST',
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    const ridesRouter = express.Router();
    ridesRouter.post('/guest', async (req, res) => {
        const rides = await resolvers.Query.getAllRides();
        res.json(rides);
    });

    AventonesGraphQL.use('/graphql', ridesRouter);

    // AventonesGraphQL.use(function (req, res, next) {
    //     if (req.headers["authorization"]) {
    //         const authToken = req.headers['authorization'].split(' ')[1];
    //         try {
    //             jwt.verify(authToken, JWT_SECRET, (err, decodedToken) => {
    //                 if (err || !decodedToken) {
    //                     res.status(401);
    //                     res.json({
    //                         error: "Unauthorized"
    //                     });
    //                 }
    //                 next();
    //             });
    //         } catch (e) {
    //             res.status(401);
    //             res.send({
    //                 error: "Unauthorized"
    //             });
    //         }
    //     } else {
    //         res.status(401);
    //         res.send({
    //             error: "Unauthorized"
    //         });
    //     }
    // });

    await server.start();
    server.applyMiddleware({ app: AventonesGraphQL, path: '/graphql', cors: true });

    AventonesGraphQL.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();

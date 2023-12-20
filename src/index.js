// index.js
// This is the main entry point of our application

const express = require('express');
const { ApolloServer, gql} = require('apollo-server-express')
const port = process.env.PORT || 4000;
const typeDefs = gql`
    type Query {
        hello : String
    }`;
const resolvers = {
    Query : {
        hello : () => 'Hello world!'
    }
};
const app = express();
const server = new ApolloServer({typeDefs, resolvers});
async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path : '/api' });

    app.get('/', (req, res) => res.send('Hello Web server!!!'));

    app.listen(port, () =>
        console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
    );
}

startServer();
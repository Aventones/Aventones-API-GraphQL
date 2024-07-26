const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User!
    getAllRides: [Ride!]!
    getRideById(id: ID!): Ride!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    cedula: String!
    dob: String!
    email: String!
    phone: Int!
    password: String!
    profilePicture: String
    isDriver: Boolean!
  }

  type Ride {
    id: ID!
    driver: User!
    riders: [User]!
    pickup: String!
    destination: String!
    days: [String]!
    fee: Int!
    time: String!
    seatsAvailable: Int!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, cedula: String!, dob: String!, email: String!, phone: Int!, password: String!, profilePicture: String, isDriver: Boolean!): User!
    updateUser(id: ID!, firstName: String, lastName: String, cedula: String, dob: String, email: String, phone: Int, password: String, profilePicture: String, isDriver: Boolean): User!
    createRide(driver: ID!, riders: [ID], pickup: String!, destination: String!, days: [String]!, fee: Int!, time: String!, seatsAvailable: Int!): Ride!
    updateRide(id: ID!, driver: ID, riders: [ID], pickup: String, destination: String, days: [String], fee: Int, time: String, seatsAvailable: Int): Ride!
  }
`;

module.exports = typeDefs;
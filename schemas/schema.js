const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User!
    getAllRides: [Ride!]!
    getRideById(id: ID!): Ride!
    getRequestsByDriver(id: ID!): [Request!]!
    getRequestByID(id: ID!): Request!
    getAllRequests: [Request!]!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    cedula: String
    dob: String
    email: String
    phone: Int
    password: String
    profilePicture: String
    isDriver: Boolean
  }

  type Request {
    id: ID!
    rider: User!
    rideDriver: User!
    ride: Ride!
  }

  type Ride {
    id: ID!
    driver: User!
    riders: [User]
    pickup: String
    destination: String
    days: [String]
    fee: Int
    time: String
    seatsAvailable: Int
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, cedula: String!, dob: String!, email: String!, phone: Int!, password: String!, profilePicture: String, isDriver: Boolean!): User!
    updateUser(id: ID!, firstName: String, lastName: String, cedula: String, dob: String, email: String, phone: Int, password: String, profilePicture: String, isDriver: Boolean): User!
    createRide(driver: ID!, riders: [ID], pickup: String!, destination: String!, days: [String]!, fee: Int!, time: String!, seatsAvailable: Int!): Ride!
    updateRide(id: ID!, driver: ID, riders: [ID], pickup: String, destination: String, days: [String], fee: Int, time: String, seatsAvailable: Int): Ride!
    createRequest(rider: ID!, rideDriver: ID!, ride: ID!): Request!
    updateRequest(id: ID!, rider: ID!, rideDriver: ID!, ride: ID!): Request!
  }
`;

module.exports = typeDefs;
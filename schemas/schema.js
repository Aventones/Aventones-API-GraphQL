const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User!
    getAllRides: [Ride!]!
    getRidesByDriver(id: ID!): [Ride!]!
    getRideById(id: ID!): Ride!
    getRequestsByDriver(id: ID!): [Request!]!
    getRequestbyRiderId(id: ID!): [Request!]!
    getRequestByID(id: ID!): Request!
    getAllRequests: [Request!]!
    getAllVehicles: [Vehicle!]!
    getVehicleById(id: ID!): Vehicle!
  }

  type Vehicle {
    id: ID!
    model: String
    year: Int
    plate: String
    make: String
    seats: Int
  }

  type User {
    id: ID!
    statusUser: String
    firstName: String
    lastName: String
    cedula: String
    dob: String
    email: String
    phone: Int
    password: String
    profilePicture: String
    isDriver: Boolean
    vehicle: Vehicle
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
`;

module.exports = typeDefs;
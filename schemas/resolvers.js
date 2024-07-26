const UserModel = require('./models/user.model');
const RideModel = require('./models/ride.model');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await UserModel.find();
        },
        getUserById: async (_, { id }) => {
            return await UserModel.findById(id);
        },
        getAllRides: async () => {
            const rides = await RideModel.find().populate('driver').populate('riders');
            return rides;
        },
        getRideById: async (_, { id }) => {
            return await RideModel.findById(id);
        }
    },
    Ride: {
        driver: async (ride) => {
            return await UserModel.findById(ride.driver);
        },
    },
    Mutation: {
        createUser: async (_, { firstName, lastName, cedula, dob, email, phone, password, profilePicture, isDriver }) => {
            const newUser = new UserModel({ firstName, lastName, cedula, dob, email, phone, password, profilePicture, isDriver });
            return await newUser.save();
        },
        createRide: async (_, { driver, riders, pickup, destination, days, fee, time, seatsAvailable }) => {
            const newRide = new RideModel({ driver, riders, pickup, destination, days, fee, time, seatsAvailable });
            return await newRide.save();
        },
        updateUser: async (_, { id, firstName, lastName, cedula, dob, email, phone, password, profilePicture, isDriver }) => {
            return await UserModel
        },
        updateRide: async (_, { id, driver, riders, pickup, destination, days, fee, time, seatsAvailable }) => {
            return await RideModel
        }
    },
};

module.exports = resolvers;
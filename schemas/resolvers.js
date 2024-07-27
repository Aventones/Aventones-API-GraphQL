const UserModel = require('./models/user.model');
const RideModel = require('./models/ride.model');
const RequestModel = require('./models/request.model');

const resolvers = {
    Query: {
        //Users Queries
        getAllUsers: async () => {
            return await UserModel.find().select('-password -__v');
        },
        getUserById: async (_, { id }) => {
            return await UserModel.findById(id).select('-password -__v');
        },

        //Rides Queries
        getAllRides: async () => {
            const rides = await RideModel.find().populate({
                path: 'driver riders',
                select: '-__v -password'
            });
            return rides;
        },
        getRideById: async (_, { id }) => {
            return await RideModel.findById(id).populate({
                path: 'driver riders',
                select: '-__v -password'
            });
        },

        //Requests Queries
        getRequestsByDriver: async (_, { id }) => {
            return await RequestModel.find({ rideDriver: id });
        },
        getRequestByID: async (_, { id }) => {
            return await RequestModel.findById(id);
        },
        getAllRequests: async () => {
            return await RequestModel.find();
        },
    },
    Request: {
        id: (request) => request._id.toString(),

        ride: async (request) => {
            const ride = await RideModel.findById(request.ride);
            if (!ride) {
                throw new Error('Ride not found ' + error);
            }
            return ride;
        },
        rider: async (request) => {
            const user = await UserModel.findById(request.rider).select('-password -__v');
            if (!user) {
                throw new Error('Rider not found ' + error);
            }
            return user;
        },
        rideDriver: async (request) => {
            const user = await UserModel.findById(request.rideDriver).select('-password -__v');
            if (!user) {
                throw new Error('Driver not found ' + error);
            }
            return user;
        },
    },
    User: {
        id: (user) => user._id.toString(),
    },
    Ride: {
        id: (ride) => ride._id.toString(),
    },

    Mutation: {
        //Users Mutations
        createUser: async (_, { firstName, lastName, cedula, dob, email, phone, password, profilePicture, isDriver }) => {
            let newUser = new UserModel({ firstName, lastName, cedula, dob, email, phone, password, profilePicture, isDriver });
            return await newUser.save();
        },
        updateUser: async (_, { id, firstName, lastName, cedula, dob, email, phone, password, profilePicture, isDriver }) => {
            let user = { firstName, lastName, cedula, dob, email, phone, password, profilePicture, isDriver };
            return await UserModel.findByIdAndUpdate(id, user, { new: true });
        },

        //Rides Mutations
        createRide: async (_, { driver, riders, pickup, destination, days, fee, time, seatsAvailable }) => {
            let newRide = new RideModel({ driver, riders, pickup, destination, days, fee, time, seatsAvailable });
            return await newRide.save();
        },
        updateRide: async (_, { id, driver, riders, pickup, destination, days, fee, time, seatsAvailable }) => {
            let ride = { driver, riders, pickup, destination, days, fee, time, seatsAvailable };
            return await RideModel.findByIdAndUpdate(id, ride, { new: true });
        },

        //Resquests Mutations
        createRequest: async (_, { rider, rideDriver, ride }) => {
            let newRequest = new RequestModel({ rider, rideDriver, ride });
            return await newRequest.save();
        },
        updateRequest: async (_, { id, rider, rideDriver, ride }) => {
            let request = { rider, rideDriver, ride };
            return await RequestModel.findByIdAndUpdate(id, request, { new: true });
        },
    },
};

module.exports = resolvers;
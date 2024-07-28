const UserModel = require('./models/user.model');
const RideModel = require('./models/ride.model');
const VehicleModel = require('./models/vehicle.model');
const RequestModel = require('./models/request.model');

const resolvers = {
    Query: {
        //Users Queries
        getAllUsers: async () => {
            return await UserModel.find().populate('vehicle').select('-password -__v');
        },
        getUserById: async (_, { id }) => {
            return await UserModel.findById(id).populate('vehicle').select('-password -__v');
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

        getRidesByDriver: async (_, { id }) => {
            return await RideModel.find({ driver: id }).populate({
                path: 'driver riders',
                select: '-__v -password'
            });
        },

        getAllVehicles: async () => {
            return await VehicleModel.find();
        }
        ,
        getVehicleById: async (_, { id }) => {
            return await VehicleModel.findById(id);
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
    Vehicle: {
        id: (vehicle) => vehicle._id.toString(),
    },
};

module.exports = resolvers;
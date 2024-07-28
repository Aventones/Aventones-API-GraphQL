const jwt = require('jsonwebtoken');
const User = require('../schemas/models/user.model');

const getUserCredentials = async function (email) {
    return User.findOne({ email: email }).select('password _id isDriver');
};

module.exports = {
    getUserCredentials
};

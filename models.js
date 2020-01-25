var mongoose = require('mongoose');

mongoose.model('User', new mongoose.Schema({
    email: String,
    passwordHash: String,
    subscriptionActive: { type: Boolean, defaul: false },
    customerId: String,
    subscriptionId: String
}))
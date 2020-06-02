const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    userName: {
        type: String
    },
    namaLengkap: {
        type: String
    },
    email: {
        type: String
    },
    notelp: {
        type: String
    },
    role: {
        type: Number
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema)
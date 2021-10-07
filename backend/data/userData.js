const bcrypt = require('bcryptjs');

const userData =[
    {
        username: "piper",
        email: "piper@example.com",
        password: bcrypt.hashSync('123456',10),
    },
    {
        username: "admin",
        email: "admin@example.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    }
]

module.exports = userData;
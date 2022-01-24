const {
    models: { User },
} = require("../db");
// const { findByToken } = require('../db/models/User')

const requireToken = async (req, res, next) => {
    try {
        let token = undefined;
        if (req.headers.authorization) {
            token = req.headers.authorization;
        } else {
            if (req.body.headers) {
                token = req.body.headers.authorization;
            }
        }
        const user = await User.findByToken(token);
        req.user = user;
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    requireToken
}
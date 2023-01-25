const User = require('../models/UserModels.js');

const emailExist = async (email) => {
    try {

        const User = await User.findOne({ email: email });
        if(!User) { return false }
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = emailExist;
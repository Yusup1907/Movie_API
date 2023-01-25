const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then((data) => {
        console.log(`DBConnection Successfull with Server: ${data.connection.host}`)
    })
}

module.exports = connectDatabase
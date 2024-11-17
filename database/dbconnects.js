const mongoose  = require('mongoose')

// Connect to MongoDB
const connect  =  async () =>{
  
    try {
        const connection  =  await mongoose.connect('mongodb://localhost:27017/vishal');
        console.log('MongoDB connected');
    } catch (error) {
            console.log("Error in Connection DB");
            process.exit(1);
    }

}

module.exports = connect;
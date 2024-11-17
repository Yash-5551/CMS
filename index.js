require('dotenv').config();
const express = require('express');
const connectDB = require('./database/dbconnects.js');
const cookieParser = require('cookie-parser');

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/authroutes.js'));
app.use('/api/users', require('./routes/userroutes.js'));
app.use('/api/company', require('./routes/companyroutes.js'));
app.use('/api/manager', require('./routes/managerroutes.js'));
app.use('/api/driver', require('./routes/driverroutes.js'));
app.use('/api/dispatcher', require('./routes/dispatcherroutes.js'));
app.use('/api/users', require('./routes/reportroutes.js'));


connectDB()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server started on port 5000');
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });



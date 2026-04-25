const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//load environment variables

dotenv.config();

const app = express();

// middleware to parse JSON

app.use(express.json());

//routes
app.use('/api/posts', require('./routes/post'));

//start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try
    {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(' Connected to MongoDB ');
        // start express
        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(`Error starting server: `, err);
    }
}
startServer();
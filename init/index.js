const mongoose = require('mongoose');
const Listing = require('../modals/listings.js');
const { data} = require('./data.js');

const mongo_URL='mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
    console.log('MongoDB connected');}).catch((err) => {console.log(err);});

async function main() {
    await mongoose.connect(mongo_URL);
    console.log('Connected to MongoDB');
}

const initDB = async () => {
        await Listing.deleteMany({});
        await Listing.insertMany(data);
        console.log('Data inserted');
};
initDB();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
  filename: {
    type: String,
    default: "listingimage",
  },
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
        : v,
  },
},
    price: {
        type: Number,
        required: true,
    },
    location: { 
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});

const Listing = mongoose.model('Listing', listingsSchema);
module.exports = Listing;

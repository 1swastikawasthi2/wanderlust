//isme sabse pehle npm init -y karenge package.json file ke liye then install express and ejs
//requiring express in line 3&4
const express = require('express');
const app = express();
//requiring mongoose in line 6
const mongoose = require('mongoose');
//requiring listings.js in line 8
const Listing = require('./modals/listings.js');
//requiring path for ejs setup in line 10,11,12
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
//databases ko connect karne ke lye
const mongo_URL='mongodb://127.0.0.1:27017/wanderlust';
main().then(() => {
    console.log('MongoDB connected');}).catch((err) => {console.log(err);});

async function main() {
    await mongoose.connect(mongo_URL);
    console.log('Connected to MongoDB');
}

app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/init/public")));

app.get('/', (req, res) => {
    res.send('hi i am root');
});
/*app.get("/testlistings",async (req,res)=>{
    let sampleListing = new Listing({
        title: "My new villa",
        description: "By the beach",
        image: "https://images.unsplash.com/photo-1646876723939-e4c1e1a3b5c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 100,
        location: "Calangute,Goa",
        country: "India"
    });
    await sampleListing.save();
    res.send('Sample listing created');
});*/
//index route
app.get("/listings",async (req,res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index",{allListings});
});

//New route
app.get("/listings/new",async (req,res)=>{
  res.render("listings/new");
});

//show route
app.get("/listings/:id",async (req,res)=>{
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("listings/show",{listing});
});
//create route
app.post("/listings",async (req,res)=>{
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit",async (req,res)=>{
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("listings/edit",{listing});
});
//update route
app.put("/listings/:id",async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect("/listings");
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
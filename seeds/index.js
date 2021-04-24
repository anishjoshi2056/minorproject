const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors,places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpcamp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=> {
    console.log("database connected");
})
const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50 ;i++) {
        const rand1000 = Math.floor((Math.random() * 1000));
        const camp = new Campground({
            location:`${cities[rand1000].city} , ${cities[rand1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}}`
        })
        await camp.save();
    }

}
seedDB();
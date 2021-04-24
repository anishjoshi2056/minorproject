const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const Campground = require('./models/campground');
const mongoose = require('mongoose');
//Connection with MongoDB

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
//Setting view engine template
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//Routes
app.get('/',(req,res)=> {
    res.render('home')
})
app.get('/makecampground',async (req,res)=> {
    const camp = new Campground({title:"My background",description:"Cheap camping!",price:13000});
    await camp.save();
    res.send(camp);
})
app.listen(port,()=> {
    console.log(`Listining to the port:${port}`)
})

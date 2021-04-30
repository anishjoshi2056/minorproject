const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const Campground = require('./models/campground');
const mongoose = require('mongoose');
const { ADDRGETNETWORKPARAMS } = require('dns');
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
//To parse the req.body
app.use(express.urlencoded({extended:true}))
//Routes
app.get('/',(req,res)=> {
    res.render('home')
})

app.get('/campgrounds', async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds}) 
})
app.get('/campgrounds/new',(req,res)=> {
    res.render('campgrounds/new')
})
app.post('/campgrounds',async(req,res) => {
    /* req.body is empty so we have to tell 
    express to parse the body */
    const campground = new Campground(req.body.campground);
    console.log(campground);
    //saving to the database
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})
app.get('/campgrounds/:id',async(req,res)=> {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{campground})
})

app.listen(port,()=> {
    console.log(`Listining to the port:${port}`)
})

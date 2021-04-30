const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const Campground = require('./models/campground');
const mongoose = require('mongoose');
const { ADDRGETNETWORKPARAMS } = require('dns');
const methodOverride = require('method-override');
const campground = require('./models/campground');
//Connection with MongoDB

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
})
mongoose.set('useFindAndModify', false);
//Setting view engine template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//To parse the req.body
app.use(express.urlencoded({ extended: true }))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//Routes
//Homepage
app.get('/', (req, res) => {
    res.render('home')
})
//View all Campground
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})
//Routes for adding new Campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})
app.post('/campgrounds', async (req, res) => {
    /* req.body is empty so we have to tell 
    express to parse the body */
    const campground = new Campground(req.body.campground);
    console.log(campground);
    //saving to the database
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})
//Route for specific Campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})
//Routes for Editing and Updating specific campground
app.get('/campgrounds/:id/edit', async (req, res) => {
    /*To update specific campground first find that campground through it's it*/
    //Find campground through id
    const foundCampground = await Campground.findById(req.params.id);
    //Pass that foundCampground into edit file
    //Render a update form
    res.render('campgrounds/edit', { foundCampground });
})
app.put('/campgrounds/:id', async (req, res) => {
    /*Grap the foundCampground id and update its content through form */
    const editedCampground = req.body.foundCampground;
    await Campground.findByIdAndUpdate(req.params.id, editedCampground, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
})
//Route for Delete Campground
app.delete('/campgrounds/:id',async(req,res)=> {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(port, () => {
    console.log(`Listining to the port:${port}`)
})

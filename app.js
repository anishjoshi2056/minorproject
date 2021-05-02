const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const Campground = require('./models/campground');
const mongoose = require('mongoose');
const { ADDRGETNETWORKPARAMS } = require('dns');
const methodOverride = require('method-override');
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
//Static Folders
app.use(express.static(path.join(__dirname,'public')));
//Routes
//Routes other than Campground
app.use('/',require('./routes/index'));
//View all Campground
app.use('/campgrounds',require('./routes/campgrounds'));

//Listening to the port
app.listen(port, () => {
    console.log(`Listining to the port:${port}`)
})

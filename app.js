const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const port = 3000;
const mongoose = require('mongoose');
const { ADDRGETNETWORKPARAMS } = require('dns');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
//Connection with MongoDB
mongoose.connect('mongodb://localhost:27017/sastosaaman', {
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
app.use(express.urlencoded({ extended: true }));
//Load config
dotenv.config({path:'./config/config.env'});
//Passport Config
require('./config/passport')(passport)
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
//Static Folders
app.use(express.static(path.join(__dirname,'public')));
//Routes
app.use('/',require('./routes/index')); //Routes other than Saamans
app.use('/auth',require('./routes/auth')); //authRoute
app.use('/saamans',require('./routes/saamanRoute')); //View all Saamans
//Listening to the port
app.listen(port, () => {
    console.log(`Listining to the port:${port}`);
})

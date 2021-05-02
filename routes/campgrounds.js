const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
//Routes that starts with /campgrounds
router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})
//Routes for adding new Campground
router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})
router.post('/', async (req, res) => {
    /* req.body is empty so we have to tell 
    express to parse the body */
    const campground = new Campground(req.body.campground);
    console.log(campground);
    //saving to the database
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})
//Route for specific Campground
router.get('/:id', async (req, res) => {

    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})
//Routes for Editing and Updating specific campground
router.get('/:id/edit', async (req, res) => {
    /*To update specific campground first find that campground through it's it*/
    //Find campground through id
    const foundCampground = await Campground.findById(req.params.id);
    //Pass that foundCampground into edit file
    //Render a update form
    res.render('campgrounds/edit', { foundCampground });
})
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})
module.exports = router;
const express = require('express');
const router = express.Router();
const Saaman = require('../models/saamanSchema');
//Routes that starts with /campgrounds
router.get('/', async (req, res) => {
    const saamans = await Saaman.find({})
    res.render('saamans/index', { saamans });
})
//Routes for adding new Campground
router.get('/new', (req, res) => {
    res.render('saamans/new');
})
router.post('/', async (req, res) => {
    /* req.body is empty so we have to tell 
    express to parse the body */
    const saaman = await new Saaman(req.body.saaman);
    console.log(saaman);
    //saving to the database
    await saaman.save();
    res.redirect(`/saamans/${saaman._id}`);
})
//Route for specific Campground
router.get('/:id', async (req, res) => {

    const saaman = await Saaman.findById(req.params.id);
    res.render('saamans/show', { saaman });
})
//Routes for Editing and Updating specific campground
router.get('/:id/edit', async (req, res) => {
    /*To update specific campground first find that campground through it's it*/
    //Find campground through id
    const foundSaaman = await Saaman.findById(req.params.id);
    //Pass that foundCampground into edit file
    //Render a update form
    res.render('saamans/edit', { foundSaaman });
})
router.put('/:id', async (req, res) => {
    /*Grap the foundCampground id and update its content through form */
    const editedSaaman = req.body.foundSaaman;
    await Saaman.findByIdAndUpdate(req.params.id, editedSaaman, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/saamans');
        }
    });
})
//Route for Delete Campground
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Saaman.findByIdAndDelete(id);
    res.redirect('/saamans');
})
module.exports = router;
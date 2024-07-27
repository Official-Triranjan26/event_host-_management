const express = require('express');
const {postEvent, getAllListedEvents, getAnEventById, putAnEventById,addArtist, getAnArtist} = require('../controllers/adminControllers');

const Router = express.Router();

Router.post('/postEvent',
    //  authenticate,
    //   authorize('admin'),
       postEvent);
Router.get('/manageEvent',getAllListedEvents)
Router.get('/manageEvent/:id',getAnEventById)
Router.put('/manageEvent/edit/:id',putAnEventById)
Router.post('/addArtist',addArtist)
Router.get('/getAnArtist/:artistId',getAnArtist)

module.exports = Router
var express = require('express');
var router = express.Router();
var ctrLocations = require('../controllers/locations');
var ctrOrthers = require('../controllers/others');
//locations page
router.get ('/', ctrLocations.homelist);
router.get ('/location', ctrLocations.locationInfo);
router.get ('/location/review/new', ctrLocations.addReview);

//orther page
router.get ('/about', ctrOrthers.about);

module.exports = router;

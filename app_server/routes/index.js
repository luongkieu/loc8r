var express = require('express');
var router = express.Router();
var ctrLocations = require('../controllers/locations');
var ctrOrthers = require('../controllers/others');
//locations page
router.get ('/', ctrOrthers.angularApp);
router.get ('/location/:locationid', ctrLocations.locationInfo);
router.get ('/location/:locationid/review/new', ctrLocations.addReview);
router.post('/location/:locationid/reviews/new', ctrLocations.doAddReview);

//orther page
router.get ('/about', ctrOrthers.about);

module.exports = router;

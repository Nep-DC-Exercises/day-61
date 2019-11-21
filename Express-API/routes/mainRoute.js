const express = require("express"),
    router = express.Router();

router.get("/", function(req, res, next) {
    res.send('You hit the /api endpoint')
});

module.exports = router;

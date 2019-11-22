const express = require("express"),
    router = express.Router();

const magicModel = require('../models/mainModel')

router.get("/", function(req, res, next) {
    res.send('You hit the /api endpoint')
});

router.post("/add", async (req, res, next) => {
    const { question, answer, type } = req.body
    const addData = magicModel.addData(question, answer, type)

    res.status(200).send('You Gucci');
})

module.exports = router;

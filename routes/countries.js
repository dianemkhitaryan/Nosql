const express = require('express');
const router = express.Router()

const CountryModel = require('../models/Country')

// router.get('/', async (request, response) => {
//     const countries = await CountryModel.find();
//     response.status(200).json(countries);
// });

router.get('/:id', async (request, response) => {
    const countryId = request.params.id;

    const countries = await CountryModel.findOne({
        _id: countryId
    });
    
    response.status(200).json(countries);
});

router.post('/', async (request, response) => {
    const {name, isoCode} = request.body

    const country = await CountryModel.create({
        name: name,
        isoCode
    });

    response.status(200).json(country);
});

router.delete('/:id', async (request, response) => {
    const countryId = request.params.id;

    await CountryModel.findOneAndDelete({
        _id: countryId
    });

    response.status(200).json({msg: 'Country well deleted !'});
});

router.put('/:id', async (request, response) => {
    const countryId = request.params.id;
    const {name, isoCode} = request.body

    const country = await CountryModel.findOneAndUpdate({
        _id: countryId
    },{
        name,
        isoCode
    },{
        new: true
    });

    response.status(200).json(country);
});

// Question 1
router.get('/start/:name', async (req, res) =>{
    const name = req.params.name;
    const country = await CountryModel.find({"name": {$regex: '^' + name, $options: "i"}})
    res.status(200).json(country)
})

// Question 6
router.get('/', async (request, response) => {
    const countries = await CountryModel.find().sort( { population: 1 } )
    response.status(200).json(countries);
});

module.exports = router;
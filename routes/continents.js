const express = require('express');
const router = express.Router()

const ContinentModel = require('../models/Continent')

// router.get('/', async (request, response) => {
//     const continents = await ContinentModel.find().populate('countries');
//     response.status(200).json(continents);
// });

// Question 3
router.get('/cont/:number', async (req, res) => {
    const continents = await ContinentModel.aggregate([
      { $project: { name:1, NumberofCountries: {$size: "$countries" }}}])
    res.status(200).json(continents);
})

// Question 4
router.get('/', async (req, res) => {
  const continents = await ContinentModel.find().populate({path: 'countries', options: {sort: { name: 1 }, limit: 4}});
  res.status(200).json(continents);
});

// Question 7
router.get('/bigger', async (request,response)=>{

  const continents = await ContinentModel.findOne().
  populate({
      path: 'countries',
      match: {"name" : {$regex : "u"} ,
      match: {population: { $gte: 100000} }}
  })
  response.status(200).json(continents)
});
module.exports = router;


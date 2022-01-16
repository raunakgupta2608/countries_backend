const express = require('express')
const app = express()

const router = express.Router()
const path = require('path')
const data = require('../data/data')
const countries = data.countries;


router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '../templates/index.html'));
})

router.get('/countries', (req, res)=> {
    return res.status(200).json(countries);
})

router.get('/countries/:rank', (req, res)=> {
    const temp = countries.filter((country) => {
        console.log(country.rank);
        return country.rank === +(req.params.rank)
    });

    if(temp.length!= 0) {
        return res.status(200).json(temp);
    }
    else{
        return res.status(404).json({error: 'No such country exists'});
    }
})

router.post('/countries', (req, res)=> {
    const { nameOfCountry, nameOfContinent, flag, rank } = req.body
    countries.map(country => {
        if(country.name.toLowerCase() === nameOfCountry.toLowerCase()) {
            return res.status(404).json({error: 'nameOfCountry'});
        }
        if(country.rank === +rank) {
            return res.status(404).json({error: 'rank'});
        }
    })
    const obj = {
        "name": nameOfCountry,
        "continent": nameOfContinent,
        "flag": flag,
        "rank": +rank
    }
    countries.push(obj)
    return res.status(200).send(countries);
})

module.exports = router;
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
require('./config');

// Define paths for Express config
const pulicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

// Setup handlebars engine ane views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setting static directory to serve
app.use(express.static(pulicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Artur Sobolewski'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Artur Sobolewski'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Just for checking weather forecast',
        author: 'Artur Sobolewski',
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address || req.query.address === '') {
        return res.send({
            error: 'You must provide an address',
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
        if (error) {
            return res.send({
                error,
            });
        }
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    error: forecastError,
                });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address,
            });
        });
    });
    // res.send({
    //     foracast: 'It\'s snowing',
    //     location: 'Philadelphia', 
    //     address: req.query.address,
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    
    console.log(req.query.search);
    res.send({
        products: [],
    });
    
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        author: 'Artur Sobolewski'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
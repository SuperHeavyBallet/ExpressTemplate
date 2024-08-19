const express = require('express');
const morgan = require('morgan');

const pageRoutes = require('./routes/pageRoutes.js');

// Connect to MongoDB
// Credentials Stored in .env
const dotenv = require('dotenv');
dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.62chw.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to Server
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

mongoose.connect(dbURI, {
}).then((result) => {
    console.log('Connected to MongoDB');
    app.listen(3000);
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Express App
const app = express();

// Set View Engine, defaults to 'views' directory
app.set('view engine', 'ejs');

// Requests To Server

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Express/EJS Routing

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.use('/blogs', pageRoutes);

app.get('/about', (req,res) =>
{
    res.render('about', { title: 'About' });
})

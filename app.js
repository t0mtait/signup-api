const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user.js');
const path = require('path');
const uri = 'mongodb+srv://tom:2021@testcluster.cgg3ssg.mongodb.net/?retryWrites=true&w=majority';
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use('/css', express.static(__dirname + '/css'));

app.set('view engine', 'ejs');

// Connect to MongoDB
try {
    mongoose.connect(uri);
    console.log('MongoDB connected successfully');
} catch (error) {
    console.log('MongoDB failed to connect');
}

// Configure body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

// Serve the signup form
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/signup.html'));
});

// Handle user registration
router.post('/user', async (request, response) => {
    const user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        userName: request.body.userName,
        password: request.body.password,
        email: request.body.email
    });

    try {
        const savedUser = await user.save();
        console.log('Successfully created a new User');
        // Redirect to the /users route after successful registration
        response.redirect('/users');
    } catch (error) {
        console.error('Failed to create a new User:', error);
    }
});

// Retrieve and display user data

router.get('/users', async (request, response) => {
    try {
        const users = await User.find({});
        response.render('availableUsers', { 'users': users }); // Render availableUsers.ejs
    } catch (error) {
        console.error('Error fetching users:', error);
        response.status(500).send('Internal Server Error');
    }
});


// Use the router middleware
app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});

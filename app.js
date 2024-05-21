const express = require('express');
const path = require('path');
const ejs = require('ejs');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', 
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const dynamo = new AWS.DynamoDB.DocumentClient(); // Using DocumentClient for easier interaction



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.set('view engine', 'ejs');

// Router setup
const router = express.Router();

// Serve the signup form
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Handle user registration
router.post('/user', async (req, res) => {
    const max = Number.MAX_SAFE_INTEGER;
    const userid = Math.floor(Math.random() * max);

    const params = {
        TableName: 'usermanagement-api',
        Item: {
            userid: userid,
            email: req.body.email,
            username: req.body.userName,
            password: req.body.password
        }
    };

    try {
        await dynamo.put(params).promise();
        console.log('New user registered!', req.body.userName, req.body.password);
        res.send('Successfully registered!');
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user!');
    }
});

// Retrieve and display user data
router.get('/users', async (req, res) => {
    const params = {
        TableName: 'usermanagement-api'
    };

    try {
        const data = await dynamo.scan(params).promise();
        const users = data.Items;

        if (!users || users.length === 0) {
            return res.status(404).send('No users found!');
        }
        res.render('availableUsers', { users }); // Render availableUsers.ejs
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Use the router middleware
app.use('/', router);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

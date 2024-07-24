// Import necessary modules
const express = require('express');
const session = require('express-session');

const app = express();

// Middleware to parse request body
app.use(express.json());

// Configure the session middleware
app.use(session({
    secret: process.env.SECRET_KEY || 'default_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Use `secure: true` in production with HTTPS
}));

// Dummy user for authentication example
const USER = { username: 'user1', password: 'password123' };

// User authentication function
function authenticate(username, password) {
    return username === USER.username && password === USER.password;
}

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (authenticate(username, password)) {
        req.session.user = { username };
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.send('Logout successful');
    });
});

// Middleware to protect routes
function ensureLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

// Example of a protected route
app.get('/protected', ensureLoggedIn, (req, res) => {
    res.send(`Welcome ${req.session.user.username}, you are logged in and can access protected routes.`);
});

// Start the express server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
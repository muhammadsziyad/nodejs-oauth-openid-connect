const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passport-setup');

const app = express();

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Profile route
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('profile', { user: req.user });
});

// Authentication routes
app.get('/auth/okta', passport.authenticate('openidconnect'));

app.get('/auth/okta/callback', passport.authenticate('openidconnect', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/profile');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


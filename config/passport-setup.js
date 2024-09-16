const passport = require('passport');
const OpenIDConnectStrategy = require('passport-openidconnect').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Okta OpenID Connect Strategy
passport.use(new OpenIDConnectStrategy({
    issuer: process.env.OKTA_ISSUER_URL,
    authorizationURL: `${process.env.OKTA_ISSUER_URL}/v1/authorize`,
    tokenURL: `${process.env.OKTA_ISSUER_URL}/v1/token`,
    userInfoURL: `${process.env.OKTA_ISSUER_URL}/v1/userinfo`,
    clientID: process.env.OKTA_CLIENT_ID,
    clientSecret: process.env.OKTA_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/okta/callback',
    scope: 'openid profile email'
}, (issuer, sub, profile, accessToken, refreshToken, done) => {
    return done(null, profile);
}));


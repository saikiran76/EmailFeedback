const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')

const app = express()

/*
 some configuration (or options) has to be passed
 into new instance of GoogleStrategy
 to setup the google auth 

 two important options 
 - client id 
 - client secret 
*/ 

passport.use(new GoogleStrategy({
    clientID: keys.googleClientid,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback" // ROUTE that user will be sent to after permission grant by user for app

}, (accessToken, refreshToken, profile, done)=>{
    console.log('access token: ', accessToken)
    console.log('refresh token: ', refreshToken)
    console.log('profile: ', profile) // to identify the user and allow him in the arrow function
    
}))  

// Whenever user hits the route, user into google auth flow

// if any one authenticates with string of 'google',  use the above strategy 

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    // what access we want to have 
}))

// code param will be taken/ identified by passport and google auth strategy will
// be kicked again
app.get('/auth/google/callback', passport.authenticate('google'))

// Hey passport take that code and turn it into like user profile

app.get('/', (req, res)=>{
    res.send({response: 'hi bruh'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("Running baby!!!")
})
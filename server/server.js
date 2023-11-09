require('dotenv').config()
const express = require('express');
const SpotifyWebAPI = require('spotify-web-api-node');
const cors = require('cors');
const  bodyParser = require('body-parser');

const app = express();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.use(cors());
app.use(bodyParser.json());

// Start of express pipeline
// Print info about incoming HTTP requests
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: redirect_uri,
    clientId: client_id,
    clientSecret: client_secret,
    refreshToken
  })

  spotifyAPI.refreshAccessToken().then(
    (data) => {
      res.json(({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn
      }))
  
      // Save the access token so that it's used in future calls
      spotifyAPI.setAccessToken(data.body['access_token']);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(400);
    })
})

// Post request for Spotify login 
// Obtains access token for Spotify
app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: redirect_uri,
    clientId: client_id,
    clientSecret: client_secret
  })

  spotifyAPI.authorizationCodeGrant(code).then(data => {
    // console.log(data);
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(400);
  })
})

// Respond to all AJAX queries that aren't supported
app.use(function(req, res, next) {
    res.json({msg: "No such AJAX request"});
})

// End of express pipeline

app.listen(5000, () => {console.log("Listening on port 5000")});
require("dotenv").config();
const axios = require('axios');
const moment = require('moment');
const keys = require("./keys.js");
const fs = require('fs');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var secondArg = getSecondArg(process.argv);

const concertThis = (artist) => {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function (response) {
        console.log(`${artist} \nVenue: ${response.data[0].venue.name} \nWhere: ${response.data[0].venue.city}, ${response.data[0].venue.country} \nWhen: ${moment(response.data[0].datetime).format('L')}`);
    })
    .catch(function(error){
        console.log(error);
    });
}

const movieThis = (movie) => {
    if (!movie) {
        movie = "Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function (response) {
            console.log(`Title: ${response.data.Title} \nYear: ${response.data.Year} \nIMDB rating: ${response.data.Ratings[0].Value} \nRotten Tomatoes rating: ${response.data.Ratings[1].Value} \nCountry: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);
    })
    .catch(function(error) {
        console.log(error);
    });
}

const spotifyThis = (song) => {
    if (!song) {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song }).then(function (response, err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Artist(s): ${response.tracks.items[0].artists[0].name} \nSong's name: ${response.tracks.items[0].name} \nPreview Link: ${response.tracks.items[0].preview_url} \nAlbum: ${response.tracks.items[0].album.name}`);
        }
    })
}

const readFromFile = () => {
    var arg;
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            var ff = data.split(',');
        }

        switch (ff[0]) {
            case 'concert-this': ff[1] = ff[1].replace(/\"/g,""); concertThis(ff[1]); break;
            case 'spotify-this-song': spotifyThis(ff[1]); break;
            case 'movie-this': movieThis(ff[1]); break;
        }
    })
}
function getSecondArg(strArg) {
    return strArg.slice(3).join(" ");
}

switch (command) {
    case 'concert-this': concertThis(secondArg); break;
    case 'spotify-this-song': spotifyThis(secondArg); break;
    case 'movie-this': movieThis(secondArg); break;
    case 'do-what-it-says': readFromFile(); break;
}
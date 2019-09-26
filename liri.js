require("dotenv").config();
const axios = require('axios');
const moment = require('moment');
const keys = require("./keys.js");
const fs = require('fs');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var secondArg = process.argv.slice(3).join(" ");

var mainLog;

const writeToFile = () => {
    var timestamp = moment();
    var delimiter = '***************************************************************************************************************'
    var toLog = `called <${process.argv.slice(2).join(" ")}> at <${timestamp}> with following result\n\n${mainLog}\n${delimiter}\n`;
    fs.appendFile('log.txt', toLog, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}


const concertThis = (artist) => {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            mainLog = `Artist: ${response.data[0].lineup[0]} \nVenue: ${response.data[0].venue.name} \nWhere: ${response.data[0].venue.city}, ${response.data[0].venue.country} \nWhen: ${moment(response.data[0].datetime).format('L')}`;
            console.log(mainLog);
        })
        .then(writeToFile)
        .catch(function (error) {
            console.log('Wrong artist name');
        });
}

const movieThis = (movie) => {
    if (!movie) {
        movie = "Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl)
        .then(function (response) {
            mainLog = `Title: ${response.data.Title} \nYear: ${response.data.Year} \nIMDB rating: ${response.data.Ratings[0].Value} \nRotten Tomatoes rating: ${response.data.Ratings[1].Value} \nCountry: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`;
            console.log(mainLog);
        })
        .then(writeToFile)
        .catch(function (error) {
            console.log('Wrong movie name');
        });
}

const spotifyThis = (song) => {
    if (!song) {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song }).then(function (response, err) {
        if (err) {
            console.log('Wrong song name');
        } else {
            mainLog = `Artist(s): ${response.tracks.items[0].artists[0].name} \nSong's name: ${response.tracks.items[0].name} \nPreview Link: ${response.tracks.items[0].preview_url} \nAlbum: ${response.tracks.items[0].album.name}`;
            console.log(mainLog);
        }
    })
    .then(writeToFile);
}

const readFromFile = () => {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log('Error when read from file');
        } else {
            var ff = data.split(',');
        }

        switch (ff[0]) {
            case 'concert-this': ff[1] = ff[1].replace(/\"/g, ""); concertThis(ff[1]); break;
            case 'spotify-this-song': spotifyThis(ff[1]); break;
            case 'movie-this': movieThis(ff[1]); break;
        }
    });
}

switch (command) {
    case 'concert-this': concertThis(secondArg); break;
    case 'spotify-this-song': spotifyThis(secondArg); break;
    case 'movie-this': movieThis(secondArg); break;
    case 'do-what-it-says': readFromFile(); break;
}
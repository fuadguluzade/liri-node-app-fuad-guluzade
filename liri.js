require("dotenv").config();
const axios = require('axios');
const moment = require('moment');
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

const showArtist = () => {
    var artist = getSecondArg(process.argv);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response){
        console.log(`${artist} \nVenue: ${response.data[0].venue.name} \nWhere: ${response.data[0].venue.city}, ${response.data[0].venue.country} \nWhen: ${moment(response.data[0].datetime).format('L')}`);
    });
}

const showMovie = () => {
    var movie = getSecondArg(process.argv);
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function(response){
        console.log(`Title: ${response.data.Title} \nYear: ${response.data.Year} \nIMDB rating: ${response.data.Ratings[0].Value} \nRotten Tomatoes rating: ${response.data.Ratings[1].Value} \nCountry: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);
    });
}

function getSecondArg(strArg) {
    return strArg.slice(3).join(" "); 
}

switch (command) {
    case 'concert-this' : showArtist(); break;
    case 'spotify-this-song' : break;
    case 'movie-this' : showMovie(); break;
    case 'do-what-it-says' : break;
}
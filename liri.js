//using .env rto keep keys secret
require("dotenv").config();

//global variables
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieTitle = process.argv[3];
var liriResponse = process.argv[2];


//switches for commands inputed
switch (liriResponse) {

    //gets concert name
    case "concert-this":
        var concertName = argument;
    //default value if nothing is entered
        if (concertName === ""){
            getConcertInfo("The Who");
        }

    break;
    //gets spotify song
    case "spotify-this-song":
        spotifyThisSong();
    break;
    //gets movie info
    case "movie-this":
        movieThis();

        // First gets movie title argument.
		var movieTitle = argument;

		// If no movie title provided, defaults to specific movie.
		if (movieTitle === "") {
			getMovieInfo("Mr. Nobody");

		// Else looks up song based on movie title.
		} else {
			getMovieInfo(movieTitle);
		}
    break;
    //do
     case "do-what-it-says":
        doWhatItSays();
    break;



    };

    // If no movie title provided, defaults to the movie, Mr. Nobody.
function getMovieInfo(movieTitle) {

	// Runs a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";

	request(queryUrl, function(error, response, body) {
	  // If the request is successful...
	  if (!error && response.statusCode === 200) {
	    
	    // Parses the body of the site and recovers movie info.
	    var movie = JSON.parse(body);

	    // Prints out movie info.
	    logOutput("Movie Title: " + movie.Title);
	    logOutput("Release Year: " + movie.Year);
	    logOutput("IMDB Rating: " + movie.imdbRating);
	    logOutput("Country Produced In: " + movie.Country);
	    logOutput("Language: " + movie.Language);
	    logOutput("Plot: " + movie.Plot);
	    logOutput("Actors: " + movie.Actors);

	    // Had to set to array value, as there seems to be a bug in API response,
	    // that always returns N/A for movie.tomatoRating.
	    logOutput("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
	    logOutput("Rotten Tomatoes URL: " + movie.tomatoURL);
	  }
	});
}
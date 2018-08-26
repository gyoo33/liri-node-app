require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var fourCommands = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

if (fourCommands === "my-tweets") {
    // console.log("A");

    var params = {
        screen_name: "testcsbhw",
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var showTweets = [
                    "Tweet: " + tweets[i].text,
                    "Tweeted at: " + tweets[i].created_at
                ].join("\n\n");
                console.log("\n" + showTweets + "\n");
            }
        }
    });
}
else if (fourCommands === "spotify-this-song") {
    // console.log("B");

    // Run a request ot the Spotify API with song selected
    spotify.search({ type: 'track', query: searchItem || "The Sign Ace of Base", limit: 2 }).then(function (response) {
        var song = response.tracks.items[0];
        var showSong = [
            "Artist(s): " + song.artists[0].name,
            "Song Title: " + song.name,
            "Spotify Preview Link: " + song.external_urls.spotify,
            "Album Title: " + song.album.name
        ].join("\n\n");
        console.log("\n" + showSong + "\n");
    })
        .catch(function (err) {
            console.log(err);
        });
}
else if (fourCommands === "movie-this") {
    // console.log("C");

    var movieChoice = searchItem || "Mr. Nobody";
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieChoice + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        var movie = JSON.parse(body);
        var showMovie = [
            "Movie Title: " + movie.Title,
            "Release Year: " + movie.Year,
            "IMDB Rating: " + movie.imdbRating,
            "Rotten Tomatoes Rating: " + movie.Ratings[1].Value,
            "Country Movie was Produced in: " + movie.Country,
            "Language(s): " + movie.Language,
            "Plot: " + movie.Plot,
            "Actors: " + movie.Actors
        ].join("\n\n");
        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("\n" + showMovie + "\n");
        }
    });
}
else if (fourCommands === "do-what-it-says") {
    // console.log("D");
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error)
            throw error;

        // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var showFile = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log("\n" + showFile + "\n");
    })
}

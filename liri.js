require("dotenv").config();

var request = require("request");
var fs = require("fs");

var fourCommands = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");

if (fourCommands === "my-tweets") {
    console.log("A");
}
else if (fourCommands === "spotify-this-song") {
    console.log("B");
}
else if (fourCommands === "movie-this") {

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";

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
            "Language: " + movie.Language,
            "Plot: " + movie.Plot,
            "Actors" + movie.Actors
        ].join("\n\n");
        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log(showMovie);
        }
    });
}
else if (fourCommands === "do-what-it-says") {
    console.log("D");
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error)
            throw error;

        // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
    })
}



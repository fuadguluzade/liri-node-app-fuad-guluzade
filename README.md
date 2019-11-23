# liri-node-app
This is the command line application which takes user input and returns info about movies, artists and songs the user requests.
App takes 2 arguments in the following format:
<command> <request>
Where <command> could be one of following:
concert-this : takes artist name as <request>
spotify-this-song : takes song name as <request>
movie-this : takes movie name a <request>
do-what-it-says : takes <command> and <request> from text file in app folder,named random.txt.
If request formed coorectly, answer is printed to the console and log.txt file, which is located also in app folder.

## Installing

Clone the project

```
https://github.com/fuadguluzade/liri-node-app-fuad-guluzade.git
```

Start by installing front and backend dependencies. While in project's directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>.



## Built With

- Javascript
- Spotify API

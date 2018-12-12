#Run json server

Open cmd prompt

Type: cd C:\Projects\hello-world\_test-data


object returned:

Type: node server.js


sample:
http://localhost:3000/games?tid=196&wk=2



array is returned, not an object:
Type: json-server db.json

sample:
http://localhost:3000/games
http://localhost:3000/picks




if "can't find module 'json-server' error:
1. go to your server.js directory and run npm link json-server
2. run node server.js

src: https://github.com/typicode/json-server/issues/454
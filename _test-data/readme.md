# Run json server


## Steps to run
1. Open cmd prompt

2. Run: `cd C:\Projects\hello-world\_test-data`


### object returned: (not top-level array)

3. Run: `node server.js`


sample:
http://localhost:3000/games?tid=196&wk=2



### top-level array is returned, not an object:
3. Run: `json-server db.json`

sample:
http://localhost:3000/games
http://localhost:3000/picks




## Troubleshooting
if "can't find module 'json-server' error:
1. go to your server.js directory and run `npm link json-server`
2. run `node server.js`

src: https://github.com/typicode/json-server/issues/454
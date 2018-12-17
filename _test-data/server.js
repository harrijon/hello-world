//server.js
var jsonServer = require('json-server')
var server = jsonServer.create()

var router = jsonServer.router('db.json')
//configure render method of the returned router

router.render = function (req, res) {
//do your logic here, let's say that you want to wrap the whole data in object with the key of the request query
  var resourceName = req.url.split('/')[1].split('?')[0]; // to get the resource, /people, /posts/
  var method = req. originalMethod

  var JsonRes = {}
  JsonRes[resourceName] =  res.locals.data;
  JsonRes.status = {"code": res.statusCode, result:"something"};

  res.jsonp(JsonRes)
}

var middlewares = jsonServer.defaults()
server.use(middlewares)

// server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now();
//     console.log('in POST; req: ' + req.toString());
//   }
//   // Continue to JSON Server router
//   next()
// })

server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running');
  console.log('http://localhost:3000/');
  console.log('http://localhost:3000/games');
  console.log('http://localhost:3000/picks');
  console.log('');
  console.log('');
})
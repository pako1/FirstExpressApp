const express = require('express'); //we import the express framework so that we can use express
const app = express(); // we initialize express 
const port = 8080; // we create a port - address on our local machine in order to have access to it by using localhost:8080. When more than one
// server is up then you need different ports because they cant all work on one  

//This means that our application/server is started and listens for http requests. It does a lot under the hood
//https://stackoverflow.com/questions/70384927/what-does-the-listen-method-in-express-look-like read for more info 
app.listen(port, () => {
    console.log('Listening on port 8080');
})
//The use method is called when any http request is happening. If this is active all other will be ingored because we only send one request back and since this is handling them nothing else will work
// Express is taking the information from the http and its translating it to an 
// request object which we can then access. With the response object we are creating our response that the client will receive. This could be some html or
// other information. The response object is generated from express again and it is a htpp response
/*
app.use((request, response) => {
    console.log('App is being abused')
    // response.send("Hello, we got your request"); we can send a plain text
    // response.send({ color: 'red' }); we can send a javascript object and express is making it as a json object !!
    response.send('<h1>This is my webpage</h1>')
})
*/
// we can use parameters when creating a route because alternatively we would have to create 100 or 1000 different routes.
// in order to create a 'dynamic' routs using parameters we use the column so -> /r/:path -> we go to path /r and anything after that is valid
// :path is a parameter we can access from express.
app.get('/r/:path', (request, response) => {
    const { path: subreddit } = request.params;
    response.send(`<h1>Viewing the subreddit ${subreddit}</h1>`)
})

app.get('/r/:subreddit/:postId', (request, response) => {
    const { subreddit, postId } = request.params;
    response.send(`<h1>Viewing postId ${postId} on the subreddit ${subreddit}</h1>`)
})
//if you do request / then its the root like doing localhost/ or localhost its the same. Or dasdada.com/ or dsdada.com
app.get('/', (request, response) => {
    response.send('<h1>Home</h1>')
})
//Express has a method called get that expects 1. the path 2. what it will do if the request matches ../cats
app.get('/cats', (request, response) => {
    response.send('<h1>Meow</h1>')
    //console.log('meow')
})

//Express has a method called get that expects 1. the path 2. what it will do if the request matches ../cats
app.get('/dogs', (request, response) => {
    response.send('<h1>Woof</h1>')
})
//if you need to work with queries then express prepares it for you in its request object. The only thing you need to do is 
// access the query param on the request object. Fun fact if you make a word like IneedFood it will automatically make a string with spaces
//in case you need multiple queries you just do the pattern ?x=x&y=y and then you have to deconstruct the query and you are ready to go
app.get('/search', (request, response) => {
    const { q } = request.query;
    if(!q){
        response.send(`<h1>Did not found that emptyness</h1>`);
    }
    response.send(`<h1>Search result ${q}</h1>`);
})

// * means everything. The order matters. If the * is first all others iwll be ignored. * means that anything that is not covered 
// should give the same response
app.get('*', (request, response) => {
    response.send('<h1>You got lost</h1>')
})
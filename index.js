// Stock Market Portfolio App by Patrick
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request')
const bodyParser = require('body-parser')
// Set the Port of the webhoster or on 5000
const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY pk_126fa11f22644aa3b471665f71e7220e
// create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_126fa11f22644aa3b471665f71e7220e', { json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        // console.log(body);
        finishedAPI(body);
        };
    });
};



// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

//Set Handlebar index GET route
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, "fb");

});

//Set Handlebar POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);

});

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Shows the message Server is Listening on Port ...
app.listen(PORT, () => console.log('Server Listening on port ' + PORT))

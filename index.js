// Stock Market Portfolio App By Patrick

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
// Set the Port of the webhoster or on 5000
const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

//Set Handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Shows the message Server is Listening on Port ...
app.listen(PORT, () => console.log('Server Listening on port ' + PORT))

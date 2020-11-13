const path = require('path');
const express = require('express');
const app  = express();
const request = require('request');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;

//API KEY: pk_d1bc1412c1f44ab8acd06840ad3f0e85
// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configure API
function call_api(finishedAPI) {
    request('https://cloud.iexapis.com/stable/stock/bsrc/quote?token=pk_d1bc1412c1f44ab8acd06840ad3f0e85', { json: true}, (err, res, body) => {
        if (err) { return console.log(err);}
        if(res.statusCode === 200){
            // console.log(body);
            finishedAPI(body)
        }
    });
}


app.get('/', function (req,res) {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    });

});

app.get('/about', (req, res) => {
    res.render('about');
});

// 404 Page
app.get('*', (req, res) => {
    res.render("404");
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));




app.listen(PORT, () => console.log("server listening on port "+ PORT));
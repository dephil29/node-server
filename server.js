var express = require('express');
var bodyParser = require('body-parser')
var app = express(); //creates a server beeyatch
var people = [
  {
    firstName: "Harold",
    lastName: "Potter - Wizard of Lawz",
    image: "http://www.jones-mayer.com/img/staff/HAROLD_POTTER_08292011.jpg"
},
  {
    firstName: "Mel",
    lastName: "Torme",
    image: "http://www.trbimg.com/img-547d0e4e/turbine/la-me-mel-torme-19990606"
},
  {
    firstName: "Wilfred",
    lastName: "Fizzlebang",
    image: "https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/thumb/e/e0/Wilfred_Fizzlebang_full.jpg/400px-Wilfred_Fizzlebang_full.jpg?version=00f516a3be7e2ebea716f18b84c135fc"


},
  {
    firstName: "Captain",
    lastName: "Texas",
    image: "http://i.magaimg.net/img/5w8.png"
}


];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));

app.get('/home', function(req, res) {
    console.log("Home was requested");
    res.render("index.ejs", { people: people });
});

app.post('/home', function(req, res) {
  console.log(req.body.first, req.body.last);
  res.render('index.ejs', { people: people });
});

app.get('/new', function(req, res) {
  res.render('new.ejs');
});

app.post('/new', function(req, res) {
  people.push({
    firstName: req.body.first,
    lastName: req.body.last,
    image: req.body.image
  });
  res.render('index.ejs', {people: people})
})

app.get("/about/:name", function(req, res) {
  var person = people.find(function(person) {
    return person.firstName === req.params.name;
  })
  res.render("about.ejs", { person: person });
});


app.listen(3000, function() {
    console.log("Listening on port 3000...");
});

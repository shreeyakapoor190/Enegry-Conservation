var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ipwtproject";
let express = require('express');
let server = express();
let bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: true });
server.set('view engine', 'ejs');
server.use(express.static(__dirname));
var main;
var n;
var n1;


//home
server.get('/home', function (req, res) {
    res.sendFile(__dirname + '/clean.html');
});


//creating a new user
server.post('/login', urlencodedParser, function (req, res) {
    if (req.body.usename !== undefined) {
        main = {
        name: req.body.usename, email: req.body.email, mobile: req.body.mobile, password: req.body.password,
        src: "default.jpg"
        };
        console.log(main);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("ipwtproject");
            dbo.collection('ipwtproject').insertOne(main, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }
    res.sendFile(__dirname + '/login.html');
});


//profile
server.post('/portal', urlencodedParser, function (req, res) {
    n = req.body.email1;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ipwtproject");
        dbo.collection('ipwtproject').findOne({ email: req.body.email1 }, function (err, user) {
            if (user === null) {
                res.end("Login invalid");
            }
            else if (user.email === req.body.email1 && user.password === req.body.password1) {
                res.render('completeprofile', { profileData: user });
                n=req.body.email1;
            }
            else {
                console.log("Credentials wrong");
                res.end("Login invalid");
            }
        });
    });
});


//logout funtion
server.post('/info', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});


//update function
server.post('/update', function (req, res) {
    res.sendFile(__dirname + '/update.html');
});


//veryfying for update
server.post('/updation', urlencodedParser, function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ipwtproject");
        dbo.collection('ipwtproject').findOne({ email: req.body.username1 }, function (err, user) {
            console.log(req.body.user);
            if (user === null) {
                res.end("Login invalid");
            }
            else if (user.email == req.body.username1 && user.password == req.body.password1) {
                res.render('updateprofile', { profileData: user });
            }
            else {
                console.log("Credentials wrong");
                res.end("Login invalid");
            }
        });
        n1 = { email: req.body.username1 };
    });
});


//update complete
server.post('/updated', urlencodedParser, function (req, res) {
    main = { name: req.body.name2, email: req.body.emailaddress2, mobile: req.body.mobile2, password: req.body.password2, src: req.body.source };
    console.log(main);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ipwtproject");
        var myquery = n1;
        var newvalues = { $set: { name: req.body.name2, email: req.body.emailaddress2, mobile: req.body.mobile2, password: req.body.password2, src: req.body.source } };
        dbo.collection("ipwtproject").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
    res.render('completeprofile', { profileData: main });
});


//delete user
server.post('/delete', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ipwtproject");
        var myquery = { email: n };
        dbo.collection("ipwtproject").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
    res.sendFile(__dirname + '/clean.html');
});


//search user   
server.post('/search', urlencodedParser, function (req, res) {
    var name = req.body.search;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ipwtproject");
        dbo.collection('ipwtproject').findOne({ name: req.body.search }, function (err, user) {
            if (user === null) {
                res.end("Login invalid");
            }
            else if (user.name === req.body.search) {
                res.render('search2', { profileData: user });
            }
            else {
                console.log("Credentials wrong");
                res.end("Login invalid");
            }
        });
    });
});


server.listen(3000);
console.log('server created');
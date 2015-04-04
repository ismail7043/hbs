var hbsextension = require("./hbs_server_extension.js");
var restify = require('restify');
var mongojs = require('mongojs');
//var db = mongojs('mongodb://admin:admin123@ds053718.mongolab.com:53718/restifymyapp', ['products']);
//var db1=mongojs('mongodb://ismail:open123@localhost/hbs',['customer']);
//var db1 = mongojs('hbs', ['customer']);

db.on('error',function(err) {
    console.log('database error', err);
});

db.on('ready',function() {
    console.log('database connected');
});

// Server
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.listen(3000, function () {
    console.log("HBS Server started @ 3000");
});

//wellcome greetings
server.get("/", function (req, res, next) {
    
    var message = {
     mesage_type: "greeting",
     message: "wellcome to HBS json server"
    };
    res.writeHead(200,{
            'Content-Type': 'application/json; charset=utf-8'
    });
    //res.send("wellcome to json server");
    res.end(JSON.stringify(message));
    return next();
});

//list all customer
server.get("/customers", function (req, res, next) {
    db1.customer.find(function (err, customer) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(customer));
    });
    return next();
});

//list all client
server.get("/clients", function (req, res, next) {
    db1.client.find(function (err, customer) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(customer));
    });
    return next();
});

//post a customer
server.post('/customer', function (req, res, next) {
    var customer = req.params;
    db1.customer.save(customer,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});

//post a client
server.post('/client', function (req, res, next) {
    var client = req.params;
    db1.client.save(client,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});

//update a customer
server.put('/customer/:id', function (req, res, next) {
    // get the existing customer
    db1.customer.findOne({
        customer_id: req.params.id
    }, function (err, data) {
        // merge req.params/customer with the server/customer
 
        var updcustomer = {}; // updated client 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updcustomer[n] = data[n];
        }
        for (var n in req.params) {
            updcustomer[n] = req.params[n];
        }
        db1.customer.update({
            customer_id: req.params.id
        }, updcustomer, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

//update a client
server.put('/client/:id', function (req, res, next) {
    // get the existing client
    db1.client.findOne({
        client_id: req.params.id
    }, function (err, data) {
        // merge req.params/client with the server/client
 
        var updclient = {}; // updated client 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updclient[n] = data[n];
        }
        for (var n in req.params) {
            updclient[n] = req.params[n];
        }
        db1.client.update({
            client_id: req.params.id
        }, updclient, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

//delete a customer
server.del('/customer/:id', function (req, res, next) {
    db1.customer.remove({
        customer_id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

//delete a client
server.del('/client/:id', function (req, res, next) {
    db1.client.remove({
        client_id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

//get a single customer
server.get('/customer/:id', function (req, res, next) {
    db1.customer.findOne({
        customer_id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

//get a single client
server.get('/client/:id', function (req, res, next) {
    db1.client.findOne({
        client_id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

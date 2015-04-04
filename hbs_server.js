var restify = require('restify');
var mongojs = require('mongojs');

var db1 = mongojs('ismail:open123@localhost/hbs', ['customer','clientlist','bookings']);

db1.on('error',function(err) {
    console.log('database error', err);
});

db1.on('ready',function() {
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
    db1.clientlist.find(function (err, client) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(client));
    });
    return next();
});

//list all bookings
server.get("/bookings", function (req, res, next) {
    db1.bookings.find(function (err, booking) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(booking));
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
    db1.clientlist.save(client,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});

//post a booking
server.post('/booking', function (req, res, next) {
    var booking = req.params;
    db1.bookings.save(booking,
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
    db1.clientlist.findOne({
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
        db1.clientlist.update({
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

//update a booking
server.put('/booking/:id', function (req, res, next) {
    // get the existing client
    db1.bookings.findOne({
        booking_id: req.params.id
    }, function (err, data) {
        // merge req.params/client with the server/client
 
        var updbooking = {}; // updated client 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updbooking[n] = data[n];
        }
        for (var n in req.params) {
            updbooking[n] = req.params[n];
        }
        db1.bookings.update({
            booking_id: req.params.id
        }, updbooking, {
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
    db1.clientlist.remove({
        client_id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

//delete a booking
server.del('/booking/:id', function (req, res, next) {
    db1.bookings.remove({
        booking_id: req.params.id
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
    db1.clientlist.findOne({
        client_id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

//get a single booking
server.get('/booking/:id', function (req, res, next) {
    db1.bookings.findOne({
        booking_id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

var restify = require('restify');
//var server = require('./server');
var client = restify.createJsonClient({
	url: 'http://50.56.218.130:3000'
});
// a static customer to CREATE READ UPDATE DELETE
var testCustomer = {
	customer_id: "10019",
	customer_name: "Hisingen hairdresser",
	location: {
		latitude: "123456",
		longitude: "84785"
	},
	url: "http://test.example.com",
	contact: {
		phone: "7848732",
		email: "info@gmail.com",
		address: {
			street: "clean street 67",
			postcode: "41873",
			city: "Gothenburg"
		}
	}
};
// a static client to CREATE READ UPDATE DELETE
var testClient = {
	client_id: "10001",
	client_name: "Md. Ismail Fakir",
	contact: {
		phone: "+46704358842",
		email: "ismail7043@yahoo.com",

	}
};

// a static booking to CREATE READ UPDATE DELETE
var testBooking = {
	booking_id: "15001",
	customer_id: "123456",
	client_id: "10001",
	booking_date: "2015-03-17",
	start_time: "10:30",
	end_time: "11:00"
};
//add a booking
for (i = 0; i < 10; i++) {
	if (i % 2 == 0) {
		testBooking.booking_id = "bk_id_00" + i;
		testBooking.booking_date = new Date();
		testBooking.start_time = "1" + i;
		testBooking.end_time = "1" + (i + 1);
		testBooking.customer_id = "100" + i;
		testBooking.client_id = "1500" + i;
	} else {
		testBooking.booking_id = "bk_id_00" + i*9;
		testBooking.booking_date = new Date();
		testBooking.start_time = "1" + (i+7);
		testBooking.end_time = "1" + (i + 8);
		testBooking.customer_id = "110" + i + 3;
		testBooking.client_id = "1700"+i+3;
	}
	client.post('/booking', testBooking, function (err, req, res, client) {
		if (err) {
			console.log("An error ocurred >>>>>>");
			console.log(err);
		} else {
			console.log('client saved >>>>>>>');
			console.log(client);
		}
	});
}
//add a client
/*for (i = 0; i < 100; i++) {
	if (i % 2 == 0) {
		testClient.client_id="1500"+i;
		testClient.client_name="Client_"+i+100;
		testClient.contact.email="client"+i+"@example.com";
		testClient.contact.phone="070466"+i+9;
	}else {
		testClient.client_id="1700"+i+3;
		testClient.client_name="Client_"+i+69;
		testClient.contact.email="client"+i+"@test.com";
		testClient.contact.phone="073466"+i+7;
	}
	client.post('/client', testClient, function (err, req, res, client) {
		if (err) {
			console.log("An error ocurred >>>>>>");
			console.log(err);
		} else {
			console.log('client saved >>>>>>>');
			console.log(client);
		}
	});
}*/
//add a customer
/*
for (i = 0; i < 100; i++) {
	if (i % 2 == 0) {
		testCustomer.customer_id = "100" + i;
		testCustomer.customer_name = "Customer_" + i;
		testCustomer.location.latitude = "1010" + i + 2;
		testCustomer.location.longitude = "3030" + i + 3;
		testCustomer.url = "http://www.example@test.com/id" + i;
		testCustomer.contact.phone = "070435884" + i + 10;
		testCustomer.contact.email = "info" + i + 10 + "@test.com";
		testCustomer.contact.address.postcode = "4187" + i;
		testCustomer.contact.address.street = "goteborg gatan " + i + 4;
		testCustomer.contact.address.city = "Gothenburg";

	} else {
		testCustomer.customer_id = "110" + i + 3;
		testCustomer.customer_name = "Customer_" + i;
		testCustomer.location.latitude = "1010" + i + 4;
		testCustomer.location.longitude = "1030" + i + 3;
		testCustomer.url = "http://www.test@example.com/id" + i;
		testCustomer.contact.phone = "073035800" + i + 7;
		testCustomer.contact.email = "connect" + i + 6 + "@test.com";
		testCustomer.contact.address.postcode = "4285" + i;
		testCustomer.contact.address.street = "Östrahamngatan " + i + 2;
		testCustomer.contact.address.city = "Lund";
	}

	client.post('/customer', testCustomer, function (err, req, res, customer) {
		if (err) {
			console.log("An error ocurred >>>>>>");
			console.log(err);
		} else {
			console.log('Product saved >>>>>>>');
			console.log(customer);
		}
	});
}*/

/*client.post('/customer', testCustomer, function (err, req, res, customer) {
if (err) {
console.log("An error ocurred >>>>>>");
console.log(err);
} else {
console.log('Product saved >>>>>>>');
console.log(customer);
}
});*/

//update a customer
/*
testCustomer.contact.email = "ismail7043@yahoo.com",
client.put('/customer/' + testCustomer.customer_id, testCustomer, function (err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(status);
    }
 
});*/
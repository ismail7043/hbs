var restify = require('restify');
var client = restify.createJsonClient({
	url: 'http://127.0.0.1:3000' //server url
});

// a static customer to CREATE READ UPDATE DELETE
var testCustomer = {
	customer_id: "1001",
	customer_name: "Customer Name",
	location: {
		latitude: "123456",
		longitude: "84785"
	},
	url: "http://test.example.com",
	contact: {
		phone: "7848732",
		email: "info@test.com",
		address: {
			street: "Some where in the World",
			postcode: "Solar system",
			city: "Universe"
		}
	}
};

//add a customer
client.post('/customer', testCustomer, function (err, req, res, customer) {
	if (err) {
		console.log("An error ocurred >>>>>>");
		console.log(err);
	} else {
		console.log('Customer saved >>>>>>>');
		console.log(customer);
	}
});
}

//update a existing customer
testCustomer.customer_id = "1001";
testCustomer.contact.email = "info@example.com",
	client.put('/customer/' + testCustomer.customer_id, testCustomer, function (err, req, res, status) {
		if (err) {
			console.log("An error ocurred >>>>>>");
			console.log(err);
		} else {
			console.log('Product saved >>>>>>>');
			console.log(status);
		}

	});
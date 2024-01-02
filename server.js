const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  return 1400;
};

app.post("/create-payment", async (req, res) => {
  const { items } = req.body;

  /*
     If you have two or more “business_country” + “business_label” pairs configured in your Hyperswitch dashboard,
     please pass the fields business_country and business_label in this request body.
     For accessing more features, you can check out the request body schema for payments-create API here :
     https://api-reference.hyperswitch.io/docs/hyperswitch-api-reference/60bae82472db8-payments-create
  */

  const hyperswitch_url = "https://sandbox.hyperswitch.io/payments";
  const hyperswitch_api_key = "HYPERSWITCH_API_KEY"; // Replace with your actual API key provided by Hyperswitch

  const payload = {
    currency: 'USD',
    amount: 2999,
    confirm: false,
    capture_method: 'automatic',
    authentication_type: 'no_three_ds',
    customer_id: 'hyperswitch_sdk_demo_id',
    description: 'Joseph First Crypto',
    shipping: {
      address: {
        line1: '1467',
        line2: 'Harrison Street',
        line3: 'Harrison Street',
        city: 'San Fransico',
        state: 'California',
        zip: '94122',
        country: 'US',
        first_name: 'joseph',
        last_name: 'Doe',
      },
      phone: {
        number: '1234567890',
        country_code: '+91',
      },
    },
    billing: {
      address: {
        line1: '1467',
        line2: 'Harrison Street',
        line3: 'Harrison Street',
        city: 'San Fransico',
        state: 'California',
        zip: '94122',
        country: 'US',
        first_name: 'joseph',
        last_name: 'Doe',
      },
      phone: {
        number: '1234567890',
        country_code: '+91',
      },
    },
    metadata: {
      order_details: {
        product_name: 'Apple iphone 15',
        quantity: 1,
      },
    },
    business_country: 'US',
    business_label: 'default',
  }

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "api-key": hyperswitch_api_key,
  };

  try {
    const response = await fetch(hyperswitch_url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    res.send({
      client_secret: data.client_secret,
    });
  } catch (error) {
    res.send({
      error: error.message || "Unknown error occurred",
    });
  }
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));

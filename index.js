// Using Express
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/apikeys
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51M1UhkKUlMLCn1xU0f5iNBRT2eMHHZdpmShyLHVHKiFg291XqMkKOV6zGNjalCpoc96wpV84cv12CukMTz8kuHxo00bpMWFXef');

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
const endpointSecret = 'we_1M4iSNKUlMLCn1xUmasd998c';

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
    console.log('called webhook')
    const sig = request.headers['stripe-signature'];

    let event;
    // Verify webhook signature and extract the event.
    // See https://stripe.com/docs/webhooks/signatures for more information.
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log('obtained event',event);

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const connectedAccountId = event.account;
        handleSuccessfulPaymentIntent(connectedAccountId, paymentIntent);
    }

    response.json({received: true});
});

const handleSuccessfulPaymentIntent = (connectedAccountId, paymentIntent) => {
    // Fulfill the purchase.
    console.log('Connected account ID: ' + connectedAccountId);
    console.log(JSON.stringify(paymentIntent));
}

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

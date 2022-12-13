// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

const stripe = require('stripe');
const express = require('express');
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_JLJwb4X9TD05k5TJ0t6a4LDxxtRkG6xb";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.amount_capturable_updated':
            const paymentIntent = event.data.object;
            console.log('paymentIntent1', paymentIntent)
            // Then define and call a function to handle the event payment_intent.amount_capturable_updated
            break;
        case 'payment_intent.canceled':
            const paymentIntent1 = event.data.object;
            console.log('paymentIntent1', paymentIntent1)
            // Then define and call a function to handle the event payment_intent.canceled
            break;
        case 'payment_intent.created':
            const paymentIntent2 = event.data.object;
            console.log('paymentIntent2', paymentIntent2)
            // Then define and call a function to handle the event payment_intent.created
            break;
        case 'payment_intent.partially_funded':
            const paymentIntent3 = event.data.object;
            console.log('paymentIntent3', paymentIntent3)
            // Then define and call a function to handle the event payment_intent.partially_funded
            break;
        case 'payment_intent.payment_failed':
            const paymentIntent4 = event.data.object;
            console.log('paymentIntent4', paymentIntent4)
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
        case 'payment_intent.processing':
            const paymentIntent5 = event.data.object;
            console.log('paymentIntent5', paymentIntent5)
            // Then define and call a function to handle the event payment_intent.processing
            break;
        case 'payment_intent.requires_action':
            const paymentIntent6 = event.data.object;
            console.log('paymentIntent6', paymentIntent6)
            // Then define and call a function to handle the event payment_intent.requires_action
            break;
        case 'payment_intent.succeeded':
            const paymentIntent7 = event.data.object;
            console.log('paymentIntent7', paymentIntent7)
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));

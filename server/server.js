require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

// Initialize Firebase Admin (ensure you have the service account key if running outside Google Cloud)
// For local testing, we assume GOOGLE_APPLICATION_CREDENTIALS is set or initialized with a service account file
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  // Fallback to default credentials or mock for testing without crashing immediately
  admin.initializeApp();
}

const db = admin.firestore();
const app = express();

// Enable CORS for frontend
app.use(cors({ origin: 'https://aifounderblueprint.com.au' }));

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Endpoint to create a Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { applicationId, amount, currency, productName } = req.body;

    if (!applicationId || !amount || !currency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const paymentMethods = currency.toLowerCase() === 'inr' ? ['card', 'upi'] : ['card'];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName || 'The AI Founder Blueprint Enrollment',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/apply',
      metadata: {
        applicationId: applicationId
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook Endpoint to securely update Firestore status
// Note: This requires express.raw() to parse the body for Stripe's signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const applicationId = session.metadata.applicationId;

    if (applicationId) {
      console.log(`Payment successful for Application ID: ${applicationId}`);

      try {
        // Query Firestore to find the document with matching applicationId
        const applicationsRef = db.collection('applications');
        const snapshot = await applicationsRef.where('applicationId', '==', applicationId).get();

        if (snapshot.empty) {
          console.error(`No matching application found for ID: ${applicationId}`);
        } else {
          // Update the status to 'paid'
          const docId = snapshot.docs[0].id;
          await applicationsRef.doc(docId).update({ status: 'paid' });
          console.log(`Successfully updated application ${applicationId} to 'paid'.`);
        }
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Node server listening on port ${PORT}`);
});

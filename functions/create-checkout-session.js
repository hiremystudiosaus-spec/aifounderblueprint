import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Initialize Stripe with Cloudflare's fetch HTTP client
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
    apiVersion: '2023-10-16', // or current stable
  });

  try {
    const body = await request.json();
    const { applicationId, amount, currency, productName } = body;

    if (!applicationId || !amount || !currency) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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
      success_url: 'https://aifounderblueprint.com.au/success',
      cancel_url: 'https://aifounderblueprint.com.au/apply',
      metadata: {
        applicationId: applicationId
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

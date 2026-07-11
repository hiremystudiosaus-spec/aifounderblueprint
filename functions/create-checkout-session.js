export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { applicationId, amount, currency, productName } = body;

    if (!applicationId || !amount || !currency) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prepare x-www-form-urlencoded data for Stripe REST API
    const params = new URLSearchParams();
    
    // Add payment methods
    params.append('payment_method_types[0]', 'card');
    if (currency.toLowerCase() === 'inr') {
      params.append('payment_method_types[1]', 'upi');
    }

    params.append('line_items[0][price_data][currency]', currency);
    params.append('line_items[0][price_data][product_data][name]', productName || 'The AI Founder Blueprint Enrollment');
    params.append('line_items[0][price_data][unit_amount]', amount.toString());
    params.append('line_items[0][quantity]', '1');
    params.append('mode', 'payment');
    params.append('success_url', 'https://aifounderblueprint.com.au/success');
    params.append('cancel_url', 'https://aifounderblueprint.com.au/apply');
    params.append('metadata[applicationId]', applicationId);

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (!stripeResponse.ok) {
      const errorData = await stripeResponse.json();
      throw new Error(errorData.error?.message || 'Failed to create session');
    }

    const session = await stripeResponse.json();

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

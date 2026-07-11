// Verify Stripe Webhook Signature natively using Web Crypto API
async function verifyStripeSignature(payload, sigHeader, secret) {
  const parts = sigHeader.split(',').reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key] = value;
    return acc;
  }, {});

  const timestamp = parts['t'];
  const signature = parts['v1'];

  if (!timestamp || !signature) {
    throw new Error('Invalid signature header format');
  }

  const signedPayload = `${timestamp}.${payload}`;
  const encoder = new TextEncoder();
  
  // Import the webhook secret
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  // Convert hex signature to Uint8Array
  const signatureBytes = new Uint8Array(
    signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
  );

  // Verify
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(signedPayload)
  );

  if (!isValid) {
    throw new Error('Signature verification failed');
  }
  return true;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  const sig = request.headers.get('stripe-signature');
  if (!sig) return new Response("Missing signature", { status: 400 });

  const bodyText = await request.text();

  try {
    // Verify payload is actually from Stripe
    await verifyStripeSignature(bodyText, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const event = JSON.parse(bodyText);

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const applicationId = session.metadata?.applicationId;

    if (applicationId) {
      console.log(`Payment successful for Application ID: ${applicationId}`);
      
      const projectId = env.VITE_FIREBASE_PROJECT_ID;
      const apiKey = env.VITE_FIREBASE_API_KEY;
      
      if (!projectId || !apiKey) {
        console.error("Missing Firebase env variables in Cloudflare settings");
        return new Response("Missing Firebase env variables", { status: 500 });
      }

      const queryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`;
      
      const queryPayload = {
        structuredQuery: {
          from: [{ collectionId: "applications" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "applicationId" },
              op: "EQUAL",
              value: { stringValue: applicationId }
            }
          },
          limit: 1
        }
      };

      try {
        const queryRes = await fetch(queryUrl, {
          method: 'POST',
          body: JSON.stringify(queryPayload),
          headers: { 'Content-Type': 'application/json' }
        });
        
        const queryData = await queryRes.json();
        
        if (queryData && queryData.length > 0 && queryData[0].document) {
          const docName = queryData[0].document.name; 
          
          const updateUrl = `https://firestore.googleapis.com/v1/${docName}?updateMask.fieldPaths=status&key=${apiKey}`;
          
          const updatePayload = {
            fields: {
              status: { stringValue: "paid" }
            }
          };
          
          await fetch(updateUrl, {
            method: 'PATCH',
            body: JSON.stringify(updatePayload),
            headers: { 'Content-Type': 'application/json' }
          });
          
          console.log(`Successfully updated application ${applicationId} to 'paid' via REST.`);
        } else {
          console.error(`No document found for Application ID: ${applicationId}`);
        }
      } catch (e) {
        console.error("Firestore REST API Error:", e.message);
      }
    }
  }

  return new Response("OK", { status: 200 });
}

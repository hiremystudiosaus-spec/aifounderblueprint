import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
    apiVersion: '2023-10-16',
  });

  const sig = request.headers.get('stripe-signature');
  const bodyText = await request.text();
  let event;

  try {
    // In Edge environments, use constructEventAsync
    event = await stripe.webhooks.constructEventAsync(bodyText, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const applicationId = session.metadata?.applicationId;

    if (applicationId) {
      console.log(`Payment successful for Application ID: ${applicationId}`);
      
      // Update Firebase using REST API to avoid Firebase Admin SDK node compatibility issues in Edge
      // We will use a structured query to find the document ID, then patch it
      
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
          const docName = queryData[0].document.name; // e.g. projects/.../documents/applications/ID
          
          // Patch the document to update status to "paid"
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

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/Button';
import Card from '../components/Card';

function Success() {
  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <Helmet>
        <title>Payment Successful - The AI Founder Blueprint</title>
      </Helmet>
      
      <Card style={{ backgroundColor: 'var(--color-secondary-light)', textAlign: 'center', padding: '48px', maxWidth: '600px', width: '100%' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
        <h2 className="h2-display" style={{ marginBottom: '16px', color: 'var(--color-primary-dark)' }}>Payment Successful!</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '32px', color: '#4C211B' }}>
          Welcome to The AI Founder Blueprint. Your enrollment fee has been successfully processed, and your application status is now confirmed. We will email you the next steps shortly.
        </p>
        <Button to="/" variant="primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>Return to Homepage</Button>
      </Card>
    </div>
  );
}

export default Success;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { countriesData } from '../data/countries';
import Button from '../components/Button';
import Card from '../components/Card';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const countryPriceMap = {
  "United States": { display: "US$397", currency: "usd", amount: 39700 },
  "Canada": { display: "CA$547", currency: "cad", amount: 54700 },
  "United Kingdom": { display: "£297", currency: "gbp", amount: 29700 },
  "Australia": { display: "A$597", currency: "aud", amount: 59700 },
  "India": { display: "₹19,999", currency: "inr", amount: 1999900 }
};

function Apply() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    mobileNumber: '',
    course: 'The AI Founder Blueprint',
    city: '',
    country: 'United States', // Default for +1
    educationLevel: '',
    university: '',
    requireInternship: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState(null);
  const [submittedPriceObj, setSubmittedPriceObj] = useState(null);

  const handleCountryCodeChange = (e) => {
    const code = e.target.value;
    const selectedCountry = countriesData.find(c => c.code === code);
    setFormData(prev => ({
      ...prev,
      countryCode: code,
      country: selectedCountry ? selectedCountry.name : ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateApplicationId = () => {
    return 'EN' + Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation to provide explicit feedback
    if (!formData.name || !formData.email || !formData.mobileNumber || !formData.city || !formData.educationLevel || !formData.university || !formData.requireInternship) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Submit button clicked, starting submission process...");

    setIsSubmitting(true);

    const priceObj = countryPriceMap[formData.country] || countryPriceMap["United States"];
    const uniqueId = generateApplicationId();

    const applicationPayload = {
      ...formData,
      price: priceObj.display,
      currency: priceObj.currency,
      status: 'user',
      applicationId: uniqueId,
      submittedAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "applications"), applicationPayload);
      console.log('Application submitted:', applicationPayload);
      setSubmittedAppId(uniqueId);
      setSubmittedPriceObj(priceObj);
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an issue submitting your application. Please check your Firebase configuration and try again.");
      setIsSubmitting(false);
    }
  };


  const handlePayment = () => {
    const params = new URLSearchParams({
      course: formData.course || '',
      price: submittedPriceObj?.amount || '',
      currency: submittedPriceObj?.currency || 'usd',
      plan: 'full',
      email: formData.email || '',
      name: formData.name || '',
      cancelled: 'false',
      applicationId: submittedAppId || ''
    });
    
    window.location.href = `https://pay.aifounderblueprint.com.au/checkout?${params.toString()}`;
  };

  if (isSubmitted) {
    return (
      <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <Card style={{ backgroundColor: 'var(--color-secondary-light)', textAlign: 'center', padding: '48px', maxWidth: '600px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
          <h2 className="h2-display" style={{ marginBottom: '16px' }}>Application Received!</h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '32px' }}>
            Thank you for applying, {formData.name}. To finalize your enrollment and secure your spot, please complete the payment below.
          </p>
          <Button onClick={handlePayment} variant="primary" style={{ padding: '16px 32px', fontSize: '1.25rem', width: '100%' }}>
            {`Pay the Enrollment Fee (${submittedPriceObj?.display})`}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '48px 0' }}>
      <Helmet>
        <title>Apply Now - The AI Founder Blueprint</title>
        <meta name="description" content="Apply for The AI Founder Blueprint online course." />
      </Helmet>

      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <h1 className="h1-display" style={{ marginBottom: '16px' }}>Course Application</h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>Fill out the form below to secure your spot.</p>
        </div>

        <Card style={{ backgroundColor: 'var(--color-secondary-light)', padding: '32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div className="form-group">
              <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--color-primary-dark)', fontSize: '1rem' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--color-primary-dark)', fontSize: '1rem' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Mobile Number *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleCountryCodeChange}
                  style={{ padding: '12px', borderRadius: '8px', border: '2px solid var(--color-primary-dark)', fontSize: '1rem', width: '30%', backgroundColor: 'white' }}
                >
                  {countriesData.map(country => (
                    <option key={country.name} value={country.code}>
                      {country.code} ({country.name})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Phone Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  style={{ width: '70%', padding: '12px', borderRadius: '8px', border: '2px solid var(--color-primary-dark)', fontSize: '1rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="city" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--color-primary-dark)', fontSize: '1rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="country" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  readOnly
                  value={formData.country}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #ccc', fontSize: '1rem', backgroundColor: '#eee', color: '#666' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="course" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Course</label>
              <select
                id="course"
                name="course"
                disabled
                value={formData.course}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #ccc', fontSize: '1rem', backgroundColor: '#eee', color: '#666' }}
              >
                <option value="The AI Founder Blueprint">The AI Founder Blueprint</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="educationLevel" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Education Level *</label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--color-primary-dark)', fontSize: '1rem', backgroundColor: 'white' }}
              >
                <option value="" disabled>Select highest level of education</option>
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate/PhD">Doctorate / PhD</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="university" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>University/College *</label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--color-primary-dark)', fontSize: '1rem' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Do you require an internship after completing the course? *</label>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.125rem' }}>
                  <input
                    type="radio"
                    name="requireInternship"
                    value="Yes"
                    checked={formData.requireInternship === 'Yes'}
                    onChange={handleChange}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary-accent)' }}
                  />
                  Yes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.125rem' }}>
                  <input
                    type="radio"
                    name="requireInternship"
                    value="No"
                    checked={formData.requireInternship === 'No'}
                    onChange={handleChange}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary-accent)' }}
                  />
                  No
                </label>
              </div>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--bg-alt)', borderRadius: '8px', border: '1px solid #ccc', textAlign: 'center' }}>
              <p style={{ fontSize: '1.125rem', marginBottom: '8px', fontWeight: '500' }}>Your Course Investment:</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}>
                {(countryPriceMap[formData.country] || countryPriceMap["United States"]).display}
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Button onClick={handleSubmit} disabled={isSubmitting} type="submit" variant="primary" style={{ padding: '16px 48px', fontSize: '1.25rem', width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Apply;

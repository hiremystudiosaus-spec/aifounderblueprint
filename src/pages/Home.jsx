import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Accordion from '../components/Accordion';

function Home() {
  return (
    <>
      {/* Section 2: The Internship Highlight (Banner) */}
      <section style={{ backgroundColor: 'var(--color-primary-accent)', color: 'var(--color-secondary-light)', borderBottom: 'var(--border-thick)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-secondary-light)' }}>Get a Real Chance at an Internship</h3>
            <p style={{ fontSize: '1rem', opacity: 0.9 }}>
              When you join and complete this course, you get a real chance at an internship opportunity with hiremystudios and AquariusAI — our companies based in Australia. This isn't just learning. It's a real step into your career.
            </p>
          </div>
          <img src="/internship_image.png" alt="Internship Opportunity" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', border: '2px solid var(--color-primary-dark)', boxShadow: '4px 4px 0px var(--color-primary-dark)' }} />
        </div>
      </section>

      {/* Section 1: Hero Section */}
      <section className="section-padding text-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-glow-container">
          <div className="ambient-glow glow-1"></div>
          <div className="ambient-glow glow-2"></div>
        </div>
        <div className="container grid-2" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-content-col">
            <div className="neo-badge" style={{ marginBottom: '32px' }}>
              <span style={{ color: 'var(--color-primary-accent)', marginRight: '8px' }}>New!</span> The AI Founder Blueprint
            </div>
            <h1 className="h1-display" style={{ marginBottom: '24px' }}>
              Build a Real Website + App With AI — and Get Your First Paying Customer
            </h1>
            <p className="subtitle" style={{ marginBottom: '40px', color: '#4C211B' }}>
              In just 26 days, learn to build real products with AI — no coding background needed. Then learn how to actually get customers.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button variant="primary" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>Join The Course</Button>
              <Button variant="secondary" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>Watch Free Lessons</Button>
            </div>
          </div>
          <div>
            <img src="/hero_image.png" alt="Building with AI" style={{ width: '100%', borderRadius: '24px', border: 'var(--border-thick)', boxShadow: '8px 8px 0px var(--color-primary-accent)', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Section 3: Who This Is For */}
      <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-card-blue)', borderTop: 'var(--border-thick)', borderBottom: 'var(--border-thick)' }}>
        <div className="container grid-2">
          <div>
            <h2 className="h2-display" style={{ marginBottom: '24px' }}>This Is For You If…</h2>
          </div>
          <Card style={{ backgroundColor: 'var(--color-secondary-light)', border: 'var(--border-thick)', boxShadow: '8px 8px 0px var(--color-primary-accent)' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', fontSize: '1.125rem', fontWeight: '500' }}>
                <span style={{ color: 'var(--color-primary-accent)', fontSize: '1.5rem' }}>✔</span> You want to build your own website or app but you're not a coder.
              </li>
              <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', fontSize: '1.125rem', fontWeight: '500' }}>
                <span style={{ color: 'var(--color-primary-accent)', fontSize: '1.5rem' }}>✔</span> You've watched endless tutorials and still haven't built anything real.
              </li>
              <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', fontSize: '1.125rem', fontWeight: '500' }}>
                <span style={{ color: 'var(--color-primary-accent)', fontSize: '1.5rem' }}>✔</span> You want to build something that actually makes money, not just a certificate.
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Section 4: What You'll Learn / Outcomes */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-alt)', borderBottom: 'var(--border-thick)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <h2 className="h2-display" style={{ marginBottom: '16px' }}>What You'll Walk Away With</h2>
          </div>
          <div className="grid-3">
            <Card style={{ backgroundColor: 'var(--color-secondary-light)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🌐</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>A real website built with AI</h3>
            </Card>
            <Card style={{ backgroundColor: 'var(--bg-card-green)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📱</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>A mobile app built with FlutterFlow — no heavy coding</h3>
            </Card>
            <Card style={{ backgroundColor: 'var(--bg-card-blue)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🧠</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Smart AI features people will actually pay for</h3>
            </Card>
            <Card style={{ backgroundColor: 'var(--bg-card-blue)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>💳</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Payments and subscriptions set up so you can earn</h3>
            </Card>
            <Card style={{ backgroundColor: 'var(--color-secondary-light)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📈</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Marketing skills: SEO, Google Business Profile, Ads, Social Media</h3>
            </Card>
            <Card style={{ backgroundColor: 'var(--bg-card-green)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🤝</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>A real system to find and close your first customers</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <Card style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-secondary-light)', padding: '64px', border: 'none', boxShadow: 'none' }}>
            <h2 className="h2-display" style={{ color: 'var(--color-secondary-light)', marginBottom: '24px' }}>26 Days. 1–2 Hours a Day. One Real Product.</h2>
            <p style={{ fontSize: '1.25rem', color: '#FAECC6', opacity: 0.9, lineHeight: '1.8' }}>
              You don't learn dev in one corner and marketing in another. Across 26 days you build ONE real product — a website, a matching mobile app, payments, and AI features — then run a real campaign to get your first user. By the end, you have something live you can show.
            </p>
          </Card>
        </div>
      </section>

      {/* Section 6: The Course Breakdown */}
      <section id="course" className="section-padding" style={{ backgroundColor: 'var(--bg-alt)', borderTop: 'var(--border-thick)', borderBottom: 'var(--border-thick)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="h2-display text-center" style={{ marginBottom: '48px' }}>Your 26-Day Journey</h2>
          
          <Accordion title="Phase 1 (Days 1–3): Foundation & Mindset" bgColor="var(--color-secondary-light)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Pick your product and plan it.</p>
          </Accordion>
          <Accordion title="Phase 2 (Days 4–9): AI Web Development" bgColor="var(--bg-card-green)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Build your website with AI.</p>
          </Accordion>
          <Accordion title="Phase 3 (Days 10–13): Mobile App With FlutterFlow" bgColor="var(--bg-card-blue)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Build your app.</p>
          </Accordion>
          <Accordion title="Phase 4 (Days 14–15): Real AI Features" bgColor="var(--color-secondary-light)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Add AI people will pay for.</p>
          </Accordion>
          <Accordion title="Phase 5 (Days 16–18): Payments & Launch" bgColor="var(--bg-card-green)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Go live and start earning.</p>
          </Accordion>
          <Accordion title="Phase 6 (Days 19–21): SEO & Local Search" bgColor="var(--bg-card-blue)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Get found on Google.</p>
          </Accordion>
          <Accordion title="Phase 7 (Days 22–23): Ads & Social Media" bgColor="var(--color-secondary-light)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Bring in traffic.</p>
          </Accordion>
          <Accordion title="Phase 8 (Days 24–25): Sales & Customers" bgColor="var(--bg-card-green)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Land your first clients.</p>
          </Accordion>
          <Accordion title="Phase 9 (Day 26): Launch Day" bgColor="var(--bg-card-blue)">
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Go live with a real campaign.</p>
          </Accordion>
        </div>
      </section>

      {/* Section 7 & 10: Why This Course Is Different / About */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container grid-2">
          <div style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              top: '16px', 
              left: '16px', 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'var(--color-primary-dark)', 
              borderRadius: '24px', 
              zIndex: 0 
            }}></div>
            <img 
              src="/team_image.png" 
              alt="The Team Behind It" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                position: 'relative', 
                zIndex: 1, 
                borderRadius: '24px', 
                border: 'var(--border-thick)',
                objectFit: 'cover',
                aspectRatio: '1/1'
              }} 
            />
          </div>
          <div>
            <h2 className="h2-display" style={{ marginBottom: '24px' }}>Build It. Launch It. Sell It.</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '32px' }}>
              Most courses teach you to build OR to market. This one takes you all the way — from your first idea, to a live AI-powered product, to your first paying customer.
            </p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Who's Behind This</h3>
            <p style={{ fontSize: '1.125rem' }}>
              This course is created by the team at hiremystudios and AquariusAI — companies that build AI-powered web and mobile products and run real marketing campaigns every day. We're teaching exactly what we do.
            </p>
          </div>
        </div>
      </section>

      {/* Section 9: FAQ Section */}
      <section id="faq" className="section-padding" style={{ backgroundColor: 'var(--bg-alt)', borderTop: 'var(--border-thick)', borderBottom: 'var(--border-thick)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="h2-display text-center" style={{ marginBottom: '48px' }}>Frequently Asked Questions</h2>
          <Accordion title="Do I need coding experience?" bgColor="var(--bg-card-blue)">
            <p style={{ fontSize: '1.125rem' }}>No. This course is built for complete beginners. You'll use AI tools to build, step by step.</p>
          </Accordion>
          <Accordion title="How much time do I need?" bgColor="var(--bg-card-green)">
            <p style={{ fontSize: '1.125rem' }}>Just 1–2 hours a day for 26 days.</p>
          </Accordion>
          <Accordion title="Is the internship guaranteed?" bgColor="var(--color-secondary-light)">
            <p style={{ fontSize: '1.125rem' }}>You get a real chance at an internship opportunity when you complete the course and are selected — it's a genuine opportunity, not an automatic placement.</p>
          </Accordion>
          <Accordion title="What do I need to start?" bgColor="var(--bg-card-blue)">
            <p style={{ fontSize: '1.125rem' }}>A laptop, internet, and the free accounts we'll set up together inside the course.</p>
          </Accordion>
          <Accordion title="Will I have a real product at the end?" bgColor="var(--bg-card-green)">
            <p style={{ fontSize: '1.125rem' }}>Yes — a live website and app you build yourself.</p>
          </Accordion>
        </div>
      </section>

      {/* Section 8 & 11: Pricing & Final CTA */}
      <section className="section-padding text-center" style={{ backgroundColor: 'var(--color-primary-accent)', color: 'var(--color-secondary-light)', borderBottom: 'var(--border-thick)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '24px' }}>★</div>
          <h2 className="h2-display" style={{ color: 'var(--color-secondary-light)', marginBottom: '24px' }}>Ready to Build Something Real?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '40px', color: '#FAECC6', opacity: 0.9 }}>
            Stop watching from the sidelines. Start building your own product today — and open the door to a real internship opportunity.
          </p>
          
          <Card style={{ backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-primary-dark)', maxWidth: '500px', margin: '0 auto 40px', padding: '40px 24px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Join The AI Founder Blueprint</h3>
            <p style={{ fontSize: '1rem', marginBottom: '24px', fontWeight: '500' }}>Lifetime access to all 26 days, plus a real chance at an internship with our Australian companies upon completion.</p>
            <div style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
              $297 <span style={{ fontSize: '1.5rem', color: '#666', textDecoration: 'line-through', fontWeight: '500' }}>$597</span>
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-primary-accent)', marginBottom: '24px' }}>Early-bird pricing — limited spots.</p>
            <button style={{
              width: '100%',
              backgroundColor: 'var(--color-primary-accent)',
              color: 'var(--color-secondary-light)',
              padding: '16px 32px',
              borderRadius: '999px',
              fontSize: '1.25rem',
              fontWeight: '700',
              border: '2px solid var(--color-primary-dark)',
              boxShadow: '4px 4px 0px var(--color-primary-dark)',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}>
              Enroll Now
            </button>
          </Card>

        </div>
      </section>
    </>
  );
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-main)', padding: '48px 0' }}>
      <div className="container">
        <div className="footer-flex">
          <div className="footer-logo-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}>
              The AI Founder Blueprint <span style={{ color: 'var(--color-primary-accent)' }}>★</span>
            </div>
            <div style={{ fontWeight: '500', opacity: 0.8 }}>
              By hiremystudios & AquariusAI
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '24px', fontWeight: '600', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://youtube.com/@aifounderblueprint" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>YouTube</a>
            <a href="https://instagram.com/@aifounderblueprint" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>Instagram</a>
            <a href="mailto:hello@aifounderblueprint.com" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
          </nav>
          <div style={{ fontWeight: '500', opacity: 0.8 }}>
            © {new Date().getFullYear()} The AI Founder Blueprint.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

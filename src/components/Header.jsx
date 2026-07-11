import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <header style={{ borderBottom: 'var(--border-thick)', padding: '16px 0', backgroundColor: 'var(--bg-main)', position: 'relative', zIndex: 60 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: '700', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', lineHeight: 1.2, textDecoration: 'none' }}>
            The AI Founder Blueprint <span style={{ color: 'var(--color-primary-accent)', fontSize: '0.9em' }}>★</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center', fontWeight: '600', justifyContent: 'center' }}>
            <a href={isHome ? "#about" : "/#about"} style={{ color: 'var(--color-primary-dark)', textDecoration: 'none' }}>Who This Is For</a>
            <a href={isHome ? "#course" : "/#course"} style={{ color: 'var(--color-primary-dark)', textDecoration: 'none' }}>The Journey</a>
            <a href={isHome ? "#faq" : "/#faq"} style={{ color: 'var(--color-primary-dark)', textDecoration: 'none' }}>FAQ</a>
            <Link to="/blogs" style={{ color: 'var(--color-primary-dark)', textDecoration: 'none' }}>Blogs</Link>
          </nav>
          <div className="desktop-only" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button to="/apply" variant="primary" style={{ padding: '8px 24px' }}>Join The Course</Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="mobile-only" style={{ gridColumn: '3', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setIsMobileMenuOpen(true)} style={{ padding: '8px', fontSize: '1.5rem', color: 'var(--color-primary-dark)', cursor: 'pointer', background: 'none', border: 'none' }}>
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--bg-main)', zIndex: 100, padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '8px', fontSize: '2rem', color: 'var(--color-primary-dark)', lineHeight: 1, cursor: 'pointer', background: 'none', border: 'none' }}>
              ×
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center', fontWeight: '700', fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>
            <a href={isHome ? "#about" : "/#about"} onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Who This Is For</a>
            <a href={isHome ? "#course" : "/#course"} onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>The Journey</a>
            <a href={isHome ? "#faq" : "/#faq"} onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</a>
            <Link to="/blogs" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Blogs</Link>
            <Button to="/apply" onClick={() => setIsMobileMenuOpen(false)} variant="primary" style={{ marginTop: '16px', padding: '16px 32px', fontSize: '1.25rem' }}>Join The Course</Button>
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;

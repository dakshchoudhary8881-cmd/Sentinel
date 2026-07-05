import React from 'react';

export default function Footer({ setCurrentPage }) {
  const handleNav = (id) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div 
                className="nav-logo" 
                onClick={() => handleNav('home')} 
                style={{ cursor: 'pointer', marginBottom: '16px' }}
              >
                <img src="/sentinel_logo_monogram.svg" alt="Sentinel logo" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
                <span>SENTINEL</span>
              </div>
              <p className="footer-desc">
                Personal safety that reacts before you can. Automatic threat detection powered by dual-sensor AI, designed for the moment it matters most.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-list">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Home</a></li>
                <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNav('how-it-works'); }}>How It Works</a></li>
                <li><a href="#technology" onClick={(e) => { e.preventDefault(); handleNav('technology'); }}>Technology</a></li>
                <li><a href="#app" onClick={(e) => { e.preventDefault(); handleNav('app'); }}>App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-list">
                <li><a href="#pricing" onClick={(e) => { e.preventDefault(); handleNav('pricing'); }}>Pricing</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>About</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© Sentinel Safety Technologies. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}

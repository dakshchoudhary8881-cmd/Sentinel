import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'technology', label: 'Technology' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'evidence-vault', label: 'Response & Evidence' },
    { id: 'app', label: 'App' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Vertical Sidebar: Serious Text Theme */}
      <header className="nav-sidebar">
        {/* Top Zone: Brand Logo */}
        <div 
          className="nav-brand sidebar-brand" 
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
        >
          <img src="/sentinel_logo_monogram.svg" alt="Sentinel" className="nav-logo-mark" />
          <span className="nav-brand-title">SENTINEL</span>
        </div>

        {/* Middle Zone: Serious Typography Navigation List */}
        <nav className="nav-desktop-sidebar">
          <ul className="nav-menu-vertical">
            {navItems.map((item, idx) => (
              <li key={item.id} style={{ '--item-idx': idx }} className="nav-item-animated">
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  className={`nav-item-vertical ${currentPage === item.id ? 'active' : ''}`}
                >
                  <span className="nav-text-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Zone: CTA & System Status */}
        <div className="nav-sidebar-bottom">
          <button className="nav-btn-action sidebar-full-btn" onClick={() => handleNavClick('pricing')}>
            <span>Notify Me</span>
            <ArrowRight size={15} />
          </button>
          <div className="sidebar-status-note">
            <span className="status-dot-green"></span>
            <span>System 100% Secure</span>
          </div>
        </div>
      </header>

      {/* Mobile Top Header Bar (Only visible on small screens) */}
      <header className="nav-mobile-topheader">
        <div className="nav-brand" onClick={() => handleNavClick('home')}>
          <img src="/sentinel_logo_monogram.svg" alt="Sentinel" className="nav-logo-mark" />
          <span className="nav-brand-title">SENTINEL</span>
        </div>
        <button 
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="nav-mobile-overlay">
          <div className="nav-mobile-card">
            <ul className="mobile-menu-list">
              {navItems.map((item, idx) => (
                <li key={item.id} style={{ '--item-idx': idx }} className="mobile-item-animated">
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }} 
                    className={`mobile-menu-link ${currentPage === item.id ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-cta-wrap">
              <button className="nav-btn-action mobile-full" onClick={() => handleNavClick('pricing')}>
                <span>Notify Me — Priority Access</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

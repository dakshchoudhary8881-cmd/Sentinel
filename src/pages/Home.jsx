import React, { useState } from 'react';
import { Shield, Activity, Radio, Lock, CheckCircle2, ArrowRight, Battery, Cpu, Wifi } from 'lucide-react';

export default function Home({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(255, 69, 0, 0.12)', border: '1px solid rgba(255, 69, 0, 0.3)', color: '#FF4500', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <img src="/sentinel_logo_shield.svg" alt="" style={{ width: '16px', height: '16px' }} /> Next-Gen Biometric AI Safety
          </div>
          <h1>Personal safety that reacts before you can</h1>
          <p>
            Automatic threat detection. No app to open. No button to press. Just protection when it matters most.
          </p>
          <div className="hero-actions">
            <button className="btn-primary btn-lg" onClick={() => setCurrentPage('pricing')}>
              Pre-order Sentinel
            </button>
            <button className="btn-outline btn-lg" onClick={() => setCurrentPage('how-it-works')}>
              See how it works
            </button>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <h3>&lt;1s</h3>
              <p>Threat Verification</p>
            </div>
            <div className="stat-item" style={{ borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)', padding: '0 36px' }}>
              <h3>&lt;5%</h3>
              <p>False Alarm Rate</p>
            </div>
            <div className="stat-item">
              <h3>₹2,899</h3>
              <p>Hardware Price</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-40px', marginBottom: '56px' }}>
            On-device AI — private by design
          </p>

          {/* Hero Band Showcase */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0' }}>
            {/* Ambient glow layers */}
            <div style={{
              position: 'absolute',
              inset: '-60px',
              background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,69,0,0.28) 0%, rgba(255,69,0,0.08) 50%, transparent 70%)',
              filter: 'blur(24px)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '420px',
              height: '60px',
              background: 'radial-gradient(ellipse, rgba(255,69,0,0.35) 0%, transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }} />
            <img
              src="/sentinal-band.png"
              alt="Sentinel wearable band"
              style={{
                width: '420px',
                maxWidth: '90vw',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 48px rgba(255,69,0,0.55)) drop-shadow(0 32px 60px rgba(0,0,0,0.9))',
                animation: 'heroFloat 5s ease-in-out infinite',
                position: 'relative',
                zIndex: 1,
                display: 'block',
              }}
            />
            {/* Floating label chips */}
            <div style={{
              position: 'absolute', top: '20%', left: '-120px',
              background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.35)',
              borderRadius: '40px', padding: '8px 16px', fontSize: '0.78rem', fontWeight: 700,
              color: '#FF6030', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
              animation: 'heroFloat 5s ease-in-out infinite 0.5s',
            }}>⚡ &lt;1s Response</div>
            <div style={{
              position: 'absolute', top: '55%', right: '-130px',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)',
              borderRadius: '40px', padding: '8px 16px', fontSize: '0.78rem', fontWeight: 700,
              color: '#10B981', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
              animation: 'heroFloat 5s ease-in-out infinite 1s',
            }}>🔒 100% Private</div>
            <div style={{
              position: 'absolute', bottom: '10%', left: '-110px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '40px', padding: '8px 16px', fontSize: '0.78rem', fontWeight: 700,
              color: '#fff', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
              animation: 'heroFloat 5s ease-in-out infinite 1.5s',
            }}>🔋 7-Day Battery</div>
          </div>
          <style>{`
            @keyframes heroFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-14px); }
            }
          `}</style>
        </div>
      </section>

      {/* Comparison Card */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="card" style={{ padding: '48px', borderLeft: '4px solid var(--primary)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
              Manual SOS apps fail in real attacks
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '28px', lineHeight: 1.7 }}>
              Under genuine threat, cognitive overload makes it nearly impossible to unlock your phone, open an app, and tap SOS. Victims' hands are often restrained. Fear paralyzes.
            </p>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px 24px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '28px' }}>
              <span style={{ color: '#FF4500', fontWeight: 700, fontSize: '1.2rem' }}>87%</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '12px' }}>
                of assaults go unreported due to lack of evidence and trauma
              </span>
            </div>
            <button 
              onClick={() => setCurrentPage('how-it-works')}
              style={{ background: 'transparent', color: '#FF4500', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}
            >
              Learn more <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div className="section-heading">
            <h2>Three steps. Under three seconds.</h2>
            <p>Fully automatic. Zero interaction required.</p>
          </div>
          <div className="grid-3" style={{ marginBottom: '48px' }}>
            <div className="card">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255, 69, 0, 0.15)', color: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Activity size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>1. Detects</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Dual sensors monitor heart rate and motion patterns continuously.
              </p>
            </div>
            <div className="card">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255, 69, 0, 0.15)', color: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Cpu size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>2. Verifies</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                On-device AI confirms threat in under a second using 3-signal verification.
              </p>
            </div>
            <div className="card">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255, 69, 0, 0.15)', color: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Radio size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>3. Alerts</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Silent emergency dispatch with GPS coordinates and encrypted audio evidence.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-outline" onClick={() => setCurrentPage('how-it-works')}>
              See the full process
            </button>
          </div>
        </div>
      </section>

      {/* Meet Sentinel Wearable Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="card" style={{ padding: '48px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>Meet Sentinel</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '28px', lineHeight: 1.7 }}>
                A comfortable, water-resistant wearable that combines dual biometric sensors with on-device AI. Lightweight. Affordable. Designed to be worn daily.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontWeight: 500 }}>
                  <CheckCircle2 size={18} color="#FF4500" /> 7-day battery life
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontWeight: 500 }}>
                  <CheckCircle2 size={18} color="#FF4500" /> IP67 water resistance
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontWeight: 500 }}>
                  <CheckCircle2 size={18} color="#FF4500" /> Bluetooth Low Energy
                </li>
              </ul>
              <button className="btn-primary" onClick={() => setCurrentPage('technology')}>
                Explore the technology
              </button>
            </div>
            <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Outer glow ring */}
                <div style={{
                  position: 'absolute',
                  width: '340px',
                  height: '340px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 69, 0, 0.22) 0%, rgba(255, 69, 0, 0.05) 50%, transparent 70%)',
                  filter: 'blur(12px)',
                  animation: 'bandFloat 4s ease-in-out infinite',
                }} />
                {/* Inner glow ring */}
                <div style={{
                  position: 'absolute',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 69, 0, 0.3)',
                  boxShadow: '0 0 40px rgba(255, 69, 0, 0.15), inset 0 0 40px rgba(255, 69, 0, 0.08)',
                  animation: 'bandFloat 4s ease-in-out infinite',
                }} />
                {/* Band image */}
                <img
                  src="/sentinal-band.png"
                  alt="Sentinel wearable band"
                  style={{
                    width: '280px',
                    height: '280px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 32px rgba(255, 69, 0, 0.5)) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                    animation: 'bandFloat 4s ease-in-out infinite',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
                {/* Reflection gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200px',
                  height: '40px',
                  background: 'radial-gradient(ellipse, rgba(255, 69, 0, 0.25) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }} />
              </div>
              <style>{`
                @keyframes bandFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-12px); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Banner */}
      <section className="section" style={{ textAlign: 'center', background: 'radial-gradient(circle at center, rgba(255,69,0,0.08) 0%, rgba(0,0,0,0) 70%)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
            <div style={{
              position: 'absolute', inset: '-20px',
              background: 'radial-gradient(circle, rgba(255,69,0,0.2) 0%, transparent 70%)',
              filter: 'blur(16px)', borderRadius: '50%', pointerEvents: 'none',
            }} />
            <img
              src="/sentinel_logo_shield.svg"
              alt="Sentinel shield"
              style={{
                width: '80px', height: '80px',
                filter: 'drop-shadow(0 0 20px rgba(255,69,0,0.5))',
                animation: 'shieldPulse 3s ease-in-out infinite',
                position: 'relative',
              }}
            />
            <style>{`
              @keyframes shieldPulse {
                0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(255,69,0,0.5)); }
                50% { transform: scale(1.08); filter: drop-shadow(0 0 30px rgba(255,69,0,0.7)); }
              }
            `}</style>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>See it in action</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '32px' }}>
            Experience the companion app dashboard with live threat detection simulation.
          </p>
          <button className="btn-primary btn-lg" onClick={() => setCurrentPage('app')}>
            Try the live demo
          </button>
        </div>
      </section>

      {/* Press Section */}
      <section style={{ padding: '48px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '24px' }}>
            AS SEEN IN
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', alignItems: 'center', opacity: 0.6, fontSize: '1.3rem', fontWeight: 800 }}>
            <span>TechCrunch</span>
            <span>WIRED</span>
            <span>Forbes</span>
            <span>THE VERGE</span>
          </div>
        </div>
      </section>

      {/* Newsletter Waitlist */}
      <section className="section">
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>Get Sentinel before it launches</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Join the waitlist for exclusive pre-order access and launch pricing.
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: '1 1 280px', padding: '14px 20px', borderRadius: '8px', border: '1px solid var(--border-strong)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '14px 28px' }}>
              Join Waitlist
            </button>
          </form>
          {subscribed && (
            <div style={{ marginTop: '16px', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> You have been added to the priority waitlist!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

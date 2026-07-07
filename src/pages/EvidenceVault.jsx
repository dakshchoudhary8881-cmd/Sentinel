import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, AlertTriangle, CheckCircle2, MapPin, Phone, Battery, Wifi,
  Activity, Play, Siren, Radio, Lock, FileText, Clock, Users,
  Smartphone, Share2, ArrowRight, Check, Copy, ExternalLink,
  Volume2, ShieldAlert, Database, Key, HelpCircle, ChevronRight
} from 'lucide-react';

/* ───────────────────────────────────────────────────────────────────────
   AUDIO WAVEFORM COMPONENT (canvas-based for live stream preview)
   ─────────────────────────────────────────────────────────────────────── */
function AudioStreamWaveform({ active }) {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    let raf;

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 12, 20, 0.25)';
      ctx.fillRect(0, 0, W, H);

      offsetRef.current += 0.15;
      const mid = H / 2;

      ctx.beginPath();
      ctx.strokeStyle = active ? '#8B5CF6' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = active ? '#8B5CF6' : 'transparent';
      ctx.shadowBlur = active ? 10 : 0;

      for (let x = 0; x < W; x += 4) {
        const t = x * 0.05 + offsetRef.current;
        const amp = active ? (Math.sin(t * 1.5) * Math.cos(t * 0.7) * (H * 0.42)) : (Math.sin(t * 0.5) * 4);
        const y = mid + amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    ctx.fillStyle = '#090C14';
    ctx.fillRect(0, 0, W, H);
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={80}
      style={{ width: '100%', height: '80px', borderRadius: '10px', background: '#090C14', border: '1px solid var(--border-subtle)' }}
    />
  );
}

/* ───────────────────────────────────────────────────────────────────────
   MAIN COMPONENT: EVIDENCE VAULT & RESPONSE PROTOCOL
   ─────────────────────────────────────────────────────────────────────── */
export default function EvidenceVault({ setCurrentPage }) {
  /* Phone simulator view: 'alert' (incoming push/SMS) vs 'dashboard' (live web link opened) */
  const [phoneView, setPhoneView] = useState('alert');
  const [copiedCoords, setCopiedCoords] = useState(false);

  /* Timeline Scrubber State: 0 (Tier 1), 1 (Tier 2), 2 (Tier 3) */
  const [timelineStep, setTimelineStep] = useState(1);

  /* Simulated GPS coordinates (Bengaluru tech hub example) */
  const coordsStr = "12.9716° N, 77.5946° E";

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coordsStr);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 3000);
  };

  const timelineTiers = [
    {
      tier: "Tier 1: Local Verification",
      time: "T + 0s to 5s",
      badge: "Cancel Window",
      badgeColor: "#F59E0B",
      title: "Silent Wrist Vibration & Phone Countdown",
      desc: "When dual biometric sensors flag an anomaly, the wearable vibrates discreetly while the companion app initiates a 5-second countdown. If triggered by an accidental impact or intense sprint, you can silently cancel with a single tap—preventing false alarms without notifying contacts.",
      action: "System status: Local verification loop active. Zero external data transmitted."
    },
    {
      tier: "Tier 2: Safety Circle Broadcast",
      time: "T + 5s to 15s",
      badge: "Active Broadcast",
      badgeColor: "#FF4500",
      title: "Priority SMS, Push & Automated Phone Calls",
      desc: "Once verified, Sentinel broadcasts emergency alerts to up to 5 trusted contacts (your Safety Circle). Contacts receive priority SMS and push notifications containing a secure, encrypted web link to access your live GPS radar, audio feed, and biometric telemetry.",
      action: "System status: Encrypted telemetry stream live. Contacts alerted."
    },
    {
      tier: "Tier 3: Emergency Services Dispatch",
      time: "T + 15s+",
      badge: "Regional Partner Dependent",
      badgeColor: "#8B5CF6",
      title: "Automated Dispatch & Backup Escalation",
      desc: "In municipalities where direct E-112/E-911 API integration is supported by regional infrastructure partners, automated voice synthesis transmits your exact coordinates and incident severity. Where direct API dispatch is unsupported, priority escalation loops continuously across your backup emergency contacts.",
      action: "System status: High-priority dispatch / continuous safety circle loop."
    }
  ];

  const currentTier = timelineTiers[timelineStep];

  return (
    <div className="evidence-vault-page">

      {/* ═══════════════════  HERO  ═══════════════════ */}
      <section className="hero" style={{ paddingBottom: '48px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(255, 69, 0, 0.12)', border: '1px solid rgba(255, 69, 0, 0.3)', color: '#FF4500', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <img src="/sentinel_logo_shield.svg" alt="" style={{ width: '16px', height: '16px' }} /> Emergency Protocol & Evidence Integrity
          </div>
          <h1>When seconds matter. When truth matters.</h1>
          <p>
            Explore exactly what your trusted contacts see during an emergency, and how Sentinel is engineered to preserve tamper-evident forensic data for legal proceedings.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => {
              const el = document.getElementById('phone-simulator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Try Contact Simulator <ArrowRight size={18} />
            </button>
            <button className="btn-outline" onClick={() => {
              const el = document.getElementById('evidence-integrity');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Evidence Architecture
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════  INTERACTIVE CONTACT SIMULATOR  ═══════════════ */}
      <section id="phone-simulator" className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div className="section-heading">
            <h2>What Your Contacts Actually See</h2>
            <p>During an attack, your loved ones don't just get a generic text—they get a real-time tactical rescue dashboard.</p>
          </div>

          <div className="ev-sim-container">
            {/* Left Column: Context & Controls */}
            <div className="ev-sim-sidebar">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
                The Safety Circle Experience
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '24px' }}>
                When an alert triggers, your designated trusted contacts receive a high-priority notification. Clicking the link opens an encrypted browser session without requiring them to install any app.
              </p>

              <div className="ev-view-selector">
                <button
                  className={`ev-view-btn ${phoneView === 'alert' ? 'active' : ''}`}
                  onClick={() => setPhoneView('alert')}
                >
                  <Phone size={18} /> 1. Incoming Alert (SMS/Push)
                </button>
                <button
                  className={`ev-view-btn ${phoneView === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setPhoneView('dashboard')}
                >
                  <Radio size={18} /> 2. Live Rescue Dashboard
                </button>
              </div>

              <div className="ev-feature-highlights">
                <div className="ev-highlight-item">
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>Zero App Friction:</strong> Works instantly in mobile Safari or Chrome for any contact.
                  </div>
                </div>
                <div className="ev-highlight-item">
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>Encrypted Telemetry:</strong> Audio and GPS are protected in transit using industry-standard AES encryption.
                  </div>
                </div>
                <div className="ev-highlight-item">
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>112 Ready:</strong> Pre-formatted coordinates let contacts dispatch police instantly.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Smartphone Mockup */}
            <div className="ev-phone-wrapper">
              <div className="ev-phone-frame">
                {/* Phone Speaker & Camera Notch */}
                <div className="ev-phone-notch">
                  <div className="ev-phone-speaker" />
                  <div className="ev-phone-camera" />
                </div>

                {/* Phone Screen Content */}
                <div className="ev-phone-screen">
                  {/* Status Bar */}
                  <div className="ev-phone-statusbar">
                    <span>10:42 PM</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <Wifi size={13} />
                      <Battery size={15} />
                    </div>
                  </div>

                  {phoneView === 'alert' ? (
                    /* View 1: Incoming Alert SMS & Push */
                    <div className="ev-screen-alert-view">
                      <div className="ev-push-card">
                        <div className="ev-push-header">
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FF4500', fontWeight: 700, fontSize: '0.8rem' }}>
                            <ShieldAlert size={14} /> SENTINEL EMERGENCY
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>now</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px', color: '#fff' }}>
                          🚨 CRITICAL ALERT: Sarah Vance
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.88)', margin: 0, lineHeight: 1.4 }}>
                          Sentinel wearable verified a severe threat pattern (HR 165 BPM + High-G motion). Live location & audio stream active.
                        </p>
                      </div>

                      <div className="ev-sms-card">
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '12px' }}>
                          Text Message • Today 10:42 PM
                        </div>
                        <div className="ev-sms-bubble">
                          🚨 <strong>SENTINEL EMERGENCY ALERT</strong><br />
                          Sarah Vance's safety wearable detected an emergency.<br /><br />
                          📍 <strong>Live GPS & Audio Dashboard:</strong><br />
                          <span style={{ color: '#3B82F6', textDecoration: 'underline', wordBreak: 'break-all' }}>
                            https://sntl.ai/live/sec-8849-ex
                          </span><br /><br />
                          Do not ignore. Tap link to view coordinates or dispatch 112.
                        </div>
                      </div>

                      <button
                        className="btn-primary"
                        style={{ width: '100%', marginTop: 'auto', padding: '14px', background: '#FF4500', fontWeight: 700 }}
                        onClick={() => setPhoneView('dashboard')}
                      >
                        Tap Link → Open Live Dashboard
                      </button>
                    </div>
                  ) : (
                    /* View 2: Live Rescue Dashboard */
                    <div className="ev-screen-dashboard-view">
                      <div className="ev-dash-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="ev-live-pulse" />
                          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FF4500' }}>LIVE RESCUE FEED</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', color: '#fff' }}>
                          ID: #8849-EX
                        </span>
                      </div>

                      {/* Radar GPS Map */}
                      <div className="ev-dash-map">
                        <div className="ev-radar-circle">
                          <div className="ev-radar-sweep" />
                          <div className="ev-radar-pin">
                            <MapPin size={22} color="#FF4500" fill="#FF4500" />
                          </div>
                        </div>
                        <div className="ev-map-overlay">
                          <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>📍 Bengaluru, KA</span>
                          <span style={{ fontSize: '0.72rem', color: '#10B981' }}>Accuracy: ±4.2m (GPS/GLONASS)</span>
                        </div>
                      </div>

                      {/* Biometric Telemetry Bar */}
                      <div className="ev-dash-telemetry">
                        <div className="ev-tel-box">
                          <span className="ev-tel-label">Heart Rate</span>
                          <span className="ev-tel-val" style={{ color: '#FF4500' }}>165 <small>BPM</small></span>
                        </div>
                        <div className="ev-tel-box" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                          <span className="ev-tel-label">Motion Status</span>
                          <span className="ev-tel-val" style={{ color: '#F59E0B', fontSize: '0.85rem' }}>High-G Struggle</span>
                        </div>
                        <div className="ev-tel-box">
                          <span className="ev-tel-label">Band Battery</span>
                          <span className="ev-tel-val" style={{ color: '#10B981' }}>84%</span>
                        </div>
                      </div>

                      {/* Live Encrypted Audio Preview */}
                      <div className="ev-dash-audio">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8B5CF6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Volume2 size={14} /> LIVE AUDIO STREAM
                          </span>
                          <span style={{ fontSize: '0.68rem', background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            AES-256 ENCRYPTED
                          </span>
                        </div>
                        <AudioStreamWaveform active={true} />
                      </div>

                      {/* Action Buttons */}
                      <div className="ev-dash-actions">
                        <button
                          className="ev-action-btn ev-btn-emergency"
                          onClick={() => alert("Calling 112 / Police Dispatch... Coordinates ready.")}
                        >
                          <Siren size={18} /> Call 112 / Police Dispatch
                        </button>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <button className="ev-action-btn ev-btn-secondary" onClick={handleCopyCoords}>
                            {copiedCoords ? <Check size={15} color="#10B981" /> : <Copy size={15} />}
                            {copiedCoords ? "Copied!" : "Copy Coords"}
                          </button>
                          <button className="ev-action-btn ev-btn-secondary" onClick={() => alert("Opening navigation map...")}>
                            <ExternalLink size={15} /> Navigate There
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  3-TIER ESCALATION TIMELINE  ═══════════════ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-heading">
            <h2>The 3-Tier Alert Escalation Protocol</h2>
            <p>How Sentinel balances instant rescue speed with thoughtful false alarm prevention.</p>
          </div>

          <div className="ev-timeline-wrapper">
            {/* Scrubber Tabs */}
            <div className="ev-timeline-tabs">
              {timelineTiers.map((t, idx) => (
                <button
                  key={idx}
                  className={`ev-tab-btn ${timelineStep === idx ? 'active' : ''}`}
                  onClick={() => setTimelineStep(idx)}
                >
                  <span className="ev-tab-num">{idx + 1}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Tier {idx + 1}</div>
                    <div style={{ fontSize: '0.78rem', color: timelineStep === idx ? '#FF4500' : 'var(--text-muted)' }}>{t.time}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Tier Display Card */}
            <div className="ev-tier-card" style={{ '--tier-color': currentTier.badgeColor }}>
              <div className="ev-tier-header">
                <div>
                  <span className="ev-tier-badge" style={{ background: `${currentTier.badgeColor}20`, color: currentTier.badgeColor, border: `1px solid ${currentTier.badgeColor}50` }}>
                    {currentTier.badge}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '8px', color: '#fff' }}>
                    {currentTier.title}
                  </h3>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                  {currentTier.time}
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, margin: '20px 0' }}>
                {currentTier.desc}
              </p>

              <div className="ev-tier-action-box">
                <Activity size={18} color={currentTier.badgeColor} />
                <span style={{ fontWeight: 600, color: '#fff' }}>{currentTier.action}</span>
              </div>
            </div>

            {/* Honest Technical Caveat */}
            <div className="ev-honest-notice">
              <HelpCircle size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              <span>
                <strong>Note on Regional Dispatch:</strong> Direct E-112/E-911 API dispatch availability depends on local municipal emergency infrastructure. In regions without automated CAD API support, Sentinel prioritizes immediate automated voice calls and SMS broadcasts to your designated personal safety circle.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  EVIDENCE INTEGRITY & TAMPER-EVIDENT LOGGING  ═══════════════ */}
      <section id="evidence-integrity" className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-heading">
            <h2>Evidence Integrity & Legal Readiness</h2>
            <p>Why conventional voice memos can be challenged in court, and how Sentinel is engineered to support evidence integrity.</p>
          </div>

          <div className="ev-integrity-grid">
            <div className="ev-integrity-card">
              <div className="ev-int-icon" style={{ background: 'rgba(255,69,0,0.12)', color: '#FF4500', border: '1px solid rgba(255,69,0,0.3)' }}>
                <Key size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
                Point-of-Capture Encryption
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                At the exact moment of capture, audio and biometric telemetry leverage ESP32-C3 flash encryption and secure boot protocols before transmission. This prevents local interception and preserves provenance from the device to your phone.
              </p>
            </div>

            <div className="ev-integrity-card">
              <div className="ev-int-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
                Restricted Access & Storage
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Your emergency data is encrypted in transit and storage using industry-standard AES encryption. Access is strictly logged and restricted to you and your designated emergency contacts during active alerts.
              </p>
            </div>

            <div className="ev-integrity-card">
              <div className="ev-int-icon" style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.3)' }}>
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
                Tamper-Evident Logging
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Every event generates an immutable chronological audit trail of UTC timestamps, GPS coordinates, and heart rate readings. Designed specifically to assist law enforcement and support evidence integrity during legal proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  INTERACTIVE INCIDENT REPORT PREVIEW  ═══════════════ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-heading">
            <h2>Forensic Incident Summary Preview</h2>
            <p>An example of the tamper-evident chronological log generated for law enforcement and legal review.</p>
          </div>

          <div className="ev-forensic-card">
            <div className="ev-forensic-header">
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  SENTINEL INCIDENT REPORT PACKAGE
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginTop: '4px', fontFamily: 'monospace' }}>
                  ID: #STL-8849-EX
                </div>
              </div>
              <div className="ev-forensic-stamp">
                <CheckCircle2 size={16} color="#10B981" /> TAMPER-EVIDENT LOG VERIFIED
              </div>
            </div>

            <div className="ev-forensic-body">
              <div className="ev-forensic-meta">
                <div>
                  <span className="ev-meta-label">Subject</span>
                  <span className="ev-meta-val">Sarah Vance (Owner)</span>
                </div>
                <div>
                  <span className="ev-meta-label">Date & Time (UTC)</span>
                  <span className="ev-meta-val">2026-07-07 17:12:04 UTC</span>
                </div>
                <div>
                  <span className="ev-meta-label">Device MCU</span>
                  <span className="ev-meta-val">ESP32-C3 (Secure Boot Enabled)</span>
                </div>
                <div>
                  <span className="ev-meta-label">Encryption</span>
                  <span className="ev-meta-val">AES-256 (In-Transit & Storage)</span>
                </div>
              </div>

              <div className="ev-forensic-timeline">
                <div className="ev-ft-row">
                  <span className="ev-ft-time">17:12:01.402</span>
                  <span className="ev-ft-event">Biometric anomaly detected: Heart Rate spike to 164 BPM (+92 BPM / 3s).</span>
                </div>
                <div className="ev-ft-row">
                  <span className="ev-ft-time">17:12:01.885</span>
                  <span className="ev-ft-event">3-Axis motion sensor flagged High-G struggle / erratic oscillation signature.</span>
                </div>
                <div className="ev-ft-row">
                  <span className="ev-ft-time">17:12:02.100</span>
                  <span className="ev-ft-event">MEMS Microphone acoustic check confirmed distress vocalization pattern.</span>
                </div>
                <div className="ev-ft-row">
                  <span className="ev-ft-time">17:12:02.150</span>
                  <span className="ev-ft-event">Point-of-capture flash encryption initiated. Audio blob #1 sealed.</span>
                </div>
                <div className="ev-ft-row">
                  <span className="ev-ft-time">17:12:07.150</span>
                  <span className="ev-ft-event">5-second local cancel window expired without user cancellation.</span>
                </div>
                <div className="ev-ft-row">
                  <span className="ev-ft-time">17:12:07.320</span>
                  <span className="ev-ft-event" style={{ color: '#FF4500', fontWeight: 700 }}>
                    🚨 Tier 2 Broadcast dispatched: GPS (12.9716° N, 77.5946° E) + Audio feed transmitted to 4 Safety Circle contacts.
                  </span>
                </div>
              </div>
            </div>

            <div className="ev-forensic-footer">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                * This log is designed to support evidence integrity for legal and investigative proceedings. Admissibility is subject to judicial review.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  BOTTOM CTA  ═══════════════ */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>
            Equip yourself with thoughtful protection
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem' }}>
            Join the priority waitlist to secure launch pricing and early shipping.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary btn-lg" onClick={() => setCurrentPage('pricing')}>
              Notify Me
            </button>
            <button className="btn-outline btn-lg" onClick={() => setCurrentPage('hardware')}>
              Explore Hardware Specs <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

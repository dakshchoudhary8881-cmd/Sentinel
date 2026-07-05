import React, { useState } from 'react';
import { Shield, Activity, Radio, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Play, Cpu, Wifi, Siren, Volume2, Gauge, Check, XCircle, RotateCcw, Eye, Smartphone, Zap, Layers, Lock } from 'lucide-react';

export default function HowItWorks({ setCurrentPage }) {
  const [simMode, setSimMode] = useState('assault'); // 'jogging', 'bump', 'assault'
  const [camView, setCamView] = useState('isometric'); // 'isometric', 'front', 'top'
  const [activeLayer, setActiveLayer] = useState(null); // hover or highlight state
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What if I bump my wrist hard?",
      a: "Sentinel requires BOTH a heart rate spike AND motion anomaly pattern to trigger. A simple bump won't cause your heart rate to spike dramatically, so it won't trigger an alert. The dual-signal requirement is specifically designed to prevent false alarms from everyday impacts."
    },
    {
      q: "Does it drain my phone battery?",
      a: "No. The wearable uses Bluetooth Low Energy and only sends data when needed. AI processing happens efficiently on your phone only when threat patterns are detected. Most users report less than 2% daily battery impact."
    },
    {
      q: "What if I don't have signal?",
      a: "Sentinel stores the alert and evidence locally and will automatically transmit as soon as connectivity is restored. The device also supports offline emergency protocols depending on your region."
    },
    {
      q: "Can I cancel a false trigger?",
      a: "Yes. You have a brief window (configurable, default 10 seconds) to cancel an alert via the app before emergency contacts are notified. This provides peace of mind while maintaining fast response."
    }
  ];

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(255, 69, 0, 0.12)', border: '1px solid rgba(255, 69, 0, 0.3)', color: '#FF4500', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <img src="/sentinel_logo_shield.svg" alt="" style={{ width: '16px', height: '16px' }} /> Dual-Sensor AI Protection
          </div>
          <h1>Three steps. Under three seconds.</h1>
          <p>
            Sentinel's dual-sensor AI system works completely automatically. No manual activation. No panic required.
          </p>
        </div>
      </section>

      {/* The Panic Gap Comparison Table */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-heading">
            <h2>The Panic Gap</h2>
            <p>Why conventional safety apps fail when you need them most.</p>
          </div>
          <div className="card" style={{ padding: '24px', overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>SOS Apps</th>
                  <th style={{ color: '#FF4500' }}>Sentinel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Activation</td>
                  <td>Manual tap required</td>
                  <td className="highlight-col">Automatic detection</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Works while panicking</td>
                  <td>No - requires calm</td>
                  <td className="highlight-col">Yes - fully passive</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>False alarm rate</td>
                  <td>High (manual errors)</td>
                  <td className="highlight-col">&lt;3% (three-signal verification)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Evidence collected</td>
                  <td>Limited / manual</td>
                  <td className="highlight-col">Auto: GPS + audio + timestamp</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Cost</td>
                  <td>$0 - $10 / month</td>
                  <td className="highlight-col">₹2,899 hardware + 1yr free software</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3 Detailed Steps */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Step 1 */}
          <div className="card" style={{ marginBottom: '40px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="logo-badge">1</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Detects. Dual-sensor fusion monitors for threat patterns.</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Sentinel continuously monitors two biometric signals: your heart rate and motion patterns. When both spike simultaneously in a specific way — sharp heart rate increase combined with sudden, erratic movement — it flags a potential threat.
            </p>
            <div style={{ background: 'rgba(255, 69, 0, 0.08)', border: '1px solid rgba(255, 69, 0, 0.25)', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', fontWeight: 700, color: '#FF4500' }}>
              <Activity size={24} /> Heart Rate Spike + Motion Anomaly = ⚠️ Potential Threat Flagged
            </div>
          </div>

          {/* Step 2 with Interactive 3D Simulation */}
          <div className="card" style={{ marginBottom: '40px', padding: '40px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="logo-badge">2</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Verifies. Three-signal verification with audio tiebreaker.</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Sentinel continuously monitors two primary signals: heart rate and motion. If both spike together, that's strong evidence of a threat, and the system proceeds directly to alert verification with a 5-second cancel window. But if only one signal crosses its threshold, the system checks a third signal — on-device audio analysis — listening for sudden screams, shouts, or distress sounds.
            </p>

            {/* 3D Isometric Workflow Simulation */}
            <div className="sim-3d-wrapper" style={{ marginTop: '32px' }}>
              <div className="sim-controls-bar">
                <div className="sim-mode-group">
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '6px' }}>
                    <Play size={14} color="#FF4500" style={{ marginRight: '6px' }} /> SCENARIO:
                  </span>
                  <button 
                    onClick={() => setSimMode('jogging')}
                    className={`sim-btn ${simMode === 'jogging' ? 'active-jogging' : ''}`}
                  >
                    🏃 Jogging / Exercise
                  </button>
                  <button 
                    onClick={() => setSimMode('bump')}
                    className={`sim-btn ${simMode === 'bump' ? 'active-bump' : ''}`}
                  >
                    💥 Accidental Bump
                  </button>
                  <button 
                    onClick={() => setSimMode('assault')}
                    className={`sim-btn ${simMode === 'assault' ? 'active-assault' : ''}`}
                  >
                    ⚠️ Active Assault
                  </button>
                </div>

                <div className="sim-view-group">
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '6px' }}>
                    <Eye size={14} style={{ marginRight: '6px' }} /> VIEW:
                  </span>
                  <button 
                    onClick={() => setCamView('isometric')}
                    className={`sim-btn ${camView === 'isometric' ? 'active-view' : ''}`}
                  >
                    <Layers size={14} /> Isometric 3D
                  </button>
                  <button 
                    onClick={() => setCamView('front')}
                    className={`sim-btn ${camView === 'front' ? 'active-view' : ''}`}
                  >
                    Front View
                  </button>
                  <button 
                    onClick={() => setCamView('top')}
                    className={`sim-btn ${camView === 'top' ? 'active-view' : ''}`}
                  >
                    Top-Down
                  </button>
                </div>
              </div>

              {/* 3D Stage */}
              <div className="sim-3d-stage">
                <div className={`sim-3d-scene view-${camView}`}>
                  
                  {/* Connecting Data Beams */}
                  <div className="sim-data-beam beam-1-2" style={{
                    opacity: simMode === 'bump' ? 0.3 : 0.9,
                    background: simMode === 'jogging' 
                      ? 'linear-gradient(to top, rgba(255,255,255,0.1), rgba(16,185,129,0.85), rgba(255,255,255,0.1))' 
                      : simMode === 'bump'
                      ? 'linear-gradient(to top, rgba(255,255,255,0.1), rgba(245,158,11,0.85), rgba(255,255,255,0.1))'
                      : 'linear-gradient(to top, rgba(255,255,255,0.1), rgba(255,69,0,0.9), rgba(255,255,255,0.1))'
                  }} />
                  <div className="sim-data-beam beam-2-3" style={{
                    opacity: simMode === 'assault' ? 0.95 : 0.15,
                    background: simMode === 'assault'
                      ? 'linear-gradient(to top, rgba(255,255,255,0.1), rgba(255,69,0,0.95), rgba(255,255,255,0.1))'
                      : 'linear-gradient(to top, rgba(255,255,255,0.05), rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
                  }} />

                  {/* Layer 1: Bottom - Detects */}
                  <div 
                    className="sim-layer sim-layer-1"
                    onMouseEnter={() => setActiveLayer(1)}
                    onMouseLeave={() => setActiveLayer(null)}
                    style={{
                      borderColor: activeLayer === 1 ? '#fff' : undefined,
                      transform: activeLayer === 1 ? 'translateZ(-130px) scale(1.02)' : undefined
                    }}
                  >
                    <div className="sim-layer-header">
                      <div className="sim-layer-title">
                        <Activity size={20} color="#10B981" />
                        <span>LAYER 1: BIOMETRIC SENSING</span>
                      </div>
                      <span className="sim-layer-badge badge-layer-1">⌚ Wearable Band</span>
                    </div>
                    <div className="sim-layer-content">
                      <div className="sim-node">
                        <div className="sim-node-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                          <Activity size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>PPG Heart Rate</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: simMode === 'assault' ? '#FF4500' : simMode === 'jogging' ? '#10B981' : '#fff' }}>
                            {simMode === 'assault' ? '168 BPM (Spike)' : simMode === 'jogging' ? '142 BPM (Elevated)' : '74 BPM (Normal)'}
                          </div>
                        </div>
                      </div>
                      <div className="sim-node">
                        <div className="sim-node-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                          <Gauge size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>3-Axis Accelerometer</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: simMode === 'assault' ? '#FF4500' : simMode === 'bump' ? '#F59E0B' : '#10B981' }}>
                            {simMode === 'assault' ? '94% (Erratic Impact)' : simMode === 'jogging' ? '85% (Rhythmic)' : '90% (Single Impact)'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Zap size={14} color="#10B981" /> 100 Hz continuous sampling via BLE 5.2 link
                    </div>
                  </div>

                  {/* Layer 2: Middle - Verifies */}
                  <div 
                    className="sim-layer sim-layer-2"
                    onMouseEnter={() => setActiveLayer(2)}
                    onMouseLeave={() => setActiveLayer(null)}
                    style={{
                      borderColor: activeLayer === 2 ? '#fff' : undefined,
                      transform: activeLayer === 2 ? 'translateZ(20px) scale(1.02)' : undefined
                    }}
                  >
                    <div className="sim-layer-header">
                      <div className="sim-layer-title">
                        <Cpu size={20} color="#F59E0B" />
                        <span>LAYER 2: ON-DEVICE AI FUSION</span>
                      </div>
                      <span className="sim-layer-badge badge-layer-2">📱 Smartphone Core</span>
                    </div>
                    <div className="sim-layer-content">
                      <div className="sim-node">
                        <div className="sim-node-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                          <Cpu size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dual-Signal Verification</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: simMode === 'assault' ? '#FF4500' : '#10B981' }}>
                            {simMode === 'assault' ? '⚠️ Dual Spike Confirmed' : simMode === 'jogging' ? '✅ Rhythmic Pattern' : 'ℹ️ Single-Signal Only'}
                          </div>
                        </div>
                      </div>
                      <div className="sim-node">
                        <div className="sim-node-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                          <Volume2 size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Audio Tiebreaker</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: simMode === 'assault' ? '#EF4444' : '#10B981' }}>
                            {simMode === 'assault' ? '🚨 Distress Acoustic Detected' : '✅ Ambient / Normal'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={14} color="#F59E0B" /> Local processing — zero data leaves phone unless verified
                    </div>
                  </div>

                  {/* Layer 3: Top - Alerts */}
                  <div 
                    className="sim-layer sim-layer-3"
                    onMouseEnter={() => setActiveLayer(3)}
                    onMouseLeave={() => setActiveLayer(null)}
                    style={{
                      borderColor: activeLayer === 3 ? '#fff' : simMode === 'assault' ? '#FF4500' : undefined,
                      transform: activeLayer === 3 ? 'translateZ(170px) scale(1.02)' : undefined,
                      opacity: simMode === 'assault' ? 1 : 0.45,
                      filter: simMode === 'assault' ? 'none' : 'grayscale(0.6)'
                    }}
                  >
                    <div className="sim-layer-header">
                      <div className="sim-layer-title">
                        <Radio size={20} color="#FF4500" />
                        <span>LAYER 3: SILENT DISPATCH</span>
                      </div>
                      <span className="sim-layer-badge badge-layer-3">🚨 Emergency Network</span>
                    </div>
                    <div className="sim-layer-content">
                      <div className="sim-node">
                        <div className="sim-node-icon" style={{ background: 'rgba(255, 69, 0, 0.15)', color: '#FF4500' }}>
                          <Wifi size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>GPS Coordinates</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: simMode === 'assault' ? '#FF4500' : 'var(--text-muted)' }}>
                            {simMode === 'assault' ? '📍 Live Tracking Active' : 'Standby Mode'}
                          </div>
                        </div>
                      </div>
                      <div className="sim-node">
                        <div className="sim-node-icon" style={{ background: 'rgba(255, 69, 0, 0.15)', color: '#FF4500' }}>
                          <Siren size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Evidence Vault</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: simMode === 'assault' ? '#FF4500' : 'var(--text-muted)' }}>
                            {simMode === 'assault' ? '🔒 Encrypted Audio Rec' : 'Standby Mode'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: simMode === 'assault' ? '#FF4500' : 'var(--text-muted)', fontWeight: simMode === 'assault' ? 700 : 400, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {simMode === 'assault' ? (
                        <>🚨 EMERGENCY DISPATCH TRIGGERED — 5s CANCEL WINDOW ACTIVE</>
                      ) : (
                        <>ℹ️ Dispatch inactive — No confirmed threat</>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Telemetry Dashboard Below Stage */}
              <div className="sim-telemetry-bar">
                <div className="telemetry-item">
                  <div className="telemetry-label">Heart Rate Telemetry</div>
                  <div className="telemetry-val" style={{ color: simMode === 'assault' ? '#FF4500' : simMode === 'jogging' ? '#10B981' : '#fff' }}>
                    {simMode === 'assault' ? '168 BPM' : simMode === 'jogging' ? '142 BPM' : '74 BPM'}
                  </div>
                </div>
                <div className="telemetry-item">
                  <div className="telemetry-label">Motion Intensity</div>
                  <div className="telemetry-val" style={{ color: simMode === 'assault' ? '#FF4500' : simMode === 'bump' ? '#F59E0B' : '#10B981' }}>
                    {simMode === 'assault' ? '94% (Erratic)' : simMode === 'jogging' ? '85% (Rhythmic)' : '90% (Impact)'}
                  </div>
                </div>
                <div className="telemetry-item">
                  <div className="telemetry-label">Acoustic Analysis</div>
                  <div className="telemetry-val" style={{ color: simMode === 'assault' ? '#EF4444' : '#10B981' }}>
                    {simMode === 'assault' ? 'High (Distress)' : 'Low (Normal)'}
                  </div>
                </div>
                <div className="telemetry-item">
                  <div className="telemetry-label">AI Threat Confidence</div>
                  <div className="telemetry-val" style={{ color: simMode === 'assault' ? '#FF4500' : '#10B981' }}>
                    {simMode === 'assault' ? '99.8% (Critical)' : simMode === 'jogging' ? '1.2% (Safe)' : '12.5% (Safe)'}
                  </div>
                </div>

                <div className="telemetry-status-box" style={{
                  background: simMode === 'assault' ? 'rgba(239, 68, 68, 0.15)' : simMode === 'jogging' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  border: `1px solid ${simMode === 'assault' ? '#EF4444' : simMode === 'jogging' ? '#10B981' : '#F59E0B'}`,
                  color: simMode === 'assault' ? '#EF4444' : simMode === 'jogging' ? '#10B981' : '#F59E0B'
                }}>
                  {simMode === 'assault' && (
                    <>⚠️ THREAT DETECTED: Dual-sensor spike + distress audio confirmed. Emergency packets transmitted to Layer 3 (Dispatch).</>
                  )}
                  {simMode === 'jogging' && (
                    <>✅ NORMAL ACTIVITY: Rhythmic exercise pattern recognized by AI Core. Alert sequence rejected at Layer 2.</>
                  )}
                  {simMode === 'bump' && (
                    <>ℹ️ SINGLE-SIGNAL ANOMALY: Accelerometer impact without heart rate spike. Flagged as accidental bump — No alert.</>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="logo-badge">3</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Alerts. Silent dispatch with GPS and evidence.</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Once a threat is confirmed, Sentinel silently sends an alert to your emergency contacts and optionally to local responders. The alert includes your precise GPS location, a timestamp, and begins recording encrypted audio evidence.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> GPS location sent to contacts
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> Encrypted audio recording begins
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> Timestamp logged for evidence
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> Silent operation — attacker unaware
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-heading">
            <h2>Common Questions</h2>
            <p>Everything you need to know about Sentinel's AI behavior.</p>
          </div>
          <div>
            {faqs.map((faq, idx) => (
              <div key={idx} className="accordion-item">
                <button className="accordion-header" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} color="#FF4500" /> : <ChevronDown size={20} />}
                </button>
                {openFaq === idx && (
                  <div className="accordion-body">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>Want to dive deeper into the technology?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Explore the hardware, architecture, and AI behind Sentinel.
          </p>
          <button className="btn-primary btn-lg" onClick={() => setCurrentPage('technology')}>
            See the technology
          </button>
        </div>
      </section>
    </div>
  );
}

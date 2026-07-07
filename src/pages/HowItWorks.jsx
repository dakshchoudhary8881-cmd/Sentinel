import React, { useState } from 'react';
import { Shield, Activity, Radio, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Play, Cpu, Wifi, Siren, Volume2, Gauge, Check, XCircle, RotateCcw, Eye, Smartphone, Zap, Layers, Lock } from 'lucide-react';

export default function HowItWorks({ setCurrentPage }) {
  const [simMode, setSimMode] = useState('assault'); // 'jogging', 'bump', 'assault'
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
            {/* Serious Text Protocol Verification Matrix */}
            <div className="protocol-matrix-wrapper" style={{ marginTop: '32px', background: 'rgba(9, 12, 20, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  <Cpu size={18} color="#FF4500" /> SELECT VERIFICATION SCENARIO:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setSimMode('jogging')}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem',
                      background: simMode === 'jogging' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      color: simMode === 'jogging' ? '#10B981' : 'var(--text-secondary)',
                      border: `1px solid ${simMode === 'jogging' ? '#10B981' : 'transparent'}`,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    🏃 Routine Jogging
                  </button>
                  <button 
                    onClick={() => setSimMode('bump')}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem',
                      background: simMode === 'bump' ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      color: simMode === 'bump' ? '#F59E0B' : 'var(--text-secondary)',
                      border: `1px solid ${simMode === 'bump' ? '#F59E0B' : 'transparent'}`,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    💥 Accidental Bump
                  </button>
                  <button 
                    onClick={() => setSimMode('assault')}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem',
                      background: simMode === 'assault' ? 'rgba(255, 69, 0, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      color: simMode === 'assault' ? '#FF4500' : 'var(--text-secondary)',
                      border: `1px solid ${simMode === 'assault' ? '#FF4500' : 'transparent'}`,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    ⚠️ Active Threat Event
                  </button>
                </div>
              </div>

              {/* Matrix Layout - Stacks cleanly on mobile */}
              <div className="ev-sim-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Left Column: Sensor Telemetry Input */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    <Activity size={16} color="#10B981" /> 1. Biometric Sensor Inputs
                  </h4>

                  {/* Heart Rate Input */}
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>PPG Heart Rate Sensor</span>
                      <span style={{ fontWeight: 800, color: simMode === 'assault' ? '#FF4500' : simMode === 'jogging' ? '#10B981' : '#fff' }}>
                        {simMode === 'assault' ? '168 BPM (Spike)' : simMode === 'jogging' ? '142 BPM (Elevated)' : '74 BPM (Resting)'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {simMode === 'assault' ? '⚡ Extreme physiological stress jump detected' : simMode === 'jogging' ? 'ℹ️ Gradual cardio elevation consistent with workout' : 'ℹ️ Normal resting pulse rate'}
                    </div>
                  </div>

                  {/* Motion Input */}
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>3-Axis Accelerometer</span>
                      <span style={{ fontWeight: 800, color: simMode === 'assault' ? '#FF4500' : simMode === 'bump' ? '#F59E0B' : '#10B981' }}>
                        {simMode === 'assault' ? '9.4 G (Erratic Struggle)' : simMode === 'jogging' ? '3.2 G (Rhythmic Jog)' : '9.0 G (Single Impact)'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {simMode === 'assault' ? '⚡ Violent, chaotic motion signatures recognized' : simMode === 'jogging' ? 'ℹ️ Repetitive cadence matching running gait' : 'ℹ️ Sharp drop/bump without ongoing struggle'}
                    </div>
                  </div>

                  {/* Audio Tiebreaker */}
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>On-Device Audio Tiebreaker</span>
                      <span style={{ fontWeight: 800, color: simMode === 'assault' ? '#EF4444' : '#10B981' }}>
                        {simMode === 'assault' ? '84 dB (Distress Vocal)' : '52 dB (Ambient Calm)'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {simMode === 'assault' ? '🚨 Acoustic distress signature confirmed by AI' : 'ℹ️ Normal ambient background noise'}
                    </div>
                  </div>
                </div>

                {/* Right Column: AI Logic & Decision Outcome */}
                <div style={{ background: simMode === 'assault' ? 'rgba(239, 68, 68, 0.08)' : simMode === 'jogging' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)', border: `1px solid ${simMode === 'assault' ? 'rgba(239, 68, 68, 0.4)' : simMode === 'jogging' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`, borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      {simMode === 'assault' ? <Siren size={24} color="#EF4444" /> : <CheckCircle2 size={24} color={simMode === 'jogging' ? '#10B981' : '#F59E0B'} />}
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                        {simMode === 'assault' ? '🚨 CRITICAL THREAT VERIFIED' : simMode === 'jogging' ? '✅ THREAT REJECTED: EXERCISE' : '✅ THREAT REJECTED: BENIGN BUMP'}
                      </h4>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '20px' }}>
                      {simMode === 'assault' && "Both primary biometric signals spiked simultaneously into critical thresholds. Cross-referencing with the on-device acoustic tiebreaker confirmed active struggle and distress. The verification protocol immediately initiates a 5-second local cancel window before transmitting GPS coordinates and encrypted audio to emergency dispatch."}
                      {simMode === 'jogging' && "While heart rate is elevated (142 BPM), motion sensors detect a rhythmic, predictable jogging cadence (3.2 G). Because there is no erratic struggle or distress audio, the dual-signal verification logic classifies this as routine exercise. Zero alert is transmitted."}
                      {simMode === 'bump' && "A sharp impact (9.0 G) was detected from an accidental drop or wrist bump. However, your heart rate remains steady at normal resting levels (74 BPM). Without a simultaneous physiological stress response, the system recognizes this as a benign physical bump. Zero alert is transmitted."}
                    </p>
                  </div>

                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '16px', borderRadius: '10px', borderLeft: `4px solid ${simMode === 'assault' ? '#EF4444' : simMode === 'jogging' ? '#10B981' : '#F59E0B'}` }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                      System Action Protocol:
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: simMode === 'assault' ? '#EF4444' : '#fff' }}>
                      {simMode === 'assault' ? '→ 5s Cancel Countdown Initiated → Auto-Dispatch E-112 & Safety Circle' : '→ Local Protocol Loop Reset → Zero External Transmission'}
                    </div>
                  </div>
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

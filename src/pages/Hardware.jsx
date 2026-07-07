import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Droplets, Leaf, Watch, ShieldCheck, Award, Cpu, Heart, Activity,
  Radio, Mic, BatteryCharging, Bluetooth, CircuitBoard, Waves,
  ArrowRight, Zap, Smartphone, Bell, Users, ChevronRight, CheckCircle2,
  Thermometer, RotateCcw
} from 'lucide-react';

/* ───────────────────────────────────────────────────────────────────────
   SCENARIO PRESETS
   ─────────────────────────────────────────────────────────────────────── */
const SCENARIOS = {
  walk: { label: '🚶 Normal Walk', bpm: 72, motionX: 12, motionY: 8, motionZ: 5, status: 'nominal', color: '#10B981' },
  run:  { label: '🏃 Running',     bpm: 130, motionX: 45, motionY: 60, motionZ: 30, status: 'elevated', color: '#F59E0B' },
  threat: { label: '⚠️ Threat Detected', bpm: 165, motionX: 85, motionY: 92, motionZ: 78, status: 'alert', color: '#FF4500' },
};

/* ───────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER HOOK
   ─────────────────────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

/* ───────────────────────────────────────────────────────────────────────
   ECG WAVEFORM COMPONENT (canvas-based)
   ─────────────────────────────────────────────────────────────────────── */
function ECGWaveform({ bpm, color }) {
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
      ctx.fillStyle = 'rgba(9,12,20,0.18)';
      ctx.fillRect(0, 0, W, H);

      const speed = bpm / 40;
      offsetRef.current += speed;
      const mid = H / 2;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;

      for (let x = 0; x < W; x++) {
        const t = (x + offsetRef.current) * 0.04;
        const cycle = t % (Math.PI * 2);
        let y = mid;

        /* QRS-complex style waveform */
        if (cycle < 0.6) {
          y = mid + Math.sin(cycle * 10) * 4;
        } else if (cycle < 1.0) {
          y = mid - Math.sin((cycle - 0.6) * 7.85) * (H * 0.38);
        } else if (cycle < 1.5) {
          y = mid + Math.sin((cycle - 1.0) * 6.28) * (H * 0.12);
        } else if (cycle < 2.2) {
          y = mid + Math.sin((cycle - 1.5) * 4.48) * (H * 0.08);
        } else {
          y = mid + Math.sin(cycle * 0.5) * 2;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    /* clear once on mount */
    ctx.fillStyle = '#090C14';
    ctx.fillRect(0, 0, W, H);
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [bpm, color]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={120}
      style={{ width: '100%', height: '120px', borderRadius: '12px', border: '1px solid var(--border-subtle)', background: '#090C14' }}
    />
  );
}

/* ───────────────────────────────────────────────────────────────────────
   MAIN HARDWARE PAGE
   ─────────────────────────────────────────────────────────────────────── */
export default function Hardware({ setCurrentPage }) {

  /* ---------- Build Quality Items ---------- */
  const designPrinciples = [
    { icon: <Droplets size={26} color="#3B82F6" />, title: 'Designed for Water & Sweat Resistance', desc: 'Engineered seals to handle rain, sweat, and accidental splashes during daily wear.' },
    { icon: <Leaf size={26} color="#10B981" />, title: 'RoHS-Compliant Components', desc: 'All electronic components meet EU RoHS standards for hazardous substance restriction.' },
    { icon: <Watch size={26} color="#A78BFA" />, title: 'Engineered for All-Day Wear', desc: 'Lightweight form factor under 30g with a skin-safe silicone band for 24/7 comfort.' },
    { icon: <ShieldCheck size={26} color="#FF4500" />, title: 'Built for Durability', desc: 'Stress-tested enclosure designed to survive daily impacts, flexing, and temperature swings.' },
    { icon: <Award size={26} color="#F59E0B" />, title: '1-Year Warranty', desc: 'Full replacement coverage for manufacturing defects during the first year of ownership.' },
  ];

  /* ---------- Exploded Components ---------- */
  const components = [
    { icon: <Cpu size={24} />,             color: '#FF4500', name: 'ESP32-C3 MCU',              desc: 'Low-power processor handling sensor fusion and BLE communication.' },
    { icon: <Heart size={24} />,           color: '#EF4444', name: 'MAX30102 PPG Sensor',       desc: 'Optical heart rate and biometric monitoring with red & infrared LEDs.' },
    { icon: <Activity size={24} />,        color: '#F59E0B', name: 'ADXL345 / MPU-6050',        desc: 'Accelerometer + gyroscope for movement and struggle detection.' },
    { icon: <Mic size={24} />,             color: '#8B5CF6', name: 'MEMS Microphone',           desc: 'On-device audio capture for threat verification — never streamed to cloud.' },
    { icon: <BatteryCharging size={24} />, color: '#10B981', name: 'Li-Po Battery Cell',        desc: 'Multi-day power with intelligent duty-cycling for continuous protection.' },
    { icon: <Bluetooth size={24} />,       color: '#3B82F6', name: 'BLE Antenna',               desc: 'Low-power Bluetooth 5.0 connection to the companion app on your phone.' },
    { icon: <CircuitBoard size={24} />,    color: '#EC4899', name: 'Silicone Band Shell',       desc: 'Durable, skin-safe wearable casing — comfortable enough for sleep.' },
  ];

  /* ---------- Engineering Targets ---------- */
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const batteryHours = useCountUp(168, 2000, statsVisible);
  const tempLow     = useCountUp(10, 1400, statsVisible);
  const tempHigh    = useCountUp(50, 1400, statsVisible);

  /* ---------- Simulation State ---------- */
  const [scenario, setScenario] = useState('walk');
  const sc = SCENARIOS[scenario];
  const [pipelineStep, setPipelineStep] = useState(-1);

  /* Pipeline animation when threat is triggered */
  useEffect(() => {
    if (scenario !== 'threat') { setPipelineStep(-1); return; }
    setPipelineStep(0);
    const timers = [
      setTimeout(() => setPipelineStep(1), 600),
      setTimeout(() => setPipelineStep(2), 1400),
      setTimeout(() => setPipelineStep(3), 2200),
      setTimeout(() => setPipelineStep(4), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [scenario]);

  /* ---------- Material Comparison ---------- */
  const compareRows = [
    { attr: 'Biometric Sensors', sentinel: 'PPG + Accelerometer + Gyro + Mic', typical: 'PPG only (basic)' },
    { attr: 'AI Processing', sentinel: 'On-device threat detection', typical: 'Cloud-dependent step counter' },
    { attr: 'Purpose', sentinel: 'Personal safety & evidence capture', typical: 'Fitness tracking' },
    { attr: 'Band Material', sentinel: 'Skin-safe silicone, all-day comfort', typical: 'Plastic / rubber blend' },
    { attr: 'Privacy Model', sentinel: 'On-device. No cloud sync by default', typical: 'Continuous cloud upload' },
    { attr: 'Connectivity', sentinel: 'BLE 5.0 — encrypted', typical: 'BLE 4.x — basic pairing' },
  ];

  const pipelineStages = [
    { icon: <Zap size={18} />, label: 'Sensor Spike', color: '#EF4444' },
    { icon: <Cpu size={18} />, label: 'On-Device Verification', color: '#F59E0B' },
    { icon: <Bluetooth size={18} />, label: 'BLE Transmission', color: '#3B82F6' },
    { icon: <Smartphone size={18} />, label: 'Phone Alert', color: '#8B5CF6' },
    { icon: <Users size={18} />, label: 'Contacts Notified', color: '#10B981' },
  ];

  /* ────────────────────────────  JSX  ──────────────────────────── */
  return (
    <div className="hardware-page">

      {/* ═══════════════════  HERO  ═══════════════════ */}
      <section className="hero" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '64px' }}>

            {/* Text */}
            <div style={{ flex: '1 1 380px', textAlign: 'left', maxWidth: '520px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.3)', color: '#FF4500', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
                <img src="/sentinel_logo_shield.svg" alt="" style={{ width: '16px', height: '16px' }} /> Hardware Deep Dive
              </div>
              <h1 style={{ textAlign: 'left', margin: '0 0 20px' }}>Built to protect. Engineered to earn your trust.</h1>
              <p style={{ textAlign: 'left', margin: '0', fontSize: '1.15rem' }}>
                Every component chosen for reliability. Every claim backed by real engineering — not marketing fiction.
              </p>
            </div>

            {/* Band image */}
            <div style={{ flex: '0 0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: '-40px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,69,0,0.25) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

              {/* Spec callouts */}
              <div className="hero-floating-chip" style={{ position: 'absolute', top: '15%', left: '-150px', display: 'flex', alignItems: 'center', gap: '8px', animation: 'hwFloat 4.5s ease-in-out infinite 0.3s' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'right', lineHeight: 1.2 }}>ESP32-C3<br /><span style={{ color: '#FF4500' }}>MCU</span></div>
                <div style={{ width: '36px', height: '1px', background: 'rgba(255,69,0,0.5)' }} />
              </div>
              <div className="hero-floating-chip" style={{ position: 'absolute', bottom: '30%', right: '-150px', display: 'flex', alignItems: 'center', gap: '8px', animation: 'hwFloat 4.5s ease-in-out infinite 0.8s' }}>
                <div style={{ width: '36px', height: '1px', background: 'rgba(16,185,129,0.5)' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'left', lineHeight: 1.2 }}>MAX30102<br /><span style={{ color: '#10B981' }}>PPG Sensor</span></div>
              </div>
              <div className="hero-floating-chip" style={{ position: 'absolute', bottom: '8%', left: '-130px', display: 'flex', alignItems: 'center', gap: '8px', animation: 'hwFloat 4.5s ease-in-out infinite 1.2s' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'right', lineHeight: 1.2 }}>MEMS<br /><span style={{ color: '#8B5CF6' }}>Microphone</span></div>
                <div style={{ width: '36px', height: '1px', background: 'rgba(139,92,246,0.5)' }} />
              </div>

              <img
                src="/sentinal-band.png"
                alt="Sentinel wearable band — hardware deep dive"
                style={{
                  width: '320px', maxWidth: '80vw', objectFit: 'contain',
                  filter: 'drop-shadow(0 0 36px rgba(255,69,0,0.5)) drop-shadow(0 24px 48px rgba(0,0,0,0.85))',
                  animation: 'hwFloat 4.5s ease-in-out infinite', position: 'relative', zIndex: 1,
                }}
              />
              <style>{`
                @keyframes hwFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  BUILD QUALITY & DESIGN PRINCIPLES  ═══════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Build Quality & Design Principles</h2>
            <p>Honest commitments — not marketing buzzwords. We'll add certifications as we earn them.</p>
          </div>
          <div className="hw-trust-grid">
            {designPrinciples.map((item, idx) => (
              <div key={idx} className="hw-trust-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="hw-trust-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  EXPLODED COMPONENT BREAKDOWN  ═══════════════ */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="section-heading">
            <h2>What's Inside</h2>
            <p>Every component, named and explained — no mystery hardware.</p>
          </div>
          <div className="hw-components-grid">
            {components.map((c, idx) => (
              <div
                key={idx}
                className="hw-component-card"
                style={{ '--accent': c.color, animationDelay: `${idx * 0.08}s` }}
              >
                <div className="hw-comp-icon" style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}40` }}>
                  {c.icon}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>{c.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  ENGINEERING & PERFORMANCE TARGETS  ═══════════════ */}
      <section className="section" ref={statsRef}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-heading">
            <h2>Engineering & Performance</h2>
            <p>Current design targets — we'll replace these with verified numbers as testing completes.</p>
          </div>
          <div className="hw-stats-row">
            <div className="hw-stat-card">
              <BatteryCharging size={28} color="#10B981" />
              <div className="hw-stat-number" style={{ color: '#10B981' }}>{batteryHours}h</div>
              <div className="hw-stat-label">Battery Life <span className="hw-target-badge">target</span></div>
            </div>
            <div className="hw-stat-card">
              <Thermometer size={28} color="#3B82F6" />
              <div className="hw-stat-number" style={{ color: '#3B82F6' }}>-{tempLow}°C – {tempHigh}°C</div>
              <div className="hw-stat-label">Operating Range <span className="hw-target-badge">target</span></div>
            </div>
            <div className="hw-stat-card">
              <RotateCcw size={28} color="#F59E0B" />
              <div className="hw-stat-number" style={{ color: '#F59E0B' }}>&lt;30g</div>
              <div className="hw-stat-label">Total Weight</div>
            </div>
            <div className="hw-stat-card">
              <Waves size={28} color="#8B5CF6" />
              <div className="hw-stat-number" style={{ color: '#8B5CF6' }}>4</div>
              <div className="hw-stat-label">Sensor Modalities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  INTERACTIVE HARDWARE SIMULATION  ═══════════════ */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="section-heading">
            <h2>Interactive Hardware Simulation</h2>
            <p>Experience how the Sentinel band detects and responds — click a scenario to begin.</p>
          </div>

          <div className="hw-sim-panel">

            {/* Scenario Buttons */}
            <div className="hw-scenario-bar">
              {Object.entries(SCENARIOS).map(([key, s]) => (
                <button
                  key={key}
                  className={`hw-scenario-btn ${scenario === key ? `hw-active-${key}` : ''}`}
                  onClick={() => setScenario(key)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Sensor Readouts */}
            <div className="hw-sensor-grid">

              {/* ECG / Heart Rate */}
              <div className="hw-sensor-card hw-sensor-wide">
                <div className="hw-sensor-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={18} color={sc.color} />
                    <span style={{ fontWeight: 700 }}>Heart Rate — MAX30102</span>
                  </div>
                  <span className="hw-bpm-badge" style={{ background: `${sc.color}20`, color: sc.color, border: `1px solid ${sc.color}50` }}>
                    {sc.bpm} BPM
                  </span>
                </div>
                <ECGWaveform bpm={sc.bpm} color={sc.color} />
              </div>

              {/* Accelerometer */}
              <div className="hw-sensor-card">
                <div className="hw-sensor-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Activity size={18} color="#F59E0B" />
                    <span style={{ fontWeight: 700 }}>Motion — ADXL345</span>
                  </div>
                </div>
                <div className="hw-axis-group">
                  {[
                    { label: 'X', val: sc.motionX, color: '#EF4444' },
                    { label: 'Y', val: sc.motionY, color: '#10B981' },
                    { label: 'Z', val: sc.motionZ, color: '#3B82F6' },
                  ].map(a => (
                    <div key={a.label} className="hw-axis-row">
                      <span className="hw-axis-label" style={{ color: a.color }}>{a.label}</span>
                      <div className="hw-axis-track">
                        <div
                          className="hw-axis-fill"
                          style={{ width: `${a.val}%`, background: `linear-gradient(90deg, ${a.color}90, ${a.color})`, boxShadow: `0 0 12px ${a.color}60` }}
                        />
                      </div>
                      <span className="hw-axis-val">{a.val}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio / Mic */}
              <div className="hw-sensor-card">
                <div className="hw-sensor-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mic size={18} color="#8B5CF6" />
                    <span style={{ fontWeight: 700 }}>MEMS Mic</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {scenario === 'threat' ? 'RECORDING' : 'STANDBY'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', gap: '3px' }}>
                  {Array.from({ length: 24 }).map((_, i) => {
                    const h = scenario === 'threat'
                      ? 15 + Math.random() * 55
                      : scenario === 'run'
                        ? 8 + Math.sin(i * 0.6) * 12
                        : 4 + Math.sin(i * 0.4) * 5;
                    return (
                      <div
                        key={i}
                        style={{
                          width: '4px',
                          height: `${h}%`,
                          borderRadius: '2px',
                          background: scenario === 'threat' ? '#8B5CF6' : 'rgba(139,92,246,0.3)',
                          transition: 'height 0.3s ease',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Alert Pipeline */}
            <div className="hw-pipeline-section">
              <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '1rem', color: scenario === 'threat' ? '#FF4500' : 'var(--text-muted)' }}>
                {scenario === 'threat' ? '🔴 Alert Pipeline — ACTIVE' : 'Alert Pipeline — Idle'}
              </h4>
              <div className="hw-pipeline">
                {pipelineStages.map((stage, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`hw-pipeline-node ${pipelineStep >= idx ? 'hw-pipe-active' : ''}`}>
                      <div className="hw-pipe-icon" style={{ background: pipelineStep >= idx ? `${stage.color}25` : 'rgba(255,255,255,0.04)', color: pipelineStep >= idx ? stage.color : 'var(--text-muted)', borderColor: pipelineStep >= idx ? `${stage.color}60` : 'var(--border-subtle)' }}>
                        {stage.icon}
                      </div>
                      <span className="hw-pipe-label" style={{ color: pipelineStep >= idx ? '#fff' : 'var(--text-muted)' }}>{stage.label}</span>
                    </div>
                    {idx < pipelineStages.length - 1 && (
                      <div className="hw-pipe-connector">
                        <div className={`hw-pipe-line ${pipelineStep > idx ? 'hw-line-active' : ''}`} />
                        {pipelineStep > idx && <div className="hw-pipe-packet" style={{ background: stage.color, boxShadow: `0 0 10px ${stage.color}` }} />}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Honest Caption */}
            <p className="hw-sim-caption">
              Simulated demonstration of detection logic — illustrative, not a live data feed from a certified device.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════  MATERIAL & BUILD COMPARISON  ═══════════════ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-heading">
            <h2>How Sentinel Compares</h2>
            <p>Side-by-side against typical consumer fitness wearables.</p>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="hw-compare-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th className="hw-highlight-col">Sentinel</th>
                  <th>Typical Fitness Band</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{r.attr}</td>
                    <td className="hw-highlight-col">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={15} color="#FF4500" /> {r.sentinel}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{r.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════  BOTTOM CTA  ═══════════════ */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>Ready to feel protected?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Join the waitlist and be the first to get Sentinel on your wrist.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary btn-lg" onClick={() => setCurrentPage('pricing')}>
              Notify Me
            </button>
            <button className="btn-outline btn-lg" onClick={() => setCurrentPage('technology')}>
              Explore the Technology <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

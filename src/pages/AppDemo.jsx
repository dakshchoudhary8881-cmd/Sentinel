import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Shield, AlertTriangle, CheckCircle, MapPin, Phone, RefreshCw, Battery, Wifi, Activity, Play, Siren, Radio, Gauge, Volume2, Zap } from 'lucide-react';

export default function AppDemo({ setCurrentPage }) {
  // Simulation phases: 'idle' → 'spiking' → 'verifying' → 'countdown' → 'dispatched'
  const [phase, setPhase] = useState('idle');
  const [countdown, setCountdown] = useState(20);
  const [currentTime] = useState(new Date().toLocaleTimeString());

  // Animated biometric values
  const [bpm, setBpm] = useState(72);
  const [speed, setSpeed] = useState(0.3);
  const [accel, setAccel] = useState(0.2);
  const [stressIdx, setStressIdx] = useState(8);
  const [audioLevel, setAudioLevel] = useState(12);

  // Waveform animation
  const [waveOffset, setWaveOffset] = useState(0);
  const animFrameRef = useRef(null);
  const spikeStartRef = useRef(null);

  // Smoothly animate values during spike
  useEffect(() => {
    if (phase === 'idle') {
      // Gentle idle fluctuation
      const interval = setInterval(() => {
        setBpm(prev => 70 + Math.round(Math.random() * 6));
        setSpeed(prev => +(0.2 + Math.random() * 0.3).toFixed(1));
        setAccel(prev => +(0.1 + Math.random() * 0.2).toFixed(1));
        setStressIdx(prev => 5 + Math.round(Math.random() * 6));
        setAudioLevel(prev => 8 + Math.round(Math.random() * 10));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'spiking') {
      spikeStartRef.current = Date.now();
      // Ramp up over 2.5 seconds with rapid ticks
      const interval = setInterval(() => {
        const elapsed = Date.now() - spikeStartRef.current;
        const progress = Math.min(elapsed / 2500, 1);
        // Eased progress (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);

        setBpm(Math.round(72 + eased * 110 + Math.random() * 8));
        setSpeed(+(0.3 + eased * 14 + Math.random() * 1.5).toFixed(1));
        setAccel(+(0.2 + eased * 8.5 + Math.random() * 1).toFixed(1));
        setStressIdx(Math.round(8 + eased * 87 + Math.random() * 5));
        setAudioLevel(Math.round(12 + eased * 76 + Math.random() * 6));

        if (progress >= 1) {
          clearInterval(interval);
          setPhase('verifying');
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'verifying') {
      // Quick AI verification phase — 1.5 seconds
      const timeout = setTimeout(() => {
        setPhase('countdown');
        setCountdown(20);
      }, 1500);

      // Keep values high with fluctuation
      const interval = setInterval(() => {
        setBpm(prev => 170 + Math.round(Math.random() * 15));
        setSpeed(prev => +(12 + Math.random() * 4).toFixed(1));
        setAccel(prev => +(7 + Math.random() * 3).toFixed(1));
        setStressIdx(prev => 90 + Math.round(Math.random() * 10));
        setAudioLevel(prev => 82 + Math.round(Math.random() * 12));
      }, 200);
      return () => { clearTimeout(timeout); clearInterval(interval); };
    }
  }, [phase]);

  // Countdown timer — 20 seconds
  useEffect(() => {
    if (phase === 'countdown') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setPhase('dispatched');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Biometrics stay elevated
      const bioInterval = setInterval(() => {
        setBpm(160 + Math.round(Math.random() * 20));
        setSpeed(+(10 + Math.random() * 5).toFixed(1));
        setAccel(+(6 + Math.random() * 3.5).toFixed(1));
        setStressIdx(85 + Math.round(Math.random() * 15));
        setAudioLevel(78 + Math.round(Math.random() * 16));
      }, 400);

      return () => { clearInterval(interval); clearInterval(bioInterval); };
    }
  }, [phase]);

  // Waveform scroll animation
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;
      setWaveOffset(prev => prev + (phase === 'idle' ? 0.5 : 3));
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => { running = false; cancelAnimationFrame(animFrameRef.current); };
  }, [phase]);

  const dashboardRef = useRef(null);

  const scrollToDashboard = () => {
    if (dashboardRef.current) {
      const topOffset = dashboardRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleStartSim = () => {
    setPhase('spiking');
    scrollToDashboard();
  };

  const handleCancel = () => {
    setPhase('idle');
    setCountdown(20);
    setBpm(72);
    setSpeed(0.3);
    setAccel(0.2);
    setStressIdx(8);
    setAudioLevel(12);
    scrollToDashboard();
  };

  const handleReset = handleCancel;

  const isAlert = phase !== 'idle';
  const urgencyColor = isAlert ? '#FF4500' : '#10B981';

  // Dynamic SVG waveform path generator
  const generateWavePath = (type) => {
    const points = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 300;
      let y;
      if (!isAlert) {
        // Calm sine wave
        y = 30 + Math.sin((i * 0.8) + waveOffset * 0.03) * 8;
      } else if (type === 'heart') {
        // Intense heartbeat
        const freq = phase === 'spiking' ? 1.5 : 2.5;
        y = 30 + Math.sin((i * freq) + waveOffset * 0.08) * 25 +
            Math.cos((i * freq * 1.7) + waveOffset * 0.06) * 8;
      } else {
        // Erratic motion
        y = 30 + Math.sin((i * 2) + waveOffset * 0.1) * 22 +
            Math.cos((i * 3.3) + waveOffset * 0.07) * 10;
      }
      y = Math.max(2, Math.min(58, y));
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  // Countdown arc for the 20s timer
  const countdownRadius = 54;
  const countdownCircumference = 2 * Math.PI * countdownRadius;
  const countdownProgress = ((20 - countdown) / 20) * countdownCircumference;

  return (
    <div className="app-demo-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(255, 69, 0, 0.12)', border: '1px solid rgba(255, 69, 0, 0.3)', color: '#FF4500', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <img src="/sentinel_logo_shield.svg" alt="" style={{ width: '16px', height: '16px' }} /> Live Companion App Dashboard
          </div>
          <h1>Your Sentinel, right now</h1>
          <p>
            This is a live simulation of the companion app dashboard. Watch how threat detection works in real-time.
          </p>
        </div>
      </section>

      {/* Simulator Dashboard */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sim-dashboard" ref={dashboardRef} style={{ transition: 'box-shadow 0.5s ease', boxShadow: isAlert ? '0 0 80px rgba(239,68,68,0.15), 0 12px 40px rgba(0,0,0,0.5)' : '0 12px 40px rgba(0,0,0,0.5)' }}>
            
            {/* Status Banner */}
            <div className={`status-banner ${phase === 'idle' ? 'status-nominal' : 'status-alert'}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {phase === 'idle' ? <CheckCircle size={22} /> : <AlertTriangle size={22} />}
                <span style={{ fontWeight: 700 }}>
                  {phase === 'idle' && "Protected. All systems nominal"}
                  {phase === 'spiking' && "⚡ ANOMALY DETECTED — Analyzing biometrics..."}
                  {phase === 'verifying' && "🧠 AI VERIFICATION IN PROGRESS..."}
                  {phase === 'countdown' && `🚨 THREAT VERIFIED — SOS dispatch in ${countdown}s`}
                  {phase === 'dispatched' && "🚔 SOS ACTIVATED — Police & Contacts Notified"}
                </span>
              </div>
              {phase === 'countdown' && (
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#fff', background: countdown <= 5 ? '#DC2626' : '#EF4444', padding: '4px 14px', borderRadius: '20px', animation: countdown <= 5 ? 'urgentPulse 0.5s infinite' : 'none' }}>
                  00:{countdown < 10 ? `0${countdown}` : countdown}
                </span>
              )}
              {phase === 'verifying' && (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4500', animation: 'dotPulse 0.6s infinite 0s' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4500', animation: 'dotPulse 0.6s infinite 0.2s' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4500', animation: 'dotPulse 0.6s infinite 0.4s' }} />
                </div>
              )}
            </div>

            {/* Primary Metrics — Heart Rate & Motion */}
            <div className="grid-2" style={{ marginBottom: '20px' }}>
              {/* Heart Rate Box */}
              <div style={{ background: isAlert ? 'rgba(255,69,0,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isAlert ? 'rgba(255,69,0,0.3)' : 'var(--border-subtle)'}`, borderRadius: '14px', padding: '20px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Activity size={16} color={urgencyColor} /> LIVE HEART RATE
                  </span>
                  <span style={{
                    fontSize: '1.6rem', fontWeight: 800,
                    color: bpm > 120 ? '#EF4444' : bpm > 100 ? '#FF4500' : '#10B981',
                    transition: 'color 0.3s ease',
                    textShadow: bpm > 140 ? '0 0 12px rgba(239,68,68,0.6)' : 'none',
                  }}>
                    {bpm} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>BPM</span>
                  </span>
                </div>
                <svg viewBox="0 0 300 60" style={{ width: '100%', height: '60px' }}>
                  <path d={generateWavePath('heart')} fill="none" stroke={bpm > 120 ? '#EF4444' : '#10B981'} strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'stroke 0.3s ease' }} />
                </svg>
                {bpm > 140 && (
                  <div style={{ fontSize: '0.78rem', color: '#EF4444', fontWeight: 700, marginTop: '6px', animation: 'urgentPulse 1s infinite' }}>
                    ⚠ CRITICAL — Heart rate severely elevated
                  </div>
                )}
              </div>

              {/* Motion Intensity Box */}
              <div style={{ background: isAlert ? 'rgba(255,69,0,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isAlert ? 'rgba(255,69,0,0.3)' : 'var(--border-subtle)'}`, borderRadius: '14px', padding: '20px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={16} color={urgencyColor} /> MOTION INTENSITY
                  </span>
                  <span style={{
                    fontSize: '1.6rem', fontWeight: 800,
                    color: accel > 5 ? '#EF4444' : accel > 2 ? '#FF4500' : '#3B82F6',
                    transition: 'color 0.3s ease',
                    textShadow: accel > 6 ? '0 0 12px rgba(239,68,68,0.6)' : 'none',
                  }}>
                    {accel} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>G</span>
                  </span>
                </div>
                <svg viewBox="0 0 300 60" style={{ width: '100%', height: '60px' }}>
                  <path d={generateWavePath('motion')} fill="none" stroke={accel > 5 ? '#EF4444' : '#3B82F6'} strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'stroke 0.3s ease' }} />
                </svg>
                {accel > 5 && (
                  <div style={{ fontSize: '0.78rem', color: '#EF4444', fontWeight: 700, marginTop: '6px', animation: 'urgentPulse 1s infinite' }}>
                    ⚠ ERRATIC — Violent motion pattern detected
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              {/* Speed */}
              <div style={{ background: isAlert ? 'rgba(255,69,0,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isAlert ? 'rgba(255,69,0,0.2)' : 'var(--border-subtle)'}`, borderRadius: '12px', padding: '16px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Gauge size={15} color={speed > 8 ? '#EF4444' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>SPEED</span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: speed > 8 ? '#EF4444' : '#fff', transition: 'color 0.3s' }}>
                  {speed} <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>km/h</span>
                </div>
                {/* Speed bar */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(speed / 16 * 100, 100)}%`, height: '100%', background: speed > 8 ? '#EF4444' : speed > 3 ? '#FF4500' : '#10B981', borderRadius: '2px', transition: 'width 0.3s ease, background 0.3s ease' }} />
                </div>
              </div>

              {/* Stress Index */}
              <div style={{ background: isAlert ? 'rgba(255,69,0,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isAlert ? 'rgba(255,69,0,0.2)' : 'var(--border-subtle)'}`, borderRadius: '12px', padding: '16px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Activity size={15} color={stressIdx > 60 ? '#EF4444' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>STRESS INDEX</span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: stressIdx > 60 ? '#EF4444' : '#fff', transition: 'color 0.3s' }}>
                  {stressIdx}<span style={{ fontSize: '0.7rem', fontWeight: 600 }}>/100</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${stressIdx}%`, height: '100%', background: stressIdx > 60 ? '#EF4444' : stressIdx > 30 ? '#F59E0B' : '#10B981', borderRadius: '2px', transition: 'width 0.3s ease, background 0.3s ease' }} />
                </div>
              </div>

              {/* Audio Level */}
              <div style={{ background: isAlert ? 'rgba(255,69,0,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isAlert ? 'rgba(255,69,0,0.2)' : 'var(--border-subtle)'}`, borderRadius: '12px', padding: '16px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Volume2 size={15} color={audioLevel > 60 ? '#EF4444' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AUDIO LEVEL</span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: audioLevel > 60 ? '#EF4444' : '#fff', transition: 'color 0.3s' }}>
                  {audioLevel} <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>dB</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(audioLevel, 100)}%`, height: '100%', background: audioLevel > 60 ? '#EF4444' : audioLevel > 35 ? '#F59E0B' : '#10B981', borderRadius: '2px', transition: 'width 0.3s ease, background 0.3s ease' }} />
                </div>
              </div>
            </div>

            {/* Device Info Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Battery size={18} color="#10B981" /> Battery: <strong>94% (6 days left)</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wifi size={18} color="#10B981" /> Connection: <strong>BLE Connected</strong>
              </div>
              <div>
                Last Sync: <strong style={{ color: 'var(--text-secondary)' }}>Live ({currentTime})</strong>
              </div>
            </div>

            {/* ——— Action Zones ——— */}

            {/* IDLE: Start Sim */}
            {phase === 'idle' && (
              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={handleStartSim} 
                  className="btn-primary btn-lg" 
                  style={{ width: '100%', maxWidth: '420px', fontSize: '1.1rem', gap: '12px' }}
                >
                  <Play size={22} /> Simulate a Threat Event
                </button>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '12px' }}>
                  Watch BPM, speed, and all vitals spike in real-time
                </p>
              </div>
            )}

            {/* SPIKING: values are ramping up */}
            {phase === 'spiking' && (
              <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(255,69,0,0.06)', borderRadius: '16px', border: '1px solid rgba(255,69,0,0.2)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FF4500', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <Activity size={22} style={{ animation: 'urgentPulse 0.5s infinite' }} /> Biometric Spike Detected
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Sensors picking up extreme physiological changes...
                </p>
              </div>
            )}

            {/* VERIFYING: AI analyzing */}
            {phase === 'verifying' && (
              <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(255,69,0,0.08)', borderRadius: '16px', border: '1px dashed rgba(255,69,0,0.4)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FF4500', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <Shield size={22} style={{ animation: 'spin 1s linear infinite' }} /> On-Device AI Verifying Threat...
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Cross-referencing heart rate, motion, audio, and acceleration patterns
                </p>
              </div>
            )}

            {/* COUNTDOWN: 20s to SOS */}
            {phase === 'countdown' && (
              <div style={{ padding: '32px', background: 'rgba(239,68,68,0.08)', borderRadius: '16px', border: '2px solid rgba(239,68,68,0.4)', animation: countdown <= 5 ? 'borderFlash 0.5s infinite' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
                  {/* Circular countdown timer */}
                  <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
                    <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle cx="60" cy="60" r={countdownRadius} fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="6" />
                      <circle
                        cx="60" cy="60" r={countdownRadius}
                        fill="none"
                        stroke={countdown <= 5 ? '#DC2626' : '#EF4444'}
                        strokeWidth="6"
                        strokeDasharray={countdownCircumference}
                        strokeDashoffset={countdownCircumference - countdownProgress}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '2.4rem', fontWeight: 900, color: countdown <= 5 ? '#DC2626' : '#fff', lineHeight: 1 }}>{countdown}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>SECONDS</span>
                    </div>
                  </div>

                  {/* Countdown info */}
                  <div style={{ textAlign: 'left', flex: '1 1 300px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EF4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Siren size={24} style={{ animation: 'urgentPulse 0.5s infinite' }} /> SOS Countdown Active
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
                      {countdown > 10
                        ? "Threat verified. Police and emergency contacts will be notified automatically when the timer reaches zero."
                        : countdown > 5
                          ? "⚠ Preparing emergency dispatch... GPS lock acquired. Audio recording started."
                          : "🚨 IMMINENT — Sending location, audio evidence, and distress signal to police..."}
                    </p>
                    {/* Progress steps */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
                        <CheckCircle size={14} /> GPS coordinates locked
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: countdown <= 15 ? '#10B981' : 'var(--text-muted)' }}>
                        {countdown <= 15 ? <CheckCircle size={14} /> : <Radio size={14} />} Audio recording {countdown <= 15 ? 'active' : 'pending'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: countdown <= 10 ? '#10B981' : 'var(--text-muted)' }}>
                        {countdown <= 10 ? <CheckCircle size={14} /> : <Radio size={14} />} Evidence encryption {countdown <= 10 ? 'enabled' : 'pending'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: countdown <= 5 ? '#F59E0B' : 'var(--text-muted)', fontWeight: countdown <= 5 ? 700 : 400 }}>
                        {countdown <= 5 ? <Siren size={14} /> : <Phone size={14} />} Police dispatch {countdown <= 5 ? 'IMMINENT' : 'queued'}
                      </div>
                    </div>
                    <button 
                      onClick={handleCancel}
                      style={{
                        marginTop: '20px',
                        background: 'transparent',
                        color: '#EF4444',
                        border: '2px solid #EF4444',
                        padding: '12px 32px',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 800,
                        animation: 'urgentPulse 1.5s infinite',
                      }}
                    >
                      ✋ Cancel — False Alarm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* DISPATCHED: final state */}
            {phase === 'dispatched' && (
              <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '2px solid #EF4444', borderRadius: '16px', padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Siren size={28} color="#EF4444" style={{ animation: 'urgentPulse 0.5s infinite' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>🚔 SOS Activated — Police Dispatched</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Silent dispatch initiated. GPS coordinates and encrypted audio stream transmitted to police and your emergency circle.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CONTACT 1</div>
                    <div style={{ fontWeight: 700, color: '#fff', margin: '4px 0' }}>Mom (Primary)</div>
                    <div style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>✅ Notified via SMS & Call</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CONTACT 2</div>
                    <div style={{ fontWeight: 700, color: '#fff', margin: '4px 0' }}>Best Friend</div>
                    <div style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>✅ Live GPS Shared</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.5)', animation: 'urgentPulse 1s infinite' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>POLICE</div>
                    <div style={{ fontWeight: 700, color: '#fff', margin: '4px 0' }}>🚔 Emergency Services</div>
                    <div style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 600 }}>🚨 Dispatch Confirmed</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                    <MapPin color="#FF4500" /> Location: <strong>28.6139° N, 77.2090° E (New Delhi)</strong>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Alert timestamp: {new Date().toLocaleTimeString()}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button onClick={handleReset} className="btn-outline" style={{ border: '1px solid var(--border-strong)' }}>
                    <RefreshCw size={18} /> Reset Demo
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* What just happened Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>What just happened?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <p>
                <strong>1. Detect:</strong> Both heart rate and motion sensors spiked simultaneously — BPM jumped from resting 72 to over 170, while acceleration hit 8+ G's with erratic motion patterns.
              </p>
              <p>
                <strong>2. Verify:</strong> The on-device AI analyzed heart rate, motion, speed, stress index, and ambient audio together — confirming a genuine emergency (distinguishing it from exercise or accidental impact).
              </p>
              <p>
                <strong>3. Alert:</strong> A 20-second countdown gave you time to cancel a false alarm. Once elapsed, GPS coordinates, encrypted audio evidence, and a distress signal were automatically dispatched to police and your emergency contacts.
              </p>
            </div>
            <div style={{ marginTop: '28px' }}>
              <button 
                onClick={() => setCurrentPage('how-it-works')}
                style={{ background: 'transparent', color: '#FF4500', fontWeight: 700, fontSize: '1.05rem' }}
              >
                Learn more about how it works →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inline keyframes */}
      <style>{`
        @keyframes urgentPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes borderFlash {
          0%, 100% { border-color: rgba(239,68,68,0.7); }
          50% { border-color: rgba(239,68,68,0.2); }
        }
      `}</style>
    </div>
  );
}

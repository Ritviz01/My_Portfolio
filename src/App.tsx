import { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { ParticlesBackground } from './components/ParticlesBackground';
import { Overlay2D } from './components/Overlay2D';
import { defaultSwarmParams, sectionPresets } from './data/portfolioData';
import type { SwarmParams } from './types/portfolio';

// Ordered section keyframes — the order must match DOM order
const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'] as const;

/** Linearly interpolate between two SwarmParams objects */
function lerpParams(a: SwarmParams, b: SwarmParams, t: number): SwarmParams {
  const clamped = Math.max(0, Math.min(1, t));
  const result = { ...a };
  (Object.keys(a) as Array<keyof SwarmParams>).forEach((key) => {
    result[key] = a[key] + (b[key] - a[key]) * clamped;
  });
  return result;
}

/** Resolve a section preset into a full SwarmParams object */
function resolvePreset(section: string): SwarmParams {
  return { ...defaultSwarmParams, ...sectionPresets[section] };
}

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [swarmParams, setSwarmParams] = useState<SwarmParams>(defaultSwarmParams);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);

  // Compute blended swarm params from continuous scroll position
  const updateParamsFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    // Build an array of { section, midpoint } based on actual DOM positions
    const sectionData: { id: string; top: number; bottom: number }[] = [];
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) {
        sectionData.push({ id, top: el.offsetTop, bottom: el.offsetTop + el.offsetHeight });
      }
    }
    if (sectionData.length === 0) return;

    // Determine which section the viewport center is in (for nav highlight)
    const viewCenter = scrollY + window.innerHeight / 3;
    for (const s of sectionData) {
      if (viewCenter >= s.top && viewCenter < s.bottom) {
        setActiveSection(s.id);
        break;
      }
    }

    // Compute midpoints for each section (the scroll position where that preset is fully active)
    const midpoints = sectionData.map((s) => s.top + (s.bottom - s.top) * 0.4);

    // Find the two surrounding keyframes to blend between
    let lowerIdx = 0;
    for (let i = 0; i < midpoints.length; i++) {
      if (scrollY >= midpoints[i]) {
        lowerIdx = i;
      }
    }
    const upperIdx = Math.min(lowerIdx + 1, midpoints.length - 1);

    const lowerPreset = resolvePreset(sectionData[lowerIdx].id);
    const upperPreset = resolvePreset(sectionData[upperIdx].id);

    // Calculate blend factor (0 = fully lower, 1 = fully upper)
    let t = 0;
    if (lowerIdx !== upperIdx) {
      const range = midpoints[upperIdx] - midpoints[lowerIdx];
      t = (scrollY - midpoints[lowerIdx]) / range;
    }

    setSwarmParams(lerpParams(lowerPreset, upperPreset, t));
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,             // linear interpolation factor (0.1 means 10% movement per frame, feels very responsive and not laggy)
      wheelMultiplier: 0.85, // control the scroll speed per notch
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    // RAF loop: tick Lenis + update particle params every frame
    const raf = (time: number) => {
      lenis.raf(time);
      updateParamsFromScroll();
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // Initial sync
    updateParamsFromScroll();

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, [updateParamsFromScroll]);

  return (
    <>
      {/* 3D Particle Swarm Background */}
      <ParticlesBackground params={swarmParams} />

      {/* 2D Overlay Interface */}
      <Overlay2D 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
    </>
  );
}

export default App;

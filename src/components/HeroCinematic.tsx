import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Each bean definition:
 * [
 *   src,
 *   finalTop%,   finalLeft%,   finalWidth(px),  finalRotation(deg),
 *   startX(px),  startY(px),   startRotation(deg),  startScale,
 *   scrubSpeed,   enterAt(0–1 of scroll timeline),
 *   outroX(px),  outroY(px),   outroRotation(deg)   ← new: scatter direction on exit
 * ]
 */
const BEANS: [string, number, number, number, number, number, number, number, number, number, number, number, number][] = [
  // Large bean — enters from far left, scatters top-left on exit
  ['/assets/beans/coffee_bean1.png',  18,  7,  160,  -35,  -320,  60,  -80,  0.55, 1.0,  -280, -160, -55],
  // Large bean — enters from far right, scatters bottom-right
  ['/assets/beans/coffee_bean2.png',  65, 88,  180,   28,   340, -80,   60,  0.60, 1.0,   300,  120,  40],
  // Medium bean — drops from top, shoots up on exit
  ['/assets/beans/coffee_bean3.png',  30, 48,  110,   15,     0, -280, -30,  0.70, 0.85,   60, -220,  25],
  // Medium bean — enters from left, exits left
  ['/assets/beans/coffee_bean1.png',  55, 22,  130,  -22,  -280,  30,   40,  0.65, 0.9,  -240,  80,  -40],
  // Small bean — enters from right-upper, exits top-right
  ['/assets/beans/coffee_bean2.png',  22, 75,   90,   42,   240, -120, -50,  0.80, 0.75,  200, -180,  70],
  // Small bean — enters from bottom-left, exits bottom-left
  ['/assets/beans/coffee_bean3.png',  80, 35,  100,  -18,  -180,  200,  30,  0.85, 0.8,  -160,  200,  30],
  // Extra large bean — slow, scatters bottom-right
  ['/assets/beans/coffee_bean1.png',  72, 62,  200,   55,   120,  320, -70,  0.50, 1.1,   220,  260, -80],
  // Tiny accent — top-right, exits upward
  ['/assets/beans/coffee_bean2.png',   8, 85,   72,  -45,   160, -180,  90,  0.90, 0.7,   140, -240,  90],
  // Medium — enters from bottom, exits downward
  ['/assets/beans/coffee_bean3.png',  48, 60,  115,   30,    60,  240, -40,  0.75, 0.85,   80,  220, -50],
  // Large — far left bottom, exits bottom-left
  ['/assets/beans/coffee_bean1.png',  85, 10,  145,  -60,  -300,  180,  50,  0.45, 1.0,  -260,  180,  60],
  // Accent — top center-left, exits top-left
  ['/assets/beans/coffee_bean2.png',  12, 38,   80,   25,  -100, -200, -30,  0.88, 0.75, -120, -200, -60],
];

const HeroCinematic = () => {
  const heroRef          = useRef<HTMLDivElement>(null);
  const heroBgRef        = useRef<HTMLDivElement>(null);
  const heroOutroFadeRef = useRef<HTMLDivElement>(null);
  const outroGlowRef     = useRef<HTMLDivElement>(null);   // ← golden bloom overlay
  const heroTitleRef     = useRef<HTMLHeadingElement>(null);
  const eyebrowRef       = useRef<HTMLDivElement>(null);
  const ctaRef           = useRef<HTMLDivElement>(null);
  const beanRefs         = useRef<(HTMLImageElement | null)[]>([]);

  useLayoutEffect(() => {
    const coreRefs = [heroRef, heroTitleRef, heroBgRef, heroOutroFadeRef, eyebrowRef, ctaRef];
    if (coreRefs.some(r => !r.current)) return;

    const ctx = gsap.context(() => {

      /* ══════════════════════════════════════════════════════
         MASTER SCROLL TIMELINE — hero pinned for 1600px
         (extra 200px gives the outro room to breathe)
         ══════════════════════════════════════════════════════ */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=1600',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━
         INTRO (0 → 55)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━ */

      // Background slow architectural scale throughout
      tl.to(heroBgRef.current, {
        scale: 1.08,
        duration: 100,
        ease: 'none',
      }, 0);

      // Each bean flies in from its start position
      beanRefs.current.forEach((bean, i) => {
        if (!bean) return;
        const [,,,, , startX, startY, startRot, startScale, scrubSpeed] = BEANS[i];
        const [,,, , finalRot] = BEANS[i];

        tl.fromTo(
          bean,
          { x: startX, y: startY, rotation: startRot, scale: startScale, opacity: 0 },
          {
            x: 0, y: 0, rotation: finalRot, scale: 1, opacity: 0.95,
            ease: 'power2.out',
            duration: 52 * scrubSpeed,
          },
          0
        );
      });

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━
         MID-SCROLL REST (55 → 62)
         Everything is fully in — a beat of calm before the outro
         ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
      // (nothing to animate — beans and text stay put)

      /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         OUTRO (62 → 100) — layered cinematic exit sequence
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

      // Step 1 (62–68): Eyebrow + CTA slip upward and vanish
      tl.to([eyebrowRef.current, ctaRef.current], {
        opacity: 0,
        y: -30,
        duration: 6,
        stagger: 1.5,
        ease: 'power2.in',
      }, 62);

      // Step 2 (64–72): Headline blurs, scales down, fades — like pulling focus
      tl.to(heroTitleRef.current, {
        opacity: 0,
        scale: 0.88,
        y: -20,
        filter: 'blur(8px)',
        duration: 8,
        ease: 'power2.in',
      }, 64);

      // Step 3 (66–76): Beans SCATTER outward radially — each to its own exit vector
      beanRefs.current.forEach((bean, i) => {
        if (!bean) return;
        const [,,,,,,,,,,outroX, outroY, outroRot] = BEANS[i];
        tl.to(bean, {
          x: outroX,
          y: outroY,
          rotation: outroRot,
          scale: 0.4,
          opacity: 0,
          ease: 'power3.in',
          duration: 10,
        }, 66 + (i % 4) * 0.8);  // tiny cascade so they don't all vanish at once
      });

      // Step 4 (70–78): Background SURGES forward (zoom burst) then dims
      tl.to(heroBgRef.current, {
        scale: 1.22,
        duration: 8,
        ease: 'power3.in',
      }, 70);
      tl.to(heroBgRef.current, {
        opacity: 0.15,
        duration: 10,
        ease: 'power2.inOut',
      }, 74);

      // Step 5 (72–80): Golden bloom flashes and fades — warmth before the dark
      tl.fromTo(outroGlowRef.current,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 0.55,
          scale: 1,
          duration: 5,
          ease: 'power2.out',
        },
        72
      );
      tl.to(outroGlowRef.current, {
        opacity: 0,
        duration: 10,
        ease: 'power1.inOut',
      }, 77);

      // Step 6 (80–100): Black curtain descends — clean hand-off to next section
      tl.fromTo(heroOutroFadeRef.current,
        { opacity: 0, y: '-6%' },
        {
          opacity: 1,
          y: '0%',
          duration: 20,
          ease: 'power2.inOut',
        },
        80
      );

    }, heroRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-rizq-black"
      id="hero"
    >
      {/* ── Background photo ── */}
      <div
        ref={heroBgRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none origin-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/assets/space/Exterior.webp"
          alt="MIRA'S bakery café and pizzeria storefront"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-rizq-black via-transparent to-black/30 opacity-90" />
      </div>

      {/* ── Coffee Beans — individually scroll-driven ── */}
      {BEANS.map(([src, finalTop, finalLeft, finalWidth], i) => (
        <img
          key={i}
          ref={el => { beanRefs.current[i] = el; }}
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: `${finalTop}%`,
            left: `${finalLeft}%`,
            width: `${finalWidth}px`,
            opacity: 0,            // GSAP animates this to 0.95
            pointerEvents: 'none',
            userSelect: 'none',
            willChange: 'transform, opacity',
            zIndex: 10,
            filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.6)) drop-shadow(0 3px 8px rgba(0,0,0,0.45))',
          }}
        />
      ))}

      {/* ── Outro golden bloom ── */}
      <div
        ref={outroGlowRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 12,
          opacity: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(207,167,110,0.45) 0%, rgba(180,120,50,0.25) 40%, transparent 75%)',
          willChange: 'opacity, transform',
        }}
      />

      {/* ── Outro black curtain ── */}
      <div
        ref={heroOutroFadeRef}
        className="absolute inset-0 w-full h-full bg-rizq-black pointer-events-none opacity-0"
        style={{ zIndex: 16, willChange: 'opacity, transform' }}
      />

      {/* ── Hero content — always on top ── */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ zIndex: 20 }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="absolute top-24 md:top-28 lg:top-32 flex flex-col items-center gap-2 select-none"
          style={{ zIndex: 25, willChange: 'transform, opacity' }}
        >
          <span className="font-body text-[10px] md:text-xs tracking-[0.35em] uppercase text-rizq-bronze-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Artisan Bakery &amp; Specialty Roastery
          </span>
          <div className="w-8 h-px bg-rizq-bronze/60" />
        </div>

        {/* Headline */}
        <h1
          ref={heroTitleRef}
          className="relative text-center px-6 select-none font-editorial text-[clamp(1.85rem,3.8vw,3.35rem)] leading-[1.18] font-normal text-rizq-cream tracking-tight max-w-3xl mt-6 md:mt-10"
          style={{ zIndex: 25, willChange: 'transform, opacity, filter' }}
        >
          <span className="block drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Fresh Bakes. Slow Brews.
          </span>
          <span className="block mt-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            <em className="text-rizq-bronze-light font-normal italic">Unrushed</em> conversations.
          </span>
          <span className="block mt-3 md:mt-4 font-body text-[11px] md:text-xs font-light tracking-[0.24em] uppercase text-rizq-cream/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Sourdough Atelier · Single-Origin Coffee · Stone Hearth Pizzeria
          </span>
        </h1>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="absolute bottom-16 md:bottom-20 flex flex-col items-center gap-3 select-none"
          style={{ zIndex: 25, willChange: 'transform, opacity' }}
        >
          <a href="#reservation" className="btn-premium">
            <span>Find Your Table</span>
            <span className="arrow">→</span>
          </a>
          <span className="font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/60">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroCinematic;

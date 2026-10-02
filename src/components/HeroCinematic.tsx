import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Coffee bean source paths — 3 real photographic assets, reused across 11 instances
const B1 = '/assets/beans/coffee_bean1.png';
const B2 = '/assets/beans/coffee_bean2.png';
const B3 = '/assets/beans/coffee_bean3.png';

const HeroCinematic = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOutroFadeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // RIZQ branded bag
  const carryBagRef = useRef<HTMLImageElement>(null);

  // ── 11 coffee bean instances across 3 depth layers ──
  // Background layer (behind text, z-index 2)
  const bgBean1Ref = useRef<HTMLImageElement>(null); // small, top-left entry
  const bgBean2Ref = useRef<HTMLImageElement>(null); // tiny, bottom-right entry
  const bgBean3Ref = useRef<HTMLImageElement>(null); // small, right entry diagonal

  // Midground layer (at/near text level, z-index 4)
  const mgBean1Ref = useRef<HTMLImageElement>(null); // medium, left → right cross
  const mgBean2Ref = useRef<HTMLImageElement>(null); // medium, bottom → upper-left
  const mgBean3Ref = useRef<HTMLImageElement>(null); // medium, right → left diagonal
  const mgBean4Ref = useRef<HTMLImageElement>(null); // medium, bottom corner diagonal

  // Foreground layer (in front of text, z-index 8)
  const fgBean1Ref = useRef<HTMLImageElement>(null); // large, right edge → upper-center
  const fgBean2Ref = useRef<HTMLImageElement>(null); // large, bottom-left → upper-right
  const fgBean3Ref = useRef<HTMLImageElement>(null); // large, lower-right → upper-left
  const fgBean4Ref = useRef<HTMLImageElement>(null); // very large, bottom-center → upper

  useLayoutEffect(() => {
    const refs = [
      heroRef, heroTitleRef, carryBagRef, heroBgRef, heroOutroFadeRef,
      eyebrowRef, ctaRef,
      bgBean1Ref, bgBean2Ref, bgBean3Ref,
      mgBean1Ref, mgBean2Ref, mgBean3Ref, mgBean4Ref,
      fgBean1Ref, fgBean2Ref, fgBean3Ref, fgBean4Ref,
    ];
    if (refs.some(r => !r.current)) return;

    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────────────
      // INITIAL POSITIONS — every object starts off-screen or invisible.
      // The 0% hero viewport shows ONLY background + typography. Zero beans.
      // ─────────────────────────────────────────────────────────────────────

      // ── BACKGROUND BEANS (small, low opacity, behind text) ──
      gsap.set(bgBean1Ref.current, {
        x: -480, y: 200, scale: 0.38, rotation: 30, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(bgBean2Ref.current, {
        x: 520, y: 350, scale: 0.32, rotation: -45, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(bgBean3Ref.current, {
        x: 460, y: 280, scale: 0.44, rotation: 110, opacity: 0,
        transformOrigin: 'center center',
      });

      // ── MIDGROUND BEANS (medium, normal opacity) ──
      gsap.set(mgBean1Ref.current, {
        x: -560, y: 180, scale: 0.64, rotation: -20, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(mgBean2Ref.current, {
        x: 300, y: 480, scale: 0.58, rotation: 55, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(mgBean3Ref.current, {
        x: 580, y: 260, scale: 0.72, rotation: -70, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(mgBean4Ref.current, {
        x: -380, y: 420, scale: 0.60, rotation: 140, opacity: 0,
        transformOrigin: 'center center',
      });

      // ── FOREGROUND BEANS (large, in front of text) ──
      gsap.set(fgBean1Ref.current, {
        x: 480, y: 340, scale: 1.05, rotation: 25, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(fgBean2Ref.current, {
        x: -520, y: 400, scale: 0.92, rotation: -55, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(fgBean3Ref.current, {
        x: 400, y: 460, scale: 1.18, rotation: 80, opacity: 0,
        transformOrigin: 'center center',
      });
      gsap.set(fgBean4Ref.current, {
        x: -100, y: 520, scale: 1.30, rotation: -15, opacity: 0,
        transformOrigin: 'center center',
      });

      // ── RIZQ BAG — starts off-screen below-right ──
      gsap.set(carryBagRef.current, {
        x: 220, y: 480, rotation: -5, opacity: 0,
        transformOrigin: 'center center',
      });

      // ─────────────────────────────────────────────────────────────────────
      // MASTER TIMELINE
      // 100 units → 2400px scroll. Each unit = 24px travel.
      // ─────────────────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle living-photo background scale across the whole timeline
      tl.to(heroBgRef.current, { scale: 1.04, duration: 100, ease: 'none' }, 0);

      // ═════════════════════════════════════════════════════════════════════
      // 0–10%: PRISTINE HERO — nothing moves into view yet
      // ═════════════════════════════════════════════════════════════════════
      // (intentional dead scroll — just background breathes)

      // ═════════════════════════════════════════════════════════════════════
      // 10–25%: FIRST WAVE — 2 background beans enter quietly from opposite edges
      // They travel slowly behind everything — creates a sense the scene is alive
      // ═════════════════════════════════════════════════════════════════════

      // bgBean1: enters left → drifts upper-right (behind text, z:2)
      tl.to(bgBean1Ref.current, {
        x: -120, y: -180, rotation: 80, opacity: 0.45,
        duration: 30, ease: 'none',
      }, 10);
      tl.to(bgBean1Ref.current, {
        x: 80, y: -560, rotation: 140, opacity: 0,
        duration: 45, ease: 'none',
      }, 40);

      // bgBean3: enters right diagonal → drifts upper-left (behind text, z:2)
      tl.to(bgBean3Ref.current, {
        x: 160, y: -120, rotation: 165, opacity: 0.40,
        duration: 35, ease: 'none',
      }, 15);
      tl.to(bgBean3Ref.current, {
        x: -60, y: -620, rotation: 220, opacity: 0,
        duration: 40, ease: 'none',
      }, 50);

      // ═════════════════════════════════════════════════════════════════════
      // 20–40%: SECOND WAVE — midground beans + 1 foreground appear
      // Composition now has 4–5 visible elements at varied depths
      // ═════════════════════════════════════════════════════════════════════

      // mgBean1: sweeps in from far left → crosses right side (z:4, medium)
      tl.to(mgBean1Ref.current, {
        x: 80, y: -100, rotation: 40, opacity: 0.85,
        duration: 28, ease: 'none',
      }, 20);
      tl.to(mgBean1Ref.current, {
        x: 480, y: -600, rotation: 120, opacity: 0,
        duration: 35, ease: 'none',
      }, 48);

      // bgBean2: tiny background, enters right → sinks left-upward (z:2)
      tl.to(bgBean2Ref.current, {
        x: 200, y: 100, rotation: -10, opacity: 0.35,
        duration: 25, ease: 'none',
      }, 22);
      tl.to(bgBean2Ref.current, {
        x: -80, y: -500, rotation: -80, opacity: 0,
        duration: 45, ease: 'none',
      }, 47);

      // fgBean1: FOREGROUND — large bean sweeps in from right (z:8, in front of text)
      tl.to(fgBean1Ref.current, {
        x: 200, y: -80, rotation: -10, opacity: 1,
        duration: 25, ease: 'none',
      }, 25);
      tl.to(fgBean1Ref.current, {
        x: -200, y: -700, rotation: -90, opacity: 0,
        duration: 38, ease: 'none',
      }, 50);

      // ═════════════════════════════════════════════════════════════════════
      // 35–60%: DEPTH CLIMAX — beans across all three layers simultaneously
      // Some behind text (z:2/4), some in front (z:8)
      // Maximum depth effect — scene feels fully three-dimensional
      // ═════════════════════════════════════════════════════════════════════

      // mgBean2: enters bottom → rises upper-left, at medium depth (z:4)
      tl.to(mgBean2Ref.current, {
        x: 100, y: -140, rotation: -20, opacity: 0.80,
        duration: 28, ease: 'none',
      }, 35);
      tl.to(mgBean2Ref.current, {
        x: -380, y: -720, rotation: -110, opacity: 0,
        duration: 35, ease: 'none',
      }, 63);

      // mgBean3: enters from right → crosses left (different angle, z:4)
      tl.to(mgBean3Ref.current, {
        x: 220, y: -60, rotation: -20, opacity: 0.75,
        duration: 30, ease: 'none',
      }, 38);
      tl.to(mgBean3Ref.current, {
        x: -480, y: -580, rotation: -180, opacity: 0,
        duration: 35, ease: 'none',
      }, 68);

      // fgBean2: FOREGROUND — large, enters bottom-left, shoots upper-right (z:8)
      tl.to(fgBean2Ref.current, {
        x: -80, y: -200, rotation: 40, opacity: 0.95,
        duration: 25, ease: 'none',
      }, 40);
      tl.to(fgBean2Ref.current, {
        x: 420, y: -880, rotation: 150, opacity: 0,
        duration: 35, ease: 'none',
      }, 65);

      // mgBean4: midground, enters lower-left → diagonal upper-right (z:4)
      tl.to(mgBean4Ref.current, {
        x: -60, y: -160, rotation: 80, opacity: 0.70,
        duration: 28, ease: 'none',
      }, 45);
      tl.to(mgBean4Ref.current, {
        x: 260, y: -660, rotation: 200, opacity: 0,
        duration: 35, ease: 'none',
      }, 73);

      // ═════════════════════════════════════════════════════════════════════
      // 55–80%: FOREGROUND CLIMAX + BAG ENTERS
      // Largest, closest beans. RIZQ bag rises as brand statement.
      // ═════════════════════════════════════════════════════════════════════

      // fgBean3: large foreground, lower-right → upper-left arc (55–80%)
      tl.to(fgBean3Ref.current, {
        x: 180, y: -240, rotation: -20, opacity: 1,
        duration: 25, ease: 'none',
      }, 55);
      tl.to(fgBean3Ref.current, {
        x: -420, y: -900, rotation: -160, opacity: 0,
        duration: 32, ease: 'none',
      }, 80);

      // fgBean4: prominent bean passing gracefully near lower-left of typography (60–86%)
      tl.to(fgBean4Ref.current, {
        x: -240, y: -260, rotation: 35, opacity: 0.95,
        duration: 26, ease: 'none',
      }, 60);
      tl.to(fgBean4Ref.current, {
        x: -480, y: -940, rotation: 120, opacity: 0,
        duration: 30, ease: 'none',
      }, 84);

      // RIZQ BAG: rises slowly from bottom-right — brand object treatment (z:9)
      tl.to(carryBagRef.current, {
        x: 260, y: -160, rotation: 3, opacity: 1,
        duration: 25, ease: 'none',
      }, 56);
      tl.to(carryBagRef.current, {
        x: 400, y: -840, rotation: 12, opacity: 0,
        duration: 30, ease: 'none',
      }, 76);

      // ═════════════════════════════════════════════════════════════════════
      // 55–75%: Eyebrow + CTA dissolve
      // ═════════════════════════════════════════════════════════════════════
      tl.to([eyebrowRef.current, ctaRef.current], {
        opacity: 0, y: -20,
        duration: 20, stagger: 5, ease: 'power1.out',
      }, 55);

      // ═════════════════════════════════════════════════════════════════════
      // 75–100%: OUTRO — Headline dissolves, background fades, black overlay
      // ═════════════════════════════════════════════════════════════════════
      tl.to(heroTitleRef.current, {
        opacity: 0, scale: 0.94, y: -30,
        duration: 17, ease: 'power1.inOut',
      }, 75);

      tl.to(heroBgRef.current, {
        scale: 1.06, opacity: 0.3,
        duration: 18, ease: 'power1.inOut',
      }, 82);

      tl.to(heroOutroFadeRef.current, {
        opacity: 1,
        duration: 15, ease: 'power1.inOut',
      }, 85);

    }, heroRef);

    requestAnimationFrame(() => { ScrollTrigger.refresh(); });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505]"
      id="hero"
    >
      {/* ── Background Environment ── */}
      <div
        ref={heroBgRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none origin-center"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/assets/space/Exterior.webp"
          alt="RIZQ restaurant exterior"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/68" />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent" />
      </div>

      {/* ── Outro Dissolve Overlay ── */}
      <div
        ref={heroOutroFadeRef}
        className="absolute inset-0 w-full h-full bg-[#050505] pointer-events-none opacity-0"
        style={{ zIndex: 15, willChange: 'opacity' }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          HERO STAGE — relative coordinate system
          Depth z-index map:
            2  = background beans  (behind text)
            4  = midground beans   (at/near text level)
            5  = typography        ← text lives here
            8  = foreground beans  (in front of text)
            9  = RIZQ bag          (brand foreground)
            15 = outro overlay
          ════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ zIndex: 20 }}>

        {/* ── Eyebrow ── */}
        <div
          ref={eyebrowRef}
          className="absolute top-28 md:top-32 lg:top-36 flex flex-col items-center gap-3 select-none"
          style={{ zIndex: 5, willChange: 'transform, opacity' }}
        >
          <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-muted">
            Café &amp; Kitchen — Defence Colony
          </span>
          <div className="w-8 h-px bg-rizq-bronze/40" />
        </div>

        {/* ── Hero Headline — z:5, typography layer ── */}
        <h1
          ref={heroTitleRef}
          className="relative text-center px-6 select-none font-editorial text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] font-medium text-rizq-cream tracking-[-0.02em]"
          style={{ zIndex: 5, willChange: 'transform, opacity' }}
        >
          <span className="block">Somewhere</span>
          <span className="block mt-1 md:mt-2">
            between{' '}
            <em className="text-rizq-bronze-light font-normal italic">here</em>
          </span>
          <span className="block mt-1 md:mt-2">and heaven.</span>
        </h1>

        {/* ── CTA ── */}
        <div
          ref={ctaRef}
          className="absolute bottom-20 md:bottom-24 lg:bottom-28 flex flex-col items-center gap-4 select-none"
          style={{ zIndex: 5, willChange: 'transform, opacity' }}
        >
          <a href="#reservation" className="btn-premium">
            <span>Find Your Table</span>
            <span className="arrow">→</span>
          </a>
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-rizq-muted/60">
            Scroll to explore
          </span>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            BACKGROUND LAYER BEANS — z:2 — behind typography
            Small, low opacity, slow. Feel distant.
            ════════════════════════════════════════════════════════════ */}

        {/* bgBean1 — coffee_bean1, small, enters from left (10–40%) */}
        <img
          ref={bgBean1Ref}
          src={B1}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 2,
            width: 'clamp(60px, 5vw, 90px)',
            top: '50%', left: '50%',
            marginTop: '-45px', marginLeft: '-45px',
            willChange: 'transform, opacity',
            filter: 'brightness(0.75)',
          }}
          loading="eager"
          draggable={false}
        />

        {/* bgBean2 — coffee_bean3, tiny, enters from right (22–47%) */}
        <img
          ref={bgBean2Ref}
          src={B3}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 2,
            width: 'clamp(50px, 4vw, 75px)',
            top: '50%', left: '50%',
            marginTop: '-37px', marginLeft: '-37px',
            willChange: 'transform, opacity',
            filter: 'brightness(0.65)',
          }}
          loading="eager"
          draggable={false}
        />

        {/* bgBean3 — coffee_bean2, small diagonal, enters from right (15–50%) */}
        <img
          ref={bgBean3Ref}
          src={B2}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 2,
            width: 'clamp(65px, 5.5vw, 100px)',
            top: '50%', left: '50%',
            marginTop: '-50px', marginLeft: '-50px',
            willChange: 'transform, opacity',
            filter: 'brightness(0.70)',
          }}
          loading="eager"
          draggable={false}
        />

        {/* ════════════════════════════════════════════════════════════════
            MIDGROUND LAYER BEANS — z:4 — at/near text level
            Medium size and opacity. Cross behind or near the headline.
            ════════════════════════════════════════════════════════════ */}

        {/* mgBean1 — coffee_bean1, sweeps left→right (20–48%) */}
        <img
          ref={mgBean1Ref}
          src={B1}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 4,
            width: 'clamp(100px, 8vw, 145px)',
            top: '50%', left: '50%',
            marginTop: '-72px', marginLeft: '-72px',
            willChange: 'transform, opacity',
            filter: 'brightness(0.85)',
          }}
          loading="eager"
          draggable={false}
        />

        {/* mgBean2 — coffee_bean2, bottom→upper-left (35–63%) */}
        <img
          ref={mgBean2Ref}
          src={B2}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 4,
            width: 'clamp(90px, 7vw, 130px)',
            top: '50%', left: '50%',
            marginTop: '-65px', marginLeft: '-65px',
            willChange: 'transform, opacity',
            filter: 'brightness(0.88)',
          }}
          loading="eager"
          draggable={false}
        />

        {/* mgBean3 — coffee_bean3, right→left diagonal (38–68%) */}
        <img
          ref={mgBean3Ref}
          src={B3}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 4,
            width: 'clamp(110px, 8.5vw, 155px)',
            top: '50%', left: '50%',
            marginTop: '-77px', marginLeft: '-77px',
            willChange: 'transform, opacity',
            filter: 'brightness(0.82)',
          }}
          loading="eager"
          draggable={false}
        />

        {/* mgBean4 — coffee_bean1, lower-left→upper-right diagonal (45–73%) */}
        <img
          ref={mgBean4Ref}
          src={B1}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 4,
            width: 'clamp(95px, 7.5vw, 140px)',
            top: '50%', left: '50%',
            marginTop: '-70px', marginLeft: '-70px',
            willChange: 'transform, opacity',
            filter: 'brightness(0.86)',
          }}
          loading="eager"
          draggable={false}
        />

        {/* ════════════════════════════════════════════════════════════════
            FOREGROUND LAYER BEANS — z:8 — IN FRONT of typography
            Large, full opacity, faster. Feel physically close.
            These should feel like they're passing the camera lens.
            ════════════════════════════════════════════════════════════ */}

        {/* fgBean1 — coffee_bean2, large, enters right edge (25–50%) */}
        <img
          ref={fgBean1Ref}
          src={B2}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 8,
            width: 'clamp(160px, 13vw, 220px)',
            top: '50%', left: '50%',
            marginTop: '-110px', marginLeft: '-110px',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
          }}
          loading="eager"
          draggable={false}
        />

        {/* fgBean2 — coffee_bean3, large, bottom-left→upper-right (40–65%) */}
        <img
          ref={fgBean2Ref}
          src={B3}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 8,
            width: 'clamp(150px, 12vw, 205px)',
            top: '50%', left: '50%',
            marginTop: '-102px', marginLeft: '-102px',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.55))',
          }}
          loading="eager"
          draggable={false}
        />

        {/* fgBean3 — coffee_bean1, large, lower-right arc (55–80%) */}
        <img
          ref={fgBean3Ref}
          src={B1}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 8,
            width: 'clamp(140px, 11vw, 190px)',
            top: '50%', left: '50%',
            marginTop: '-95px', marginLeft: '-95px',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.65))',
          }}
          loading="eager"
          draggable={false}
        />

        {/* fgBean4 — coffee_bean2, foreground bean, passes lower-left (60–84%) */}
        <img
          ref={fgBean4Ref}
          src={B2}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 8,
            width: 'clamp(145px, 11.5vw, 195px)',
            top: '50%', left: '50%',
            marginTop: '-100px', marginLeft: '-100px',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.70))',
          }}
          loading="eager"
          draggable={false}
        />

        {/* ════════════════════════════════════════════════════════════════
            RIZQ BRANDED BAG — z:9 — primary brand foreground object
            Slowest, most deliberate. Rises from lower-right (58–75%)
            ════════════════════════════════════════════════════════════ */}
        <img
          ref={carryBagRef}
          src="/assets/hero/hero_1 (5).png"
          alt="RIZQ branded carry bag"
          className="absolute pointer-events-none select-none"
          style={{
            zIndex: 9,
            width: 'clamp(180px, 14vw, 250px)',
            top: '50%', left: '50%',
            marginTop: '-125px', marginLeft: '-125px',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.75))',
          }}
          loading="eager"
          draggable={false}
        />

      </div>
    </section>
  );
};

export default HeroCinematic;

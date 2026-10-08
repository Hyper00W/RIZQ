import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef    = useRef<HTMLElement>(null);
  const bgImgRef      = useRef<HTMLImageElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const shimmerRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Slow ambient scale on the photo (parallax-lite) ── */
      gsap.fromTo(
        bgImgRef.current,
        { scale: 1.12 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        }
      );

      /* ── 2. Overlay darkens slightly as user scrolls deeper ── */
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.55 },
        {
          opacity: 0.72,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      /* ── 3. Golden shimmer line sweeps across once on enter ── */
      gsap.fromTo(
        shimmerRef.current,
        { x: '-100%', opacity: 0 },
        {
          x: '120%',
          opacity: 1,
          duration: 1.6,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── 4. Content stagger rise-in ── */
      gsap.from(Array.from(contentRef.current!.children), {
        y: 48,
        opacity: 0,
        duration: 1.05,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 62%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      id="reservation"
      style={{ minHeight: '520px' }}
    >
      {/* ── Photo background ── */}
      <div className="absolute inset-0">
        <img
          ref={bgImgRef}
          src="/assets/space/cta_bg.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(3px) brightness(0.78)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
          loading="lazy"
          aria-hidden="true"
        />
        {/* Multi-stop gradient veil — rich dark bottom, lighter top */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14,15,18,0.52) 0%, rgba(14,15,18,0.38) 35%, rgba(14,15,18,0.58) 70%, rgba(14,15,18,0.88) 100%)',
          }}
        />
        {/* Subtle warm bronze tint wash */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(207,167,110,0.06)' }}
        />
      </div>

      {/* ── Horizontal shimmer sweep ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div
          ref={shimmerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '45%',
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(207,167,110,0.55), transparent)',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 lg:py-32">
        <div ref={contentRef} className="flex flex-col items-center text-center">

          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-rizq-bronze-light/60 block mb-4">
            07 &nbsp;/&nbsp; Come Visit
          </span>

          <div className="section-divider mb-8" />

          <h2 className="font-editorial text-[clamp(2.4rem,5.5vw,5rem)] leading-[1] font-medium text-rizq-cream mb-2"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
            Come hungry.
          </h2>
          <h2
            className="font-editorial text-[clamp(2.4rem,5.5vw,5rem)] leading-[1] font-normal italic mb-8"
            style={{
              color: '#CFA76E',
              textShadow: '0 2px 28px rgba(207,167,110,0.35)',
            }}
          >
            Stay awhile.
          </h2>

          <p className="font-body text-sm md:text-[0.95rem] text-rizq-cream/70 max-w-[420px] leading-[1.9] mb-10"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            Whether for your morning cappuccino and warm artisan loaf, or an
            evening stone-oven pizza gathering with friends — we have a table
            waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="#reservation" className="btn-premium">
              <span>Find Your Table</span>
              <span className="arrow">→</span>
            </a>
            <a
              href="https://www.google.com/maps/place/MIRAS/@28.5758256,77.2381897,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium"
            >
              <span>Get Directions</span>
              <span className="arrow">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;


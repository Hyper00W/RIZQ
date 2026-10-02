import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredDish, normalDishes } from '../data/menu';

gsap.registerPlugin(ScrollTrigger);

const MenuShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);

  // Collage surrounding elements
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const topFarRef = useRef<HTMLDivElement>(null);

  // Central featured dish in pinned stage
  const centerDishWrapperRef = useRef<HTMLDivElement>(null);
  const centerGlowRef = useRef<HTMLDivElement>(null);
  const centerLabelRef = useRef<HTMLDivElement>(null);

  // Sections in normal document flow
  const featuredInfoSectionRef = useRef<HTMLDivElement>(null);
  const normalDishesSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ════════════════════════════════════════════════════════════
      // 1. PINNED CINEMATIC STAGE: Collage → Central Dish Zoom
      // ════════════════════════════════════════════════════════════
      const stageTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: '+=1600', // Tight scroll distance: zero dead scroll!
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial positions & rotations
      gsap.set(topLeftRef.current, { rotation: -12, transformOrigin: 'center center' });
      gsap.set(topRightRef.current, { rotation: 16, transformOrigin: 'center center' });
      gsap.set(bottomLeftRef.current, { rotation: 9, transformOrigin: 'center center' });
      gsap.set(bottomRightRef.current, { rotation: -8, transformOrigin: 'center center' });
      gsap.set(centerDishWrapperRef.current, { scale: 0.72, transformOrigin: 'center center' });
      gsap.set(centerLabelRef.current, { opacity: 0, y: 20 });

      // Title fades & ascends as scroll begins (t = 10 to 40)
      stageTl.to(
        titleGroupRef.current,
        {
          y: -60,
          opacity: 0,
          duration: 30,
          ease: 'power1.out',
        },
        10
      );

      // Surrounding collage dishes fly outward smoothly (t = 15 to 65)
      stageTl.to(
        topLeftRef.current,
        {
          x: -380,
          y: -200,
          scale: 0.45,
          opacity: 0,
          rotation: -28,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      stageTl.to(
        topRightRef.current,
        {
          x: 400,
          y: -220,
          scale: 0.45,
          opacity: 0,
          rotation: 30,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      stageTl.to(
        bottomLeftRef.current,
        {
          x: -380,
          y: 240,
          scale: 0.45,
          opacity: 0,
          rotation: -14,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      stageTl.to(
        bottomRightRef.current,
        {
          x: 400,
          y: 240,
          scale: 0.4,
          opacity: 0,
          rotation: 16,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      stageTl.to(
        topFarRef.current,
        {
          y: -240,
          scale: 0.35,
          opacity: 0,
          duration: 45,
          ease: 'power1.inOut',
        },
        15
      );

      // Central Featured Dish: continuous smooth zoom (t = 15 to 95)
      stageTl.to(
        centerDishWrapperRef.current,
        {
          scale: 1.55,
          duration: 80,
          ease: 'power1.inOut',
        },
        15
      );

      // Ambient warm radial backlight expands with dish (t = 15 to 95)
      stageTl.to(
        centerGlowRef.current,
        {
          scale: 2.5,
          opacity: 0.6,
          duration: 80,
          ease: 'power1.inOut',
        },
        15
      );

      // Floating highlight label emerges near zoom completion (t = 65 to 95)
      stageTl.to(
        centerLabelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 30,
          ease: 'power2.out',
        },
        65
      );

      // ════════════════════════════════════════════════════════════
      // 2. FEATURED DISH 01 INFO (Normal document flow reveal)
      // ════════════════════════════════════════════════════════════
      if (featuredInfoSectionRef.current) {
        const frame = featuredInfoSectionRef.current.querySelector('.dish-frame');
        const text = featuredInfoSectionRef.current.querySelector('.dish-text');

        if (frame) {
          gsap.fromTo(
            frame,
            { scale: 0.94, opacity: 0, y: 30 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: featuredInfoSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: featuredInfoSectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      // ════════════════════════════════════════════════════════════
      // 3. NORMAL DISHES LIST (Dishes 02 - 04, Normal document flow)
      // ════════════════════════════════════════════════════════════
      if (normalDishesSectionRef.current) {
        const rows = normalDishesSectionRef.current.querySelectorAll('.normal-dish-row');
        rows.forEach((row) => {
          const imgFrame = row.querySelector('.dish-frame');
          const textBlock = row.querySelector('.dish-text');

          if (imgFrame) {
            gsap.fromTo(
              imgFrame,
              { scale: 0.94, opacity: 0, y: 30 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          if (textBlock) {
            gsap.fromTo(
              textBlock.children,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 75%',
                  toggleActions: 'play none none none',
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] text-rizq-cream" id="menu">
      {/* ════════════════════════════════════════════════════════════
          STAGE 1: MENU CINEMATIC STAGE (ONLY PINNED COMPONENT)
         ════════════════════════════════════════════════════════════ */}
      <div
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505]"
      >
        {/* Section Top Header Marker */}
        <div className="absolute top-8 left-8 md:left-14 z-30 flex items-center gap-3">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/50">
            02
          </span>
          <span className="w-6 h-px bg-rizq-bronze/30" />
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-rizq-muted/40">
            The Menu
          </span>
        </div>

        {/* ── Collage Center Headline ── */}
        <div
          ref={titleGroupRef}
          className="absolute z-20 text-center px-6 pointer-events-none select-none max-w-2xl"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-rizq-bronze/50" />
            <span className="font-body text-[10px] md:text-xs tracking-[0.35em] uppercase text-rizq-bronze">
              From Our Kitchen
            </span>
            <span className="w-8 h-px bg-rizq-bronze/50" />
          </div>

          <h2 className="font-editorial text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-medium text-rizq-cream tracking-[-0.02em]">
            The Menu
          </h2>

          <p className="mt-4 font-editorial italic text-sm md:text-lg text-rizq-muted/80 max-w-md mx-auto">
            "A little bit of everything. A lot to remember."
          </p>
        </div>

        {/* ── Surrounding Collage Items (Disperse Outward with Scroll) ── */}
        <div className="absolute inset-0 w-full h-full max-w-[1440px] mx-auto pointer-events-none select-none">
          {/* Top-Far: Asian Wok Culinary Bowl */}
          <div
            ref={topFarRef}
            className="absolute hidden md:block z-10"
            style={{
              top: '7%',
              left: '46%',
              transform: 'translateX(-50%)',
              willChange: 'transform, opacity',
            }}
          >
            <div className="w-28 md:w-36 rounded-full overflow-hidden p-1 border border-rizq-bronze/25 bg-black/60 shadow-2xl">
              <img
                src="/assets/menu/menu_food_1.webp"
                alt="Asian culinary specialty"
                className="w-full h-full object-cover rounded-full opacity-70"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* Top-Left: Roasted Garlic Sourdough */}
          <div
            ref={topLeftRef}
            className="absolute z-15"
            style={{
              top: '12%',
              left: '6%',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src="/assets/hero/hero_1 (2).png"
              alt="Roasted garlic sourdough bread"
              className="w-32 md:w-48 lg:w-56 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] opacity-85"
              loading="lazy"
              draggable={false}
            />
            <span className="block mt-2 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/40 text-center">
              Garlic Sourdough
            </span>
          </div>

          {/* Top-Right: Woodfired Truffle Pizza Slice */}
          <div
            ref={topRightRef}
            className="absolute z-15"
            style={{
              top: '10%',
              right: '6%',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src="/assets/hero/hero_1.png"
              alt="Woodfired Truffle Margherita pizza slice"
              className="w-36 md:w-52 lg:w-64 drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] opacity-85"
              loading="lazy"
              draggable={false}
            />
            <span className="block mt-2 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/40 text-center">
              Truffle Pizza
            </span>
          </div>

          {/* Bottom-Left: Golden Crispy Spring Rolls */}
          <div
            ref={bottomLeftRef}
            className="absolute z-15"
            style={{
              bottom: '12%',
              left: '8%',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src="/assets/hero/hero_1 (3).png"
              alt="Golden crispy spring rolls"
              className="w-32 md:w-44 lg:w-52 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] opacity-85"
              loading="lazy"
              draggable={false}
            />
            <span className="block mt-2 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/40 text-center">
              Spring Rolls
            </span>
          </div>

          {/* Bottom-Right: Mediterranean Feast in Framed Circle */}
          <div
            ref={bottomRightRef}
            className="absolute z-15"
            style={{
              bottom: '10%',
              right: '8%',
              willChange: 'transform, opacity',
            }}
          >
            <div className="w-32 md:w-44 lg:w-52 aspect-square rounded-full overflow-hidden p-1.5 border border-rizq-bronze/35 bg-black/70 shadow-2xl">
              <img
                src="/assets/menu/menu_food_4.webp"
                alt="Woodfired bread and mezze dips"
                className="w-full h-full object-cover rounded-full opacity-80"
                loading="lazy"
                draggable={false}
              />
            </div>
            <span className="block mt-2 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/40 text-center">
              Mediterranean Oven
            </span>
          </div>
        </div>

        {/* ── Central Featured Dish (Sakura Maki on Bamboo Platter) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-25 pointer-events-none select-none">
          {/* Ambient warm radial backlight */}
          <div
            ref={centerGlowRef}
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(195, 154, 98, 0.25) 0%, rgba(168, 121, 69, 0.08) 50%, transparent 70%)',
              filter: 'blur(35px)',
              opacity: 0.3,
              willChange: 'transform, opacity',
            }}
          />

          <div
            ref={centerDishWrapperRef}
            className="relative flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            <img
              src={featuredDish.image}
              alt={featuredDish.imageAlt}
              className="w-56 sm:w-68 md:w-84 lg:w-[420px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* Floating Highlight Label */}
          <div
            ref={centerLabelRef}
            className="mt-6 text-center select-none"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-px bg-rizq-bronze" />
              <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze font-medium">
                01 · Signature Selection
              </span>
              <span className="w-5 h-px bg-rizq-bronze" />
            </div>
            <h3 className="font-editorial text-lg md:text-2xl font-medium text-rizq-cream mt-1 tracking-tight">
              {featuredDish.name}
            </h3>
          </div>
        </div>

        {/* Ambient Edge Gradients */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-30" />
      </div>

      {/* ════════════════════════════════════════════════════════════
          STAGE 2: FEATURED DISH 01 INFORMATION (NORMAL DOCUMENT FLOW)
          (Follows immediately with zero dead scroll gap!)
         ════════════════════════════════════════════════════════════ */}
      <div
        ref={featuredInfoSectionRef}
        className="relative z-10 w-full pt-16 md:pt-24 pb-20 md:pb-28 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Framed Image Column */}
          <div className="lg:col-span-7">
            <div className="dish-frame relative p-2.5 sm:p-3 md:p-4 border border-[#A87945]/40 bg-[#111111]/80 backdrop-blur-sm group">
              <div className="relative overflow-hidden border border-white/[0.04] bg-[#050505] flex items-center justify-center p-6 md:p-10 min-h-[300px] md:min-h-[420px] lg:min-h-[480px]">
                <div className="absolute inset-0 bg-radial from-rizq-bronze/10 via-transparent to-transparent opacity-50" />
                <img
                  src={featuredDish.image}
                  alt={featuredDish.imageAlt}
                  className="relative z-10 max-h-[260px] md:max-h-[360px] lg:max-h-[420px] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-rizq-bronze/60" />
                <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-rizq-bronze/60" />
                <span className="absolute bottom-2 left-2 w-2 h-b border-b border-l border-rizq-bronze/60" />
                <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-rizq-bronze/60" />
              </div>
              <div className="absolute bottom-6 right-6 z-20 px-3.5 py-1.5 bg-[#050505]/90 border border-rizq-bronze/40 backdrop-blur-md">
                <span className="font-body text-xs md:text-sm font-medium text-rizq-cream tracking-wider">
                  {featuredDish.price}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Details Column */}
          <div className="dish-text lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-editorial text-2xl md:text-3xl text-rizq-bronze font-light">
                {featuredDish.number}
              </span>
              <span className="w-8 h-px bg-rizq-bronze/40" />
              <span className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-rizq-muted/70">
                {featuredDish.category}
              </span>
            </div>

            <h3 className="font-editorial text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.05] font-medium text-rizq-cream mb-4">
              {featuredDish.name}
            </h3>

            <div className="w-12 h-px bg-rizq-bronze/50 mb-6" />

            <div className="mb-6">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-rizq-muted/50 block mb-2">
                Key Ingredients
              </span>
              <p className="font-body text-xs md:text-sm text-rizq-bronze-light/90 tracking-wide">
                {featuredDish.ingredients}
              </p>
            </div>

            <p className="font-body text-sm md:text-base leading-[1.8] text-rizq-muted max-w-lg mb-8">
              "{featuredDish.description}"
            </p>

            <a
              href="#reservation"
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-rizq-cream hover:text-rizq-bronze transition-colors duration-300 group w-fit"
            >
              <span>Reserve Tasting</span>
              <span className="text-rizq-bronze transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          STAGE 3: NORMAL DISH LIST (DISHES 02 - 04, NORMAL FLOW)
          (Zero duplicate dishes, continuous scroll flow)
         ════════════════════════════════════════════════════════════ */}
      <div
        ref={normalDishesSectionRef}
        className="relative z-10 w-full pb-24 md:pb-36 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20"
      >
        {/* Subtle Continuing Divider */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-6">
            <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze">
              Continuing The Selection
            </span>
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-rizq-muted/40">
              Dishes 02 — 04
            </span>
          </div>
        </div>

        {/* Normal Dishes Editorial Spreads */}
        <div className="space-y-28 md:space-y-36 lg:space-y-44">
          {normalDishes.map((dish) => {
            const isImageLeft = dish.layout === 'image-left';

            return (
              <div
                key={dish.id}
                className="normal-dish-row grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center"
              >
                {/* ── Image Column with Premium Bronze Frame ── */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="dish-frame relative p-2.5 sm:p-3 md:p-4 border border-[#A87945]/40 bg-[#111111]/80 backdrop-blur-sm group">
                    <div className="relative overflow-hidden border border-white/[0.04] bg-[#050505] flex items-center justify-center p-6 md:p-10 min-h-[300px] md:min-h-[420px] lg:min-h-[480px]">
                      <div className="absolute inset-0 bg-radial from-rizq-bronze/10 via-transparent to-transparent opacity-50" />
                      
                      <img
                        src={dish.image}
                        alt={dish.imageAlt}
                        className="relative z-10 max-h-[260px] md:max-h-[360px] lg:max-h-[420px] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                        loading="lazy"
                      />

                      <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-rizq-bronze/60" />
                      <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-rizq-bronze/60" />
                      <span className="absolute bottom-2 left-2 w-2 h-b border-b border-l border-rizq-bronze/60" />
                      <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-rizq-bronze/60" />
                    </div>

                    <div className="absolute bottom-6 right-6 z-20 px-3.5 py-1.5 bg-[#050505]/90 border border-rizq-bronze/40 backdrop-blur-md">
                      <span className="font-body text-xs md:text-sm font-medium text-rizq-cream tracking-wider">
                        {dish.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Editorial Text Column ── */}
                <div
                  className={`dish-text lg:col-span-5 flex flex-col justify-center ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-editorial text-2xl md:text-3xl text-rizq-bronze font-light">
                      {dish.number}
                    </span>
                    <span className="w-8 h-px bg-rizq-bronze/40" />
                    <span className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-rizq-muted/70">
                      {dish.category}
                    </span>
                  </div>

                  <h4 className="font-editorial text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.05] font-medium text-rizq-cream mb-4">
                    {dish.name}
                  </h4>

                  <div className="w-12 h-px bg-rizq-bronze/50 mb-6" />

                  <div className="mb-6">
                    <span className="font-body text-[9px] tracking-[0.3em] uppercase text-rizq-muted/50 block mb-2">
                      Key Ingredients
                    </span>
                    <p className="font-body text-xs md:text-sm text-rizq-bronze-light/90 tracking-wide">
                      {dish.ingredients}
                    </p>
                  </div>

                  <p className="font-body text-sm md:text-base leading-[1.8] text-rizq-muted max-w-lg mb-8">
                    "{dish.description}"
                  </p>

                  <a
                    href="#reservation"
                    className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-rizq-cream hover:text-rizq-bronze transition-colors duration-300 group w-fit"
                  >
                    <span>Reserve Tasting</span>
                    <span className="text-rizq-bronze transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Manifesto Quote */}
        <div className="mt-28 md:mt-36 text-center">
          <div className="w-16 h-px bg-rizq-bronze/40 mx-auto mb-8" />
          <p className="font-editorial italic text-xl md:text-3xl text-rizq-cream/80 max-w-2xl mx-auto leading-relaxed">
            "We do not cook to feed. We cook to provoke memory."
          </p>
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-rizq-muted/50 block mt-4">
            RIZQ Culinary Manifesto
          </span>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;

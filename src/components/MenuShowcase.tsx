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
      // 1. PINNED CINEMATIC STAGE: Tight, natural scroll distance (900px)
      // ════════════════════════════════════════════════════════════
      const stageTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: '+=900',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial positions & rotations
      gsap.set(topLeftRef.current, { rotation: -10, transformOrigin: 'center center' });
      gsap.set(topRightRef.current, { rotation: 12, transformOrigin: 'center center' });
      gsap.set(bottomLeftRef.current, { rotation: 8, transformOrigin: 'center center' });
      gsap.set(bottomRightRef.current, { rotation: -6, transformOrigin: 'center center' });
      gsap.set(centerDishWrapperRef.current, { scale: 0.76, transformOrigin: 'center center' });
      gsap.set(centerLabelRef.current, { opacity: 0, y: 16 });

      // Title fades & ascends as scroll begins (t = 10 to 40)
      stageTl.to(
        titleGroupRef.current,
        {
          y: -40,
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
          x: -360,
          y: -180,
          scale: 0.5,
          opacity: 0,
          rotation: -24,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      stageTl.to(
        topRightRef.current,
        {
          x: 360,
          y: -180,
          scale: 0.5,
          opacity: 0,
          rotation: 26,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      stageTl.to(
        bottomLeftRef.current,
        {
          x: -360,
          y: 200,
          scale: 0.5,
          opacity: 0,
          rotation: -12,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      stageTl.to(
        bottomRightRef.current,
        {
          x: 360,
          y: 200,
          scale: 0.5,
          opacity: 0,
          rotation: 14,
          duration: 50,
          ease: 'power1.inOut',
        },
        15
      );

      // Central Featured Dish: smooth zoom (t = 15 to 90)
      stageTl.to(
        centerDishWrapperRef.current,
        {
          scale: 1.45,
          duration: 75,
          ease: 'power1.inOut',
        },
        15
      );

      // Ambient warm radial backlight expands with dish (t = 15 to 90)
      stageTl.to(
        centerGlowRef.current,
        {
          scale: 2.2,
          opacity: 0.5,
          duration: 75,
          ease: 'power1.inOut',
        },
        15
      );

      // Floating highlight label emerges near zoom completion (t = 60 to 90)
      stageTl.to(
        centerLabelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 30,
          ease: 'power2.out',
        },
        60
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
            { scale: 0.96, opacity: 0, y: 25 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.9,
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
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
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
      // 3. NORMAL DISHES LIST (Dishes 02 - 05, Normal document flow)
      // ════════════════════════════════════════════════════════════
      if (normalDishesSectionRef.current) {
        const rows = normalDishesSectionRef.current.querySelectorAll('.normal-dish-row');
        rows.forEach((row) => {
          const imgFrame = row.querySelector('.dish-frame');
          const textBlock = row.querySelector('.dish-text');

          if (imgFrame) {
            gsap.fromTo(
              imgFrame,
              { scale: 0.96, opacity: 0, y: 25 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.9,
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
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
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
    <section ref={containerRef} className="relative w-full bg-rizq-black text-rizq-cream" id="menu">
      {/* ════════════════════════════════════════════════════════════
          STAGE 1: MENU CINEMATIC STAGE (ONLY PINNED COMPONENT)
         ════════════════════════════════════════════════════════════ */}
      <div
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-rizq-black"
      >
        {/* Section Top Header Marker */}
        <div className="absolute top-6 left-6 md:left-12 z-30 flex items-center gap-2.5">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/50">
            02
          </span>
          <span className="w-5 h-px bg-rizq-bronze/30" />
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
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-rizq-bronze/50" />
            <span className="font-body text-[10px] md:text-xs tracking-[0.35em] uppercase text-rizq-bronze">
              From Our Kitchen &amp; Hearth
            </span>
            <span className="w-6 h-px bg-rizq-bronze/50" />
          </div>

          <h2 className="font-editorial text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.98] font-medium text-rizq-cream tracking-tight">
            The Selection
          </h2>

          <p className="mt-3 font-editorial italic text-sm md:text-base text-rizq-muted/80 max-w-md mx-auto">
            "Artisan bakes, wood-fired hearths &amp; slow-crafted plates."
          </p>
        </div>

        {/* ── Surrounding Collage Items (Disperse Outward with Scroll) ── */}
        <div className="absolute inset-0 w-full h-full max-w-[1440px] mx-auto pointer-events-none select-none">
          {/* Top-Left: Artisan Bakery Breakfast */}
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
              src="/assets/menu/dish_brunch_plate.webp"
              alt="The Artisan Bakery Breakfast"
              className="w-28 md:w-44 lg:w-52 drop-shadow-[0_16px_30px_rgba(0,0,0,0.75)] opacity-90"
              loading="lazy"
              draggable={false}
            />
            <span className="block mt-1.5 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/50 text-center">
              Bakery Breakfast
            </span>
          </div>

          {/* Top-Right: Artisan Charred Margherita Pizza */}
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
              src="/assets/menu/dish_margherita_pizza.webp"
              alt="Artisan Charred Margherita pizza"
              className="w-32 md:w-48 lg:w-56 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] opacity-90"
              loading="lazy"
              draggable={false}
            />
            <span className="block mt-1.5 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/50 text-center">
              Woodfired Pizza
            </span>
          </div>

          {/* Bottom-Left: Slow-Braised Barbacoa Tacos */}
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
              src="/assets/menu/dish_tacos.webp"
              alt="Slow-braised barbacoa tacos"
              className="w-28 md:w-40 lg:w-48 drop-shadow-[0_16px_30px_rgba(0,0,0,0.75)] opacity-90"
              loading="lazy"
              draggable={false}
            />
            <span className="block mt-1.5 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/50 text-center">
              Gourmet Tacos
            </span>
          </div>

          {/* Bottom-Right: Grand Mediterranean Mezze Feast */}
          <div
            ref={bottomRightRef}
            className="absolute z-15"
            style={{
              bottom: '10%',
              right: '8%',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src="/assets/menu/dish_mezze_platter.webp"
              alt="Grand Mediterranean Mezze Feast"
              className="w-28 md:w-44 lg:w-52 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] opacity-90"
              loading="lazy"
              draggable={false}
            />
            <span className="block mt-1.5 font-body text-[9px] tracking-[0.25em] uppercase text-rizq-muted/50 text-center">
              Mezze Feast
            </span>
          </div>
        </div>

        {/* ── Central Featured Dish (Mira's Pumpkin Bowl) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-25 pointer-events-none select-none">
          {/* Ambient warm radial backlight */}
          <div
            ref={centerGlowRef}
            className="absolute w-64 h-64 md:w-84 md:h-84 rounded-full pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(207, 167, 110, 0.22) 0%, rgba(181, 137, 79, 0.06) 50%, transparent 70%)',
              filter: 'blur(30px)',
              opacity: 0.35,
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
              className="w-52 sm:w-64 md:w-76 lg:w-[380px] drop-shadow-[0_24px_50px_rgba(0,0,0,0.9)]"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* Floating Highlight Label */}
          <div
            ref={centerLabelRef}
            className="mt-5 text-center select-none"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-4 h-px bg-rizq-bronze" />
              <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze font-medium">
                01 · Signature Atelier
              </span>
              <span className="w-4 h-px bg-rizq-bronze" />
            </div>
            <h3 className="font-editorial text-lg md:text-xl font-medium text-rizq-cream mt-1 tracking-tight">
              {featuredDish.name}
            </h3>
          </div>
        </div>

        {/* Ambient Edge Gradients */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-rizq-black to-transparent pointer-events-none z-30" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-rizq-black to-transparent pointer-events-none z-30" />
      </div>

      {/* ════════════════════════════════════════════════════════════
          STAGE 2: FEATURED DISH 01 INFORMATION (NORMAL DOCUMENT FLOW)
         ════════════════════════════════════════════════════════════ */}
      <div
        ref={featuredInfoSectionRef}
        className="relative z-10 w-full pt-12 md:pt-16 pb-14 md:pb-20 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Framed Image Column */}
          <div className="lg:col-span-7">
            <div className="dish-frame relative p-2.5 sm:p-3 border border-rizq-bronze/30 bg-rizq-dark/70 backdrop-blur-sm group">
              <div className="relative overflow-hidden border border-white/[0.04] bg-rizq-black flex items-center justify-center p-6 md:p-8 min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
                <div className="absolute inset-0 bg-radial from-rizq-bronze/10 via-transparent to-transparent opacity-40" />
                <img
                  src={featuredDish.image}
                  alt={featuredDish.imageAlt}
                  className="relative z-10 max-h-[240px] md:max-h-[320px] lg:max-h-[380px] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-rizq-bronze/50" />
                <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-rizq-bronze/50" />
                <span className="absolute bottom-2 left-2 w-2 h-b border-b border-l border-rizq-bronze/50" />
                <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-rizq-bronze/50" />
              </div>
              <div className="absolute bottom-5 right-5 z-20 px-3 py-1 bg-rizq-black/90 border border-rizq-bronze/35 backdrop-blur-md">
                <span className="font-body text-xs md:text-sm font-medium text-rizq-cream tracking-wider">
                  {featuredDish.price}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Details Column */}
          <div className="dish-text lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-editorial text-2xl md:text-3xl text-rizq-bronze font-light">
                {featuredDish.number}
              </span>
              <span className="w-6 h-px bg-rizq-bronze/40" />
              <span className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-rizq-muted/70">
                {featuredDish.category}
              </span>
            </div>

            <h3 className="font-editorial text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.08] font-medium text-rizq-cream mb-3.5">
              {featuredDish.name}
            </h3>

            <div className="w-10 h-px bg-rizq-bronze/50 mb-5" />

            <div className="mb-5">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-rizq-muted/50 block mb-1.5">
                Key Ingredients
              </span>
              <p className="font-body text-xs md:text-sm text-rizq-bronze-light/90 tracking-wide">
                {featuredDish.ingredients}
              </p>
            </div>

            <p className="font-body text-sm md:text-base leading-[1.75] text-rizq-muted max-w-lg mb-7">
              "{featuredDish.description}"
            </p>

            <a
              href="#reservation"
              className="inline-flex items-center gap-2.5 font-body text-xs tracking-[0.2em] uppercase text-rizq-cream hover:text-rizq-bronze transition-colors duration-300 group w-fit"
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
          STAGE 3: NORMAL DISH LIST (DISHES 02 - 05, NORMAL FLOW)
         ════════════════════════════════════════════════════════════ */}
      <div
        ref={normalDishesSectionRef}
        className="relative z-10 w-full pb-16 md:pb-24 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16"
      >
        {/* Subtle Continuing Divider */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze">
              Continuing The Selection
            </span>
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-rizq-muted/40">
              Dishes 02 — 05
            </span>
          </div>
        </div>

        {/* Normal Dishes Editorial Spreads — Normal, comfortable spacing */}
        <div className="space-y-16 md:space-y-24">
          {normalDishes.map((dish) => {
            const isImageLeft = dish.layout === 'image-left';

            return (
              <div
                key={dish.id}
                className="normal-dish-row grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center"
              >
                {/* ── Image Column with Premium Bronze Frame ── */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="dish-frame relative p-2.5 sm:p-3 border border-rizq-bronze/30 bg-rizq-dark/70 backdrop-blur-sm group">
                    <div className="relative overflow-hidden border border-white/[0.04] bg-rizq-black flex items-center justify-center p-6 md:p-8 min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
                      <div className="absolute inset-0 bg-radial from-rizq-bronze/10 via-transparent to-transparent opacity-40" />
                      
                      <img
                        src={dish.image}
                        alt={dish.imageAlt}
                        className="relative z-10 max-h-[240px] md:max-h-[320px] lg:max-h-[380px] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                        loading="lazy"
                      />

                      <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-rizq-bronze/50" />
                      <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-rizq-bronze/50" />
                      <span className="absolute bottom-2 left-2 w-2 h-b border-b border-l border-rizq-bronze/50" />
                      <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-rizq-bronze/50" />
                    </div>

                    <div className="absolute bottom-5 right-5 z-20 px-3 py-1 bg-rizq-black/90 border border-rizq-bronze/35 backdrop-blur-md">
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
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-editorial text-2xl md:text-3xl text-rizq-bronze font-light">
                      {dish.number}
                    </span>
                    <span className="w-6 h-px bg-rizq-bronze/40" />
                    <span className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-rizq-muted/70">
                      {dish.category}
                    </span>
                  </div>

                  <h4 className="font-editorial text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.08] font-medium text-rizq-cream mb-3.5">
                    {dish.name}
                  </h4>

                  <div className="w-10 h-px bg-rizq-bronze/50 mb-5" />

                  <div className="mb-5">
                    <span className="font-body text-[9px] tracking-[0.3em] uppercase text-rizq-muted/50 block mb-1.5">
                      Key Ingredients
                    </span>
                    <p className="font-body text-xs md:text-sm text-rizq-bronze-light/90 tracking-wide">
                      {dish.ingredients}
                    </p>
                  </div>

                  <p className="font-body text-sm md:text-base leading-[1.75] text-rizq-muted max-w-lg mb-7">
                    "{dish.description}"
                  </p>

                  <a
                    href="#reservation"
                    className="inline-flex items-center gap-2.5 font-body text-xs tracking-[0.2em] uppercase text-rizq-cream hover:text-rizq-bronze transition-colors duration-300 group w-fit"
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
        <div className="mt-20 md:mt-24 text-center">
          <div className="w-12 h-px bg-rizq-bronze/40 mx-auto mb-6" />
          <p className="font-editorial italic text-lg md:text-2xl text-rizq-cream/80 max-w-2xl mx-auto leading-relaxed">
            "We do not bake to fill. We craft to awaken the senses."
          </p>
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-rizq-muted/50 block mt-3">
            MIRA'S Culinary &amp; Bakery Manifesto
          </span>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;

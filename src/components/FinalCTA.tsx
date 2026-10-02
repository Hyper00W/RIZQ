import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current!.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
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
      className="relative bg-rizq-black py-32 md:py-44 lg:py-56 overflow-hidden"
      id="reservation"
    >
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/menu/menu_food_4.webp"
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rizq-black via-rizq-black/80 to-rizq-black" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={contentRef} className="flex flex-col items-center text-center">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-4">
            07
          </span>

          <div className="section-divider mb-10" />

          <h2 className="font-editorial text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] font-medium text-rizq-cream mb-4">
            Come hungry.
          </h2>
          <h2 className="font-editorial text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] font-normal text-rizq-bronze-light italic mb-12">
            Stay awhile.
          </h2>

          <p className="font-body text-sm md:text-base text-rizq-muted max-w-md leading-[1.8] mb-12">
            Whether it's a quiet dinner for two or a celebration with friends,
            we'll make sure the night is unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="#reservation" className="btn-premium">
              <span>Find Your Table</span>
              <span className="arrow">→</span>
            </a>
            <a
              href="https://www.google.com/maps/place/RIZQ/@28.5758256,77.2381897,17z"
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

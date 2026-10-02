import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line grows horizontally
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        }
      );

      // Content reveal (smooth upward glide + subtle scale)
      gsap.fromTo(
        contentRef.current!.children,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        }
      );

      // Image reveal with smooth clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] py-28 md:py-40 lg:py-48"
      id="story"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Number */}
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-14">
          03
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze block mb-6">
              Our Story
            </span>

            <h2 className="font-editorial text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] font-medium text-rizq-cream mb-8">
              Good food.
              <br />
              <em className="text-rizq-bronze-light font-normal italic">Better company.</em>
            </h2>

            <div ref={lineRef} className="w-16 h-px bg-rizq-bronze/40 mb-8 origin-left" />

            <p className="font-body text-sm md:text-base leading-[1.8] text-rizq-muted max-w-lg mb-6">
              RIZQ was born from a simple truth — the best meals are the ones
              shared. Nestled in the heart of Defence Colony, we bring together
              flavors from across the globe under one roof, served with the warmth
              of home.
            </p>

            <p className="font-body text-sm md:text-base leading-[1.8] text-rizq-muted/70 max-w-lg">
              From our wood-fired oven to the sushi counter, from the terrace bar
              to the intimate indoor lounge — every corner of RIZQ is designed to
              make you stay a little longer.
            </p>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="relative overflow-hidden"
            style={{ clipPath: 'inset(0 0 0% 0)' }}
          >
            <img
              src="/assets/space/Interior_1.webp"
              alt="RIZQ interior — warm ambient bar with herringbone floors and golden lighting"
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

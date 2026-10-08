import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpaceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Large image reveal
      gsap.from(img1Ref.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: img1Ref.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      // Supporting images
      gsap.from(img2Ref.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: img2Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      gsap.from(img3Ref.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: img3Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      // Text reveal
      gsap.from(textRef.current!.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      // Subtle parallax on large image
      gsap.to(img1Ref.current!.querySelector('img'), {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: img1Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-rizq-black py-16 md:py-24 lg:py-28"
      id="space"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Number */}
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-8">
          04
        </span>

        {/* Header */}
        <div ref={textRef} className="mb-12 md:mb-16">
          <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze block mb-4">
            The Space
          </span>
          <h2 className="font-editorial text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] font-medium text-rizq-cream max-w-2xl">
            Where every corner
            <br />
            tells a <em className="text-rizq-bronze-light font-normal italic">story.</em>
          </h2>
          <p className="mt-6 font-body text-sm md:text-base leading-[1.8] text-rizq-muted max-w-lg">
            An architectural sanctuary of warm fluted timber, honed stone, and gentle
            ambient light. From our vibrant street-level bakery market display to the
            intimate dining book lounge and sunlit upper mezzanine, every space welcomes you in.
          </p>
        </div>

        {/* Editorial Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Large architectural image */}
          <div
            ref={img1Ref}
            className="lg:col-span-7 overflow-hidden border border-white/[0.04]"
            style={{ clipPath: 'inset(0 0% 0 0)' }}
          >
            <img
              src="/assets/space/Interior_2.webp"
              alt="MIRAS dining book lounge — warm fluted timber walls, glowing cove lighting and marble tables"
              className="w-full h-[350px] md:h-[450px] lg:h-[600px] object-cover scale-110"
              loading="lazy"
            />
          </div>

          {/* Supporting images */}
          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
            <div
              ref={img2Ref}
              className="overflow-hidden border border-white/[0.04]"
              style={{ clipPath: 'inset(0% 0 0 0)' }}
            >
              <img
                src="/assets/space/Interior_1.webp"
                alt="MIRAS market display — illuminated bakery shelves with sourdough loaves and artisanal goods"
                className="w-full h-[200px] md:h-[250px] lg:h-[290px] object-cover"
                loading="lazy"
              />
            </div>
            <div
              ref={img3Ref}
              className="overflow-hidden border border-white/[0.04]"
              style={{ clipPath: 'inset(0 0 0% 0)' }}
            >
              <img
                src="/assets/space/Exterior.webp"
                alt="MIRAS storefront — architectural concrete facade, floor-to-ceiling glass and champagne gold signage"
                className="w-full h-[200px] md:h-[250px] lg:h-[290px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceSection;

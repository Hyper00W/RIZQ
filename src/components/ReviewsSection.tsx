import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reviews } from '../data/reviews';

gsap.registerPlugin(ScrollTrigger);

const ReviewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current!.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      // Horizontal scroll of review cards
      const track = trackRef.current!;
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScroll * 0.8}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-rizq-dark overflow-hidden"
      id="reviews"
    >
      {/* Header */}
      <div ref={headerRef} className="absolute top-12 md:top-16 left-6 md:left-10 lg:left-16 z-10">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-4">
          05
        </span>
        <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze block mb-3">
          Kind Words
        </span>
        <h2 className="font-editorial text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] font-medium text-rizq-cream">
          What they say.
        </h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-6 md:gap-10 pl-6 md:pl-10 lg:pl-16 pt-24 md:pt-28"
        style={{ willChange: 'transform' }}
      >
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="flex-shrink-0 w-[85vw] md:w-[50vw] lg:w-[35vw] h-[52vh] md:h-[48vh] flex flex-col justify-between p-7 md:p-9 lg:p-10 border border-white/[0.05] bg-rizq-surface/40 backdrop-blur-sm"
          >
            {/* Stars */}
            <div className="flex gap-1.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-rizq-bronze text-sm">★</span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-editorial text-lg md:text-xl lg:text-2xl leading-[1.5] text-rizq-cream/90 italic">
              "{review.text}"
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-body text-sm text-rizq-cream block">
                  {review.name}
                </span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-rizq-muted/50">
                  {review.location} · {review.date}
                </span>
              </div>
              <span className="font-body text-[10px] tracking-[0.2em] text-rizq-muted/30">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}

        {/* Trailing space */}
        <div className="flex-shrink-0 w-[15vw]" />
      </div>
    </section>
  );
};

export default ReviewsSection;

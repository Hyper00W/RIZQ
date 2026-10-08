import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { locationData } from '../data/location';

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current!.children, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      gsap.from(mapRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
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
      className="relative bg-rizq-dark py-16 md:py-24 lg:py-28"
      id="location"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Number */}
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-8">
          06
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Map Area */}
          <div
            ref={mapRef}
            className="relative overflow-hidden bg-rizq-surface order-2 lg:order-1 h-[350px] md:h-[450px] lg:h-[550px]"
          >
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=MIRAS+Defence+Colony+New+Delhi&center=${locationData.coordinates.lat},${locationData.coordinates.lng}&zoom=16&maptype=roadmap`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) brightness(0.7)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MIRAS Location"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/[0.04]" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex flex-col justify-center order-1 lg:order-2">
            <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-rizq-bronze block mb-6">
              Find Us
            </span>

            <h2 className="font-editorial text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] font-medium text-rizq-cream mb-10">
              Visit <em className="text-rizq-bronze-light font-normal italic">MIRA'S</em>
            </h2>

            <div className="section-divider mb-10" />

            {/* Address */}
            <div className="mb-8">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/50 block mb-3">
                Address
              </span>
              <p className="font-body text-sm md:text-base leading-[1.9] text-rizq-cream/80">
                {locationData.address.line1}
                <br />
                {locationData.address.line2}
                <br />
                {locationData.address.line3}
                <br />
                {locationData.address.city} {locationData.address.pincode}
              </p>
            </div>

            {/* Hours */}
            <div className="mb-8">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/50 block mb-3">
                Hours
              </span>
              <p className="font-body text-sm md:text-base text-rizq-cream/80">
                {locationData.hours.display}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/50 block mb-3">
                Contact
              </span>
              <a
                href={`tel:${locationData.contact.phone}`}
                className="font-body text-sm md:text-base text-rizq-cream/80 hover:text-rizq-bronze transition-colors duration-300"
              >
                {locationData.contact.phoneDisplay}
              </a>
            </div>

            {/* Google Maps CTA */}
            <a
              href={locationData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex w-fit"
            >
              <span>View on Google Maps</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

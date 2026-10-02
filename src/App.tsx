import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import HeroCinematic from './components/HeroCinematic';
import MenuShowcase from './components/MenuShowcase';
import StorySection from './components/StorySection';
import SpaceSection from './components/SpaceSection';
import ReviewsSection from './components/ReviewsSection';
import LocationSection from './components/LocationSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Expose for debugging (remove in production)
    (window as any).gsap = gsap;
    (window as any).ScrollTrigger = ScrollTrigger;

    // Initial rAF refresh
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      // Second refresh after a short delay to let pin-spacers fully settle in the DOM.
      // GSAP pin-spacers are added synchronously but Tailwind's CSS may affect
      // padding computation. The second refresh recalculates all trigger positions
      // with the final layout, fixing Story/Space/Reviews/Location/CTA triggers.
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      // If user arrived with a hash (e.g. #menu), smoothly scroll to it after triggers initialize
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          setTimeout(() => {
            const targetTop = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: targetTop,
              behavior: 'smooth',
            });
          }, 250);
        }
      }
    });
  }, []);

  return (
    <>
      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* 01 — Cinematic Hero */}
        <HeroCinematic />

        {/* 02 — Menu / Food Showcase (Immediately follows Hero) */}
        <MenuShowcase />

        {/* 03 — Brand Story */}
        <StorySection />

        {/* 04 — The Space */}
        <SpaceSection />

        {/* 05 — Reviews */}
        <ReviewsSection />

        {/* 06 — Location */}
        <LocationSection />

        {/* 07 — Reservation CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;

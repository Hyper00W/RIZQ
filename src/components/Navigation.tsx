import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const navLinks = [
  { label: 'The Menu', href: '#menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'The Space', href: '#space' },
  { label: 'Kind Words', href: '#reviews' },
  { label: 'Find Your Table', href: '#reservation' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', ' ');
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    // Refresh ScrollTrigger to ensure pin-spacer offsets are up to date
    ScrollTrigger.refresh();

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });

    window.history.pushState(null, '', href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-rizq-black/90 backdrop-blur-md border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="relative z-50 flex items-center gap-3"
            >
              <img
                src="/assets/logo/logo.webp"
                alt="RIZQ"
                className="w-10 h-10 md:w-11 md:h-11 object-contain"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-[11px] tracking-[0.18em] uppercase text-rizq-cream/70 hover:text-rizq-cream transition-colors duration-400 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-rizq-bronze group-hover:w-full transition-all duration-500" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-end justify-center gap-1.5"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className={`block h-px bg-rizq-cream transition-all duration-500 ${
                  isMobileOpen ? 'w-6 rotate-45 translate-y-[3.5px]' : 'w-6'
                }`}
              />
              <span
                className={`block h-px bg-rizq-cream transition-all duration-500 ${
                  isMobileOpen ? 'w-6 -rotate-45 -translate-y-[3.5px]' : 'w-4'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-rizq-black/98 backdrop-blur-xl transition-all duration-700 lg:hidden flex flex-col items-center justify-center ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-editorial text-2xl text-rizq-cream/80 hover:text-rizq-cream transition-all duration-500"
              style={{
                transitionDelay: isMobileOpen ? `${i * 80}ms` : '0ms',
                opacity: isMobileOpen ? 1 : 0,
                transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40">
            Café & Kitchen
          </span>
          <span className="font-body text-[10px] tracking-[0.2em] text-rizq-muted/30">
            Defence Colony, New Delhi
          </span>
        </div>
      </div>
    </>
  );
};

export default Navigation;

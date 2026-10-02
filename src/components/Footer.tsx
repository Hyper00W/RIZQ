import { locationData } from '../data/location';

const navLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'The Menu', href: '#menu' },
  { label: 'The Space', href: '#space' },
  { label: 'Kind Words', href: '#reviews' },
  { label: 'Find Your Table', href: '#reservation' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-rizq-black border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/assets/logo/logo.webp"
              alt="RIZQ"
              className="w-14 h-14 object-contain mb-6"
            />
            <p className="font-body text-xs leading-[1.8] text-rizq-muted/60 max-w-xs">
              A global kitchen in the heart of Defence Colony.
              Good food. Better company.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-5">
              Navigate
            </span>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-xs text-rizq-cream/50 hover:text-rizq-cream transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-5">
              Contact
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${locationData.contact.phone}`}
                className="font-body text-xs text-rizq-cream/50 hover:text-rizq-cream transition-colors duration-300"
              >
                {locationData.contact.phoneDisplay}
              </a>
              <p className="font-body text-xs text-rizq-cream/50 leading-[1.8]">
                {locationData.address.line1}
                <br />
                {locationData.address.line2}
                <br />
                {locationData.address.line3}
                <br />
                {locationData.address.city} {locationData.address.pincode}
              </p>
              <p className="font-body text-xs text-rizq-cream/50">
                {locationData.hours.display}
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-rizq-muted/40 block mb-5">
              Follow
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={locationData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-rizq-cream/50 hover:text-rizq-cream transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href={locationData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-rizq-cream/50 hover:text-rizq-cream transition-colors duration-300"
              >
                Facebook
              </a>
              <a
                href={locationData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-rizq-cream/50 hover:text-rizq-cream transition-colors duration-300"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-body text-[10px] tracking-[0.15em] text-rizq-muted/30">
            © {year} RIZQ Café & Kitchen. All rights reserved.
          </span>
          <span className="font-body text-[10px] tracking-[0.15em] text-rizq-muted/20">
            Designed with intention.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

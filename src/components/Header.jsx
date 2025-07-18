import React, { useEffect, useState } from 'react';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scroll down
        setShowHeader(false);
      } else {
        // Scroll up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const currentPath = window.location.pathname;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out
        ${
          showHeader
            ? scrollY < 100
              ? 'bg-[#F26522] shadow-md translate-y-0'
              : 'bg-[#F26522]/70 backdrop-blur-md shadow-sm translate-y-0'
            : '-translate-y-full'
        }
        text-white py-5 px-10`}
    >
      <div className="flex justify-between items-center">
        <img
          src="img/PT.Kreasi_online_indonesia_logo.png"
          alt="Logo Kreasi Online"
          className="h-10 invert brightness-0"
        />
        <nav className="space-x-6 hidden md:block text-sm">
          {[
            { name: 'Work', path: '/work' },
            { name: 'About', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'Ideas', path: '/ideas' },
            { name: 'Careers', path: '/careers' },
            { name: 'Contact', path: '/contact' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`hover:underline underline-offset-8 ${
                currentPath === item.path ? 'underline font-semibold' : ''
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

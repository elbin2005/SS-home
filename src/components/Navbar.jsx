import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import ElegantMenuIcon from './ui/ElegantMenuIcon'
import SlideMenu from './ui/FullscreenMenu'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/editorial-board', label: 'Editorial Board' },
  { href: '/published-papers', label: 'Publication Archive' },
  { href: '/#guidelines', label: 'Guidelines' },
  { href: '/#workflow', label: 'Submission Procedure' },
  { href: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      let visibleSection = null;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleSection = entry.target.id;
        }
      });
      if (visibleSection) {
        setActiveSection(visibleSection);
      }
    }, {
      rootMargin: '-50% 0px -50% 0px'
    });

    const sectionIds = ['hero', 'about', 'guidelines', 'workflow', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Handle hash scrolling on navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 72; // 72px offset for sticky navbar
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      
      // Try scrolling immediately, and also after a short delay in case of rendering
      scrollToHash();
      setTimeout(scrollToHash, 100);
      setTimeout(scrollToHash, 500); // Fallback for slower page loads
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <img src="/assets/images/logo.png" alt="Science and Society Logo" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
            <div className="navbar-brand-text">
              <span className="navbar-brand-title navbar-brand-title--elegant">Science and Society</span>
            </div>
          </Link>

          <nav className="navbar-links">
            {navLinks.map(link => {
              // Determine if this link should be active based on our observer
              let isActive = false;
              if (location.pathname === '/') {
                if (activeSection === 'hero' && link.href === '/') isActive = true;
                else if (activeSection && link.href === `/#${activeSection}`) isActive = true;
              } else {
                isActive = location.pathname === link.href;
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`navbar-link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="navbar-right-actions">
            <div className="auth-pill">
              <Link to="/coming-soon" className="auth-pill-login">
                <LogIn size={14} /> Login
              </Link>
              <Link to="/coming-soon" className="auth-pill-register">
                <UserPlus size={14} /> Register
              </Link>
            </div>

            {/* EXACTLY ONE Theme Toggle Icon Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile/Tablet Menu Button (Visible on screens < 1280px, hidden on desktop ≥ 1280px) */}
            <div className="navbar-menu-btn">
              <button
                className="btn btn-primary btn-icon"
                style={{ zIndex: 9999, position: 'relative' }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <ElegantMenuIcon isOpen={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SlideMenu
        isOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        user={null}
        signOut={null}
        navigate={navigate}
        dashboardPath="/coming-soon"
      />
    </>
  )
}

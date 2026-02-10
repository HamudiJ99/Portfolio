import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo code-font">Muhamed Jaber</span>
            <p>System Engineer & Software Developer</p>
          </div>

          <div className="footer-links">
            <a 
              href="https://github.com/HamudiJ99" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/muhamed-jaber-090257185" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="#contact"
              aria-label="Email"
              onClick={e => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {t('footer.designed')} <FaHeart className="heart-icon" /> {t('footer.by')}
          </p>
          <div className="footer-legal">
            <a 
              href={i18n.language === 'de' ? '/privacy.html' : '/privacy-en.html'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.privacy')}
            </a>
            <span className="footer-separator">|</span>
            <span className="footer-copyright">
              © {currentYear} {t('footer.rights')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
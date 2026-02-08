import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo code-font">Muhamed Jaber</span>
            <p>Software Engineer & Systems Developer</p>
          </div>

          <div className="footer-links">
            <a 
              href="https://github.com/yourusername" 
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
              href="mailto:hamudij8@gmail.com"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Designed & Built with <FaHeart className="heart-icon" /> by Muhamed Jaber
          </p>
          <p className="footer-copyright">
            © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
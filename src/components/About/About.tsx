import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { FaPython, FaReact, FaJava } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiCplusplus } from 'react-icons/si';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const technologies = [
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Java', icon: <FaJava />},
    { name: 'React.js', icon: <FaReact /> },
    { name: 'JavaScript', icon: <SiJavascript />  },
    { name: 'Python', icon: <FaPython />  },
    { name: 'C++', icon: <SiCplusplus /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <span>//</span> {t('about.title')}
          </h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="about-grid">
          {/* About Text */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-text">
              <p>
                <Trans 
                  i18nKey="about.intro" 
                  components={{ 1: <span className="highlight" />, 3: <span className="highlight" /> }}
                />
              </p>
              <p>
                <Trans 
                  i18nKey="about.description" 
                  components={{ 1: <span className="highlight" /> }}
                />
              </p>
              <p>
                {t('about.passion')}
              </p>
            </div>

            <motion.div
              className="tech-stack"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3>{t('about.skillsTitle')}</h3>
              <ul className="tech-list">
                {technologies.map((tech) => (
                  <motion.li key={tech.name} variants={itemVariants}>
                    <span className="tech-icon">{tech.icon}</span>
                    {tech.name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* About Image */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-image-container">
              <img 
                src="/aboutMeProfile.jpg" 
                alt="Muhamed Jaber"
                className="about-image"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div className="about-image-placeholder">
                <span>MJ</span>
              </div>
              <div className="image-border"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
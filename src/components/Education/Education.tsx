import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';
import './Education.css';


interface EducationItem {
  degree: string;
  field: string;
  specialization: string;
  thesis: string;
  institution: string;
  period: string;
  icon: ReactElement;
}

const Education = () => {
  const { t } = useTranslation();
  const educationData: EducationItem[] = [
    {
      degree: t('education.master.degree'),
      field: t('education.master.field'),
      specialization: t('education.master.specialization'),
      thesis: t('education.master.thesis'),
      institution: t('education.master.institution'),
      period: t('education.master.period'),
      icon: <FaGraduationCap />,
    },
    {
      degree: t('education.bachelor.degree'),
      field: t('education.bachelor.field'),
      specialization: t('education.bachelor.specialization'),
      thesis: t('education.bachelor.thesis'),
      institution: t('education.bachelor.institution'),
      period: t('education.bachelor.period'),
      icon: <FaUniversity />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="education" className="education section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <span>//</span> {t('education.title')}
          </h2>
          <div className="section-line"></div>
        </motion.div>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              variants={itemVariants}
            >
              <div className="timeline-marker">
                <div className="timeline-icon">{item.icon}</div>
                {index !== educationData.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-degree">
                    <span className="degree-title">{item.degree}</span>
                    <span className="degree-field">{item.field}</span>
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </div>

                <div className="timeline-institution">
                  <FaUniversity />
                  <span>{item.institution}</span>
                </div>

                <div className="timeline-details">
                  <div className="detail-item">
                    <span className="detail-label">{t('education.specialization')}:</span>
                    <span className="detail-value">{item.specialization}</span>
                  </div>
                  <div className="detail-item thesis">
                    <span className="detail-label">{t('education.thesis')}:</span>
                    <span className="detail-value">{item.thesis}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
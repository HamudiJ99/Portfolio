import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { 
  FaPaperPlane, 
  FaPhone, 
  FaEnvelope, 
  FaLinkedin, 
  FaMapMarkerAlt 
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '0174 3759997',
      href: 'tel:+491743759997',
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'hamudij8@gmail.com',
      href: 'mailto:hamudij8@gmail.com',
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'LinkedIn.com',
      href: 'https://linkedin.com/in/muhamed-jaber-090257185',
    },
  ];

/*   const quickActions = [
    {
      icon: <FaGithub />,
      label: 'GitHub',
      href: 'https://github.com/yourusername',
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/muhamed-jaber-090257185',
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      href: 'mailto:hamudij8@gmail.com',
    },
  ]; */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration - Replace with your own values from emailjs.com
      const serviceId = 'service_7qkjr5k';      // Get from EmailJS Dashboard
      const templateId = 'template_t26141s';    // Get from EmailJS Dashboard
      const publicKey = 'RmwjpixdRuJZrY3Ai';      // Get from EmailJS Dashboard

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form',
          message: formData.message,
          to_email: 'hamudij8@gmail.com',
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', consent: false });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="contact-label">{t('contact.title')}</span>
          <h2 className="contact-title">{t('contact.subtitle')}</h2>
          <p className="contact-subtitle">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-header">
              <FaPaperPlane />
              <span>{t('contact.form.submit')}</span>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t('contact.form.subject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.form.subjectPlaceholder')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5}
                  required
                />
              </div>

              <div className="form-group consent-group">
                <label className="consent-label">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    {t('contact.form.consent')}{' '}
                    <a 
                      href={i18n.language === 'de' ? '/privacy.html' : '/privacy-en.html'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('contact.form.privacy')}
                    </a>
                    {' '}{t('contact.form.consentEnd')}
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting || !formData.consent}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    {t('contact.form.submit')}
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="form-message success">
                  {t('contact.form.success')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form-message error">
                  {t('contact.form.error')}
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="contact-info-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-info-card">
              <h3>{t('contact.info.title')}</h3>
              
              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-info-item"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <span className="info-label">{info.label}</span>
                      <span className="info-value">{info.value}</span>
                    </div>
                  </motion.a>
                ))}

                <div className="contact-info-item location">
                  <div className="info-icon"><FaMapMarkerAlt /></div>
                  <div className="info-content">
                    <span className="info-label">{t('contact.info.location')}</span>
                    <span className="info-value">{t('contact.info.locationValue')}</span>
                  </div>
                </div>
              </div>
            </div>

{/*             <div className="quick-actions-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={index}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-action-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </motion.a>
                ))}
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
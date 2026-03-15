import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { ProjectData } from '../../data/projectsData';
import './ProjectModal.css';

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            className="modal-content"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>

            <div className="modal-header">
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-subtitle">{project.subtitle}</p>
              
              <div className="modal-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    <FaGithub /> {project.githubBackend ? 'Frontend' : t('projects.viewCode')}
                  </a>
                )}
                {project.githubBackend && (
                  <a
                    href={project.githubBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    <FaGithub /> Backend
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    <FaExternalLinkAlt /> {t('projects.viewProject')}
                  </a>
                )}
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-description">
                <p>{project.fullDescription}</p>
              </div>

              <div className="modal-technologies">
                <h3>{t('projects.technologies')}</h3>
                <div className="modal-tech-list">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="modal-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.detailSections && project.detailSections.length > 0 && (
                <div className="modal-sections">
                  {project.detailSections.map((section, index) => (
                    <div key={index} className="modal-section">
                      {section.img && (
                        <div className="modal-section-image">
                          <img src={section.img} alt={section.title || `Screenshot ${index + 1}`} />
                        </div>
                      )}
                      {section.title && (
                        <h3 className="modal-section-title">{section.title}</h3>
                      )}
                      {section.text && (
                        <p className="modal-section-text">{section.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

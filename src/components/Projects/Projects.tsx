import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaExternalLinkAlt, FaFolder, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projectsData, featuredProject } from '../../data/projectsData';
import type { ProjectData } from '../../data/projectsData';
import ProjectModal from './ProjectModal';
import './Projects.css';

const PROJECTS_PER_PAGE = 6;

const Projects = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(projectsData.length / PROJECTS_PER_PAGE);
  const startIndex = currentPage * PROJECTS_PER_PAGE;
  const currentProjects = projectsData.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <span>//</span> {t('projects.title')}
          </h2>
          <div className="section-line"></div>
        </motion.div>

        {/* Featured Project */}
        <motion.div
          className="featured-project"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="featured-content">
            <span className="featured-label">{t('projects.featuredLabel')}</span>
            <h3 className="featured-title">{featuredProject.title}</h3>
            <p className="featured-description">{featuredProject.shortDescription}</p>
            
            <div className="featured-tech">
              {featuredProject.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="featured-links">
              {featuredProject.github && (
                <a 
                  href={featuredProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <FaGithub />
                </a>
              )}
              {featuredProject.live && (
                <a 
                  href={featuredProject.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Live Demo"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
          
          <div className="featured-image">
            <img src="/featured-project.jpg" alt="ContentLab" className="featured-img" />
          </div>
        </motion.div>

        {/* Other Projects Grid */}
        <div className="projects-grid-container">
          {/* Left Arrow */}
          <button 
            className={`pagination-arrow pagination-arrow-left ${currentPage === 0 ? 'disabled' : ''}`}
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            aria-label="Previous projects"
          >
            <FaChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {currentProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onClick={() => openModal(project)}
                  style={{ cursor: 'pointer' }}
                >
              <div className="project-card-header">
                <FaFolder className="folder-icon" />
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.shortDescription}</p>
              
              <div className="project-tech">
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span key={techIndex}>{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <button 
            className={`pagination-arrow pagination-arrow-right ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next projects"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Page Indicators */}
        {totalPages > 1 && (
          <div className="pagination-indicators">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`pagination-dot ${currentPage === index ? 'active' : ''}`}
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View More Button */}
        <motion.div
          className="projects-more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="https://github.com/HamudiJ99" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <FaGithub /> {t('projects.viewMore')}
          </a>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
};

export default Projects;
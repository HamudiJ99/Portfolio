import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const Projects = () => {
  const featuredProject: Project = {
    title: 'Aktuelles Projekt',
    description: 'Hier kommt die Beschreibung deines aktuellen Hauptprojekts. Beschreibe was das Projekt macht, welche Probleme es löst und was dein Beitrag dazu ist. Dies ist der Bereich für dein wichtigstes oder aktuellstes Projekt.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/yourusername/project',
    live: 'https://yourproject.com',
    featured: true,
  };

  const projects: Project[] = [
    {
      title: 'Projekt Eins',
      description: 'Eine kurze Beschreibung des Projekts und seiner Hauptfunktionen. Hier erklärst du was das Projekt macht.',
      technologies: ['Python', 'Flask', 'Vue.js'],
      github: 'https://github.com/yourusername/project1',
      live: 'https://project1.com',
    },
    {
      title: 'Projekt Zwei',
      description: 'Beschreibung eines weiteren interessanten Projekts. Zeige deine Fähigkeiten und was du gebaut hast.',
      technologies: ['Java', 'Spring Boot', 'React'],
      github: 'https://github.com/yourusername/project2',
    },
    {
      title: 'Projekt Drei',
      description: 'Ein System oder eine Anwendung die du entwickelt hast. Beschreibe die technischen Details.',
      technologies: ['C#', '.NET', 'Azure'],
      github: 'https://github.com/yourusername/project3',
      live: 'https://project3.com',
    },
    {
      title: 'Projekt Vier',
      description: 'Noch ein weiteres Projekt das deine Vielseitigkeit zeigt. Embedded Systems, Robotik, etc.',
      technologies: ['C++', 'ROS', 'Python'],
      github: 'https://github.com/yourusername/project4',
    },
    {
      title: 'Projekt Fünf',
      description: 'Ein Projekt mit Machine Learning oder Data Science Fokus. Zeige deine analytischen Fähigkeiten.',
      technologies: ['Python', 'TensorFlow', 'Pandas'],
      github: 'https://github.com/yourusername/project5',
    },
    {
      title: 'Projekt Sechs',
      description: 'Ein weiteres interessantes Projekt. Open Source Beiträge oder persönliche Projekte.',
      technologies: ['TypeScript', 'Express', 'MongoDB'],
      github: 'https://github.com/yourusername/project6',
      live: 'https://project6.com',
    },
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
            <span>/</span> projects
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
            <span className="featured-label">Aktuelles Projekt</span>
            <h3 className="featured-title">{featuredProject.title}</h3>
            <p className="featured-description">{featuredProject.description}</p>
            
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
            <div className="featured-image-placeholder">
              <span className="code-font">{'{ }'}</span>
            </div>
          </div>
        </motion.div>

        {/* Other Projects Grid */}
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
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
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex}>{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="projects-more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <FaGithub /> View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
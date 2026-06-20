import React, { useState, useEffect } from 'react';
import {
  Mail,
  Briefcase,
  Code,
  GraduationCap,
  User,
  ChevronDown,
  Sparkles,
  MapPin
} from 'lucide-react';
import { personalDetails, skillsData, projectsData, experienceData, educationData, publicationsData, certificationsData } from '../data/portfolioData';

interface Overlay2DProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Overlay2D: React.FC<Overlay2DProps> = ({
  activeSection,
  onSectionChange
}) => {
  const [typedRole, setTypedRole] = useState('');

  // Navigation elements
  const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

  // Typewriter effect for Hero
  useEffect(() => {
    let index = 0;
    const fullText = personalDetails.role;
    const interval = setInterval(() => {
      setTypedRole(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ui-overlay">
      {/* Dynamic Navbar */}
      <nav style={styles.navbar} className="glass-panel">
        <div style={styles.navLogo} className="font-orbitron">
          RT<span className="glow-text-green">.</span>
        </div>
        <div style={styles.navLinks}>
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                onSectionChange(section);
                const el = document.getElementById(section);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                ...styles.navLink,
                color: activeSection === section ? 'var(--primary-neon)' : 'var(--text-secondary)',
                fontWeight: activeSection === section ? '700' : '400',
              }}
              className="font-orbitron"
            >
              {section === 'hero' ? 'INTRO' : section.toUpperCase()}
              {activeSection === section && <span style={styles.activeIndicator} />}
            </button>
          ))}
        </div>
      </nav>

      {/* Floating Social Icons */}
      <div style={styles.socialBar}>
        <a href={personalDetails.socials.github} target="_blank" rel="noreferrer" style={styles.socialIcon} className="glass-panel">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        <a href={personalDetails.socials.linkedin} target="_blank" rel="noreferrer" style={styles.socialIcon} className="glass-panel">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href={`mailto:${personalDetails.socials.email}`} style={styles.socialIcon} className="glass-panel">
          <Mail size={20} />
        </a>
      </div>

      {/* Section Content Overlay */}
      <div style={styles.scrollContainer}>

        {/* HERO SECTION */}
        <section id="hero" style={styles.sectionHero}>
          <div style={styles.heroContent} className="float-animation">
            <h4 style={styles.heroPre} className="font-orbitron glow-text-cyan">Initiating Sequence</h4>
            <h1 style={styles.heroTitle} className="font-orbitron gradient-text">{personalDetails.name}</h1>
            <h2 style={styles.heroSubtitle} className="font-orbitron">
              {typedRole}<span style={styles.cursor}>|</span>
            </h2>
            <p style={styles.heroTagline}>{personalDetails.tagline}</p>
            <div style={styles.heroBtnGroup}>
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="neon-button"
              >
                Explore Work <ChevronDown size={18} />
              </button>
              <a
                href={personalDetails.resumeUrl}
                download="Ritviz_Tiwari_Resume.docx"
                className="neon-button neon-button-secondary"
                style={{ textDecoration: 'none' }}
              >
                Download Resume
              </a>
            </div>
          </div>
          <div style={styles.scrollPrompt} className="pulse-slow">
            <span style={styles.scrollText} className="font-orbitron">SCROLL TO DRIFT</span>
            <ChevronDown size={24} style={{ color: 'var(--primary-neon)' }} />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" style={styles.section}>
          <div style={styles.card} className="glass-panel">
            <div style={styles.sectionHeader}>
              <User size={24} style={{ color: 'var(--primary-neon)' }} />
              <h2 style={styles.sectionTitle} className="font-orbitron">01. About Me</h2>
            </div>
            <p style={styles.bodyText}>{personalDetails.bio}</p>
            <div style={styles.metaRow}>
              <MapPin size={18} style={{ color: 'var(--secondary-neon)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>{personalDetails.location}</span>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" style={styles.section}>
          <div style={styles.card} className="glass-panel">
            <div style={styles.sectionHeader}>
              <Code size={24} style={{ color: 'var(--primary-neon)' }} />
              <h2 style={styles.sectionTitle} className="font-orbitron">02. My Skillset</h2>
            </div>
            <div style={styles.skillsGrid}>
              {skillsData.map((cat, idx) => (
                <div key={idx} style={styles.skillCategory}>
                  <h3 style={styles.skillCategoryTitle} className="font-orbitron glow-text-cyan">{cat.title}</h3>
                  <div style={styles.skillTags}>
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} style={styles.skillTag} className="glass-panel-neon">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" style={styles.section}>
          <div style={{ ...styles.card, width: '90%', maxWidth: '1000px' }} className="glass-panel">
            <div style={styles.sectionHeader}>
              <Sparkles size={24} style={{ color: 'var(--primary-neon)' }} />
              <h2 style={styles.sectionTitle} className="font-orbitron">03. Projects</h2>
            </div>
            <div style={styles.projectsContainer}>
              {projectsData.map((project) => (
                <div key={project.id} style={styles.projectCard} className="glass-panel-neon">
                  <h3 style={styles.projectTitle} className="font-orbitron glow-text-green">{project.title}</h3>
                  <p style={styles.projectDesc}>{project.description}</p>
                  <div style={styles.projectTechs}>
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} style={styles.projectTech}>{tech}</span>
                    ))}
                  </div>
                  <div style={styles.projectLinks}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" style={styles.projLink}>
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Publications Subcard */}
            <div style={styles.publicationsBox}>
              <h4 style={styles.publicationsBoxTitle} className="font-orbitron glow-text-cyan">03b. Research Publications</h4>
              <div style={styles.publicationsGrid}>
                {publicationsData.map((pub, pIdx) => (
                  <div key={pIdx} style={styles.publicationCard} className="glass-panel-neon">
                    <h4 style={styles.publicationTitle}>{pub.title}</h4>
                    <p style={styles.publicationAuthors}>{pub.authors}</p>
                    <p style={styles.publicationJournal} className="font-orbitron">{pub.journal} — {pub.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" style={styles.section}>
          <div style={styles.card} className="glass-panel">
            <div style={styles.sectionHeader}>
              <Briefcase size={24} style={{ color: 'var(--primary-neon)' }} />
              <h2 style={styles.sectionTitle} className="font-orbitron">04. Experience</h2>
            </div>
            <div style={styles.timeline}>
              {experienceData.map((job) => (
                <div key={job.id} style={styles.timelineItem}>
                  <div style={styles.timelineMarker} />
                  <div style={styles.timelineContent}>
                    <div style={styles.timelineHeader}>
                      <h3 style={styles.jobTitle}>{job.role}</h3>
                      <span style={styles.jobPeriod} className="font-orbitron glow-text-cyan">{job.period}</span>
                    </div>
                    <h4 style={styles.jobCompany}>{job.company}</h4>
                    <ul style={styles.jobDescList}>
                      {job.description.map((desc, dIdx) => (
                        <li key={dIdx} style={styles.jobDescItem}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" style={styles.section}>
          <div style={styles.card} className="glass-panel">
            <div style={styles.sectionHeader}>
              <GraduationCap size={24} style={{ color: 'var(--primary-neon)' }} />
              <h2 style={styles.sectionTitle} className="font-orbitron">05. Let's Connect</h2>
            </div>
            <p style={{ ...styles.bodyText, textAlign: 'center', marginBottom: '24px' }}>
              I am open to new opportunities and collaborations. Let's initiate a conversation.
            </p>
            <div style={styles.contactForm}>
              <a href={`mailto:${personalDetails.socials.email}`} className="neon-button">
                <Mail size={18} /> Initiate Contact Handshake
              </a>
            </div>

            {/* Education & Certifications */}
            <div style={styles.educationBox}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', width: '100%' }}>
                <div>
                  <h4 style={styles.educationTitle} className="font-orbitron glow-text-cyan">Academic Credentials</h4>
                  {educationData.map((edu, eIdx) => (
                    <div key={eIdx} style={{ marginTop: '8px', textAlign: 'left' }}>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{edu.school}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{edu.degree}</p>
                      <p style={{ color: 'var(--secondary-neon)', fontSize: '0.8rem', fontFamily: 'var(--display-font)', marginTop: '2px' }}>{edu.period}</p>
                      {edu.details && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{edu.details}</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={styles.educationTitle} className="font-orbitron glow-text-cyan">Certifications</h4>
                  {certificationsData.map((cert, cIdx) => (
                    <div key={cIdx} style={{ marginTop: '8px', textAlign: 'left' }}>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cert.name}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{cert.issuer}</p>
                      <p style={{ color: 'var(--secondary-neon)', fontSize: '0.8rem', fontFamily: 'var(--display-font)', marginTop: '2px' }}>{cert.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    maxWidth: '900px',
    padding: '12px 30px',
    zIndex: 100,
    borderRadius: '30px',
  },
  navLogo: {
    fontSize: '1.4rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    color: 'var(--text-primary)',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    position: 'relative',
    padding: '6px 0',
    transition: 'color 0.3s ease',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: 'var(--primary-neon)',
    boxShadow: '0 0 8px var(--primary-neon)',
  },
  socialBar: {
    position: 'fixed',
    left: '20px',
    bottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 100,
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  scrollContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionHero: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '0 20px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
  },
  heroPre: {
    fontSize: '0.9rem',
    letterSpacing: '0.25em',
    marginBottom: '16px',
    fontWeight: 600,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 900,
    marginBottom: '10px',
    letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
    color: 'var(--text-primary)',
    marginBottom: '20px',
    fontWeight: 600,
  },
  cursor: {
    color: 'var(--primary-neon)',
    animation: 'pulse-slow 1s step-end infinite',
  },
  heroTagline: {
    color: 'var(--text-secondary)',
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    maxWidth: '600px',
    margin: '0 auto 30px',
    lineHeight: '1.6',
  },
  heroBtnGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  scrollPrompt: {
    position: 'absolute',
    bottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  scrollText: {
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: 'var(--text-muted)',
  },
  section: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '120px 20px 80px',
  },
  card: {
    width: '90%',
    maxWidth: '750px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '16px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: 'var(--text-primary)',
  },
  bodyText: {
    color: 'var(--text-secondary)',
    fontSize: '1rem5',
    lineHeight: '1.7',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '10px',
  },
  skillsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  skillCategory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  skillCategoryTitle: {
    fontSize: '0.95rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  skillTag: {
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
    boxShadow: 'none',
  },
  projectsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '10px',
  },
  projectCard: {
    padding: '24px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    height: '100%',
  },
  projectTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
  },
  projectDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.88rem5',
    lineHeight: '1.5',
    flexGrow: 1,
  },
  projectTechs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  projectTech: {
    fontSize: '0.7rem',
    color: 'var(--secondary-neon)',
    background: 'rgba(0, 229, 255, 0.05)',
    padding: '3px 8px',
    borderRadius: '4px',
    border: '1px solid rgba(0, 229, 255, 0.1)',
  },
  projectLinks: {
    display: 'flex',
    gap: '16px',
    marginTop: '6px',
  },
  projLink: {
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'color 0.2s ease',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    position: 'relative',
    paddingLeft: '20px',
    borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
  },
  timelineItem: {
    position: 'relative',
  },
  timelineMarker: {
    position: 'absolute',
    left: '-25.5px',
    top: '6px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-neon)',
    boxShadow: '0 0 8px var(--primary-neon)',
  },
  timelineContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  timelineHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  jobTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  jobPeriod: {
    fontSize: '0.8rem',
  },
  jobCompany: {
    fontSize: '0.95rem',
    color: 'var(--secondary-neon)',
    fontWeight: 500,
  },
  jobDescList: {
    paddingLeft: '20px',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  jobDescItem: {
    lineHeight: '1.5',
  },
  contactForm: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  educationBox: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  educationTitle: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  configPanel: {
    position: 'fixed',
    right: '20px',
    bottom: '90px',
    width: '320px',
    maxHeight: '75vh',
    overflowY: 'auto',
    padding: '24px',
    zIndex: 90,
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  configHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '10px',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  controlLabel: {
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
  },
  slider: {
    width: '100%',
    height: '4px',
    background: 'rgba(255,255,255,0.1)',
    outline: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    accentColor: 'var(--primary-neon)',
  },
  configToggle: {
    position: 'fixed',
    right: '20px',
    bottom: '30px',
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    zIndex: 95,
  },
  publicationsBox: {
    marginTop: '40px',
    paddingTop: '30px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    width: '100%',
  },
  publicationsBoxTitle: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    textAlign: 'left',
  },
  publicationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  publicationCard: {
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left',
    height: '100%',
  },
  publicationTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    lineHeight: '1.4',
  },
  publicationAuthors: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
  },
  publicationJournal: {
    fontSize: '0.78rem',
    color: 'var(--secondary-neon)',
    marginTop: 'auto',
  }
};

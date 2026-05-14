import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronDown, Zap, Code, BarChart3, Shield, Database } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const projects = [
  {
    id: 1,
    title: 'Electricity Theft Detection System',
    description: 'Developed a machine learning-based anomaly detection system for identifying electricity theft patterns using Python and data analysis techniques.',
    longDescription: 'This system leverages advanced machine learning algorithms to analyze consumption patterns and detect anomalies indicative of electricity theft. It includes data preprocessing, feature engineering, model training with multiple algorithms, and visualization dashboards for utility companies.',
    image: '/project1.jpg',
    techStack: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    features: [
      { icon: BarChart3, text: 'Data analysis & preprocessing' },
      { icon: Zap, text: 'Prediction logic with ML models' },
      { icon: Shield, text: 'Anomaly detection algorithms' },
      { icon: Code, text: 'Visualization & reporting' },
    ],
    github: 'https://github.com',
    demo: '#',
    color: 'from-primary-500 to-accent-cyan',
  },
  {
    id: 2,
    title: 'Coding Practice Platform',
    description: 'Built a full stack coding practice platform using PHP and MySQL with backend validation and database integration.',
    longDescription: 'A comprehensive coding practice platform that allows users to solve programming problems, track their progress, and compete with others. Features include user authentication, problem management, code submission, and leaderboard functionality.',
    image: '/project2.jpg',
    techStack: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    features: [
      { icon: Shield, text: 'Secure authentication system' },
      { icon: Code, text: 'Interactive coding interface' },
      { icon: Database, text: 'Robust database connectivity' },
      { icon: Zap, text: 'Practice problem management' },
    ],
    github: 'https://github.com',
    demo: '#',
    color: 'from-accent-purple to-accent-pink',
  },
]

function Projects() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section id="projects" className="section-padding bg-dark-950 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Featured Projects"
          subtitle="My Work"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 0.15}>
              <motion.div
                layout
                className="glass-card overflow-hidden group"
              >
                {/* Image Placeholder */}
                <div className={`relative h-56 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 text-center">
                    <Code className="w-16 h-16 text-white/80 mx-auto mb-3" />
                    <span className="text-white/90 font-semibold text-lg">{project.title}</span>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-dark-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.demo}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-100 mb-2">{project.title}</h3>
                  <p className="text-dark-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700/50 text-dark-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                    className="flex items-center gap-2 text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors"
                  >
                    {expandedId === project.id ? 'Show Less' : 'View Details'}
                    <motion.div
                      animate={{ rotate: expandedId === project.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedId === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-dark-800/50">
                          <p className="text-dark-400 text-sm mb-4 leading-relaxed">
                            {project.longDescription}
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {project.features.map((feature) => (
                              <div key={feature.text} className="flex items-center gap-2 text-sm text-dark-300">
                                <feature.icon className="w-4 h-4 text-primary-400" />
                                <span>{feature.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

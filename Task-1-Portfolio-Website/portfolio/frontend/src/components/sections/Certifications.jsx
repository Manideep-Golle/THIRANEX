import React from 'react'
import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink, CheckCircle2 } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const certifications = [
  {
    id: 1,
    title: 'Artificial Intelligence Certification',
    issuer: 'Skill Dunia',
    date: '2024',
    description: 'Comprehensive certification covering AI fundamentals, machine learning concepts, and practical implementations.',
    skills: ['Machine Learning', 'Neural Networks', 'Data Analysis', 'Python for AI'],
    color: 'from-accent-purple to-accent-pink',
  },
]

function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-dark-950 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Certifications"
          subtitle="Credentials"
        />

        <div className="max-w-3xl mx-auto">
          {certifications.map((cert, index) => (
            <RevealOnScroll key={cert.id} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg shrink-0`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-dark-100">{cert.title}</h3>
                        <p className="text-primary-400 font-medium">{cert.issuer}</p>
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700/50 text-dark-400 text-sm self-start">
                        <Calendar className="w-3.5 h-3.5" />
                        {cert.date}
                      </span>
                    </div>

                    <p className="text-dark-400 leading-relaxed mb-6">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider">Skills Acquired</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications

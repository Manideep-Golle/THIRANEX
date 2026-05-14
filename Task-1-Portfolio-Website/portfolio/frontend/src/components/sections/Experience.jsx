import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const experiences = [
  {
    id: 1,
    role: 'AI Intern',
    company: 'ODCET Technologies',
    location: 'Remote',
    duration: '3 Months',
    period: '2024',
    description: 'Completed a comprehensive 3-month internship focused on AI fundamentals and structured implementations. Gained hands-on experience in machine learning workflows, data preprocessing, and model deployment strategies.',
    achievements: [
      'Learned AI fundamentals and structured implementations',
      'Worked on real-world machine learning projects',
      'Gained experience in data preprocessing and model training',
      'Collaborated with senior developers on AI solutions',
    ],
    color: 'from-primary-500 to-accent-cyan',
  },
]

function Experience() {
  return (
    <section id="experience" className="section-padding bg-dark-900/50 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Work Experience"
          subtitle="Professional Journey"
        />

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <RevealOnScroll key={exp.id} delay={index * 0.2}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative glass-card p-8 md:p-10"
              >
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-cyan rounded-full" />

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}>
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-dark-100">{exp.role}</h3>
                        <p className="text-primary-400 font-medium">{exp.company}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-dark-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700/50">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700/50">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 font-medium">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-dark-400 leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider">Key Learnings</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-dark-400"
                      >
                        <ArrowUpRight className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                        <span>{achievement}</span>
                      </motion.div>
                    ))}
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

export default Experience

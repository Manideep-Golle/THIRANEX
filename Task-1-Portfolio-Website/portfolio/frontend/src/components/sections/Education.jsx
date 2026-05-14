import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Star, Trophy } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const education = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'IIIT RGUKT Basar',
    location: 'Basar, Telangana',
    period: '2021 - Present',
    cgpa: 8.7,
    description: 'Pursuing Bachelor of Technology with focus on Computer Science fundamentals, software engineering, and emerging technologies.',
    highlights: ['CGPA: 8.7', 'Active in coding clubs', 'Technical event participant'],
    color: 'from-primary-500 to-accent-cyan',
  },
  {
    id: 2,
    degree: 'Pre-University Course (PUC)',
    institution: 'RGUKT Basar',
    location: 'Basar, Telangana',
    period: '2019 - 2021',
    cgpa: 9.32,
    description: 'Completed Pre-University education with strong foundation in Mathematics, Physics, and Chemistry.',
    highlights: ['CGPA: 9.32', 'Mathematics Olympiad participant', 'Science Fair participant'],
    color: 'from-accent-cyan to-accent-emerald',
  },
  {
    id: 3,
    degree: 'Secondary School Certificate (SSC)',
    institution: 'State Board',
    location: 'Telangana',
    period: '2018 - 2019',
    cgpa: 10.0,
    description: 'Completed secondary education with perfect academic record and strong foundation in all subjects.',
    highlights: ['CGPA: 10.0', 'Perfect Score', 'Academic Excellence'],
    color: 'from-accent-emerald to-accent-amber',
  },
]

function Education() {
  return (
    <section id="education" className="section-padding bg-dark-900/50 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Education"
          subtitle="Academic Background"
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          <AnimatedCounter end={8.7} suffix=" CGPA" label="B.Tech" />
          <AnimatedCounter end={9.32} suffix=" CGPA" label="PUC" />
          <AnimatedCounter end={10} suffix=".0 CGPA" label="SSC" />
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-cyan to-accent-emerald md:-translate-x-1/2" />

          {education.map((edu, index) => (
            <RevealOnScroll key={edu.id} delay={index * 0.2}>
              <div className={`relative flex items-start gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan border-4 border-dark-950 md:-translate-x-1/2 z-10 mt-6" />

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center shadow-lg shrink-0`}>
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-dark-100">{edu.degree}</h3>
                        <p className="text-primary-400 font-medium">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-dark-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald font-medium">
                        <Star className="w-3.5 h-3.5 fill-accent-emerald" />
                        CGPA: {edu.cgpa}
                      </span>
                    </div>

                    <p className="text-dark-400 text-sm leading-relaxed mb-4">
                      {edu.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700/50 text-dark-300 text-xs"
                        >
                          <Trophy className="w-3 h-3 text-accent-amber" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education

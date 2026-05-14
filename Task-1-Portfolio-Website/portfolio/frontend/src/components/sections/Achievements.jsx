import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Star, TrendingUp, Target } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const achievements = [
  {
    id: 1,
    title: 'POLYCET Rank 1668',
    description: 'Achieved an outstanding All India Rank of 1668 in the Polytechnic Common Entrance Test, demonstrating exceptional aptitude in technical education.',
    icon: Trophy,
    color: 'from-accent-amber to-accent-pink',
    bgColor: 'bg-accent-amber/10',
    borderColor: 'border-accent-amber/20',
    textColor: 'text-accent-amber',
  },
  {
    id: 2,
    title: 'Mathematics Olympiad',
    description: 'Recognized for excellence in Mathematics Olympiad, showcasing strong analytical and problem-solving abilities in advanced mathematical concepts.',
    icon: Medal,
    color: 'from-primary-500 to-accent-cyan',
    bgColor: 'bg-primary-500/10',
    borderColor: 'border-primary-500/20',
    textColor: 'text-primary-400',
  },
  {
    id: 3,
    title: 'State-Level Science Fair',
    description: 'Received recognition at the State-Level Science Fair for innovative project presentation and scientific methodology application.',
    icon: Award,
    color: 'from-accent-emerald to-accent-cyan',
    bgColor: 'bg-accent-emerald/10',
    borderColor: 'border-accent-emerald/20',
    textColor: 'text-accent-emerald',
  },
]

function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-dark-950 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Achievements"
          subtitle="Accomplishments"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <RevealOnScroll key={achievement.id} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 text-center group h-full"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-shadow`}
                >
                  <achievement.icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-dark-100 mb-3">{achievement.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Decorative */}
                <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${achievement.bgColor} border ${achievement.borderColor}`}>
                  <Star className={`w-4 h-4 ${achievement.textColor} fill-current`} />
                  <span className={`text-sm font-medium ${achievement.textColor}`}>Excellence</span>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements

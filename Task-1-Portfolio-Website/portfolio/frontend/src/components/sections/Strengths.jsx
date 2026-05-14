import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Compass, Shield, Sparkles, ArrowUpRight } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const strengths = [
  {
    id: 1,
    title: 'Analytical Problem Solving',
    description: 'Approach complex challenges with structured thinking, breaking down problems into manageable components and finding optimal solutions through logical reasoning.',
    icon: Brain,
    color: 'from-primary-500 to-accent-cyan',
    stats: '95%',
  },
  {
    id: 2,
    title: 'Quick Learning',
    description: 'Rapidly adapt to new technologies and frameworks. Consistently upskilling to stay ahead in the fast-evolving tech landscape.',
    icon: Zap,
    color: 'from-accent-cyan to-accent-emerald',
    stats: '90%',
  },
  {
    id: 3,
    title: 'Adaptability',
    description: 'Thrive in dynamic environments, embracing change and adjusting strategies to deliver results under varying conditions and requirements.',
    icon: Compass,
    color: 'from-accent-emerald to-accent-amber',
    stats: '88%',
  },
  {
    id: 4,
    title: 'Disciplined Implementation',
    description: 'Execute projects with precision and consistency. Follow best practices, maintain code quality, and deliver on time with attention to detail.',
    icon: Shield,
    color: 'from-accent-amber to-accent-pink',
    stats: '92%',
  },
]

function Strengths() {
  return (
    <section id="strengths" className="section-padding bg-dark-900/50 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Core Strengths"
          subtitle="What Drives Me"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((strength, index) => (
            <RevealOnScroll key={strength.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass-card p-6 h-full group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${strength.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

                {/* Stats Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${strength.color} bg-clip-text text-transparent font-mono`}>
                    {strength.stats}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${strength.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                  <strength.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-dark-100 mb-3">{strength.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">
                  {strength.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: strength.stats }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${strength.color}`}
                    />
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

export default Strengths

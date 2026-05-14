import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Film, Music, Heart } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const hobbies = [
  {
    id: 1,
    title: 'Cricket',
    description: 'Passionate about cricket, both watching and playing. Enjoy the strategic aspects of the game and team dynamics.',
    icon: Gamepad2,
    color: 'from-primary-500 to-accent-cyan',
    emoji: '🏏',
  },
  {
    id: 2,
    title: 'Movies',
    description: 'Avid movie enthusiast who appreciates storytelling across genres. Movies inspire creative thinking and new perspectives.',
    icon: Film,
    color: 'from-accent-purple to-accent-pink',
    emoji: '🎬',
  },
  {
    id: 3,
    title: 'Music',
    description: 'Music lover who finds rhythm and melody essential for focus and relaxation while coding and studying.',
    icon: Music,
    color: 'from-accent-emerald to-accent-cyan',
    emoji: '🎵',
  },
]

function Hobbies() {
  return (
    <section id="hobbies" className="section-padding bg-dark-950 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Beyond Coding"
          subtitle="Interests & Hobbies"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {hobbies.map((hobby, index) => (
            <RevealOnScroll key={hobby.id} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8, rotate: [0, 1, -1, 0] }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 text-center group"
              >
                {/* Floating Emoji */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-5xl mb-4"
                >
                  {hobby.emoji}
                </motion.div>

                {/* Icon */}
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${hobby.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <hobby.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-dark-100 mb-3">{hobby.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">
                  {hobby.description}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hobbies

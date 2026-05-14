import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Brain, Cpu, Lightbulb, Workflow } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const highlights = [
  {
    icon: Code2,
    title: 'DSA Mastery',
    description: 'Strong problem-solving skills with deep understanding of Data Structures and Algorithms for efficient code.',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Expertise in DBMS principles, normalization, and designing scalable database architectures.',
  },
  {
    icon: Cpu,
    title: 'System Architecture',
    description: 'Solid grasp of Operating Systems, Computer Organization, and system-level programming.',
  },
  {
    icon: Brain,
    title: 'AI Fundamentals',
    description: 'Understanding of machine learning concepts, neural networks, and intelligent system design.',
  },
  {
    icon: Lightbulb,
    title: 'Analytical Thinking',
    description: 'Methodical approach to breaking down complex problems into manageable solutions.',
  },
  {
    icon: Workflow,
    title: 'Software Engineering',
    description: 'Structured development mindset with focus on clean architecture and best practices.',
  },
]

function About() {
  return (
    <section id="about" className="section-padding bg-dark-950 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="Who I Am"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <RevealOnScroll>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-dark-100">
                Passionate about building{' '}
                <span className="gradient-text">intelligent systems</span> and{' '}
                <span className="gradient-text">scalable applications</span>
              </h3>

              <p className="text-dark-400 leading-relaxed text-lg">
                I am a dedicated Full Stack Developer and AI Enthusiast with a strong academic foundation 
                in Computer Science. Currently pursuing my B.Tech in CSE at IIIT RGUKT Basar with a CGPA of 8.7, 
                I have developed a deep understanding of core computer science subjects and modern web technologies.
              </p>

              <p className="text-dark-400 leading-relaxed">
                My journey in software development is driven by a passion for solving real-world problems 
                through technology. I specialize in building full-stack applications using the MERN stack 
                while continuously exploring the frontiers of Artificial Intelligence and Machine Learning.
              </p>

              <p className="text-dark-400 leading-relaxed">
                With hands-on experience in both software development and AI implementations, I bring 
                a unique blend of theoretical knowledge and practical skills to every project I undertake.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {['Problem Solver', 'Team Player', 'Quick Learner', 'Detail Oriented'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-dark-800/50 border border-dark-700/50 text-dark-300 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 h-full group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:from-primary-500/30 group-hover:to-accent-cyan/30 transition-all">
                    <item.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-dark-100 mb-2">{item.title}</h4>
                  <p className="text-dark-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

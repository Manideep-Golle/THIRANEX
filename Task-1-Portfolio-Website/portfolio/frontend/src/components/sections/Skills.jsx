import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, Globe, Database, BookOpen, Wrench,
  FileCode, Coffee, Cpu, Braces,
  Palette, Server, Layers, HardDrive, Network,
  GitBranch, Github, Terminal, Monitor
} from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    color: 'from-primary-500 to-primary-600',
    skills: [
      { name: 'C', icon: FileCode, level: 85 },
      { name: 'Java', icon: Coffee, level: 80 },
      { name: 'Python', icon: Terminal, level: 90 },
      { name: 'PHP', icon: FileCode, level: 75 },
      { name: 'JavaScript', icon: Braces, level: 88 },
    ],
  },
  {
    title: 'Web Technologies',
    icon: Globe,
    color: 'from-accent-cyan to-accent-purple',
    skills: [
      { name: 'HTML5', icon: Palette, level: 92 },
      { name: 'CSS3', icon: Palette, level: 88 },
      { name: 'React.js', icon: Layers, level: 85 },
      { name: 'Node.js', icon: Server, level: 82 },
      { name: 'Express.js', icon: Server, level: 80 },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'from-accent-emerald to-accent-cyan',
    skills: [
      { name: 'MySQL', icon: HardDrive, level: 85 },
      { name: 'MongoDB', icon: Database, level: 80 },
    ],
  },
  {
    title: 'Core CS Subjects',
    icon: BookOpen,
    color: 'from-accent-purple to-accent-pink',
    skills: [
      { name: 'DSA', icon: Code2, level: 88 },
      { name: 'OS', icon: Monitor, level: 82 },
      { name: 'DBMS', icon: Database, level: 85 },
      { name: 'CN', icon: Network, level: 78 },
      { name: 'TOC', icon: BookOpen, level: 75 },
      { name: 'COA', icon: Cpu, level: 80 },
      { name: 'Compiler Design', icon: Terminal, level: 72 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    color: 'from-accent-amber to-accent-pink',
    skills: [
      { name: 'Git', icon: GitBranch, level: 88 },
      { name: 'GitHub', icon: Github, level: 90 },
      { name: 'Linux', icon: Terminal, level: 82 },
      { name: 'VS Code', icon: Monitor, level: 92 },
    ],
  },
]

function Skills() {
  return (
    <section id="skills" className="section-padding bg-dark-900/50 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative container-custom mx-auto">
        <SectionTitle
          title="Technical Skills"
          subtitle="My Expertise"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <RevealOnScroll key={category.title} delay={catIndex * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-6 h-full group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-100">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <skill.icon className="w-4 h-4 text-dark-500" />
                          <span className="text-sm font-medium text-dark-300">{skill.name}</span>
                        </div>
                        <span className="text-xs text-dark-500 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
